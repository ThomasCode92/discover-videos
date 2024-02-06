import { useState } from 'react';
import Image from 'next/image';

import styles from './Card.module.css';

export default function Card({
  imageUrl = '/static/clifford.jpg',
  size = 'medium',
}) {
  const [imgSrc, setImgSrc] = useState(imageUrl);

  const handleImgError = error => {
    console.error('Image failed to load:', error);
    console.log('Fallback to default image');
    setImgSrc('/static/clifford.jpg');
  };

  return (
    <div className={styles.container}>
      Card
      <div className={styles[`${size}-card-image`]}>
        <Image
          src={imgSrc}
          className={styles['card-image']}
          alt="image"
          fill={true}
          onError={handleImgError}
        />
      </div>
    </div>
  );
}
