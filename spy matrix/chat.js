export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const r = await fetch('https://api.deepseek.com/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + process.env.DEEPSEEK_API_KEY
    },
    body: JSON.stringify(req.body)
  });

  const d = await r.json();
  res.status(r.status).json(d);
}
