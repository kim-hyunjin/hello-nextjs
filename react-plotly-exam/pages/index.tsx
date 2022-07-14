import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { BarChart, LineChart } from './components/Chart';
const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Plotly.js exam</title>
        <meta name='description' content='make charts using react-plotly.js library' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <ul>
        <li>
          <BarChart title={'Bar'} x={[1, 2, 3]} y={[2, 5, 3]} />
        </li>
        <li>
          <LineChart title={'Line'} x={[1, 2, 3]} y={[2, 5, 3]} />
        </li>
      </ul>
    </div>
  );
};

export default Home;
