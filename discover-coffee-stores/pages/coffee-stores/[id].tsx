import Link from 'next/link';
import { useRouter } from 'next/router';

import coffeeStoresData from '@/data/coffee-stores.json';
import { GetStaticPaths, GetStaticProps } from 'next';
import { CoffeeStore } from '@/types/coffee-store';

/**
 * fallback값이 false인 경우, route가 getStaticPaths에 존재하지 않는다면 404페이지로 갑니다.
 */
export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [{ params: { id: '0' } }, { params: { id: '1' } }],
    fallback: false,
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
