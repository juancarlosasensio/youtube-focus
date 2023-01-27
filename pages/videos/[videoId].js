import { useRouter } from 'next/router'

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

const Video = () => {
  const router = useRouter()
  const { videoId, videoTitle } = router.query

  return (
    <div>
      <iframe
        className='yt-video'
        style={{ border: '0px' }}  
        src={`https://www.youtube.com/embed/${decodeURIComponent(videoId)}`}
        title={decodeURIComponent(videoTitle)}  
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        allowFullScreen
        > 
        </iframe>
    </div>
  )
}

export default Video