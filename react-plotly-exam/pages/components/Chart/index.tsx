import dynamic from 'next/dynamic';

export interface GraphChartProps {
  title: string;
  x: number[];
  y: number[];
  width?: number;
  height?: number;
}

export const BarChart = dynamic(() => import('./BarChart'), { ssr: false });
export const LineChart = dynamic(() => import('./LineChart'), { ssr: false });
