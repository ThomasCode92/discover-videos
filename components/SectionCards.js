import Card from './Card';

import styles from './SectionCards.module.css';

export default function SectionCards({ title, size, videos }) {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles['card-wrapper']}>
        {videos.map((video, idx) => (
          <Card key={idx} id={idx} imageUrl={video.imageUrl} size={size} />
        ))}
      </div>
    </section>
  );
}
