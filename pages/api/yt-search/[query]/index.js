import { YT_BASE_URL } from "../../../../global-constants";

export default async function handler(req, res) {
  const { query } = req.query
  console.log("You've hit /api/yt-search/[query] with: ", query)

  const dynamicParams = `q=${query}`;
  const params = `part=snippet&maxResults=10&order=relevance&type=video&${dynamicParams}&eventType=completed&videoEmbeddable=true&safeSearch=strict&videoSyndicated=true&key=${process.env.YOUTUBE_KEY}`;

  if (!query) res.status(204)

  try { 
    const response = await fetch(`${YT_BASE_URL}${params}`);
    const data = await response.json();

    // const embeddableVids = data.items.filter((video) => {

    //   // Check if status.embeddable is true
    //   // Use https://developers.google.com/youtube/v3/docs/videos/list
    //   //https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=Ks-_Mh1QhMc&key=[YOUR_API_KEY]
    // })

    res.status(200).json(data.items);
  } catch (err) {
    let message = err.message;
    res.status(500).json({ error: message })
  }
}