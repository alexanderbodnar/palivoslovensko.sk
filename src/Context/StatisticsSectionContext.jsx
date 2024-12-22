import { createContext, useContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getDataWithParams } from "../API/monthlyData";
const StatisticsSectionContext = createContext();

export const useStatisticsSectionContext = () => {
  return useContext(StatisticsSectionContext);
};

function generateNumberString(start, end) {
  const startNum = parseInt(start, 10);
  const endNum = parseInt(end, 10);

  if (startNum < endNum) {
    throw new Error("Start number must be greater than end number");
  }

  const numbers = [];

  for (let i = startNum; i >= endNum; i--) {
    numbers.push(i);
  }
  return numbers.join(",");
}

function processApiData(response) {
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
}

function calculateWeeks() {
  let currentdate = new Date();
  let oneJan = new Date(currentdate.getFullYear(), 0, 1);
  let numberOfDays = Math.floor((currentdate - oneJan) / (24 * 60 * 60 * 1000));
  let resultWeek = Math.ceil((currentdate.getDay() + 1 + numberOfDays) / 7);
  return resultWeek.toString();
}

export const StatisticsSectionProvider = ({ children }) => {
  const [apiData, setApiData] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [year, setYear] = useState(new Date().getFullYear());
  const [error, setError] = useState(null);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    async function fetchData() {
      const currentDate = `${new Date().toLocaleDateString()}${i18n.language}`;
      const savedData = localStorage.getItem(`${year}${i18n.language}`);
      const savedDate = localStorage.getItem("currentDate");

      if (savedData && JSON.parse(savedDate) === currentDate) {
        setApiData(JSON.parse(savedData));
        setData(JSON.parse(savedData));
        setLoading(false);
        console.log("data are from local storage");
        return;
      }

      try {
        const resultWeek = calculateWeeks();
        const response = await getDataWithParams(
          generateNumberString(year + resultWeek, `${year}01`),
          "all",
          i18n.language
        );

        if (!response) throw Error("No data found!");

        const processedData = processApiData(response);
        setApiData(processedData);
        setData(processedData);
        localStorage.setItem(
          `${year}${i18n.language}`,
          JSON.stringify(processedData)
        );
        localStorage.setItem("currentDate", JSON.stringify(currentDate));
      } catch (err) {
        console.log(err.message);
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [i18n.language, year]);

  return (
    <StatisticsSectionContext.Provider
      value={{ apiData, data, setData, loading, year, setYear }}
    >
      {children}
    </StatisticsSectionContext.Provider>
  );
};
