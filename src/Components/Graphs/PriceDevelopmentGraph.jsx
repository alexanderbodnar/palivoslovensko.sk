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
import { useTranslation } from "react-i18next";
import Spinner from "../Common/Spinner";

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
  const { t } = useTranslation();
  if (loading) return <Spinner />;

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
          text: t("common.week"),
        },
      },
      y: {
        title: {
          display: true,
          text: t("common.value"),
        },
        beginAtZero: true,
      },
    },
  };
  return (
    <div className="chart-container max-h-full max-w-full min-h-full min-w-full">
      <Line data={graphData} options={options} />
    </div>
  );
}
