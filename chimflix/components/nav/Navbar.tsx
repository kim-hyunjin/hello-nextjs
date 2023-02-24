import Link from 'next/link';

import styles from './Navbar.module.css';

const NavBar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Link href={'/'}>
          <a className={styles.logoLink}>
            <div className={styles.logoWrapper}>CHIMFLIX</div>
          </a>
        </Link>
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
