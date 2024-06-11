import clsx from 'classnames';
import Link from 'next/link';

import Card from './Card';

import styles from './SectionCards.module.css';

export default function SectionCards({
  title,
  size,
  videos,
  className,
  shouldWrap = false,
  shouldScale = true,
}) {
  if (!videos) return null;

  return (
    <section className={clsx(styles.container, className)}>
      <h2 className={styles.title}>{title}</h2>
      <div className={clsx(styles['card-wrapper'], shouldWrap && styles.wrap)}>
        {videos.map((video, idx) => (
          <Link href={`/videos/${video.id}`} key={idx}>
            <Card
              id={idx}
              imageUrl={video.imageUrl}
              size={size}
              shouldScale={shouldScale}
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
