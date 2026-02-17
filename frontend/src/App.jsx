import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PaperTrading from "./Pages/Games/PaperTrading";
import InvestmentQuiz from "./Pages/Games/InvestmentQuiz";
import PredictMarket from "./Pages/Games/PredictMarket";
import DashboardPage from "./Pages/Dashboard/DashboardPage";
import SimulationPage from "./Pages/Simulation/SimulationPage";
import PortfolioPage from "./Pages/Portfolio/PortfolioPage";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import BudgetPage from "./Pages/Budget/BudgetPage";
import Register from "./Pages/registration/Register";
import Login from "./Pages/Registration/Login";
import DriveFilesViewer from "./Pages/PDF/pdf";
import { useLocation } from "react-router-dom";
import MoneyTracker from "./components/moneyTracker/MoneyTracker";
import Home from "./components/home/home";
import ReportsPage from "./Pages/Report/ReportPage";
import Savings from "./Pages/Saving/Saving";
import AboutTaxes from "./Pages/ITR/AboutTaxes";
import TypesOfTaxes from "./Pages/ITR/TypesOfTaxes/types-of-taxes";
import TaxPlanning from "./Pages/ITR/TaxPlanning/tax-planning";
import SaveTaxes from "./Pages/ITR/SaveTaxes/save-taxes";
import ItrFiling from "./Pages/ITR/ItrFiling/itr-filing";
import TaxNotice from "./Pages/ITR/IncomeTaxNotice/tax-notice";
import WhatAreTaxes from "./Pages/ITR/WhatAreTaxes/what-are-taxes";
import TaxBar from "./Pages/ITR/TaxBar";
import FinancialAdvisorDashboard from "./Pages/Advisor/Dashboard";
import ConsultAdvisor from "./Pages/Advisor/Consult";

const Layout = ({ children }) => {
  const location = useLocation();

  // Show Sidebar for specific routes
  const showSidebar =
    location.pathname.startsWith("/game") ||
    location.pathname === "/simmulation" ||
    location.pathname === "/portfolio" ||
    location.pathname === "/dashboard" ||
    location.pathname === "/budget" ||
    location.pathname === "/simulation" ||
    location.pathname === "/report" ||
    location.pathname === "/savings" ||
    location.pathname === "/tracker" ||
    location.pathname === "/advisor" ||
    location.pathname === "/consult" ||
    location.pathname === "/report";
    
  // Show Navbar only on Landing, Login, and Signup pages
  const showNavbar =
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/lessons" ||
    location.pathname === "/tax";

  // const showTaxBar =
  //   location.pathname === "/tax" ||
  //   location.pathname === "/tax/info" ||
  //   location.pathname === "/tax/types" ||
  //   location.pathname === "/tax/planning" ||
  //   location.pathname === "/tax/savetax" ||
  //   location.pathname === "/tax/itrfiling" ||
  //   location.pathname === "/tax/notice";
  return (
    <SidebarProvider>
      <div className="flex w-full h-screen">
        {showSidebar && <Sidebar className="w-64" />}
        

        <div className="flex flex-col flex-grow">
          {showNavbar && <Navbar />}{" "}
          
          {/* Navbar only for landing, login, signup */}
          <div className={showSidebar ? "p-4" : ""}>{children}</div>
        </div>
        {/* {showTaxBar && <TaxBar />}{" "} */}
      </div>
    </SidebarProvider>
  );
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/game/paper-trading" element={<PaperTrading />} />
          <Route path="/game/investment-quiz" element={<InvestmentQuiz />} />
          <Route path="/game/predict-market" element={<PredictMarket />} />
          <Route path="/simmulation" element={<SimulationPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/budget" element={<BudgetPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/tracker" element={<MoneyTracker />} />
          <Route path="/lessons" element={<DriveFilesViewer />} />

          <Route path="/report" element={<ReportsPage />} />
          <Route path="/simulation" element={<SimulationPage />} />
          <Route path="/savings" element={<Savings />} />

          <Route path="/report" element={<ReportsPage />} />
          <Route path="/simulation" element={<SimulationPage />} />
          <Route path="/report" element={<ReportsPage />} />
          <Route path="/simulation" element={<SimulationPage />} />

          <Route path="/tax" element={<AboutTaxes />} />
          <Route path="/tax/info" element={<WhatAreTaxes />} />
          <Route path="/tax/types" element={<TypesOfTaxes />} />
          <Route path="/tax/planning" element={<TaxPlanning />} />
          <Route path="/tax/savetax" element={<SaveTaxes />} />
          <Route path="/tax/itrfiling" element={<ItrFiling />} />
          <Route path="/tax/notice" element={<TaxNotice />} />

          <Route path="/advisor" element={<FinancialAdvisorDashboard />} />
          <Route path="/consult" element={<ConsultAdvisor />} />


        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
