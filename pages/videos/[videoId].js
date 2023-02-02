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

  /* 
    The key to all this. Thanks Paul Irish: 
    https://github.com/paulirish/lite-youtube-embed

    https://medium.com/geekculture/react-uncaught-typeerror-destroy-is-not-a-function-192738a6e79b
    https://www.swyx.io/how-to-use-web-components-with-next-js-and-typescript-4gg1
    https://css-tricks.com/using-web-components-with-next-or-any-ssr-framework/
    https://www.newline.co/@kchan/web-components-in-server-side-rendered-ssr-and-static-site-generated-ssg-in-nextjs-applications--6b2e93b2
  */
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