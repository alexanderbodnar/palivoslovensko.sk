import React, { useMemo } from "react";
import { useTable, useFilters, useSortBy } from "react-table";
import { useStatisticsSectionContext } from "../../Context/StatisticsSectionContext";
import Spinner from "../Common/Spinner";
import { t } from "i18next";

const floatSort = (rowA, rowB, columnId) => {
  const a = parseFloat(rowA.values[columnId]) || 0;
  const b = parseFloat(rowB.values[columnId]) || 0;
  return a > b ? 1 : b > a ? -1 : 0;
};

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

function DefaultColumnFilter({ column: { filterValue, setFilter } }) {
  return (
    <input
      value={filterValue || ""}
      onClick={() => {}}
      onChange={(e) => setFilter(e.target.value || undefined)}
      placeholder={``}
      className="w-full border rounded"
    />
  );
}

export default function YearlyPricingTable() {
  const { data, loading } = useStatisticsSectionContext();

  const processedData = useMemo(() => {
    let weekMeasuresArray = [];

    const measuresArray = data?.map((fuel) =>
      fuel.measuresArray?.map((measure) => measure.value)
    );

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

    return weekMeasuresArray[0]?.map((_, colIndex) =>
      weekMeasuresArray?.map((row) => row[colIndex])
    );
  }, [data]);

  const columns = useMemo(() => {
    const fuelColumns = data?.map((fuel) => ({
      Header: fuel.name,
      accessor: fuel.name,
      disableFilters: true,
      Cell: ({ value }) => (value ? value : "-"),
      sortType: floatSort, // Apply the float sort function here
    }));

    const weekColumn = {
      Header: t("common.week"),
      accessor: "week",
      disableFilters: false,
      Cell: ({ value }) => formatWeekCaption(value),
    };

    return [weekColumn, ...fuelColumns];
  }, [data]);

  const tableData = useMemo(() => {
    if (!data[0]?.measuresArray?.map) return [];
    return data[0]?.measuresArray?.map((_, weekIndex) => {
      const weekName = data?.[0]?.measuresArray[weekIndex]?.week;
      const rowData = { week: weekName };
      data?.forEach((fuel, fuelIndex) => {
        rowData[fuel.name] =
          processedData?.[weekIndex]?.[fuelIndex] + "€" || "-";
      });
      return rowData;
    });
  }, [data, processedData]);

  const tableInstance = useTable(
    {
      columns,
      data: tableData,
      defaultColumn: { Filter: DefaultColumnFilter },
    },
    useFilters,
    useSortBy
  );

  if (loading) return <Spinner />;

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <div className="flex flex-col overflow-auto max-h-full">
      <div className="overflow-y-auto">
        <div className="inline-block min-w-full">
          <div className="overflow-hidden">
            <table
              {...getTableProps()}
              className="min-w-full table-fixed border-collapse"
            >
              <thead className="bg-gray-200 text-gray-700">
                {headerGroups.map((headerGroup, rowIndex) => (
                  <tr
                    key={`h${rowIndex}`}
                    depth={headerGroup.depth}
                    className="sticky top-0"
                    {...getTableProps()}
                  >
                    {headerGroup.headers.map((column, colIndex) => (
                      <th
                        key={`${rowIndex}-${colIndex}`}
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        ) }
                        className="px-6 py-3 sticky top-0 bg-gray-200 z-10 border-b"
                      >
                        {column.render("Header")}
                        <span>
                          {column.isSorted
                            ? column.isSortedDesc
                              ? " 🔽"
                              : " 🔼"
                            : ""}
                        </span>
                        <div>
                          {column.canFilter ? column.render("Filter") : null}
                        </div>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {rows.map((row, indexRow) => {
                  prepareRow(row);
                  return (
                    <tr
                      key={`r${indexRow}`}
                      className="even:bg-gray-100"
                      onClick={row.onClick}
                    >
                      {row.cells.map((cell, indexCol) => (
                        <td
                          {...cell.getCellProps()}
                          className="px-4 py-2 border"
                          key={`${indexCol}${indexRow}`}
                        >
                          {cell.render("Cell", {
                            value: cell.value !== "X€" ? cell.value : "",
                          })}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
