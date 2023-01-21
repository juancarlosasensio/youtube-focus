export default async function handler(req, res) {
  const { query, country } = req.query

  const BASE = `https://youtube.googleapis.com/youtube/v3/search?`
  let dynamicParams;

  console.log("You've hit /api/yt-search/[query]/[country] with: ", query, country)
  if (!query) res.status(204)

  if (!country) {
    dynamicParams = `q=${query}`;
  } else {
    dynamicParams = `q=${query}&regionCode=${country}`;
  }

  const params = `part=snippet&maxResults=10&order=relevance&type=video&${dynamicParams}&eventType=completed&videoEmbeddable=true&safeSearch=strict&videoSyndicated=true&key=${process.env.YOUTUBE_KEY}`;

  try { 
    const response = await fetch(`${BASE}${params}`);
    const data = await response.json();

    res.status(200).json(data.items);
  } catch (err) {
    let message = err.message;
    res.status(500).json({ error: message })
  }
}