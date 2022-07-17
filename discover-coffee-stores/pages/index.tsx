import Head from 'next/head';
import Image from 'next/image';

import Card from '@/components/card';
import Banner from '@/components/banner';

import coffeeStoresData from '@/data/coffee-stores.json';
import { CoffeeStore } from '@/types/coffee-store';

import styles from '../styles/Home.module.css';
import { GetStaticPropsContext } from 'next';

interface Props {
  coffeeStores: CoffeeStore[];
}

export async function getStaticProps(context: GetStaticPropsContext) {
  // fetching data
  return {
    props: {
      coffeeStores: coffeeStoresData,
    },
  };
}

export default function Home(props: Props) {
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
        {props.coffeeStores.length > 0 && (
          <>
            <h2 className={styles.heading2}>Seoul stores</h2>
            <div className={styles.cardLayout}>
              {props.coffeeStores.map((coffeeStore) => (
                <Card
                  key={coffeeStore.id}
                  className={styles.card}
                  name={coffeeStore.name}
                  imgUrl={coffeeStore.imgUrl}
                  href={`/coffee-stores/${coffeeStore.id}`}
                />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
