import useHorizontalScrolling from '@/hooks/useHorizontalScrolling';
import Link from 'next/link';
import { YoutubeSnippet } from '../../types/youtube';
import Card from './Card';

import styles from './SectionCards.module.css';

interface SectionCardsProps {
  title: string;
  videos: YoutubeSnippet[];
  type: 'video' | 'playilst';
  size?: 'large' | 'medium' | 'small';
}
const SectionCards = (props: SectionCardsProps) => {
  const { title, videos = [], size } = props;

  const { scrollRef, onWheel, scrollStyle } = useHorizontalScrolling();
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div ref={scrollRef} className={styles.cardWrapper} onWheel={onWheel} style={scrollStyle}>
        {videos.map((video, i) => (
          <Link key={video.id} href={`/video/${video.id}`}>
            <a>
              <Card imgUrl={video.imgUrl} size={size} elemIndex={i} />
            </a>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default SectionCards;
