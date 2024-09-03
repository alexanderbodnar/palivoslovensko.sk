// src/components/LineChart.js

// import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
// import { getDataWithParams } from "../../API/monthlyData";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function PriceDevelopmentGraph({ data }) {
  // const [graphData, setGraphData] = useState(null);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (data) {
  //       // Transform data into chart.js format
  //       const labels = Object.keys(data.dimension.sp0207ts_tyz.category.label);
  //       const dataset = Object.values(
  //         data.dimension.sp0207ts_ukaz.category.label
  //       );
  //       const values = data.value.map((v) => (v !== null ? v : 0)); // Handle null values

  //       setGraphData({
  //         labels: labels,
  //         datasets: .map((fuelType, index) => ({
  //           label: fuelType,
  //           data: values[index], // Assuming each value is for a different fuel type
  //           borderColor: `rgba(${index * 50}, ${index * 100}, 200, 1)`,
  //           backgroundColor: `rgba(${index * 50}, ${index * 100}, 200, 0.2)`,
  //           fill: true,
  //         })),
  //       });
  //     }
  //   };

  //   fetchData();
  // }, [data]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            return `Value: ${tooltipItem.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Week",
        },
      },
      y: {
        title: {
          display: true,
          text: "Value",
        },
        beginAtZero: true,
      },
    },
  };
  return (
    <div>hi</div>
    /*
    <div className="chart-container">
      <h2>Fuel Prices Over Time</h2>
      {data ? <Line data={data} options={options} /> : <p>Loading data...</p>}
    </div>
    */
  );
}
