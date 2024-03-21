import Link from 'next/link';
import Card from './Card';

import styles from './SectionCards.module.css';

export default function SectionCards({ title, size, videos }) {
  if (!videos) return null;

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles['card-wrapper']}>
        {videos.map((video, idx) => (
          <Link href={`/videos/${video.id}`} key={idx}>
            <Card id={idx} imageUrl={video.imageUrl} size={size} />
          </Link>
        ))}
      </div>
    </section>
  );
}
