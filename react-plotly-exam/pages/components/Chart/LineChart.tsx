import Plot from 'react-plotly.js';
import { GraphChartProps } from '.';

const LineChart = ({ title, x, y, width = 320, height = 240 }: GraphChartProps) => {
  return <Plot data={[{ type: 'scatter', x, y }]} layout={{ title, width, height }} />;
};

export default LineChart;
