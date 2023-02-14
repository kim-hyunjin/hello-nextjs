import Link from 'next/link';

import styles from './Navbar.module.css';

import Image from 'next/image';
import Logo from './Logo';
import { MouseEventHandler, useCallback, useState } from 'react';

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
        <Logo />
        <ul className={styles.navItems}>
          <li className={styles.navItem}>
            <Link href={'/'}>
              <a>Home</a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
