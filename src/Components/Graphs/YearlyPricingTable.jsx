import { t } from "i18next";
import React from "react";
import { useStatisticsSectionContext } from "../../Context/StatisticsSectionContext";
import { fillWeeksArray } from "./helperFunctions";

const formatWeekCaption = (weekName) => {
  const week = weekName.split("("); //.join().trimEnd();
  return (
    <th className="whitespace-nowrap text-left flex flex-col" key={weekName}>
      <text className="self-center">{week.at(0)}</text>
      <text className="text-gray-500 text-sm font-light">
        {week.at(1).replace(")", "").replaceAll(" ", "")}
      </text>
    </th>
  );
};

export default function YearlyPricingTable() {
  const { data, loading } = useStatisticsSectionContext();
  if (loading) return <h1>cakaj</h1>;

  let tableHeaders = data.map((fuel) => {
    return (
      <th scope="col" className="px-6 py-4">
        {fuel.name}
      </th>
    );
  });
  let measuresArray = data.map((fuel) =>
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
      <tr>
        <td>{formatWeekCaption(weekName)}</td>
        {week.map((price, index2) => {
          return (
            <td
              key={`${index1}+${index2}`}
              className="px-4 py-2 border border-gray-400"
            >
              {price}
            </td>
          );
        })}
      </tr>
    );
  });

  console.log(data[0].measuresArray[0]);
  return (
    <div className="flex flex-col overflow-auto max-h-full">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    {t("")}
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
