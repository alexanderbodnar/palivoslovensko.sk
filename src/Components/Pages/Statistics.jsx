import { Link, Outlet } from "react-router-dom";
import { StatisticsSectionProvider } from "../../Context/StatisticsSectionContext";

export default function Statistics({ children }) {
  return (
    <StatisticsSectionProvider>
      <div className="flex mx-auto max-w-9xl py-5 min-h-96 max-h-[70vh] px-2 sm:px-6 lg:px-8">
        <div className="flex flex-col mx-auto border-solid min-[320px]:w-screen rounded max-w-5xl border-2 border-grey-200 overflow-auto ">
          <div className="flex flex-row justify-around w-full border border-x-2  divide-x">
            <Link
              to="./tabulka"
              className="px-4 py-2 text-black  flex justify-center w-full hover:bg-slate-400"
            >
              <h1 className="font-semibold hidden sm:inline">Tabulka</h1>
            </Link>

            <Link
              to="./graf"
              className="px-4 py-2 text-black  flex justify-center w-full hover:bg-slate-400"
            >
              <h1 className="font-semibold hidden sm:inline">Graf</h1>
            </Link>
          </div>
          <div className="border-solid border-2 rounded overflow-auto">
            <Outlet />
          </div>
        </div>
      </div>

      <div id="source">
        Zdroj dát:{" "}
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
