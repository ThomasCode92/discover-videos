import styles from './Navbar.module.css';

export default function Navbar({ username }) {
  return (
    <nav className={styles.container}>
      <a className={styles['logo-link']}>
        <div className={styles.logo}>Netflix</div>
      </a>

      <ul className={styles['nav-items']}>
        <li className={styles['nav-item']}>Home</li>
        <li className={styles['nav-item']}>My List</li>
      </ul>

      <div className={styles['username-wrapper']}>
        <button className={styles['username-btn']}>{username}</button>
        <div className={styles['username-dropdown']}>
          <a className={styles['username-link']}>Sign Out</a>
        </div>
      </div>
    </nav>
  );
}
