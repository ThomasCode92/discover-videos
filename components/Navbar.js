import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import styles from './Navbar.module.css';

import { magic } from '@/lib/magic';

import expandMoreIcon from '../public/static/expand_more.svg';
import netflixLogo from '../public/static/netflix.svg';

export default function Navbar() {
  const [username, setUsername] = useState(undefined);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    async function getUsername() {
      try {
        const { email } = await magic.user.getMetadata();
        const didToken = await magic.user.getIdToken();

        console.log('didToken', didToken);

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

  const handleSignOut = async event => {
    event.preventDefault();

    try {
      await magic.user.logout();
    } catch (error) {
      console.error('Error logging out', error);
    }
    router.push('/login');
  };

  const routes = [
    { label: 'Home', path: '/' },
    { label: 'My List', path: '/browse/my-list' },
  ];

  return (
    <nav className={styles.container}>
      <a className={styles['logo-link']}>
        <Image src={netflixLogo} alt="Netflix logo" width="8rem" />
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
            <div className={styles['signout-link']} onClick={handleSignOut}>
              Sign Out
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
