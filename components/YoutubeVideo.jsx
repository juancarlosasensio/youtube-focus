import { useRouter } from "next/router";

const Video = () => {
  const router = useRouter()
  const { videoId, videoTitle } = router.query

  return (
    // https://dev.to/deammer/embed-responsive-youtube-videos-in-2021-5dkh

    /*
      This page has an embedded youtube video: https://www.seerinteractive.com/

      The src attr has some interesting params: 
      https://www.youtube.com/embed/olmFf-PK2E8?feature=oembed&enablejsapi=1&origin=https%3A%2F%2Fwww.seerinteractive.com 

      This is the HTML output:
      <div 
        class="hs-embed-wrapper" 
        data-service="youtube" 
        data-responsive="true" 
        style="position: relative; overflow: hidden; width: 100%; height: auto; padding: 0px; max-width: 200px; min-width: 256px; display: block; margin: auto;"><div class="hs-embed-content-wrapper"><div style="position: relative; overflow: hidden; max-width: 100%; padding-bottom: 56.5%; margin: 0px;">
          <iframe 
            width="200" height="113" 
            src="https://www.youtube.com/embed/olmFf-PK2E8?feature=oembed&amp;enablejsapi=1&amp;origin=https%3A%2F%2Fwww.seerinteractive.com" 
            frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="" title="Our Recommitment to Community" 
            style="position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; border: none;" 
            data-gtm-fw-yt-listening="" 
            data-orig-src="https://www.youtube.com/embed/olmFf-PK2E8?feature=oembed" 
            data-gtm-yt-inspected-50="true" 
            id="719248405" 
            data-gtm-yt-inspected-952271_364="true"></iframe></div></div></div>
    */

      <div>
        <iframe
          className='yt-video'
          style={{ border: '0px' }}  
          src={`https://www.youtube.com/embed/${decodeURIComponent(videoId)}?feature=oembed`}
          title={decodeURIComponent(videoTitle)}  
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          allowFullScreen
          > 
          </iframe>
        </div>
  )
}

export default Video;