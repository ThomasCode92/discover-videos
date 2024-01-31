import { useRouter } from 'next/router';
import Link from 'next/link';

import styles from './Navbar.module.css';

export default function Navbar({ username }) {
  const router = useRouter();

  const handleNavigate = route => {
    router.push(route);
  };

  const routes = [
    { label: 'Home', path: '/' },
    { label: 'My List', path: '/browse/my-list' },
  ];

  return (
    <nav className={styles.container}>
      <a className={styles['logo-link']}>
        <div className={styles.logo}>Netflix</div>
      </a>

      <ul className={styles['nav-items']}>
        {routes.map(({ label, path }) => (
          <li
            key={label}
            className={styles['nav-item']}
            onClick={handleNavigate.bind(this, path)}
          >
            {label}
          </li>
        ))}
      </ul>

      <div className={styles['username-wrapper']}>
        <button className={styles['username-btn']}>{username}</button>
        <div className={styles['username-dropdown']}>
          <Link className={styles['signout-link']} href="/login">
            Sign Out
          </Link>
        </div>
      </div>
    </nav>
  );
}
