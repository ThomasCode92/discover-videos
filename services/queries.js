import useSWR from 'swr';

import fetcher from './fetcher';

export function useStats(videoId) {
  return useSWR(['/stats', videoId], ([url, videoId]) =>
    fetcher(`${url}?videoId=${videoId}`)
  );
}
