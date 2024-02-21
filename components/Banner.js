import Image from 'next/image';
import styles from './Banner.module.css';

export default function Banner({ title, subTitle, imgUrl }) {
  const handlePlayVideo = () => {
    console.log('Play video');
  };

  return (
    <div className={styles.container}>
      <div className={styles['banner-info']}>
        <p className={styles['brand-series']}>Nseries</p>

        <h3 className={styles.title}>{title}</h3>
        <h3 className={styles.subtitle}>{subTitle}</h3>

        <button className={styles['play-btn']} onClick={handlePlayVideo}>
          <Image
            src="/static/play_arrow.svg"
            alt="profile picture"
            width={32}
            height={32}
          />
          <span className={styles['play-btn-text']}>Play</span>
        </button>
      </div>
      <div
        className={styles['banner-img']}
        style={{ backgroundImage: `url(${imgUrl})` }}
      />
    </div>
  );
}
