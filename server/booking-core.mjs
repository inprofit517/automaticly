// Automaticly – booking core logic (shared by the local dev server AND Netlify Functions).
// Zero external dependencies. Talks to Microsoft Graph (app-only / client credentials)
// to read the calendar's busy times and create the booking event.
//
// Reads configuration from environment variables (locally via `.env`, on Netlify
// via the site's Environment variables). If MS_CLIENT_SECRET is empty/placeholder,
// it runs in MOCK mode (synthetic availability, fake confirmations).

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------
export const CFG = {
  tenantId: process.env.MS_TENANT_ID || '',
  clientId: process.env.MS_CLIENT_ID || '',
  clientSecret: process.env.MS_CLIENT_SECRET || '',
  calendar: process.env.CALENDAR_EMAIL || 'info@automaticly.ch',
  tz: process.env.TIMEZONE || 'Europe/Zurich',
  slotMinutes: int(process.env.SLOT_MINUTES, 20),      // meeting duration
  stepMinutes: int(process.env.STEP_MINUTES, 30),      // gap between start times (:00 / :30)
  workStart: process.env.WORK_START || '09:00',
  workEnd: process.env.WORK_END || '17:00',
  workDays: (process.env.WORK_DAYS || '1,2,3,4,5').split(',').map((n) => +n.trim()), // 0=Sun..6=Sat
  bufferMinutes: int(process.env.BUFFER_MINUTES, 0),
  minNoticeHours: int(process.env.MIN_NOTICE_HOURS, 24),
  windowDays: int(process.env.WINDOW_DAYS, 30),
  enableTeams: (process.env.ENABLE_TEAMS || 'true') !== 'false',
  port: int(process.env.PORT, 8787),
};

const PLACEHOLDER = /^(|CHANGE_ME|your-.*|<.*>)$/i;
export const MOCK = PLACEHOLDER.test(CFG.clientSecret) || !CFG.tenantId || !CFG.clientId;

function int(v, d) {
  const n = parseInt(v ?? '', 10);
  return Number.isFinite(n) ? n : d;
}

// ---------------------------------------------------------------------------
// Timezone helpers (DST-correct, no libraries)
// ---------------------------------------------------------------------------
function tzOffsetMinutes(date, tz) {
  const dtf = new Intl.DateTimeFormat('en-US', {
    timeZone: tz, hour12: false,
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
  });
  const p = Object.fromEntries(dtf.formatToParts(date).map((x) => [x.type, x.value]));
  const asUTC = Date.UTC(p.year, p.month - 1, p.day, p.hour === '24' ? 0 : p.hour, p.minute, p.second);
  return (asUTC - date.getTime()) / 60000;
}

// Wall-clock time in `tz` -> UTC Date
function zonedTimeToUTC(y, mo, d, h, mi, tz) {
  const guess = Date.UTC(y, mo - 1, d, h, mi);
  const off = tzOffsetMinutes(new Date(guess), tz);
  return new Date(guess - off * 60000);
}

// Parts of a Date as seen in `tz`
function partsInTZ(date, tz) {
  const dtf = new Intl.DateTimeFormat('en-CA', {
    timeZone: tz, hour12: false, weekday: 'short',
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit',
  });
  const p = Object.fromEntries(dtf.formatToParts(date).map((x) => [x.type, x.value]));
  return {
    y: +p.year, mo: +p.month, d: +p.day,
    h: +(p.hour === '24' ? 0 : p.hour), mi: +p.minute,
    dateStr: `${p.year}-${p.month}-${p.day}`,
    weekday: { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }[p.weekday],
  };
}

const hm = (s) => s.split(':').map(Number); // "09:00" -> [9,0]

// ---------------------------------------------------------------------------
// Microsoft Graph
// ---------------------------------------------------------------------------
let tokenCache = { value: '', exp: 0 };

async function getToken() {
  if (tokenCache.value && Date.now() < tokenCache.exp) return tokenCache.value;
  const url = `https://login.microsoftonline.com/${CFG.tenantId}/oauth2/v2.0/token`;
  const body = new URLSearchParams({
    client_id: CFG.clientId,
    client_secret: CFG.clientSecret,
    scope: 'https://graph.microsoft.com/.default',
    grant_type: 'client_credentials',
  });
  const res = await fetch(url, { method: 'POST', body });
  const json = await res.json();
  if (!res.ok) throw new Error(`Token error: ${json.error} – ${json.error_description || ''}`);
  tokenCache = { value: json.access_token, exp: Date.now() + (json.expires_in - 60) * 1000 };
  return tokenCache.value;
}

