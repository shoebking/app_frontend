// FeedbackChart.js

import React, { useRef, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';

const FeedbackChart = ({ averageRatings }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    // Destroy the existing chart before rendering a new one
    if (chartRef.current) {
      chartRef.current.chartInstance.destroy();
    }
  }, [averageRatings]);

  const data = {
    labels: Object.keys(averageRatings),
    datasets: [
      {
        data: Object.values(averageRatings),
        backgroundColor: ['#007bff', '#28a745', '#ffc107'], // Blue, Green, Yellow
      },
    ],
  };

  return <Doughnut ref={chartRef} data={data} />;
};

export default FeedbackChart;
