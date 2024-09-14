import "./App.css";
import NavigationBar from "./Components/Common/NavigationBar";
import FooterSection from "./Components/Common/FooterSection";
import MainSection from "./Components/Common/MainSection";
import { useTranslation } from "react-i18next";
import { Routes, Route } from "react-router-dom";
import "./i18n";
import Statistics from "./Components/Pages/Statistics";
import AboutProject from "./Components/Pages/AboutProject";
import ContactUs from "./Components/Pages/ContactUs";
import SupportUs from "./Components/Pages/SupportUs";
import PriceDevelopmentGraph from "./Components/Graphs/PriceDevelopmentGraph";
import YearlyPricingTable from "./Components/Graphs/YearlyPricingTable";
import RouteNotFound from "./Components/Common/RouteNotFound";

function App() {
  const { t, i18n } = useTranslation();

  return (
    <div className="App">
      <NavigationBar />

      <Routes>
        <Route path="/" element={<MainSection />}>
          <Route path="statistiky" element={<Statistics />} />
          <Route path="oprojekte" element={<AboutProject />} />
          <Route path="kontakt" element={<ContactUs />} />
          <Route path="podportenas" element={<SupportUs />} />
        </Route>
        <Route path="*" element={<RouteNotFound />} />
      </Routes>

      <FooterSection />
    </div>
  );
}

export default App;
