import Link from 'next/link';
import { useRouter } from 'next/router';

const CoffeeStoreDetail = () => {
  const router = useRouter();

  return (
    <div>
      {router.query.id}
      <Link href="/">Back to home</Link>
    </div>
  );
};

export default CoffeeStoreDetail;
