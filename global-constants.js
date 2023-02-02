// Application-wide constants...

export const YT_BASE_URL = `https://youtube.googleapis.com/youtube/v3/search?`;

export const DEFAULT_PARAMS = {
  'part': 'snippet',
  'maxResults': 15,
  'order': 'relevance',
  'type': 'video',
  'q': '',
  'regionCode': 'US',
  'videoEmbeddable': true,
  'safeSearch': 'strict',
  'videoSyndicated': true,
  'key': `${process.env.YOUTUBE_KEY}`
}