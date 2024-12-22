import NavigationBar from "./Components/Common/NavigationBar";
import FooterSection from "./Components/Common/FooterSection";
import MainSection from "./Components/Common/MainSection";
import { Routes, Route } from "react-router-dom";
import "./i18n";
import Statistics from "./Components/Pages/Statistics";
import AboutProject from "./Components/Pages/AboutProject";
import ContactUs from "./Components/Pages/ContactUs";
import RouteNotFound from "./Components/Common/RouteNotFound";
import SupportUs from "./Components/Pages/SupportUs";
import LandingPage from "./Components/Pages/LandingPage";
import { StatisticsSectionProvider } from "./Context/StatisticsSectionContext";

function App() {
  return (
    <div className="App">
      <StatisticsSectionProvider>
      <NavigationBar />
 
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="" element={<MainSection />}>
          <Route path="statistiky" element={<Statistics />} />
          <Route path="oprojekte" element={<AboutProject />} />
          <Route path="kontakt" element={<ContactUs />} />
          <Route path="podportenas" element={<SupportUs />} />
        </Route>
        <Route path="*" element={<RouteNotFound />} />
      </Routes>

      <FooterSection />
      </StatisticsSectionProvider>
    </div>

  );
}

export default App;
