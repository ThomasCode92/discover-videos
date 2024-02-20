import data from '@/data/videos.json';

export const getVideos = async (searchQuery = 'disney trailer') => {
  const YOUTUBE_URL = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${searchQuery}&key=${process.env.YOUTUBE_API_KEY}&type=video`;

  try {
    const response = await fetch(YOUTUBE_URL);
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
