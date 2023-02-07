import styles from './Banner.module.css';

import Image from 'next/image';

const Banner = (props: { title: string; imgUrl: string }) => {
  const { title, imgUrl } = props;

  const handleOnPlay = () => {
    console.log('handleOnPlay');
  };
  return (
    <div className={styles.container}>
      <div className={styles.leftWrapper}>
        <div className={styles.left}>
          <h3 className={styles.title}>{title}</h3>

          <div className={styles.playBtnWrapper}>
            <button className={styles.btnWithIcon} onClick={handleOnPlay}>
              <Image src='/static/play_arrow.svg' alt='Play icon' width='32px' height='32px' />
              <span className={styles.playText}>Play</span>
            </button>
          </div>
        </div>
      </div>
      <div
        className={styles.bannerImg}
        style={{
          backgroundImage: `url(${imgUrl}`,
        }}
      ></div>
    </div>
  );
};

export default Banner;
