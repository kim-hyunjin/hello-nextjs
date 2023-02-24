import { useRouter } from 'next/router';
import { useCallback } from 'react';
import Modal from 'react-modal';
import clsx from 'classnames';

import styles from '@/styles/Video.module.css';

Modal.setAppElement('#__next');

const Video = () => {
  const router = useRouter();
  const { videoId } = router.query;

  const handleClose = useCallback(() => {
    router.back();
  }, [router]);

  const video = {
    title: 'Hi cute dog',
    publishTime: '1990-01-01',
    description:
      'A big red dog that is super cute, can he get any bigger? A big red dog that is super cute, can he get any bigger? A big red dog that is super cute, can he get any bigger? A big red dog that is super cute, can he get any bigger? A big red dog that is super cute, can he get any bigger? A big red dog that is super cute, can he get any bigger? A big red dog that is super cute, can he get any bigger? A big red dog that is super cute, can he get any bigger? A big red dog that is super cute, can he get any bigger? A big red dog that is super cute, can he get any bigger? A big red dog that is super cute, can he get any bigger? A big red dog that is super cute, can he get any bigger? A big red dog that is super cute, can he get any bigger? A big red dog that is super cute, can he get any bigger? A big red dog that is super cute, can he get any bigger?',
    channelTitle: 'Paramount Pictures',
    viewCount: 10000,
  };

  const { title, publishTime, description, channelTitle, viewCount } = video;

  return (
    <div className={styles.container}>
      <Modal
        isOpen={true}
        contentLabel='Watch the video'
        onRequestClose={handleClose}
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <iframe
          id='ytplayer'
          width='100%'
          height='360'
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          frameBorder='0'
          allowFullScreen
        ></iframe>
        <div className={styles.modalBody}>
          <div className={styles.modalBodyContent}>
            <div className={styles.col1}>
              <p className={styles.publishTime}>{publishTime}</p>
              <p className={styles.title}>{title}</p>
              <p className={styles.description}>{description}</p>
            </div>
            <div className={styles.col2}>
              <p className={clsx(styles.subText, styles.subTextWrapper)}>
                <span className={styles.labelText}>Cast: </span>
                <span className={styles.valueText}>{channelTitle}</span>
              </p>
              <p className={clsx(styles.subText, styles.subTextWrapper)}>
                <span className={styles.labelText}>View Count: </span>
                <span className={styles.valueText}>{viewCount}</span>
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Video;
