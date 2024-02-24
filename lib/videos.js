import dummyData from '@/data/videos.json';

const getCommonVideos = async url => {
  const YOUTUBE_BASE_URL = 'https://www.googleapis.com/youtube/v3' + url;
  const YOUTUBE_API_URL =
    YOUTUBE_BASE_URL + `&maxResults=25&key=${process.env.YOUTUBE_API_KEY}`;

  try {
    const response = await fetch(YOUTUBE_API_URL);
    const data = await response.json();

    if (data?.error) throw new Error('YouTube API error');

    return data.items.map(item => {
      const { id, snippet } = item;
      return {
        id: id.videoId ?? id,
        title: snippet.title,
        imageUrl: snippet.thumbnails.high.url,
      };
    });
  } catch (error) {
    console.error('Error fetching videos', error);
    return [];
  }
};

export const getVideos = async (searchQuery = 'disney trailer') => {
  const YOUTUBE_SEARCH_URL = `/search?part=snippet&q=${searchQuery}&type=video`;
  return await getCommonVideos(YOUTUBE_SEARCH_URL);
};

export const getPopularVideos = async () => {
  const YOUTUBE_VIDEOS_URL =
    '/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US';
  return await getCommonVideos(YOUTUBE_VIDEOS_URL);
};
