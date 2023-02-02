import { YT_BASE_URL, DEFAULT_PARAMS } from "../../../../global-constants";

export default async function handler(req, res) {
  const { query } = req.query;
  const dynamicParams = { 'q': `${query}` };
  const paramsObj = { ...DEFAULT_PARAMS, ...dynamicParams };
  const params = Object.keys(paramsObj).map((key) => `${key}=${paramsObj[key]}`);

  console.log("You've hit /api/yt-search/[query] with: ", query);
  if (!query) res.status(204)

  try { 
    const response = await fetch(`${YT_BASE_URL}${params.join('&')}`);
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