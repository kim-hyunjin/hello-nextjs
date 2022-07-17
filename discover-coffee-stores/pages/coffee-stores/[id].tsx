import Link from 'next/link';
import { useRouter } from 'next/router';

import coffeeStoresData from '@/data/coffee-stores.json';
import { GetStaticPaths, GetStaticProps } from 'next';
import { CoffeeStore } from '@/types/coffee-store';

/**
 * https://nextjs.org/docs/api-reference/data-fetching/get-static-paths
 * getStaticPaths가 return 하는 paths는 getStaticProps에 의해 build time에 HTML을 만듭니다.
 * fallback값이 false인 경우, route가 getStaticPaths에 존재하지 않는다면 build time에 만들어둔 HTML이 없기 때문에 404페이지로 갑니다.
 * true인 경우, 404페이지가 아닌 fallback version의 페이지를 렌더링하고, 그 동안 getStaticProps를 통해 현재 경로에 해당하는 HTML을 만들어 렌더링합니다. (이후로는 만들어놓은 HTML을 그대로 serve)
 */
export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [{ params: { id: '0' } }, { params: { id: '1' } }],
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

  return (
    <div>
      {router.query.id}
      <Link href="/">Back to home</Link>
      <p>{props.coffeeStore.address}</p>
      <p>{props.coffeeStore.name}</p>
    </div>
  );
};

export default CoffeeStoreDetail;
