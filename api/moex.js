export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const stocksUrl = 'https://moex.com';
    const cnyUrl = 'https://moex.com';
    const usdUrl = 'https://moex.com';
    const eurUrl = 'https://moex.com';

    const [stocksRes, cnyRes, usdRes, eurRes] = await Promise.all([
      fetch(stocksUrl),
      fetch(cnyUrl),
      fetch(usdUrl),
      fetch(eurUrl)
    ]);

    const [stocks, cny, usd, eur] = await Promise.all([
      stocksRes.json(),
      cnyRes.json(),
      usdRes.json(),
      eurRes.json()
    ]);

    res.status(200).json({ stocks, cny, usd, eur });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
