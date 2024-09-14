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

import { useStatisticsSectionContext } from "../../Context/StatisticsSectionContext";
import { fillWeeksArray } from "./helperFunctions";

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
  // const headers = Object.values(data.dimension.sp0207ts_ukaz.category.label);
  // const x = fillWeeksArray(data, headers.length);
  //console.log(data; //.map((el) => el.week));

  const graphData = {
    labels: data[0].measuresArray.map((el) => el.week),
    datasets: data.map((fuel, index) => ({
      label: fuel.name,
      data: fuel.measuresArray.map((el) => el.value),
      borderColor: `rgba(${index * 40}, ${index * 80}, 30, 1)`,
      backgroundColor: `rgba(${index * 40}, ${index * 80}, 30, 0.2)`,
      fill: true,
    })),
  };

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
  console.log(data);
  return (
    <div className="chart-container h-full">
      <Line data={graphData} options={options} />
    </div>
  );
}
