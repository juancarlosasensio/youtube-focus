import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useYTSearch } from '../hooks/useYTSearch';

export default function Home() {
  const [query, setQuery] = useState("");
  const [countryCode, setCountryCode] = useState("")
  const { status, data, error } = useYTSearch(query, countryCode);

  useEffect(() => {
    // Why does the UI crash if call to getIp() throws an error?
    const getIp = async () => {
      try {
        const res = await fetch('https://geolocation-db.com/json/')
        const ipData = await res.json();
        setCountryCode(ipData.country_code);
      } catch (error) {
        console.log(error);
      }
    }
    getIp()
  }, [])

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
              
              {data.map(({ id, snippet }) => (
                <div className="video" key={id.videoId}>
                  <a 
                    target="_blank" 
                    href={`/videos/${id.videoId}?videoTitle=${encodeURIComponent(snippet.title)}`} 
                    rel="noopener noreferrer">
                    {snippet.title}
                  </a>
                  by {snippet.channelTitle}
                </div>
              ))}
            </>
          )}
        </main>
      </div>
    </>
  );
}
