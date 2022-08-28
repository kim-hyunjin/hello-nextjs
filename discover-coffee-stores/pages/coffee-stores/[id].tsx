import { useContext, useEffect, useState } from 'react';

import cls from 'classnames';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import { fetchCoffeeStores } from 'lib/coffee-store';

import styles from '@/styles/coffee-store.module.css';
import { CoffeeStore } from '@/types/coffee-store';

import { simpleFetcher } from '@/utils/fetcher';

import { StoreContext } from '@/context';

/**
 * https://nextjs.org/docs/api-reference/data-fetching/get-static-paths
 * getStaticPaths가 return 하는 paths는 getStaticProps에 의해 build time에 HTML을 만듭니다.
 * fallback값이 false인 경우, route가 getStaticPaths에 존재하지 않는다면 build time에 만들어둔 HTML이 없기 때문에 404페이지로 갑니다.
 * true인 경우, 404페이지가 아닌 fallback version의 페이지를 렌더링하고, 그 동안 getStaticProps를 통해 현재 경로에 해당하는 HTML을 만들어 렌더링합니다. (이후로는 만들어놓은 HTML을 그대로 serve)
 */
export const getStaticPaths: GetStaticPaths = async () => {
  const coffeeStores = await fetchCoffeeStores();
  const paths = coffeeStores.map((coffeeStore) => ({
    params: {
      id: coffeeStore.id.toString(),
    },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const coffeeStores = await fetchCoffeeStores();
  const params = context.params;
  const foundedById = coffeeStores.find(
    (coffeeStore) => coffeeStore.id.toString() === params.id,
  );
  return {
    props: {
      coffeeStore: foundedById ? foundedById : null, // should return can parse to JSON or null
    },
  };
};

interface Props {
  coffeeStore: CoffeeStore | null;
}

const CoffeeStoreDetail = (props: Props) => {
  const router = useRouter();

  const id = router.query.id;

  const [coffeeStore, setCoffeeStore] = useState<CoffeeStore | null>(
    props.coffeeStore,
  );

  const {
    state: { coffeeStores },
  } = useContext(StoreContext);

  useEffect(() => {
    if (props.coffeeStore) {
      saveCoffeeStoreToAirtable(props.coffeeStore);
      return;
    }

    if (coffeeStores.length > 0) {
      const findCoffeeStoreById = coffeeStores.find(
        (cs) => String(cs.id) === String(id),
      );
      setCoffeeStore(findCoffeeStoreById);
      saveCoffeeStoreToAirtable(findCoffeeStoreById);
    }
  }, [id, coffeeStores, props.coffeeStore]);

  const [votingCount, setVotingCount] = useState(0);
  const { data, error } = useSWR(
    `/api/getCoffeeStoreById?id=${id}`,
    simpleFetcher,
  );
  useEffect(() => {
    if (data && data.length > 0) {
      console.log('data from SWR', data);
      setCoffeeStore(data[0]);
      setVotingCount(data[0].voting);
    }
  }, [data]);
  const handleUpVoteButton = async () => {
    try {
      const res = await fetch('/api/upvoteCoffeeStore', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      const coffeeStoreFromAirtable = await res.json();
      if (coffeeStoreFromAirtable && coffeeStoreFromAirtable.length > 0) {
        setVotingCount((prev) => prev + 1);
      }
    } catch (err) {
      console.error('Error upvoting the coffee store', err);
    }
  };

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  if (!coffeeStore) {
    return <div>not found</div>;
  }

  if (error) {
    return <div>Something went wrong retrieving coffee store page</div>;
  }

  const { address, name, neighbourhood, imgUrl } = coffeeStore;

  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
        <meta name="description" content={`${name} coffee store`} />
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href="/">
              <a>← Back to home</a>
            </Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{name}</h1>
          </div>
          <div className={styles.storeImgWrapper}>
            <Image
              src={imgUrl}
              width={600}
              height={360}
              className={styles.storeImg}
              alt={name}
            />
          </div>
        </div>
        <div className={cls(styles.col2, 'glass')}>
          <div className={styles.iconWrapper}>
            <Image
              src={'/static/icons/places.svg'}
              width={24}
              height={24}
              alt={'place icon'}
            />
            <p className={styles.text}>{address}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image
              src={'/static/icons/nearMe.svg'}
              width={24}
              height={24}
              alt={'near me icon'}
            />
            <p className={styles.text}>{neighbourhood}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image
              src={'/static/icons/star.svg'}
              width={24}
              height={24}
              alt={'star icon'}
            />
            <p className={styles.text}>{votingCount}</p>
          </div>
          <button className={styles.upvoteButton} onClick={handleUpVoteButton}>
            Up vote!
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoffeeStoreDetail;

async function saveCoffeeStoreToAirtable(coffeeStore: CoffeeStore) {
  try {
    const { id, name, imgUrl, neighbourhood, address } = coffeeStore;
    const response = await fetch('/api/createCoffeeStore', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        name,
        imgUrl,
        neighbourhood: neighbourhood || '',
        address: address || '',
      }),
    });
    const coffeeStoreInDB = await response.json();
    console.log({ coffeeStoreInDB });
  } catch (err) {
    console.error('Error - creating coffee store', err);
  }
}
