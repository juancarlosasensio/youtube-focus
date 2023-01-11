// Code YouTube Data API fetch here...

export default async function handler(req, res) {
  const { query } = req.query
  console.log("You've hit /api/yt-search/[query] with: ", query)

  const YT_URL = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&order=relevance&q=${query}&type=video&videoEmbeddable=true&key=${process.env.YOUTUBE_KEY}`

  try { 
    const response = await fetch(YT_URL);
    const data = await response.json();

    res.status(200).json(data);

  } catch (err) {
    let message = err.message;
    res.status(500).json({ error: message })
  }
}