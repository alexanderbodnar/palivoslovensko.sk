import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { useStatisticsSectionContext } from "../../Context/StatisticsSectionContext";
import { useTranslation } from "react-i18next";
import Spinner from "../Common/Spinner";
import { useState, useEffect, useMemo } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const colors = [
  {
    borderColor: "rgba(255, 99, 132, 1)",
    backgroundColor: "rgba(255, 99, 132, 0.2)",
  }, // Red
  {
    borderColor: "rgba(54, 162, 235, 1)",
    backgroundColor: "rgba(54, 162, 235, 0.2)",
  }, // Blue
  {
    borderColor: "rgba(75, 192, 192, 1)",
    backgroundColor: "rgba(75, 192, 192, 0.2)",
  }, // Teal
  {
    borderColor: "rgba(255, 206, 86, 1)",
    backgroundColor: "rgba(255, 206, 86, 0.2)",
  }, // Yellow
  {
    borderColor: "rgba(153, 102, 255, 1)",
    backgroundColor: "rgba(153, 102, 255, 0.2)",
  }, // Purple
  {
    borderColor: "rgba(255, 159, 64, 1)",
    backgroundColor: "rgba(255, 159, 64, 0.2)",
  }, // Orange
  {
    borderColor: "rgba(99, 255, 132, 1)",
    backgroundColor: "rgba(99, 255, 132, 0.2)",
  }, // Light Green
  {
    borderColor: "rgba(201, 203, 207, 1)",
    backgroundColor: "rgba(201, 203, 207, 0.2)",
  }, // Grey
  {
    borderColor: "rgba(255, 105, 180, 1)",
    backgroundColor: "rgba(255, 105, 180, 0.2)",
  }, // Hot Pink
  {
    borderColor: "rgba(255, 165, 0, 1)",
    backgroundColor: "rgba(255, 165, 0, 0.2)",
  }, // Gold
  {
    borderColor: "rgba(0, 255, 127, 1)",
    backgroundColor: "rgba(0, 255, 127, 0.2)",
  }, // Spring Green
];

export default function BarGraph() {
  const { data, loading } = useStatisticsSectionContext();
  const { t } = useTranslation();
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const processDate = (date) => {
    return isSmallScreen ? date.split("(").at(0) : date;
  };

  const graphData = useMemo(() => {
    return {
      labels: data[0]?.measuresArray?.map((el) => processDate(el.week)),
      datasets: data?.map((fuel, index) => ({
        label: fuel.name,
        data: fuel.measuresArray?.map((el) => el.value),
        backgroundColor: colors[index].backgroundColor,
        borderColor: colors[index].borderColor,
        borderWidth: 1,
      })),
    };
  }, [data]);

  if (loading) return <Spinner />;

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            return `${t("common.price")}: ${tooltipItem.raw}€`;
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
          text: t("common.price"),
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="chart-container max-h-full max-w-full min-h-full min-w-full">
      <Bar data={graphData} options={options} />
    </div>
  );
}
