// Code YouTube Data API fetch here...

export default async function handler(req, res) {
  const { query } = req.query
  console.log("You've hit /api/yt-search/[query] with: ", query)
  try { 
    const URL = `https://hn.algolia.com/api/v1/search?query=${query}`;
    const response = await fetch(URL);
    const data = await response.json();
    const articles = data.hits;

    res.status(200).json(articles);

  } catch (err) {
    let message = err.message;
    res.status(500).json({ error: message })
  }
}