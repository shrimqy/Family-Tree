export default async function handler(req, res) {
    const region = req.query.region;
    const url = `https://${region}-balkangraph.azurewebsites.net/api/OrgChartJS`;
  
    try {
      const response = await fetch(url);
      const data = await response.text(); // Use `text()` instead of `json()` if the response is not JSON
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.status(response.status).send(data);
    } catch (error) {
      res.status(500).json({ error: 'Something went wrong!' });
    }
  }