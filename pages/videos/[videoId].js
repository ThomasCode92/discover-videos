import { useRouter } from 'next/router';
import Modal from 'react-modal';
import localFont from 'next/font/local';
import clsx from 'classnames';

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

export default function Video() {
  const router = useRouter();

  const { videoId } = router.query;

  const videoSrc = `http://www.youtube.com/embed/${videoId}?enablejsapi=1&origin=http://example.com&controls=0&rel=0`;

  const video = {
    title: 'Hi cute dog',
    publishTime: '1990-01-01',
    description:
      'A big red dog that is super cute, can he get any bigger? A big red dog that is super cute, can he get any bigger? A big red dog that is super cute, can he get any bigger? A big red dog that is super cute, can he get any bigger? A big red dog that is super cute, can he get any bigger? A big red dog that is super cute, can he get any bigger? A big red dog that is super cute, can he get any bigger? A big red dog that is super cute, can he get any bigger? A big red dog that is super cute, can he get any bigger? A big red dog that is super cute, can he get any bigger? A big red dog that is super cute, can he get any bigger? A big red dog that is super cute, can he get any bigger? A big red dog that is super cute, can he get any bigger? A big red dog that is super cute, can he get any bigger? A big red dog that is super cute, can he get any bigger?',
    channelTitle: 'Paramount Pictures',
    viewCount: 10000,
  };

  return (
    <div className={styles.container}>
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
              {video.viewCount}
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
}
