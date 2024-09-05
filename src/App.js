import "./App.css";
import NavigationBar from "./Components/Common/NavigationBar";
import FooterSection from "./Components/Common/FooterSection";
import MainSection from "./Components/Common/MainSection";
import { useTranslation } from "react-i18next";
import { Router, Routes, Route, Outlet } from "react-router-dom";
import "./i18n";
import Statistics from "./Components/Pages/Statistics";
import AboutProject from "./Components/Pages/Statistics";
import Contact from "./Components/Pages/Statistics";
import SupportUs from "./Components/Pages/Statistics";
import { StatisticsSectionProvider } from "./Context/StatisticsSectionContext";
import PriceDevelopmentGraph from "./Components/Graphs/PriceDevelopmentGraph";
import YearlyPricingTable from "./Components/Graphs/YearlyPricingTable";
import RouteNotFound from "./Components/Pages/RouteNotFound";

function App() {
  const { t, i18n } = useTranslation();
  // <Route path="grafy" element={PriceDevelopmentGraph} />
  return (
    <div className="App">
      <NavigationBar t={t} i18n={i18n} />

      <MainSection>
        <Routes>
          <Route path="/statistiky" element={<Statistics />}>
            <Route path="tabulka" element={<YearlyPricingTable />} />
            <Route path="graf" element={<PriceDevelopmentGraph />} />
          </Route>
          <Route path="/oprojekte" element={<AboutProject />} />
          <Route path="/kontakt" element={<Contact />} />
          <Route path="/podporte-nas" element={<SupportUs />} />
          <Route path="*" element={<RouteNotFound />} />
        </Routes>
      </MainSection>

      <FooterSection />
    </div>
  );
}

export default App;
