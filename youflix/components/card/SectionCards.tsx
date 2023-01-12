import Video from '../../types/video';
import Card from './Card';

import styles from './SectionCards.module.css';

interface SectionCardsProps {
  title: string;
  videos: Video[];
  size?: 'large' | 'medium' | 'small';
}
const SectionCards = (props: SectionCardsProps) => {
  const { title, videos, size } = props;
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.cardWrapper}>
        {videos.map((video, i) => (
          <Card key={video.id} imgUrl={video.imgUrl} size={size} elemIndex={i} />
        ))}
      </div>
    </section>
  );
};

export default SectionCards;
