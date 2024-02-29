import { useRouter } from 'next/router';

export default function Video() {
  const router = useRouter();

  const { videoId } = router.query;

  return <div>Video Page {videoId}</div>;
}
