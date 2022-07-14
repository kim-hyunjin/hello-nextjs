import Plot from 'react-plotly.js';

interface Props {
  title: string;
  x: number[];
  y: number[];
  width?: number;
  height?: number;
}

const BarChart = ({ title, width = 320, height = 240, x, y }: Props) => {
  return <Plot data={[{ type: 'bar', x, y }]} layout={{ width, height, title }} />;
};

export default BarChart;
