import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  BarChart,
  Gamepad2,
  Award,
  FileText,
  ChevronLeft,
  ChevronRight,
  User,
  Briefcase,
  Settings,
  HelpCircle,
  TrendingUp,
  LineChart,
  PieChart,
  Wallet,
  Calculator,
  Trophy,
  Heart,
} from "lucide-react";

import {
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import path from "path";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const username = sessionStorage.getItem("username");
  const email = sessionStorage.getItem("email");
  const role = sessionStorage.getItem("role");

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const menuItems = [
    {
      label: "Dashboard",
      icon: <Home className="h-5 w-5" />,
      path: "/dashboard",
    },
    {
      label: "Paper Trading",
      icon: <Gamepad2 className="h-5 w-5" />,
      path: "/game/paper-trading",
    },
    {
      label: "Investment Quiz",
      icon: <Award className="h-5 w-5" />,
      path: "/game/investment-quiz",
    },
    {
      label: "Predict Market",
      icon: <LineChart className="h-5 w-5" />,
      path: "/game/predict-market",
    },
    {
      label: "Portfolio",
      icon: <Briefcase className="h-5 w-5" />,
      path: "/portfolio",
    },
    {
      label: "Budget",
      icon: <PieChart className="h-5 w-5" />,
      path: "/budget",
    },
    {
      label: "Reports",
      icon: <FileText className="h-5 w-5" />,
      path: "/report",
    },
    {
      label: "About Tax",
      icon: <BarChart className="h-5 w-5" />,
      path: "/tax",
    },
    {
      label: "Money Tracker",
      icon: <TrendingUp className="h-5 w-5" />,
      path: "/tracker",
    },
    {
      label: "Savings",
      icon: <Wallet className="h-5 w-5" />,
      path: "/savings",
    },
  ];

  const toolItems = [
    {
      label: "SIP Simulator",
      icon: <Calculator className="h-5 w-5" />,
      path: "/tools/sip-simulator",
    },
    {
      label: "Beat The Index",
      icon: <Trophy className="h-5 w-5" />,
      path: "/tools/beat-the-index",
    },
    {
      label: "Health Score",
      icon: <Heart className="h-5 w-5" />,
      path: "/tools/health-score",
    },
  ];
  // Conditionally add the Advisor/Consult button
  if (role === "Advisor") {
    menuItems.push({
      label: "Advisor Dashboard",
      icon: <User className="h-5 w-5" />,
      path: "/advisor",
    });
  } else {
    menuItems.push({
      label: "Consult an Advisor",
      icon: <User className="h-5 w-5" />,
      path: "/consult",
    });
  }
  return (
    <div
      className={`sidebar h-screen flex flex-col bg-background border-r transition-all duration-300 ${isCollapsed ? "w-20" : "w-64"
        }`}
    >
      {/* Sidebar Header */}
      <SidebarHeader className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <Link to="/">
            <div className="flex items-center gap-2">
              <img
                src="/logo.png"
                alt="Moneyमित्र Logo"
                className="h-10 w-10"
              />
              {!isCollapsed && (
                <span className="text-xl font-black tracking-tighter italic">MoneySutra</span>
              )}
            </div>
          </Link>
          <button
            onClick={toggleCollapse}
            className="p-2 hover:bg-muted rounded"
          >
            {isCollapsed ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
          </button>
        </div>
      </SidebarHeader>

      <SidebarSeparator />

      {/* Sidebar Content */}
      <SidebarContent className="flex-1 overflow-y-auto">
        <SidebarGroup>
          <SidebarGroupLabel className={isCollapsed ? "hidden" : ""}>
            Main Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton
                    asChild
                    className={`flex items-center gap-3 p-3 hover:bg-muted rounded ${location.pathname === item.path ? "bg-muted" : ""
                      }`}
                  >
                    <Link to={item.path}>
                      {item.icon}
                      {!isCollapsed && <span>{item.label}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Smart Tools Group */}
        <SidebarGroup>
          <SidebarGroupLabel className={isCollapsed ? "hidden" : "text-xs font-black text-green-500 uppercase tracking-widest"}>
            ✨ Smart Tools
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {toolItems.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton
                    asChild
                    className={`flex items-center gap-3 p-3 hover:bg-muted rounded ${location.pathname === item.path ? "bg-muted" : ""}`}
                  >
                    <Link to={item.path}>
                      {item.icon}
                      {!isCollapsed && <span>{item.label}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Sidebar Footer */}
      <SidebarFooter className="p-4">
        <div
          className={`flex items-center gap-2 rounded-md border p-2 ${isCollapsed ? "justify-center" : ""
            }`}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <User className="h-4 w-4" />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              {username ? (
                <>
                  <span className="text-sm font-medium">{username}</span>
                  <span className="text-xs text-muted-foreground">{email}</span>
                </>
              ) : (
                <span className="text-sm text-muted-foreground">Guest</span>
              )}
            </div>
          )}
        </div>
      </SidebarFooter>
    </div>
  );
};

export default Sidebar;
