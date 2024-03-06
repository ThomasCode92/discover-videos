import { useRouter } from 'next/router';
import Modal from 'react-modal';

import styles from '@/styles/Video.module.css';

Modal.setAppElement('#__next');

export default function Video() {
  const router = useRouter();

  const { videoId } = router.query;

  const videoSrc = `http://www.youtube.com/embed/${videoId}?enablejsapi=1&origin=http://example.com&controls=0&rel=0`;

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
          type="text/html"
          width="640"
          height="390"
          src={videoSrc}
          frameborder="0"
        ></iframe>
      </Modal>
    </div>
  );
}
