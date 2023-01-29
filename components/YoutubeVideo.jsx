import { useRouter } from "next/router";
import { useRef } from 'React';


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
          src={`https://www.youtube.com/embed/${decodeURIComponent(videoId)}?feature=oembed;playsinline=1;origin=https://youtube-focus.vercel.app/`}
          title={decodeURIComponent(videoTitle)}  
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          allowFullScreen
          > 
          </iframe>
        </div>
  )
}

/* 
  Try replacing html iframe with iFrame Player API using JavaScript

  <html>
  <body>
    <!-- 1. The <iframe> (and video player) will replace this <div> tag. -->
    <div id="player"></div>

    <script>
      // 2. This code loads the IFrame Player API code asynchronously.
      var tag = document.createElement('script');

      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      // 3. This function creates an <iframe> (and YouTube player)
      //    after the API code downloads.
      var player;
      function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
          height: '390',
          width: '640',
          videoId: 'M7lc1UVf-VE',
          playerVars: {
            'playsinline': 1
          },
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          }
        });
      }

      // 4. The API will call this function when the video player is ready.
      function onPlayerReady(event) {
        event.target.playVideo();
      }

      // 5. The API calls this function when the player's state changes.
      //    The function indicates that when playing a video (state=1),
      //    the player should play for six seconds and then stop.
      var done = false;
      function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING && !done) {
          setTimeout(stopVideo, 6000);
          done = true;
        }
      }
      function stopVideo() {
        player.stopVideo();
      }
    </script>
  </body>
</html>
*/

export default Video;