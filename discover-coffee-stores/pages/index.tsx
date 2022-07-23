import Head from 'next/head';
import Image from 'next/image';

import Card from '@/components/card';
import Banner from '@/components/banner';

import { CoffeeStore } from '@/types/coffee-store';

import styles from '../styles/Home.module.css';
import { GetStaticPropsContext } from 'next';

interface Props {
  coffeeStores: CoffeeStore[];
}

export async function getStaticProps(context: GetStaticPropsContext) {
  // fetching data
  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: process.env.FOURSQUARE_API_KEY,
    },
  };

  const response = await fetch(
    'https://api.foursquare.com/v3/places/search?query=%EC%BB%A4%ED%94%BC&ll=37.5087%2C127.0632&limit=6',
    options
  );
  const data = await response.json();

  let coffeeStores: CoffeeStore[] = [];
  if (data.results) {
    coffeeStores = data.results.map((d: any) => ({
      id: d.fsq_id,
      name: d.name,
      imgUrl:
        'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80',
      websiteUrl: 'https://www.strangelovecoffee.ca/',
      address: d.location.formatted_address,
      neighbourhood: 'at King and Spadina',
    }));
  }

  return {
    props: {
      coffeeStores,
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
