import Head from 'next/head'
import { useYTSearch } from '../hooks/useYTSearch';
import { useState } from 'react';

export default function Home() {
  const [query, setQuery] = useState("");
  const { status, data, error } = useYTSearch(query);

  const handleSubmit = e => {
    e.preventDefault();

    const search = e.target.search.value;
    if (search) {
      setQuery(search);
      e.target.search.value = "";
    }
  };

  return (
    <>
      <Head>
        <title>YoutubeFocus</title>
        <meta name="description" content="YouTube, with less distractions." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="App">
        <header>YoutubeFocus</header>
        <form className="Form" onSubmit={handleSubmit}>
          <input
            type="text"
            autoFocus
            autoComplete="off"
            name="search"
            placeholder="Search YouTube"
          />
          <button> Search </button>
        </form>
        <main>
          {status === "idle" && (
            <div> Get started by searching for videos! </div>
          )}
          {status === "error" && <div>{error}</div>}
          {status === "fetching" && <div className="loading" />}
          {status === "fetched" && (
            <>
              <div className="query"> {query ? `Search results for ${query}` : 'Front page results'} </div>
              {data.length === 0 && <div> No videos found! </div>}
              {data.map(video => (
                <div className="video" key={video.id.videoId}>
                  <a target="_blank" href={`https://www.youtube.com/watch?v=${video.id.videoId}`} rel="noopener noreferrer">
                    {video.snippet.title}
                  </a>{" "}
                  by {video.channelTitle}
                </div>
              ))}
            </>
          )}
        </main>
      </div>
    </>
  );
}

// Response from api/yt-search/[query] is an array of items...
// Each YouTube video item JSON looks like:

/* 
   {
    "kind": "youtube#searchResult",
    "etag": "Ob3Mbk-21J5VzmsfxUbDfzCR2OE",
    "id": {
      "kind": "youtube#video",
      "videoId": "9iqwYOgnzxE"
    },
    "snippet": {
      "publishedAt": "2020-08-21T04:00:01Z",
      "channelId": "UCFkoPRmuxqr37jvGmmpzhzQ",
      "title": "Maluma - Madrid (Audio) ft. Myke Towers",
      "description": "Maluma feat. Myke Towers – Madrid (Cover Audio) Top Hits: https://smarturl.it/malumatophits My Channel: ...",
      "thumbnails": {
        "default": {
          "url": "https://i.ytimg.com/vi/9iqwYOgnzxE/default.jpg",
          "width": 120,
          "height": 90
        },
        "medium": {
          "url": "https://i.ytimg.com/vi/9iqwYOgnzxE/mqdefault.jpg",
          "width": 320,
          "height": 180
        },
        "high": {
          "url": "https://i.ytimg.com/vi/9iqwYOgnzxE/hqdefault.jpg",
          "width": 480,
          "height": 360
        }
      },
      "channelTitle": "MalumaVEVO",
      "liveBroadcastContent": "none",
      "publishTime": "2020-08-21T04:00:01Z"
    }
  },
*/
