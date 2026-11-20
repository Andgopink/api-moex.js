export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const base = 'https://moex.com';
    const stocksUrl = base + '/stock/markets/shares/boards/TQBR/securities.json?iss.meta=off&iss.only=securities,marketdata&securities.columns=SECID,PREVPRICE&marketdata.columns=SECID,LAST,LASTTOPREVPRICE&securities=LKOH,SBER,GAZP,YDEX,T,NVTK,GMKN,ROSN';
    const cnyUrl = base + '/currency/markets/selt/boards/CETS/securities/CNYRUB_TOM.json?iss.meta=off&iss.only=securities,marketdata&securities.columns=PREVPRICE&marketdata.columns=LAST,CHANGE';
    const usdUrl = base + '/futures/markets/forts/boards/RFUD/securities/USDRUBF.json?iss.meta=off&iss.only=securities,marketdata&securities.columns=PREVSETTLEPRICE&marketdata.columns=LAST,CHANGE';
    const eurUrl = base + '/futures/markets/forts/boards/RFUD/securities/EURRUBF.json?iss.meta=off&iss.only=securities,marketdata&securities.columns=PREVSETTLEPRICE&marketdata.columns=LAST,CHANGE';

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

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
