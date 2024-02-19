import data from '@/data/videos.json';

export const getVideos = () => {
  return data.map(item => {
    const { id, snippet } = item;
    return {
      id: id.videoId,
      title: snippet.title,
      imageUrl: snippet.thumbnails.high.url,
    };
  });
};
