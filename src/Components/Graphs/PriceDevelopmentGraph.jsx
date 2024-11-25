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

export default function PriceDevelopmentGraph() {
  const { data, loading } = useStatisticsSectionContext();
  const { t } = useTranslation();
  if (loading) return <Spinner />;

  const graphData = {
    labels: data[0]?.measuresArray?.map((el) => el.week),
    datasets: data?.map((fuel, index) => ({
      label: fuel.name,
      data: fuel.measuresArray?.map((el) => el.value),
      borderColor: colors[index].borderColor,
      backgroundColor: colors[index].backgroundColor,
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
    maintainAspectRatio: false
  };
  return (
    <div className="chart-container max-h-full max-w-full min-h-full min-w-full">
      <Line data={graphData} options={options} />
    </div>
  );
}
