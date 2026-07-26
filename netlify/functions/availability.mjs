// Netlify Function → served at /api/availability (via netlify.toml redirect).
import { buildAvailability, MOCK, CFG } from '../../server/booking-core.mjs';

export default async () => {
  try {
    const days = await buildAvailability();
    return Response.json({
      mock: MOCK,
      config: { tz: CFG.tz, durationMinutes: CFG.slotMinutes },
      days,
    });
  } catch (err) {
    console.error(err);
    return Response.json({ ok: false, error: err.message || 'Serverfehler' }, { status: 500 });
  }
};
