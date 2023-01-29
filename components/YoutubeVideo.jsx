import { useRouter } from "next/router";
import { useRef } from 'react';
import YouTube from "react-youtube";


const Video = () => {
  const router = useRouter();
  const { videoId, videoTitle } = router.query;

  const opts = useRef({
      height: '390',
      width: '640',
      title: videoTitle,
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 0,
      },
  });

    return (
      <div>
        <YouTube videoId={videoId} opts={opts} />
         <iframe
            width={560}
            height={315}
            src='https://www.youtube.com/embed/_zQqN5OYCCM'
            title='YouTube video player'
            frameBorder={0}
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          />
      </div>
    );
  }

//   return (
//     // https://dev.to/deammer/embed-responsive-youtube-videos-in-2021-5dkh
//       <div>
//         <iframe
//           className='yt-video'
//           style={{ border: '0px' }}  
//           src={`https://www.youtube.com/embed/${decodeURIComponent(videoId)}?feature=oembed;playsinline=1;origin=https://youtube-focus.vercel.app/`}
//           title={decodeURIComponent(videoTitle)}  
//           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
//           allowFullScreen
//           > 
//           </iframe>
//         </div>
//   )
// }

export default Video;