import Link from 'next/link';
import { MouseEventHandler, useCallback, useState } from 'react';

import styles from './Navbar.module.css';

import Image from 'next/image';

const NavBar = (props: { username: string }) => {
  const { username } = props;

  const [showDropdown, setShowDropdown] = useState(false);

  const handleShowDropdown: MouseEventHandler<HTMLButtonElement> = useCallback((e) => {
    e.preventDefault();
    setShowDropdown((prev) => !prev);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Link href={'/'}>
          <a className={styles.logoLink}>
            <div className={styles.logoWrapper}>YOUFLIX</div>
          </a>
        </Link>
        <ul className={styles.navItems}>
          <li className={styles.navItem}>
            <Link href={'/'}>
              <a>Home</a>
            </Link>
          </li>
          <li className={styles.navItem2}>
            <Link href={'/browse/my-list'}>
              <a>My List</a>
            </Link>
          </li>
        </ul>
        <nav className={styles.navContainer}>
          <div>
            <button className={styles.usernameBtn} onClick={handleShowDropdown}>
              <p className={styles.username}>{username}</p>
              <Image src='/static/expand_more.svg' alt='Expand more' width='24px' height='24px' />
            </button>

            {showDropdown && (
              <div className={styles.navDropdown}>
                <div>
                  <Link href={'/login'}>
                    <a className={styles.linkName}>Sign out</a>
                  </Link>
                  <div className={styles.lineWrapper}></div>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default NavBar;
