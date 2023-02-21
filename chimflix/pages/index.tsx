import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Banner from '../components/banner/Banner';
import SectionCards from '../components/card/SectionCards';
import NavBar from '../components/nav/Navbar';
import styles from '../styles/Home.module.css';
import { getVideos } from '../lib/videos';
import Video from '../types/video';

type IndexPageServerData = {
  videos: Video[];
  playlist: Video[];
};
export const getServerSideProps: GetServerSideProps<IndexPageServerData> = async () => {
  const [videos, playlist] = await Promise.all([getVideos('video'), getVideos('playlist')]);

  return {
    props: { videos, playlist },
  };
};

const Home: NextPage<IndexPageServerData> = ({ videos, playlist }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Chimflix</title>
        <meta name='description' content='침플릭스 chimflix - 침착맨을 위한 넷플릭스' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className={styles.main}>
        <NavBar />
        <Banner title={videos[0].title} imgUrl={videos[0].imgUrl} />
        <div className={styles.sectionWrapper}>
          <SectionCards title='최신 컨텐츠' videos={videos} size={'large'} />
          <SectionCards title='플레이리스트' videos={playlist} size={'medium'} />
        </div>
      </div>
    </div>
  );
};

export default Home;
