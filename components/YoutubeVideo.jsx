import { useRouter } from "next/router";

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

export default Video;