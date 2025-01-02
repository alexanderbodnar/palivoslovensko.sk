import { useStatisticsSectionContext } from "../../Context/StatisticsSectionContext";
import { useMemo } from "react";
import IncreaseIcon from "../Icons/IncreaseIcon";
import DecreaseIcon from "../Icons/DecreaseIcon";
import StaleIcon from "../Icons/Stale";
import Spinner from "./Spinner";

function getTwoLatestWeeks(measuresArray) {
  const parsedWeeks = measuresArray
    .filter((measure) => measure.value !== "X")
    .map((measure) => {
      const weekString = measure.week;
      const weekNumber = parseInt(weekString.split(".")[0], 10);
      return {
        ...measure,
        weekNumber: weekNumber,
      };
    });

  const sortedWeeks = parsedWeeks.sort((a, b) => b.weekNumber - a.weekNumber);
  const latestWeek = sortedWeeks[0] || { value: 0, week: "N/A" };
  const previousWeek = sortedWeeks[1] || { value: 0, week: "N/A" };

  return { latestWeek, previousWeek };
}

function getColorsBasedOnStatus(latestWeek, previousWeek) {
  let bgColorClass = "border-2  border-solid border-blue-700",
    textColorClass = "text-blue-800";
  if (latestWeek.value - previousWeek.value > 0) {
    bgColorClass = "border-2 border-solid border-red-700";
    textColorClass = "text-rose-800";
  }
  if (latestWeek.value - previousWeek.value < 0) {
    bgColorClass = "border-2 border-solid border-green-700";
    textColorClass = "text-green-800";
  }
  return [bgColorClass, textColorClass];
}

export default function CurrentWeek() {
  const { data, loading, year } = useStatisticsSectionContext();
  const dateObj = useMemo(() => new Date(), []);
  if (loading) return <Spinner></Spinner>;
  const formattedDate = `${data[0]?.measuresArray[
    data[0]?.measuresArray?.length - 1
  ]?.week
    .split("(")
    .at(1)
    .slice(0, -1)
    .replaceAll(" ", "")}`;

  const getIcon = (diff) => {
    if (diff > 0) return <IncreaseIcon />;
    if (diff < 0) return <DecreaseIcon />;
    return <StaleIcon />;
  };
  const getSign = (diff) => {
    if (diff > 0) return "+";
    //if (diff < 0) return "-";
    return "";
  };

  return JSON.parse(year) !== dateObj.getFullYear() ? (
    <></>
  ) : (
    <div className="flex flex-row overflow-auto snap-x">
      {data?.map((fuel) => {
        const { latestWeek, previousWeek } = getTwoLatestWeeks(
          fuel.measuresArray
        );
        const diff = latestWeek.value - previousWeek.value;

        const priceDifference = diff.toFixed(2);
        const percentageChange = (
          (latestWeek.value / previousWeek.value - 1) *
          100
        ).toFixed(2);

        const [bgColorClass, textColorClass] = getColorsBasedOnStatus(
          latestWeek,
          previousWeek
        );

        return (
          <div
            key={fuel.name}
            className={`grid ${bgColorClass} px-2 m-2 rounded max-w-[10%] min-w-min snap-center`}
          >
            <div
              className="text-black font-bold text-sm"
              key={`date--${fuel.name}`}
            >
              {formattedDate}
            </div>
            <span className="font-bold text-md">{fuel.name.split("(")[0]}</span>

            <span className="font-bold text-xl">{latestWeek.value}€</span>

            <span
              className={`inline-block ${textColorClass} whitespace-nowrap`}
            >
              {`${getSign(diff)}${priceDifference}€ (${percentageChange}%)`}
              {getIcon(diff)}
            </span>
          </div>
        );
      })}
    </div>
  );
}
