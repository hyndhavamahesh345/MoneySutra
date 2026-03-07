// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";

// function TaxBar() {
//   const navigate = useNavigate();
//   return (
//     <nav className="fixed top-0 left-0 w-full bg-gray-100 p-3 shadow-md z-50 flex justify-center space-x-4">
//       <Button variant="outline" onClick={() => navigate("/tax/info")}>
//         What are Taxes?
//       </Button>
//       <Button variant="outline" onClick={() => navigate("/tax/types")}>
//         Types of Tax
//       </Button>
//       <Button variant="outline" onClick={() => navigate("/tax/planning")}>
//         Tax Planning
//       </Button>
//       <Button variant="outline" onClick={() => navigate("/tax/savetax")}>
//         Save Tax
//       </Button>
//       <Button variant="outline" onClick={() => navigate("/tax/itrfiling")}>
//         ITR Filing
//       </Button>
//       <Button variant="outline" onClick={() => navigate("/tax/notice")}>
//         Income Tax
//       </Button>
//     </nav>
//   );
// }

// export default TaxBar;
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ClipboardList, PieChart, ShieldCheck, HelpCircle, FileText, ChevronRight } from "lucide-react";

function TaxBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const menuItems = [
    { path: "/tax/info", label: "What are Taxes?", icon: <HelpCircle size={18} /> },
    { path: "/tax/types", label: "Types of Tax", icon: <PieChart size={18} /> },
    { path: "/tax/planning", label: "Tax Planning", icon: <ClipboardList size={18} /> },
    { path: "/tax/savetax", label: "Save Tax", icon: <ShieldCheck size={18} /> },
    { path: "/tax/itrfiling", label: "ITR Filing", icon: <FileText size={18} /> },
    { path: "/tax/notice", label: "Income Tax", icon: <ChevronRight size={18} /> }
  ];

  return (
    <aside className="fixed left-0 lg:left-6 top-32 h-[calc(100vh-160px)] w-72 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl z-40 hidden lg:flex flex-col p-6 shadow-2xl">
      <h2 className="text-2xl font-black mb-8 px-2 tracking-tighter">
        TAX <span className="text-green-500">NAVIGATOR</span>
      </h2>

      <div className="space-y-2">
        {menuItems.map((item) => (
          <Button
            key={item.path}
            variant="ghost"
            className={`w-full justify-start gap-3 h-12 rounded-xl transition-all duration-300 ${isActive(item.path)
                ? "bg-green-500 text-black hover:bg-green-400"
                : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            onClick={() => navigate(item.path)}
          >
            {item.icon}
            <span className="font-semibold">{item.label}</span>
          </Button>
        ))}
      </div>
    </aside>
  );
}

export default TaxBar;