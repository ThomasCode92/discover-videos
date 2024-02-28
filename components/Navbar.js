import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import styles from './Navbar.module.css';

import { magic } from '@/lib/magic';

import netflixLogo from '../public/static/netflix.svg';
import expandMoreIcon from '../public/static/expand_more.svg';

export default function Navbar() {
  const [username, setUsername] = useState(undefined);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    async function getUsername() {
      try {
        const { email } = await magic.user.getMetadata();
        if (email) setUsername(email);
      } catch (error) {
        console.log('Error retrieving email:', error);
      }
    }

    getUsername();
  }, []);

  const handleShowDropdown = () => {
    setIsDropdownOpen(prevState => !prevState);
  };

  const routes = [
    { label: 'Home', path: '/' },
    { label: 'My List', path: '/browse/my-list' },
  ];

  return (
    <nav className={styles.container}>
      <a className={styles['logo-link']}>
        <Image src={netflixLogo} alt="Netflix logo" className={styles.logo} />
      </a>

      <ul className={styles['nav-items']}>
        {routes.map(({ label, path }) => (
          <li key={label} className={styles['nav-item']}>
            <Link href={path}>{label}</Link>
          </li>
        ))}
      </ul>

      <div className={styles['username-wrapper']}>
        <button className={styles['username-btn']} onClick={handleShowDropdown}>
          {username}
          <Image
            src={expandMoreIcon}
            alt="Expand dropdown"
            style={{ color: 'white' }}
          />
        </button>
        {isDropdownOpen && (
          <div className={styles['username-dropdown']}>
            <Link className={styles['signout-link']} href="/login">
              Sign Out
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
