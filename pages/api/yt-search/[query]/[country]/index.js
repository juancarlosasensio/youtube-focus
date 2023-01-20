export default async function handler(req, res) {
  const { query, country } = req.query

  const BASE = `https://youtube.googleapis.com/youtube/v3/search?`
  const FIXED_PARAMS = `part=snippet&maxResults=10&order=relevance&type=video&eventType=completed&videoEmbeddable=true&key=${process.env.YOUTUBE_KEY}`;
  let dynamicParams;

  console.log("You've hit /api/yt-search/[query]/[country] with: ", query, country)
  if (!query) res.status(204)

  if (!country) {
    dynamicParams = `q=${query}&`;
  } else {
    dynamicParams = `q=${query}&regionCode=${country}&`;
  }

  try { 
    const response = await fetch(`${BASE}${dynamicParams}${FIXED_PARAMS}`);
    const data = await response.json();

    res.status(200).json(data.items);
  } catch (err) {
    let message = err.message;
    res.status(500).json({ error: message })
  }
}