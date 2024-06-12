import useSWRMutation from 'swr/mutation';

import { axiosAPI } from './fetcher';

async function updateStats(url, { arg }) {
  await axiosAPI.post(url, { watched: arg.watched, favoured: arg.favoured });
}

export function useUpdateStats(videoId) {
  return useSWRMutation(['/stats', videoId], ([url, videoId], arg) =>
    updateStats(`${url}?videoId=${videoId}`, arg)
  );
}
