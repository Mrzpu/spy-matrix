export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { provider, ...body } = req.body || {};

  if (provider === 'claude') {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify(body)
    });
    const d = await r.json();
    return res.status(r.status).json(d);
  }

  // default: deepseek
  const r = await fetch('https://api.deepseek.com/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + process.env.DEEPSEEK_API_KEY
    },
    body: JSON.stringify(body)
  });
  const d = await r.json();
  res.status(r.status).json(d);
}
