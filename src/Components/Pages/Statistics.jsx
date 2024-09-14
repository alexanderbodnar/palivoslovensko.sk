import { Link, Outlet } from "react-router-dom";
import { StatisticsSectionProvider } from "../../Context/StatisticsSectionContext";
import { useTranslation } from "react-i18next";
import DashboardCheckbox from "../Graphs/DashboardCheckbox";
import PriceDevelopmentGraph from "../Graphs/PriceDevelopmentGraph";
import YearlyPricingTable from "../Graphs/YearlyPricingTable";

export default function Statistics({ children }) {
  const { t, i18n } = useTranslation();

  /*        
       <div className="flex mx-auto max-w-9xl py-5 min-h-96 max-h-[70vh] px-2 sm:px-6 lg:px-8">
        <div className="flex flex-col mx-auto border-solid min-[320px]:w-screen rounded max-w-5xl border-2 border-grey-200 overflow-auto ">
          <div className="border-solid border-2 rounded overflow-auto">  <div className="flex flex-row justify-around w-full border border-x-2  divide-x">
  <Link
    to="./tabulka"
    className="px-4 py-2 text-black  flex justify-center w-full hover:bg-slate-400"
  >
    <h1 className="font-semibold hidden sm:inline">
      {t("sections.table")}
    </h1>
  </Link>

  <Link
    to="./graf"
    className="px-4 py-2 text-black  flex justify-center w-full hover:bg-slate-400"
  >
    <h1 className="font-semibold hidden sm:inline">
      {t("sections.graph")}
    </h1>
  </Link>
</div>
*/
  return (
    <StatisticsSectionProvider>
      <div className="min-w-full grid grid-rows-3 grid-cols-3 max-h-120  auto-rows-max">
        <div className="bg-red-400 flex ">
          <DashboardCheckbox />
        </div>
        <div className="bg-red-300"></div>
        <div className="bg-red-500"></div>
        <div className="bg-red-100 col-span-3 row-span-2 mx-auto min-w-full px-4 py-6 sm:px-6 lg:px-8">
          <PriceDevelopmentGraph />
        </div>
        <div className="row-span-3 col-span-3 bg-red-200 max-h-50 overflow-auto">
          <YearlyPricingTable />
        </div>
      </div>

      <div id="source">
        {t("sections.dataSource")}
        {": "}
        <a
          id="data-source"
          className="font-bold"
          href="http://www.statistics.sk/"
        >
          http://www.statistics.sk/
        </a>
      </div>
    </StatisticsSectionProvider>
  );
}
