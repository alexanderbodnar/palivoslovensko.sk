import YearlyPricingTable from "./Graphs/YearlyPricingTable";
import PriceDevelopmentGraph from "./Graphs/PriceDevelopmentGraph";
export default function MainSection() {
  return (
    <div className="grid h-full justify-items-center">
      <YearlyPricingTable />
      <PriceDevelopmentGraph />
    </div>
  );
}
