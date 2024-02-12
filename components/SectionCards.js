import Card from './Card';

import styles from './SectionCards.module.css';

export default function SectionCards({ title }) {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles['card-wrapper']}>
        <Card id={0} imageUrl="/static/clifford.jpg" size="large" />
        <Card imageUrl="/static/clifford.jpg" size="large" />
        <Card imageUrl="/static/clifford.jpg" size="large" />
        <Card imageUrl="/static/clifford.jpg" size="large" />
        <Card imageUrl="/static/clifford.jpg" size="large" />
      </div>
    </section>
  );
}
