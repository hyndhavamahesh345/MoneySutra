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

function TaxBar() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Helper function to determine if a route is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  const menuItems = [
    { path: "/tax/info", label: "What are Taxes?" },
    { path: "/tax/types", label: "Types of Tax" },
    { path: "/tax/planning", label: "Tax Planning" },
    { path: "/tax/savetax", label: "Save Tax" },
    { path: "/tax/itrfiling", label: "ITR Filing" },
    { path: "/tax/notice", label: "Income Tax" }
  ];

  return (
    <aside className="fixed left-0 my-3 h-full w-64 bg-gray-100 shadow-md z-40 flex flex-col p-4 space-y-3">
      <h2 className="text-xl font-bold mb-4 px-2">Tax Navigator</h2>
      
      {menuItems.map((item) => (
        <Button
          key={item.path}
          variant={isActive(item.path) ? "default" : "ghost"}
          className="w-full justify-start"
          onClick={() => navigate(item.path)}
        >
          {item.label}
        </Button>
      ))}
    </aside>
  );
}

export default TaxBar;