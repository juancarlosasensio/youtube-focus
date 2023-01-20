export default async function handler(req, res) {
  const { query } = req.query
  console.log("You've hit /api/yt-search/[query] with: ", query)

  const BASE = `https://youtube.googleapis.com/youtube/v3/search?`
  const FIXED_PARAMS = `part=snippet&maxResults=10&order=relevance&type=video&eventType=completed&videoEmbeddable=true&key=${process.env.YOUTUBE_KEY}`;
  const dynamicParams = `q=${query}&`

  if (!query) res.status(204)

  try { 
    const response = await fetch(`${BASE}${dynamicParams}${FIXED_PARAMS}`);
    const data = await response.json();

    res.status(200).json(data.items);
  } catch (err) {
    let message = err.message;
    res.status(500).json({ error: message })
  }
}