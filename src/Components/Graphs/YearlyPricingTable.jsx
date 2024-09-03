import React from "react";

const fillWeeksArray = (data, numOfWeeks) => {
  const pricesArr = data.value;
  const splitedArr = [];

  for (let i = 0; i < pricesArr.length; i += numOfWeeks) {
    const chunk = pricesArr
      .slice(i, i + numOfWeeks)
      .map((value) => (value === null ? "No data" : value));
    splitedArr.push(chunk);
  }

  const weeksArr = Object.values(data.dimension.sp0207ts_tyz.category.label);
  const resultArray = [];

  weeksArr.forEach((week, index) => {
    let tableData = {
      weekName: week,
      fuelPrice: splitedArr[index],
    };

    resultArray.push(tableData);
  });

  return resultArray;
};

export default function YearlyPricingTable({ data }) {
  let tableHeaders, tableRows;
  const headers = Object.values(data.dimension.sp0207ts_ukaz.category.label);
  const weeksArray = fillWeeksArray(data, headers.length);

  //separate
  weeksArray.sort((a, b) => {
    const nameA = Number(a.weekName.split(".").at(0)); // ignore upper and lowercase
    const nameB = Number(b.weekName.split(".").at(0)); // ignore upper and lowercase
    return nameA > nameB ? -1 : 1;
  });
  try {
    tableHeaders = headers.map((el) => {
      return (
        <th key={el} className="py-2 px-4 border-b">
          {el}
        </th>
      );
    });
    tableRows = weeksArray?.map((el, index) => {
      return (
        <tr key={el.weekName}>
          <th key={el.weekName}>{el.weekName}</th>
          {el?.fuelPrice?.map((el2, index2) => {
            return <td key={`${index}+${index2}`}>{el2}</td>;
          })}
        </tr>
      );
    });
  } catch (error) {
    console.log(error.message);
    console.log(tableHeaders);
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Monthly Gas Pricing</h2>
      <table className="min-w-full bg-white border border-gray-300">
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
