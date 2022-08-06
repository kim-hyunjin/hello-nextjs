import { useContext, useEffect, useState } from 'react';

import cls from 'classnames';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { fetchCoffeeStores } from 'lib/coffee-store';

import styles from '@/styles/coffee-store.module.css';
import { CoffeeStore } from '@/types/coffee-store';

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
    if (!props.coffeeStore && coffeeStores.length > 0) {
      const findCoffeeStoreById = coffeeStores.find(
        (cs) => String(cs.id) === String(id),
      );
      setCoffeeStore(findCoffeeStoreById);
    }
  }, [id, coffeeStores, props.coffeeStore]);

  const handleUpVoteButton = () => {};

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  if (!coffeeStore) {
    return <div>not found</div>;
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
            <p className={styles.text}>{1}</p>
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