async function graph(path, { method = 'GET', body, headers = {} } = {}) {
  const token = await getToken();
  const res = await fetch(`https://graph.microsoft.com/v1.0${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  const json = text ? JSON.parse(text) : {};
  if (!res.ok) throw new Error(`Graph ${method} ${path} → ${res.status}: ${json.error?.message || text}`);
  return json;
}

// Busy intervals (as UTC ms pairs) across [start, end]
async function fetchBusy(startUTC, endUTC) {
  if (MOCK) return [];
  const path =
    `/users/${encodeURIComponent(CFG.calendar)}/calendarView` +
    `?startDateTime=${startUTC.toISOString()}&endDateTime=${endUTC.toISOString()}` +
    `&$select=start,end,showAs&$top=500&$orderby=start/dateTime`;
  const json = await graph(path, { headers: { Prefer: 'outlook.timezone="UTC"' } });
  const blocking = new Set(['busy', 'oof', 'tentative']);
  return (json.value || [])
    .filter((e) => blocking.has(e.showAs))
    .map((e) => [Date.parse(e.start.dateTime + 'Z'), Date.parse(e.end.dateTime + 'Z')]);
}

// ---------------------------------------------------------------------------
// Availability computation
// ---------------------------------------------------------------------------
export async function buildAvailability() {
  const now = new Date();
  const rangeStart = now;
  const rangeEnd = new Date(now.getTime() + CFG.windowDays * 86400000);
  const busy = await fetchBusy(rangeStart, rangeEnd);
  const bufMs = CFG.bufferMinutes * 60000;
  const notBefore = now.getTime() + CFG.minNoticeHours * 3600000;

  const [wsH, wsM] = hm(CFG.workStart);
  const [weH, weM] = hm(CFG.workEnd);

  const days = [];
  // iterate calendar days in the configured timezone
  const todayParts = partsInTZ(now, CFG.tz);
  let cursor = zonedTimeToUTC(todayParts.y, todayParts.mo, todayParts.d, 12, 0, CFG.tz); // noon anchor avoids DST edges
  for (let i = 0; i < CFG.windowDays; i++) {
    const dp = partsInTZ(cursor, CFG.tz);
    cursor = new Date(cursor.getTime() + 86400000);
    if (!CFG.workDays.includes(dp.weekday)) continue;

    const slots = [];
    let sh = wsH, sm = wsM;
    while (sh * 60 + sm + CFG.slotMinutes <= weH * 60 + weM) {
      const start = zonedTimeToUTC(dp.y, dp.mo, dp.d, sh, sm, CFG.tz);
      const end = new Date(start.getTime() + CFG.slotMinutes * 60000);
      const s = start.getTime(), e = end.getTime();

      const overlaps = busy.some(([bs, be]) => s < be + bufMs && e + bufMs > bs);
      if (s >= notBefore && !overlaps) {
        slots.push({
          start: start.toISOString(),
          end: end.toISOString(),
          label: `${String(sh).padStart(2, '0')}:${String(sm).padStart(2, '0')}`,
        });
      }
      sm += CFG.stepMinutes;
      while (sm >= 60) { sm -= 60; sh += 1; }
    }
    if (slots.length) days.push({ date: dp.dateStr, weekday: dp.weekday, slots });
  }
  return days;
}

// ---------------------------------------------------------------------------
// Booking
// ---------------------------------------------------------------------------
export async function createBooking({ start, name, email, phone, message }) {
  const startDate = new Date(start);
  if (Number.isNaN(startDate.getTime())) throw new Error('Ungültiger Termin.');
  const endDate = new Date(startDate.getTime() + CFG.slotMinutes * 60000);

  // wall-clock strings in the configured tz for Graph
  const p = partsInTZ(startDate, CFG.tz);
  const pe = partsInTZ(endDate, CFG.tz);
  const wall = (x) => `${x.dateStr}T${String(x.h).padStart(2, '0')}:${String(x.mi).padStart(2, '0')}:00`;

  if (MOCK) {
    return { ok: true, mock: true, when: `${p.dateStr} ${p.h}:${String(p.mi).padStart(2, '0')}`, joinUrl: null };
  }

  const event = {
    subject: `Erstgespräch – ${name}`,
    body: {
      contentType: 'HTML',
      content:
        `<p>Erstgespräch mit ${escapeHtml(name)}</p>` +
        `<p>E-Mail: ${escapeHtml(email)}<br>Telefon: ${escapeHtml(phone || '–')}</p>` +
        (message ? `<p>Nachricht:<br>${escapeHtml(message)}</p>` : '') +
        `<p><em>Gebucht über automaticly.ch</em></p>`,
    },
    start: { dateTime: wall(p), timeZone: CFG.tz },
    end: { dateTime: wall(pe), timeZone: CFG.tz },
    attendees: [{ emailAddress: { address: email, name }, type: 'required' }],
    isOnlineMeeting: CFG.enableTeams,
    ...(CFG.enableTeams ? { onlineMeetingProvider: 'teamsForBusiness' } : {}),
  };

  const created = await graph(`/users/${encodeURIComponent(CFG.calendar)}/events`, {
    method: 'POST',
    body: event,
  });
  return {
    ok: true,
    when: `${p.dateStr} ${String(p.h).padStart(2, '0')}:${String(p.mi).padStart(2, '0')}`,
    joinUrl: created.onlineMeeting?.joinUrl || null,
  };
}

function escapeHtml(s = '') {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
