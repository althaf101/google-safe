import axios from 'axios'

export default async function handler(req, res) {
  const resp =  await axios.get(`https://www.google.com/search?q=${req.query.q}`);
  res.send(resp.data)
}