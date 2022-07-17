import Head from 'next/head';
import Image from 'next/image';

import Card from '@/components/card';
import Banner from '@/components/banner';

import coffeeStores from '@/data/coffee-stores.json';

import styles from '../styles/Home.module.css';

export default function Home() {
  const handleOnBannerBtnClick = () => {};

  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Connoisseur</title>
        <meta name="description" content="Discover your local coffee shop!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Banner buttonText="View stores nearby" handleOnClick={handleOnBannerBtnClick} />
        <div className={styles.heroImage}>
          <Image src={'/static/hero-image.png'} width={700} height={400} alt={'hero'} />
        </div>
        <div className={styles.cardLayout}>
          {coffeeStores.map((coffeeStore) => (
            <Card
              key={coffeeStore.id}
              className={styles.card}
              name={coffeeStore.name}
              imgUrl={coffeeStore.imgUrl}
              href={`/coffee-stores/${coffeeStore.id}`}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
