// Automaticly – local dev booking server.
// Thin HTTP wrapper around booking-core.mjs (the same logic runs on Netlify as
// serverless functions). Run with:  npm run server  (loads .env via --env-file)

import { createServer } from 'node:http';
import { CFG, MOCK, buildAvailability, createBooking } from './booking-core.mjs';

function send(res, code, data) {
  res.writeHead(code, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
  res.end(JSON.stringify(data));
}

const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://localhost:${CFG.port}`);

    if (req.method === 'GET' && url.pathname === '/api/availability') {
      const days = await buildAvailability();
      return send(res, 200, {
        mock: MOCK,
        config: { tz: CFG.tz, durationMinutes: CFG.slotMinutes },
        days,
      });
    }

    if (req.method === 'POST' && url.pathname === '/api/book') {
      let raw = '';
      for await (const chunk of req) raw += chunk;
      const data = JSON.parse(raw || '{}');
      if (!data.start || !data.name || !data.email) {
        return send(res, 400, { ok: false, error: 'Name, E-Mail und Termin sind erforderlich.' });
      }
      const result = await createBooking(data);
      return send(res, 200, result);
    }

    if (req.method === 'OPTIONS') {
      res.writeHead(204, {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      });
      return res.end();
    }

    send(res, 404, { error: 'Not found' });
  } catch (err) {
    console.error(err);
    send(res, 500, { ok: false, error: err.message || 'Serverfehler' });
  }
});

server.listen(CFG.port, () => {
  console.log(`\n  Automaticly booking API  →  http://localhost:${CFG.port}`);
  console.log(`  Mode: ${MOCK ? 'MOCK (no live credentials — set MS_CLIENT_SECRET in .env)' : 'LIVE (Microsoft Graph)'}`);
  console.log(`  Calendar: ${CFG.calendar}  ·  ${CFG.workStart}–${CFG.workEnd} ${CFG.tz}  ·  ${CFG.slotMinutes}min\n`);
});
