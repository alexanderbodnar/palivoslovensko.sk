import { useState } from "react";
import { useStatisticsSectionContext } from "../../Context/StatisticsSectionContext";
import { t } from "i18next";

export default function DateRangeFilter({ onFilter, selectedOptions }) {
  const { apiData, setData, setWeekInterval, weekInterval } =
    useStatisticsSectionContext();
  const [formEndWeek, setFormEndWeek] = useState(weekInterval.end);
  const [formStartWeek, setFormStartWeek] = useState(weekInterval.start);
  const handleFilter = (e) => {
    e.preventDefault();
    if (formStartWeek < 1 || formEndWeek > 53) return;
    const filteredData = apiData
      .filter((fuel) => selectedOptions[fuel.name])
      .map((fuel) => {
        const filteredMeasures = fuel?.measuresArray?.filter((weekObj) => {
          const weekNumber = parseInt(weekObj.week?.split(".")[0], 10);
          return (
            weekNumber &&
            weekNumber >= formStartWeek &&
            weekNumber <= formEndWeek
          );
        });
        return {
          ...fuel,
          measuresArray: filteredMeasures,
        };
      });
    setWeekInterval({ start: formStartWeek, end: formEndWeek });
    setData(filteredData);
  };

  return (
    <div className="flex sm:flex-row items-center justify-center my-4 max-w-full">
      <div id="range-filter-week" className="block text-gray-700 font-bold p-2">
        {t("common.week")}
      </div>
      <div className="flex">
        <input
          id="start-week"
          type="number"
          min="1"
          max="52"
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={formStartWeek}
          onChange={(e) => setFormStartWeek(e.target.value)}
        />
      </div>
      <div className="flex">
        <label htmlFor="end-week" className="block text-sm font-medium p-2">
          {t("filterData.until")}
        </label>
        <input
          id="end-week"
          type="number"
          min="1"
          max="52"
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={formEndWeek}
          onChange={(e) => setFormEndWeek(e.target.value)}
        />
      </div>
      <button
        onClick={handleFilter}
        className="rounded-r-lg bg-[#297A49] text-white p-2 font-bold"
        label="Set displayed weeks"
      >
        {t("common.show")}
      </button>
    </div>
  );
}
