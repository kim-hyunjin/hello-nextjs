import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Banner from '../components/banner/Banner';
import SectionCards from '../components/card/SectionCards';
import NavBar from '../components/nav/Navbar';
import styles from '../styles/Home.module.css';
import { getPlaylists, getVideos } from '../lib/videos';
import { VideoType } from '../types/video';

type IndexPageServerData = {
  recentVideos: VideoType[];
  popularVideos: VideoType[];
  playlist: VideoType[];
};
export const getStaticProps: GetStaticProps<IndexPageServerData> = async () => {
  const [recentVideos, popularVideos, playlist] = await Promise.all([
    getVideos({ order: 'date' }),
    getVideos({ order: 'viewCount' }),
    getPlaylists(),
  ]);

  return {
    props: { recentVideos, popularVideos, playlist },
    revalidate: 60 * 60, // 1hour
  };
};

const Home: NextPage<IndexPageServerData> = ({ recentVideos, popularVideos, playlist }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Chimflix</title>
        <meta name='description' content='침플릭스 chimflix - 침착맨을 위한 넷플릭스' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className={styles.main}>
        <NavBar />
        <Banner
          videoId={recentVideos[0].id}
          title={recentVideos[0].title}
          imgUrl={recentVideos[0].imgUrl}
        />
        <div className={styles.sectionWrapper}>
          <SectionCards title='최신 컨텐츠' videos={recentVideos} size={'large'} />
          <SectionCards title='인기 컨텐츠' videos={popularVideos} size={'medium'} />
          <SectionCards title='플레이리스트' videos={playlist} size={'medium'} />
        </div>
      </div>
    </div>
  );
};

export default Home;
