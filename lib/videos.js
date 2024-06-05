import { findWatchedVideosByUserId } from './hasura';

import dummyData from '@/data/videos.json';

const fetchVideos = async url => {
  const response = await fetch(url);
  return await response.json();
};

const getCommonVideos = async url => {
  const YOUTUBE_BASE_URL = 'https://www.googleapis.com/youtube/v3' + url;
  const YOUTUBE_API_URL =
    YOUTUBE_BASE_URL + `&maxResults=25&key=${process.env.YOUTUBE_API_KEY}`;

  try {
    const data = !process.env.DEVELOPMENT
      ? await fetchVideos(YOUTUBE_API_URL)
      : dummyData;

    if (data?.error) throw new Error('YouTube API error');

    return data.items.map(item => {
      const { id, snippet, statistics } = item;
      const videoId = id.videoId ?? id;
      const imageUrl = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;

      return {
        id: videoId,
        title: snippet.title,
        imageUrl: imageUrl,
        description: snippet.description,
        publishTime: snippet.publishedAt,
        channelTitle: snippet.channelTitle,
        statistics: statistics ?? { viewCount: 0 },
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

export const getYoutubeVideoById = async videoId => {
  const YOUTUBE_VIDEO_URL = `/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}`;

  return await getCommonVideos(YOUTUBE_VIDEO_URL);
};

export const getWatchedVideos = async (token, userId) => {
  const videos = await findWatchedVideosByUserId(token, userId);
  return videos.map(video => {
    const imageUrl = `https://i.ytimg.com/vi/${video.video_id}/maxresdefault.jpg`;
    return { id: video.video_id, imageUrl };
  });
};
