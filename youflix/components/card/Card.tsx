import Image from 'next/image';

import styles from './Card.module.css';

interface CardProps {
  imgUrl: string;
  size: 'large' | 'medium' | 'small';
}

const Card = (props: CardProps) => {
  const { imgUrl, size } = props;
  const classMap = {
    large: styles.lgItem,
    medium: styles.mdItem,
    small: styles.smItem,
  };
  return (
    <div className={styles.container}>
      Card
      <div className={classMap[size]}>
        <Image src={imgUrl} alt='image' layout='fill' className={styles.cardImg} />
      </div>
    </div>
  );
};

export default Card;
