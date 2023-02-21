import { useRouter } from 'next/router';

const Video = () => {
  const router = useRouter();
  const { videoId } = router.query;

  return <h1>{videoId}</h1>;
};

export default Video;
