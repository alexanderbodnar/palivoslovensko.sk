import React, { useState, useEffect } from "react";
import Spinner from "../Common/Spinner";
import { useStatisticsSectionContext } from "../../Context/StatisticsSectionContext";
import { t } from "i18next";

const DashboardCheckbox = () => {
  const { apiData, loading, year, setYear, setData } =
    useStatisticsSectionContext();
  const [selectedOptions, setSelectedOptions] = useState({});
  const [formYear, setFormYear] = useState(year);

  useEffect(() => {
    if (apiData.length > 0) {
      const initialOptions = apiData.reduce((acc, fuel, index) => {
        acc[fuel.name] = index < 7; // Default: true for the first 7 items
        return acc;
      }, {});
      setSelectedOptions(initialOptions);
    }
  }, [apiData]);

  useEffect(() => {
    if (Object.keys(selectedOptions).length > 0) {
      const updatedData = apiData.filter((fuel) => selectedOptions[fuel.name]);
      if (updatedData.length > 0) {
        setData(updatedData);
      }
      if (formYear !== year) {
        setYear(formYear);
      }
    }
  }, [selectedOptions]);

  if (loading) return <Spinner />;

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setSelectedOptions((prev) => ({ ...prev, [name]: checked }));
  };

  const handleYearChange = (e) => {
    setFormYear(e.target.value);
  };

  const handleYearSubmit = (e) => {
    e.preventDefault();
    setYear(formYear);
  };
  return (
    <div className="container mx-auto flex">
      <form className="min-w-full max-h-full group cursor-default select-none py-2 text-gray-900">
        {/* Checkbox list */}
        <div className="z-10 mt-1 max-h-40 w-full overflow-y-auto rounded bg-white py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          {apiData.map((fuel) => (
            <label
              key={fuel.name}
              className="flex justify-between hover:bg-neutral-200 ml-3 block truncate font-normal flex-row-reverse items-center space-x-3"
            >
              <input
                type="checkbox"
                name={fuel.name}
                checked={selectedOptions[fuel.name] || false}
                onChange={handleCheckboxChange}
                className="flex h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="flex font-lg font-bold">{fuel.name}</span>
            </label>
          ))}
        </div>

        {/* Year input */}
        <div className="flex m-4 justify-stretch">
          <label className="block text-gray-700 font-bold p-2">
            {t("common.selectYear")}
          </label>
          <input
            type="number"
            min="2000"
            max={new Date().getFullYear()}
            value={formYear}
            onChange={handleYearChange}
            className="px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring focus:ring-blue-500"
          />
          <button
            className="rounded-r-lg bg-[#297A49] text-white px-2 font-bold"
            label="Submit a year to display"
            onClick={handleYearSubmit}
          >
            {t("common.show")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DashboardCheckbox;
