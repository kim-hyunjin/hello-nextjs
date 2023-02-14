import Head from 'next/head';
import Logo from '@/components/nav/Logo';

import styles from '@/styles/Login.module.css';
import { MouseEventHandler } from 'react';

const Login = () => {
  const handleLoginWithEmail: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Chimflix Signin</title>
      </Head>
      <header className={styles.header}>
        <div className={styles.headerWrapper}>
          <Logo />
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.mainWrapper}>
          <h1 className={styles.signinHeader}>Sign In</h1>
          <input className={styles.emailInput} type='text' placeholder='email address' />
          <p className={styles.userMsg}></p>
          <button className={styles.loginBtn} onClick={handleLoginWithEmail}>
            Sign In
          </button>
        </div>
      </main>
    </div>
  );
};

export default Login;
