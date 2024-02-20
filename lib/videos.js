import data from '@/data/videos.json';

export const getVideos = async (searchQuery = 'disney trailer') => {
  const YOUTUBE_URL = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${searchQuery}&key=${process.env.YOUTUBE_API_KEY}&type=video`;

  const response = await fetch(YOUTUBE_URL);
  const data = await response.json();

  return data.items.map(item => {
    const { id, snippet } = item;
    return {
      id: id.videoId,
      title: snippet.title,
      imageUrl: snippet.thumbnails.high.url,
    };
  });
};
