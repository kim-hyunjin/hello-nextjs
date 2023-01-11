import Card from './Card';

import styles from './SectionCards.module.css';

interface SectionCardsProps {
  title: string;
}
const SectionCards = (props: SectionCardsProps) => {
  const { title } = props;
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.cardWrapper}>
        <Card imgUrl='/static/clifford.webp' size='large' elemIndex={0} />
        <Card imgUrl='/static/clifford.webp' size='large' elemIndex={1} />
        <Card imgUrl='/static/clifford.webp' size='large' elemIndex={2} />
        <Card imgUrl='/static/clifford.webp' size='large' elemIndex={3} />
        <Card imgUrl='/static/clifford.webp' size='large' elemIndex={4} />
        <Card imgUrl='/static/clifford.webp' size='large' elemIndex={5} />
      </div>
    </section>
  );
};

export default SectionCards;
