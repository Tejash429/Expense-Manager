'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { ChartData } from 'chart.js';
import 'chart.js/auto';
import { CategoryTotals } from './sideBar';

const Pie = dynamic(() => import('react-chartjs-2').then((mod) => mod.Pie), {
  ssr: false,
});

const PieChart = ({ categoryTotals }: { categoryTotals: CategoryTotals }) => {
  const [chartData, setChartData] = useState<ChartData<'pie'> | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data: ChartData<'pie'> = {
        labels: Object.keys(categoryTotals),
        datasets: [
          {
            label: 'Expense Distribution',
            data: Object.values(categoryTotals),
            backgroundColor: [
              '#FF6633',
              '#FFB399',
              '#FF33FF',
              '#FFFF99',
              '#00B3E6',
              '#E6B333',
              '#3366E6',
              '#999966',
              '#99FF99',
            ],
            hoverOffset: 4,
          },
        ],
      };
      setChartData(data);
    };

    fetchData();
  }, [categoryTotals]);

  if (!chartData) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ width: '400px', height: '400px' }}>
      <h1>Expense Distribution</h1>
      <Pie data={chartData} />
    </div>
  );
};

export default PieChart;
