import YearlyPricingTable from "./Graphs/YearlyPricingTable";
import PriceDevelopmentGraph from "./Graphs/PriceDevelopmentGraph";
import { useState, useEffect } from "react";
import { getDataWithParams } from "../API/monthlyData";
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

export default function MainSection() {
  const [data, setData] = useState([]); // State to hold fetched data
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getDataWithParams(
          generateNumberString("202452", "202401")
        );
        //"202452,202451,202450,202449,202448,202447"
        console.log(response);
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

  // if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <span id="main--section">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid h-full justify-items-center">
          <YearlyPricingTable data={data} />
        </div>
      )}
    </span>
  );
}
// <PriceDevelopmentGraph data={data} />
