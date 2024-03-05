import { useRouter } from 'next/router';
import Modal from 'react-modal';

import styles from '@/styles/Video.module.css';

Modal.setAppElement('#__next');

export default function Video() {
  const router = useRouter();

  const { videoId } = router.query;

  return (
    <div className={styles.container}>
      <Modal
        isOpen={true}
        contentLabel="Watch the video"
        className={styles.modal}
        overlayClassName={styles.overlay}
        onRequestClose={() => router.back()}
      >
        <div>Modal Body for video {videoId}</div>
      </Modal>
    </div>
  );
}
