import { useState } from 'react';
import Image from 'next/image';

import styles from './Card.module.css';

const DEFAULT_IMAGE_URL =
  'https://images.unsplash.com/photo-1485846234645-a62644f84728?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1340&q=80';

export default function Card({
  imageUrl = DEFAULT_IMAGE_URL,
  size = 'medium',
}) {
  const [imgSrc, setImgSrc] = useState(imageUrl);

  const handleImgError = error => {
    console.error('Image failed to load:', error);
    console.log('Fallback to default image');
    setImgSrc(DEFAULT_IMAGE_URL);
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
