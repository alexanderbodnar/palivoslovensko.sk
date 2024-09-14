import { t } from "i18next";
import React from "react";
import { useStatisticsSectionContext } from "../../Context/StatisticsSectionContext";
import Spinner from "../Common/Spinner";

// Helper function to format the week caption
const formatWeekCaption = (weekName) => {
  const week = weekName.split("(");
  return (
    <div className="whitespace-nowrap text-left flex flex-col" key={weekName}>
      <span className="font-semibold">{week.at(0)}</span>
      <span className="text-gray-500 text-sm font-light">
        {week.at(1).replace(")", "").replaceAll(" ", "")}
      </span>
    </div>
  );
};

export default function YearlyPricingTable() {
  const { data, loading } = useStatisticsSectionContext();

  if (loading) return <Spinner></Spinner>;

  const tableHeaders = data.map((fuel) => (
    <th
      scope="col"
      className="px-6 py-3  bg-white z-10 border-b"
      key={fuel.name}
    >
      {fuel.name}
    </th>
  ));

  const measuresArray = data.map((fuel) =>
    fuel.measuresArray.map((measure) => measure.value)
  );

  let weekMeasuresArray = [];
  for (let week = 0; week < data.length; week++) {
    const weekArray = [];
    for (
      let fuelType = 0;
      fuelType < data[0].measuresArray.length;
      fuelType++
    ) {
      weekArray.push(measuresArray[week][fuelType]);
    }
    weekMeasuresArray.push(weekArray);
  }

  weekMeasuresArray = weekMeasuresArray[0].map((_, colIndex) =>
    weekMeasuresArray.map((row) => row[colIndex])
  );

  const tableRows = weekMeasuresArray.map((week, index1) => {
    const weekName = data[0].measuresArray[index1].week;
    return (
      <tr key={weekName} className="even:bg-gray-100">
        <th scope="row" className="px-4 py-2 text-left border-r">
          {formatWeekCaption(weekName)}
        </th>
        {week.map((price, index2) => (
          <td key={`${index1}-${index2}`} className="px-4 py-2 border">
            {price || "-"}
          </td>
        ))}
      </tr>
    );
  });

  return (
    <div className="flex flex-col overflow-auto max-h-full">
      <div className="overflow-y-auto">
        <div className="inline-block min-w-full py-2">
          <div className="overflow-hidden">
            <table className="min-w-full table-fixed border-collapse">
              <thead className="bg-gray-200 text-gray-700">
                <tr className="sticky top-0">
                  <th
                    scope="col"
                    className="px-6 py-3 sticky top-0 bg-gray-200 z-10 border-b"
                  >
                    {t("common.week")}
                  </th>
                  {tableHeaders}
                </tr>
              </thead>
              <tbody>{tableRows}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
