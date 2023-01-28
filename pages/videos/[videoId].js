import dynamic from 'next/dynamic';

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

const YoutubeVideo = dynamic(
  () => import('../../components/YoutubeVideo.jsx'),
  { loading: () => <p>Loading...</p> }
)

const SingleVideoEmbedPage = () => {
  return (
    <div className="App">
      <YoutubeVideo />
    </div>
  )
}

export default SingleVideoEmbedPage;