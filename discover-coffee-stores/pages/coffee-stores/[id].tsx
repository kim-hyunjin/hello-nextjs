import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Image from 'next/image';

import cls from 'classnames';

import coffeeStoresData from '@/data/coffee-stores.json';
import { CoffeeStore } from '@/types/coffee-store';

import styles from '@/styles/coffee-store.module.css';

/**
 * https://nextjs.org/docs/api-reference/data-fetching/get-static-paths
 * getStaticPaths가 return 하는 paths는 getStaticProps에 의해 build time에 HTML을 만듭니다.
 * fallback값이 false인 경우, route가 getStaticPaths에 존재하지 않는다면 build time에 만들어둔 HTML이 없기 때문에 404페이지로 갑니다.
 * true인 경우, 404페이지가 아닌 fallback version의 페이지를 렌더링하고, 그 동안 getStaticProps를 통해 현재 경로에 해당하는 HTML을 만들어 렌더링합니다. (이후로는 만들어놓은 HTML을 그대로 serve)
 */
export const getStaticPaths: GetStaticPaths = () => {
  const paths = coffeeStoresData.map((coffeeStore) => ({
    params: {
      id: coffeeStore.id.toString(),
    },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = (context) => {
  const params = context.params;

  return {
    props: {
      coffeeStore: coffeeStoresData.find((coffeeStore) => coffeeStore.id.toString() === params.id),
    },
  };
};

interface Props {
  coffeeStore: CoffeeStore;
}

const CoffeeStoreDetail = (props: Props) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const { address, name, neighbourhood, imgUrl } = props.coffeeStore;

  const handleUpVoteButton = () => {};

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
              <a>Back to home</a>
            </Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{name}</h1>
          </div>
          <div className={styles.storeImgWrapper}>
            <Image src={imgUrl} width={600} height={360} className={styles.storeImg} alt={name} />
          </div>
        </div>
        <div className={cls(styles.col2, 'glass')}>
          <div className={styles.iconWrapper}>
            <Image src={'/static/icons/places.svg'} width={24} height={24} alt={'place icon'} />
            <p className={styles.text}>{address}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image src={'/static/icons/nearMe.svg'} width={24} height={24} alt={'near me icon'} />
            <p className={styles.text}>{neighbourhood}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image src={'/static/icons/star.svg'} width={24} height={24} alt={'star icon'} />
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
