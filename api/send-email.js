export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const { nombre, email, hotel, llegada, salida, huespedes, folio } = await req.json();

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: 'Viajes Playeros <onboarding@resend.dev>',
        to: ['mgomez33@gmail.com'],
        subject: `🏖️ Nueva reservación - ${nombre}`,
        html: `
          <h2>Nueva reservación en Viajes Playeros</h2>
          <table style="border-collapse:collapse;width:100%;max-width:500px;">
            <tr><td style="padding:8px;border:1px solid #eee;"><strong>Nombre</strong></td><td style="padding:8px;border:1px solid #eee;">${nombre}</td></tr>
            <tr><td style="padding:8px;border:1px solid #eee;"><strong>Email</strong></td><td style="padding:8px;border:1px solid #eee;">${email}</td></tr>
            <tr><td style="padding:8px;border:1px solid #eee;"><strong>Hotel</strong></td><td style="padding:8px;border:1px solid #eee;">${hotel}</td></tr>
            <tr><td style="padding:8px;border:1px solid #eee;"><strong>Llegada</strong></td><td style="padding:8px;border:1px solid #eee;">${llegada}</td></tr>
            <tr><td style="padding:8px;border:1px solid #eee;"><strong>Salida</strong></td><td style="padding:8px;border:1px solid #eee;">${salida}</td></tr>
            <tr><td style="padding:8px;border:1px solid #eee;"><strong>Huéspedes</strong></td><td style="padding:8px;border:1px solid #eee;">${huespedes}</td></tr>
          </table>
          <p style="color:#666;margin-top:16px;">Folio: #${folio} | Viajes Playeros Mazatlán</p>
        `
      })
    });

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
