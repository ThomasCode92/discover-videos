import cls from 'classnames';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

import styles from './Card.module.css';

const DEFAULT_IMAGE_URL =
  'https://images.unsplash.com/photo-1485846234645-a62644f84728?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1340&q=80';

export default function Card({
  id,
  imageUrl = DEFAULT_IMAGE_URL,
  size = 'medium',
  shouldScale = true,
}) {
  const [imgSrc, setImgSrc] = useState(imageUrl);

  const handleImgError = error => {
    console.error('Image failed to load:', error);
    console.log('Fallback to default image');
    setImgSrc(DEFAULT_IMAGE_URL);
  };

  const scaleFactor = size === 'large' ? 1.05 : 1.1;
  const whileHoverStyle =
    id === 0 ? { scaleY: scaleFactor } : { scale: scaleFactor };

  return (
    <div className={styles.container}>
      <motion.div
        className={cls(styles[`${size}-card-image`], styles['motion-wrapper'])}
        whileHover={shouldScale && whileHoverStyle}
      >
        <Image
          src={imgSrc}
          className={styles['card-image']}
          alt="image"
          sizes="100%"
          fill
          onError={handleImgError}
        />
      </motion.div>
    </div>
  );
}
