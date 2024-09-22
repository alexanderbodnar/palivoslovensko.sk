import { useStatisticsSectionContext } from "../../Context/StatisticsSectionContext";
import { useMemo } from "react";
import IncreaseIcon from "../Icons/IncreaseIcon";
import DecreaseIcon from "../Icons/DecreaseIcon";
import Spinner from "./Spinner";
// Helper function to get the two latest weeks
function getTwoLatestWeeks(measuresArray) {
  // Extract week numbers from the 'week' property
  const parsedWeeks = measuresArray
    .filter((measure) => measure.value !== "X") // Filter out invalid values
    .map((measure) => {
      const weekString = measure.week;
      const weekNumber = parseInt(weekString.split(".")[0], 10); // Get the week number
      return {
        ...measure,
        weekNumber: weekNumber,
      };
    });

  // Sort based on week number in descending order
  const sortedWeeks = parsedWeeks.sort((a, b) => b.weekNumber - a.weekNumber);

  // Ensure there are at least two weeks before accessing elements
  const latestWeek = sortedWeeks[0] || { value: 0, week: "N/A" };
  const previousWeek = sortedWeeks[1] || { value: 0, week: "N/A" };

  return { latestWeek, previousWeek };
}

// Main component
export default function CurrentWeek() {
  const { data, loading } = useStatisticsSectionContext();
  const dateObj = useMemo(() => new Date(), []); // Memoize the date for consistent renders
  if (loading) return <Spinner></Spinner>;

  const formattedDate = `${dateObj.getDate()}.${
    dateObj.getMonth() + 1
  }.${dateObj.getFullYear()}`;

  return (
    <div className="flex flex-row overflow-auto">
      {data?.map((fuel) => {
        const { latestWeek, previousWeek } = getTwoLatestWeeks(
          fuel.measuresArray
        );

        const priceDifference = (latestWeek.value - previousWeek.value).toFixed(
          2
        );
        const percentageChange = (
          (latestWeek.value / previousWeek.value - 1) *
          100
        ).toFixed(2);
        const hasIncreased = latestWeek.value - previousWeek.value > 0;

        const bgColorClass = hasIncreased ? "bg-red-200" : "bg-green-200";
        const textColorClass = hasIncreased ? "text-red-800" : "text-green-800";

        return (
          <div
            key={fuel.name}
            className={`grid ${bgColorClass} px-2 m-2 rounded`}
          >
            <date className="text-slate-400 font-bold text-sm">
              {formattedDate}
            </date>
            <span className="font-bold text-md">{fuel.name.split("(")[0]}</span>

            <span className="font-bold text-xl">{latestWeek.value}€</span>

            {/* Keep priceDifference and percentageChange in one row */}
            <span
              className={`inline-block ${textColorClass} whitespace-nowrap`}
            >
              {`${
                hasIncreased ? "+" : "-"
              }${priceDifference}€ (${percentageChange}%)`}
              {hasIncreased ? <IncreaseIcon /> : <DecreaseIcon />}
            </span>
          </div>
        );
      })}
    </div>
  );
}
