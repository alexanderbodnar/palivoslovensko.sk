import { createContext, useContext, useState, useEffect } from "react";
import { getDataWithParams } from "../API/monthlyData";
// Create the context
const StatisticsSectionContext = createContext();

// Create a custom hook to use the context
export const useStatisticsSectionContext = () => {
  return useContext(StatisticsSectionContext);
};

function generateNumberString(start, end) {
  // Convert start and end to integers
  const startNum = parseInt(start, 10);
  const endNum = parseInt(end, 10);

  // Check if start is greater than end
  if (startNum < endNum) {
    throw new Error("Start number must be greater than end number");
  }

  // Create an array to store numbers
  const numbers = [];

  // Generate numbers from start to end
  for (let i = startNum; i >= endNum; i--) {
    numbers.push(i);
  }

  // Join the array into a comma-separated string
  return numbers.join(",");
}

// Create a provider component
export const StatisticsSectionProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // State to handle errors
  useEffect(() => {
    async function fetchData() {
      try {
        let currentdate = new Date();
        let oneJan = new Date(currentdate.getFullYear(), 0, 1);
        let numberOfDays = Math.floor(
          (currentdate - oneJan) / (24 * 60 * 60 * 1000)
        );
        let resultWeek = Math.ceil(
          (currentdate.getDay() + 1 + numberOfDays) / 7
        );
        console.log(resultWeek);
        const response = await getDataWithParams(
          generateNumberString("2024" + resultWeek.toString(), "202401")
        );
        //"202452,202451,202450,202449,202448,202447"
        //console.log(response);
        if (!response) throw Error("No data found!");
        setData(response);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <StatisticsSectionContext.Provider value={{ data, setData, loading }}>
      {children}
    </StatisticsSectionContext.Provider>
  );
};
