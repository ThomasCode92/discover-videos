import { useRouter } from 'next/router';
import Modal from 'react-modal';

import styles from '@/styles/Video.module.css';

Modal.setAppElement('#__next');

export default function Video() {
  const router = useRouter();

  const { videoId } = router.query;

  return (
    <div>
      Video Page {videoId}
      <Modal
        isOpen={true}
        contentLabel="Watch the video"
        overlayClassName={styles.overlay}
        onRequestClose={() => router.back()}
      >
        <div>Modal Body</div>
      </Modal>
    </div>
  );
}
