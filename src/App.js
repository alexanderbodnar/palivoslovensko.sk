import "./App.css";
import NavigationBar from "./Components/NavigationBar";
import FooterSection from "./Components/FooterSection";
import MainSection from "./Components/MainSection";
import { useTranslation } from "react-i18next";
import "./i18n";

function App() {
  const { t, i18n } = useTranslation();
  return (
    <div className="App">
      <NavigationBar t={t} i18n={i18n} />
      <MainSection />
      <FooterSection />
    </div>
  );
}

export default App;
