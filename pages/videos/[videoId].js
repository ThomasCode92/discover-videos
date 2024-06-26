import localFont from 'next/font/local';
import { useRouter } from 'next/router';
import Modal from 'react-modal';

import clsx from 'classnames';

import Navbar from '@/components/Navbar';
import DisLike from '@/components/icons/DislikeIcon';
import LikeIcon from '@/components/icons/LikeIcon';

import { getYoutubeVideoById } from '@/lib/videos';
import { useUpdateStats } from '@/services/mutations';
import { useStats } from '@/services/queries';

import styles from '@/styles/Video.module.css';

const modalFont = localFont({
  src: [
    {
      path: '../../fonts/RobotoSlab-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
});

Modal.setAppElement('#__next');

export default function Video({ video }) {
  const router = useRouter();

  const { videoId } = router.query;

  const { data, isValidating } = useStats(videoId);
  const { trigger, isMutating } = useUpdateStats(videoId);

  const videoSrc = `https://www.youtube.com/embed/${videoId}?enablejsapi=1&origin=http://example.com&controls=0&rel=0`;

  const handleToggle = value => {
    const favoured = value === 'like';
    const argument = { favoured, watched: true };
    trigger(argument, {
      optimisticData: { watched: true, favoured: favoured },
      rollbackOnError: true,
    });
  };

  return (
    <div className={styles.container}>
      <Navbar />
      <Modal
        isOpen={true}
        contentLabel="Watch the video"
        className={styles.modal}
        overlayClassName={styles.overlay}
        onRequestClose={() => router.back()}
      >
        <iframe
          id="player"
          className={styles['video-player']}
          type="text/html"
          width="100%"
          height="360"
          src={videoSrc}
          frameborder="0"
        />
        <div className={styles.icons}>
          <button
            className={styles['icon-btn']}
            disabled={isMutating || isValidating}
            onClick={() => handleToggle('like')}
          >
            <LikeIcon selected={data && data.favoured} />
          </button>
          <button
            className={styles['icon-btn']}
            disabled={isMutating || isValidating}
            onClick={() => handleToggle('dislike')}
          >
            <DisLike selected={data && !data?.favoured} />
          </button>
        </div>
        <div className={clsx(styles['modal-body'], modalFont.className)}>
          <div className={styles['video-info']}>
            <p className={styles['publish-time']}>{video.publishTime}</p>
            <p className={styles.title}>{video.title}</p>
            <p className={styles.description}>{video.description}</p>
          </div>
          <div className={styles['video-stats']}>
            <p>
              <span className={styles['sub-text']}>Cast: </span>
              {video.channelTitle}
            </p>
            <p>
              <span className={styles['sub-text']}>View Count: </span>
              {video.statistics.viewCount}
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export async function getStaticPaths() {
  const listOfVideos = ['mYfJxlgR2jw', '4zH5iYM4wJo', 'KCPEHsAViiQ'];
  const videoPaths = listOfVideos.map(videoId => ({ params: { videoId } }));

  return { paths: videoPaths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const videoId = params.videoId;
  const videos = await getYoutubeVideoById(videoId);

  return { props: { video: videos[0] }, revalidate: 10 };
}
