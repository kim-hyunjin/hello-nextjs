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
        <Card imgUrl='/static/clifford.webp' size='large' />
        <Card imgUrl='/static/clifford.webp' size='large' />
        <Card imgUrl='/static/clifford.webp' size='large' />
        <Card imgUrl='/static/clifford.webp' size='large' />
        <Card imgUrl='/static/clifford.webp' size='large' />
        <Card imgUrl='/static/clifford.webp' size='large' />
      </div>
    </section>
  );
};

export default SectionCards;
