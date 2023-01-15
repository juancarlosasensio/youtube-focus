import { useRouter } from 'next/router'

const Video = () => {
  const router = useRouter()
  const { videoId, videoTitle } = router.query

  return (
    <div>
      <iframe 
        width="560" 
        height="315" 
        src={`https://www.youtube.com/embed/${decodeURIComponent(videoId)}`}
        title={decodeURIComponent(videoTitle)} 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    </div>
  )
}

export default Video