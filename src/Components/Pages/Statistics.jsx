import { useTranslation } from "react-i18next";
import DashboardCheckbox from "../Graphs/DashboardCheckbox";
import PriceDevelopmentGraph from "../Graphs/PriceDevelopmentGraph";
import YearlyPricingTable from "../Graphs/YearlyPricingTable";
import RecordsTable from "../Graphs/RecordsTable";
import CurrentWeek from "../Common/CurrentWeek";

export default function Statistics() {
  const { t } = useTranslation();
  const headerStyle = "font-bold text-lg tracking-wide";
  return (
      <>
      <main
        className="m-2 gap-4 grid grid-cols-1 md:grid-cols-3 auto-rows-min" // Responsive grid for mobile
        style={{ gridTemplateRows: "auto auto auto" }}
      >
        {/* Fuel Selection Section */}
        <div
          className="rounded-lg shadow-md overflow-auto"
          aria-labelledby="fuel-selection-heading"
          style={{ maxHeight: "fit-content" }}
        >
          <header className="text-center bg-neutral-100">
            <h2
              className={`${headerStyle} text-base md:text-lg`}
              id="fuel-selection-heading"
            >
              {t("statistics.checkboxHeader")}
            </h2>
          </header>
          <DashboardCheckbox />
        </div>

        {/* Records div */}
        <div
          className="rounded-lg shadow-md overflow-auto"
          aria-labelledby="max-records-heading"
          role="region"
          style={{ maxHeight: "332px" }}
        >
          <header className="text-center bg-neutral-100">
            <h2
              className={`${headerStyle} text-base md:text-lg`}
              id="max-records-heading"
            >
              {t("statistics.maxRecords")}
            </h2>
          </header>
          <RecordsTable type="max" />
        </div>

        <div
          className="rounded-lg shadow-md overflow-auto"
          aria-labelledby="min-records-heading"
          role="region"
          style={{ maxHeight: "332px" }}
        >
          <header className="text-center bg-neutral-100">
            <h2
              className={`${headerStyle} text-base md:text-lg`}
              id="min-records-heading"
            >
              {t("statistics.minRecords")}
            </h2>
          </header>
          <RecordsTable type="min" />
        </div>

        <div
          className="rounded-lg shadow-md col-span-1 md:col-span-3"
          aria-labelledby="comparision-to-last-week"
          role="region"
        >
          <header className="text-center bg-neutral-100">
            <h2
              className={`${headerStyle} text-base md:text-lg`}
              id="comparision-to-last-week"
            >
              {t("statistics.comparision")}
            </h2>
          </header>
          <CurrentWeek />
        </div>

        {/* Graph div */}
        <div
          className="rounded-lg shadow-md col-span-1 md:col-span-3 max-w-full max-h-[60vh] md:max-h-auto"
          aria-labelledby="price-development-graph-heading"
          role="region"
        >
          <header className="text-center bg-neutral-100">
            <h2
              className={`${headerStyle} text-base md:text-lg`}
              id="price-development-graph-heading"
            >
              {t("statistics.priceDevelopmentGraph")}
            </h2>
          </header>
          <PriceDevelopmentGraph />
        </div>

        {/* Yearly Pricing Table */}
        <div
          className="rounded-lg shadow-md col-span-1 md:col-span-3"
          aria-labelledby="yearly-pricing-table-heading"
          role="region"
          style={{ maxHeight: "60vh" }}
        >
          <header className="text-center bg-neutral-100">
            <h2
              className={`${headerStyle} text-base md:text-lg`}
              id="yearly-pricing-table-heading"
            >
              {t("statistics.yearlyPricingTable")}
            </h2>
          </header>
          <YearlyPricingTable />
        </div>
      </main>

      <footer id="source" className="m-4" aria-labelledby="data-source-heading">
        <p>
          {t("sections.dataSource")}
          <a
            id="data-source"
            className="font-bold"
            href="http://www.statistics.sk/"
          >
            http://www.statistics.sk/
          </a>
        </p>
      </footer>
      </>
  );
}
