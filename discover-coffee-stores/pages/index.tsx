import { useCallback } from 'react';

import { GetStaticPropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';

import Banner from '@/components/banner';
import Card from '@/components/card';

import { useTrackLocation } from '@/hooks/useTrackLocation';

import { fetchCoffeeStores } from '@/lib/coffee-store';

import { CoffeeStore } from '@/types/coffee-store';

import styles from '@/styles/Home.module.css';

interface Props {
  coffeeStores: CoffeeStore[];
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const coffeeStores = await fetchCoffeeStores();

  return {
    props: {
      coffeeStores,
    },
  };
}

export default function Home(props: Props) {
  const {
    isLoading: isFindingLocation,
    location,
    locationErrorMsg,
    handleTrackLocation,
  } = useTrackLocation();

  const handleOnBannerBtnClick = useCallback(() => {
    handleTrackLocation();
  }, [handleTrackLocation]);

  console.log(location, locationErrorMsg);

  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Connoisseur</title>
        <meta name="description" content="Discover your local coffee shop!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Banner
          buttonText={isFindingLocation ? 'Locating...' : 'View stores nearby'}
          onClick={handleOnBannerBtnClick}
        />
        {locationErrorMsg && <p>{locationErrorMsg}</p>}
        <div className={styles.heroImage}>
          <Image
            src={'/static/hero-image.png'}
            width={700}
            height={400}
            alt={'hero'}
          />
        </div>
        {props.coffeeStores.length > 0 && (
          <div className={styles.sectionWrapper}>
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
          </div>
        )}
      </main>
    </div>
  );
}
