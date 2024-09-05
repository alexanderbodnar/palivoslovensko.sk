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
import { useContext } from "react";
import { useStatisticsSectionContext } from "../../Context/StatisticsSectionContext";
import { fillWeeksArray } from "./helperFunctions";
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

export default function PriceDevelopmentGraph() {
  const { data, loading } = useStatisticsSectionContext();
  if (loading) return <h1>vytrimgeno</h1>;
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
  const headers = Object.values(data.dimension.sp0207ts_ukaz.category.label);
  const x = fillWeeksArray(data, headers.length);
  const graphData = {
    labels: headers, // Extract week names for the labels

    datasets: headers.map((fuel, index) => ({
      label: fuel,
      data: x.map((el) => el.fuelPrice[index]), // Extract fuel prices for this fuel type
      borderColor: `rgba(${index * 50}, ${index * 100}, 200, 1)`,
      backgroundColor: `rgba(${index * 50}, ${index * 100}, 200, 0.2)`,
      fill: true,
    })),
  };

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
  console.log(graphData);
  return (
    <>
      <div>hi</div>
      <div className="chart-container">
        <h2>Fuel Prices Over Time</h2>
        {data ? (
          <Line data={graphData} options={options} />
        ) : (
          <p>Loading data...</p>
        )}
      </div>
    </>
  );
}
