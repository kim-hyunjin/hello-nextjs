import Image from 'next/image';

import cls from 'classnames';
import { motion } from 'framer-motion';

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
      <motion.div
        className={cls(styles.imgMotionWrapper, classMap[size])}
        whileHover={{ scale: 1.2 }}
      >
        <Image src={imgUrl} alt='image' layout='fill' className={styles.cardImg} />
      </motion.div>
    </div>
  );
};

export default Card;
