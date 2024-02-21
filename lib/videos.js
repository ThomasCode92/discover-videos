import data from '@/data/videos.json';

export const getCommonVideos = async url => {
  const YOUTUBE_BASE_URL = 'https://www.googleapis.com/youtube/v3';
  const YOUTUBE_API_URL =
    YOUTUBE_BASE_URL + url + `&key=${process.env.YOUTUBE_API_KEY}`;

  try {
    const response = await fetch(YOUTUBE_API_URL);
    const data = await response.json();

    if (data?.error) throw new Error('YouTube API error');

    return data.items.map(item => {
      const { id, snippet } = item;
      return {
        id: id.videoId,
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
  const YOUTUBE_SEARCH_URL = `/search?part=snippet&maxResults=25&q=${searchQuery}&type=video`;
  return await getCommonVideos(YOUTUBE_SEARCH_URL);
};
