import YearlyPricingTable from "../Graphs/YearlyPricingTable";
import PriceDevelopmentGraph from "../Graphs/PriceDevelopmentGraph";
import { useState, useEffect } from "react";
import { getDataWithParams } from "../../API/monthlyData";
import { useStatisticsSectionContext } from "../../Context/StatisticsSectionContext";

export default function MainSection({ children }) {
  return (
    <span id="main--section">
      <div className="grid h-full justify-items-center mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        {children}
      </div>
    </span>
  );
}
// <PriceDevelopmentGraph data={data} />
