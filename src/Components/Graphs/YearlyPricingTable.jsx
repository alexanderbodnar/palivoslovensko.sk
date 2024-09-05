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

  let tableHeaders, tableRows;
  const headers = Object.values(data.dimension.sp0207ts_ukaz.category.label);
  const weeksArray = fillWeeksArray(data, headers.length);

  try {
    tableHeaders = headers.map((el) => {
      return (
        <th key={el} className="py-2 px-4 border-b">
          {el}
        </th>
      );
    });
    tableRows = weeksArray?.map((week, index) => {
      return (
        <tr key={week.weekName}>
          {formatWeekCaption(week.weekName)}
          {week?.fuelPrice?.map((price, index2) => {
            return (
              <td
                className="whitespace-nowrap px-2 py-1 text-center"
                key={`${index}+${index2}`}
              >
                {price}
              </td>
            );
          })}
        </tr>
      );
    });
  } catch (error) {
    console.log(error.message);
    console.log(tableHeaders);
  }

  return (
    <div className="flex w-full relative shadow-md sm:rounded-lg">
      <table className="table-auto bg-white border border-gray-300 max-h-full overflow-auto max-w-full">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th key="week" className="py-2 px-4 border-b">
              Tyzden
            </th>
            {tableHeaders}
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
    </div>
  );
}
