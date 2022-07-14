import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { BarChart, LineChart, PieChart } from './components/Chart';
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
          <BarChart
            layout={{ title: 'Bar' }}
            data={[{ x: [1, 2, 3], y: [2, 5, 3], type: 'bar' }]}
          />
        </li>
        <li>
          <LineChart layout={{ title: 'Line' }} data={[{ x: [1, 2, 3], y: [2, 5, 3] }]} />
        </li>
        <li>
          <PieChart
            layout={{ title: 'Pie', grid: { rows: 1, columns: 2 } }}
            data={[
              {
                type: 'pie',
                labels: ['a', 'b', 'c', 'd'],
                values: [2, 3, 4, 4],
                textinfo: 'label+percent',
                domain: { column: 0 },
              },
              {
                type: 'pie',
                labels: ['a', 'b', 'c', 'd'],
                values: [9, 4, 3, 1],
                textinfo: 'label+percent',
                domain: { column: 1 },
              },
            ]}
          />
        </li>
      </ul>
    </div>
  );
};

export default Home;
