import Image from 'next/image';

import styles from './Card.module.css';

export default function Card({ imageUrl, size }) {
  return (
    <div className={styles.container}>
      Card
      <div className={styles[`${size}-card-image`]}>
        <Image
          src={imageUrl}
          className={styles['card-image']}
          alt="image"
          fill={true}
        />
      </div>
    </div>
  );
}
