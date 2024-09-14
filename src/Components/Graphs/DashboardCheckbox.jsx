import React, { useState, useEffect } from "react";
import Spinner from "../Common/Spinner";
import { useStatisticsSectionContext } from "../../Context/StatisticsSectionContext";
import { t } from "i18next";

const DashboardCheckbox = () => {
  const { apiData, loading, year, setYear, setData } =
    useStatisticsSectionContext();
  const [selectedOptions, setSelectedOptions] = useState({});
  const [formYear, setFormYear] = useState(year);

  // Initialize selected options based on apiData, not data
  useEffect(() => {
    if (apiData.length > 0) {
      const initialOptions = apiData.reduce((acc, fuel) => {
        acc[fuel.name] = true; // Set all fuel types to true initially
        return acc;
      }, {});
      setSelectedOptions(initialOptions);
    }
  }, [apiData]);

  if (loading) return <Spinner />;

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setSelectedOptions((prev) => ({ ...prev, [name]: checked }));
  };

  const handleYearChange = (e) => {
    setFormYear(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Filter only the displayed data, but keep options intact
    const updatedData = apiData.filter((fuel) => selectedOptions[fuel.name]);

    // Update the data (removing unchecked items) and set the year
    setData(updatedData);
    setYear(formYear);
  };

  return (
    <div className="container mx-auto p-4">
      <form
        className="w-full max-h-full group cursor-default select-none py-2 pl-3 pr-9 text-gray-900"
        onSubmit={handleSubmit} // Handle form submission
      >
        <div className="z-10 mt-1 max-h-56 w-full overflow-auto rounded bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm overflow-hidden">
          {apiData.map((fuel) => (
            <label
              key={fuel.name}
              className="flex justify-between hover:bg-neutral-200 ml-3 block truncate font-normal flex-row-reverse items-center space-x-3 "
            >
              <input
                type="checkbox"
                name={fuel.name}
                checked={selectedOptions[fuel.name] || false}
                onChange={handleCheckboxChange}
                className="flex h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="flex">{fuel.name}</span>
            </label>
          ))}
        </div>
        <div className="flex mt-4">
          <label className="block text-gray-700 font-bold mb-2">
            {t("common.selectYear")}
          </label>
          <input
            type="number"
            min="2000"
            max={new Date().getFullYear()}
            value={formYear}
            onChange={handleYearChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="bg-sky-500 hover:bg-sky-700 rounded px-2 my-2"
        >
          {t("common.show")}
        </button>
      </form>
    </div>
  );
};

export default DashboardCheckbox;
