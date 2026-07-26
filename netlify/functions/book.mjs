// Netlify Function → served at /api/book (via netlify.toml redirect).
import { createBooking } from '../../server/booking-core.mjs';

export default async (req) => {
  try {
    if (req.method !== 'POST') {
      return Response.json({ ok: false, error: 'Method not allowed' }, { status: 405 });
    }
    const data = await req.json().catch(() => ({}));
    if (!data.start || !data.name || !data.email) {
      return Response.json({ ok: false, error: 'Name, E-Mail und Termin sind erforderlich.' }, { status: 400 });
    }
    const result = await createBooking(data);
    return Response.json(result);
  } catch (err) {
    console.error(err);
    return Response.json({ ok: false, error: err.message || 'Serverfehler' }, { status: 500 });
  }
};
