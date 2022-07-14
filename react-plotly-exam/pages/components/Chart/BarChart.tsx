import Plot from 'react-plotly.js';
import { GraphChartProps } from '.';

const BarChart = ({ title, width = 320, height = 240, x, y }: GraphChartProps) => {
  return <Plot data={[{ type: 'bar', x, y }]} layout={{ width, height, title }} />;
};

export default BarChart;
