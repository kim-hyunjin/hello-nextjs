import Head from 'next/head';
import Logo from '@/components/nav/Logo';

import styles from '@/styles/Login.module.css';
import { ChangeEventHandler, MouseEventHandler, useCallback, useState } from 'react';
import { emailValidator } from '@/lib/validator';
import { useRouter } from 'next/router';

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [userMsg, setUserMsg] = useState<string>('');
  const router = useRouter();

  const handleOnChangeEmail: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    setEmail(e.target.value);
  }, []);

  const handleLoginWithEmail: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();

    const [isValid, errMsg] = emailValidator.validate(email);

    if (isValid) {
      setUserMsg('');
      router.push('/');
    } else {
      setUserMsg(errMsg);
    }
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
          <input
            className={styles.emailInput}
            type='text'
            placeholder='email address'
            onChange={handleOnChangeEmail}
          />
          <p className={styles.userMsg}>{userMsg}</p>
          <button className={styles.loginBtn} onClick={handleLoginWithEmail}>
            Sign In
          </button>
        </div>
      </main>
    </div>
  );
};

export default Login;
