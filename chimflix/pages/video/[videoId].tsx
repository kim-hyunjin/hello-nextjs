import { useRouter } from 'next/router';
import { useCallback } from 'react';
import Modal from 'react-modal';

import styles from '@/styles/Video.module.css';

Modal.setAppElement('#__next');

const Video = () => {
  const router = useRouter();
  const { videoId } = router.query;

  const handleClose = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <div className={styles.container}>
      <Modal
        isOpen={true}
        contentLabel='Watch the video'
        onRequestClose={handleClose}
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <div>Modal body</div>
      </Modal>
    </div>
  );
};

export default Video;
