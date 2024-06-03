import localFont from 'next/font/local';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Modal from 'react-modal';

import clsx from 'classnames';

import Navbar from '@/components/Navbar';
import DisLike from '@/components/icons/DislikeIcon';
import LikeIcon from '@/components/icons/LikeIcon';

import { getYoutubeVideoById } from '@/lib/videos';

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

const INITIAL_ICONS_STATE = { isLikeSelected: false, isDislikeSelected: false };

export default function Video({ video }) {
  const [icons, setIcons] = useState(INITIAL_ICONS_STATE);
  const router = useRouter();

  const { videoId } = router.query;

  const videoSrc = `https://www.youtube.com/embed/${videoId}?enablejsapi=1&origin=http://example.com&controls=0&rel=0`;

  const handleToggle = async type => {
    setIcons(prevState => {
      if (type === 'like' && !prevState.isLikeSelected)
        return { isLikeSelected: true, isDislikeSelected: false };

      if (type === 'dislike' && !prevState.isDislikeSelected)
        return { isLikeSelected: false, isDislikeSelected: true };

      return prevState;
    });

    const response = await fetch('/api/stats?videoId=' + videoId, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ watched: true, favoured: type === 'like' }),
    });

    const data = await response.json();
    console.log(data);
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
            onClick={() => handleToggle('like')}
          >
            <LikeIcon selected={icons.isLikeSelected} />
          </button>
          <button
            className={styles['icon-btn']}
            onClick={() => handleToggle('dislike')}
          >
            <DisLike selected={icons.isDislikeSelected} />
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
