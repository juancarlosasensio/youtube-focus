import { useEffect } from 'react';
import { useRouter } from 'next/router';
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
    </div>
  )
}

export default SingleVideoEmbedPage;