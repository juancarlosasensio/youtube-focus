import { useEffect } from 'react';
import { useRouter } from 'next/router';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import "../../node_modules/lite-youtube-embed/src/lite-yt-embed.css"

export async function getServerSideProps(context) {
  const { videoId } = context.query;
  const response = await fetch(`https://www.youtube.com/embed/${videoId}`);
  const data = await response.text()

  // Identify un-embeddable vids: https://stackoverflow.com/questions/71970621/how-to-identify-the-youtube-videos-that-cant-embed-on-file
  if (!data) {
    return { redirect: { destination: '/', permanent: false }}
  } else if (data.includes('UNPLAYABLE')) {
     return { redirect: { destination: `https://www.youtube.com/watch?v=${videoId}`, permanent: false }} 
  } else {
    return { props: { data } }
  }
}

const SingleVideoEmbedPage = () => {
  const router = useRouter();
  const { videoId, videoTitle } = router.query;

   useEffect(() => {
      const importModule = async () => {
        await import("../../node_modules/lite-youtube-embed/src/lite-yt-embed.js")
      }

      importModule();
    }
  , [])

  return (
    <div style={{ width: '90%', height: 'auto' }}>
      <lite-youtube videoid={videoId} playlabel={videoTitle}></lite-youtube>
      {/* <LiteYouTubeEmbed
        id={videoId} // Default none, id of the video or playlist
        adNetwork={true} // Default true, to preconnect or not to doubleclick addresses called by YouTube iframe (the adnetwork from Google)
        params="" // any params you want to pass to the URL, assume we already had '&' and pass your parameters string
        playlist={false} // Use  true when your ID be from a playlist
        poster="hqdefault" // Defines the image size to call on first render as poster image. Possible values are "default","mqdefault",  "hqdefault", "sddefault" and "maxresdefault". Default value for this prop is "hqdefault". Please be aware that "sddefault" and "maxresdefault", high resolution images are not always avaialble for every video. See: https://stackoverflow.com/questions/2068344/how-do-i-get-a-youtube-video-thumbnail-from-the-youtube-api
        title={videoTitle} // a11y, always provide a title for iFrames: https://dequeuniversity.com/tips/provide-iframe-titles Help the web be accessible ;)
        noCookie={true} //Default false, connect to YouTube via the Privacy-Enhanced Mode using https://www.youtube-nocookie.com
      /> */}
    </div>
  )
}

export default SingleVideoEmbedPage;