import { createContext, useContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getDataWithParams } from "../API/monthlyData";
const StatisticsSectionContext = createContext();

export const useStatisticsSectionContext = () => {
  return useContext(StatisticsSectionContext);
};

function generateNumberString(start, end) {
  let startNum = parseInt(start, 10);
  let endNum = parseInt(end, 10);

  if (startNum < endNum) {
    let tmp = startNum;
    startNum = endNum;
    endNum = tmp;
  }

  const numbers = [];

  for (let i = startNum; i >= endNum; i--) {
    numbers.push(i);
  }
  return numbers.join(",");
}

function getCurrentWeekNumber() {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const daysDifference = Math.floor(
    (now - startOfYear) / (1000 * 60 * 60 * 24)
  );
  let result = Math.ceil((daysDifference + startOfYear.getDay() + 1) / 7);
  return result ?? "01";
}
function processApiData(response) {
  try {
    const fuelObjectsArray = [];
    const fuelsArray = Object.values(
      response.dimension.sp0207ts_ukaz.category.label
    );
    const numberOfFuels = fuelsArray.length;
    const numberOfMeasures = response.value.length;

    const weeksArray = Object.values(
      response.dimension.sp0207ts_tyz.category.label
    );

    fuelsArray.forEach((fuel, index1) => {
      const fuelMeasures = [];
      let indexOfWeek = 0;
      for (
        let index2 = index1;
        index2 < numberOfMeasures;
        index2 = index2 + numberOfFuels
      ) {
        fuelMeasures.push({
          week: weeksArray[indexOfWeek],
          value: response.value[index2] ? response.value[index2] : "X",
        });
        indexOfWeek++;
      }
      fuelObjectsArray.push({
        name: fuel,
        measuresArray: fuelMeasures,
      });
    });
    return fuelObjectsArray;
  } catch (err) {
    return null;
  }
}

function calculateWeeks(year) {
  const currentYear = new Date().getFullYear();
  if (year < currentYear) {
    return "53";
  }

  const now = new Date();
  const oneJan = new Date(currentYear, 0, 1);

  const firstThursday = new Date(
    oneJan.getFullYear(),
    oneJan.getMonth(),
    oneJan.getDate() + ((4 - oneJan.getDay() + 7) % 7)
  );

  const daysDifference = Math.floor(
    (now - firstThursday) / (1000 * 60 * 60 * 24)
  );
  const weekNumber = Math.ceil(daysDifference / 7) + 1;

  return weekNumber.toString().padStart(2, "0");
}

export const StatisticsSectionProvider = ({ children }) => {
  const [apiData, setApiData] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [year, setYear] = useState(new Date().getFullYear());
  const [error, setError] = useState(null);
  const [weekInterval, setWeekInterval] = useState({
    start: "1",
    end: new Date().getFullYear() === year ? getCurrentWeekNumber() : "53",
  });

  const { i18n } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      const currentDate = `${new Date().toLocaleDateString()}${i18n.language}`;
      const savedDataKey = `${year}${i18n.language}`;
      const savedData = localStorage.getItem(savedDataKey);
      const savedDate = localStorage.getItem("currentDate");

      if (savedData && savedDate === JSON.stringify(currentDate)) {
        const parsedData = JSON.parse(savedData);

        if (parsedData?.length === 0 || !parsedData) {
          setError(new Error("No data"));
          setApiData([]);
          setData([]);
        } else {
          setApiData(parsedData);
          setData(parsedData);
          setError(null);
          console.log("Data are from local storage");
        }

        setLoading(false);
        return;
      }

      try {
        const resultWeek = calculateWeeks(year);
        const response = await getDataWithParams(
          generateNumberString(year + resultWeek, `${year}01`),
          "all",
          i18n.language
        );

        if (!response) throw new Error("No data found!");

        const processedData = processApiData(response);
        if (!processedData) throw new Error("No data found!");

        setApiData(processedData);
        setData(processedData);
        localStorage.setItem(savedDataKey, JSON.stringify(processedData));
        localStorage.setItem("currentDate", JSON.stringify(currentDate));
        setError(null);
      } catch (err) {
        console.error(err);
        setError(err);
        setApiData([]);
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    setWeekInterval({
      start: "1",
      end: new Date().getFullYear() === year ? getCurrentWeekNumber() : "53",
    });
    fetchData();
  }, [i18n.language, year]);

  return (
    <StatisticsSectionContext.Provider
      value={{
        apiData,
        data,
        setData,
        error,
        setError,
        loading,
        year,
        setYear,
        weekInterval,
        setWeekInterval,
      }}
    >
      {children}
    </StatisticsSectionContext.Provider>
  );
};
