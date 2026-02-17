import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  BarChart,
  Gamepad2,
  ClipboardList,
  ChevronLeft,
  ChevronRight,
  User,
  Briefcase,
  Settings,
  HelpCircle,
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
      icon: <ClipboardList className="h-5 w-5" />,
      path: "/game/investment-quiz",
    },
    {
      label: "Predict Market",
      icon: <Gamepad2 className="h-5 w-5" />,
      path: "/game/predict-market",
    },
    {
      label: "Portfolio",
      icon: <Briefcase className="h-5 w-5" />,
      path: "/portfolio",
    },
    {
      label: "Budget",
      icon: <BarChart className="h-5 w-5" />,
      path: "/budget",
    },
    {
      label: "Reports",
      icon: <ClipboardList className="h-5 w-5" />,
      path: "/report",
    },
    {
      label: "About Tax",
      icon: <BarChart className="h-5 w-5" />,
      path: "/tax",
    },
    // {
    //   label: "Settings",
    //   icon: <Settings className="h-5 w-5" />,
    //   path: "/settings",
    // },
    // {
    //   label: "Help & Support",
    //   icon: <HelpCircle className="h-5 w-5" />,
    //   path: "/help",
    // },
    {
      label: "Money Tracker",
      icon: <User className="h-5 w-5" />,
      path: "/tracker",
    },
    {
      label: "Savings",
      icon: <User className="h-5 w-5" />,
      path: "/savings",
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
      className={`sidebar h-screen flex flex-col bg-background border-r transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Sidebar Header */}
      <SidebarHeader className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <Link to="/">
            <div className="flex items-center gap-2">
              <img
                src="/logo.svg"
                alt="Moneyमित्र Logo"
                className="h-10 w-10"
              />
              {!isCollapsed && (
                <span className="text-lg font-bold">Money Sutra</span>
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
                    className={`flex items-center gap-3 p-3 hover:bg-muted rounded ${
                      location.pathname === item.path ? "bg-muted" : ""
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
      </SidebarContent>

      {/* Sidebar Footer */}
      <SidebarFooter className="p-4">
        <div
          className={`flex items-center gap-2 rounded-md border p-2 ${
            isCollapsed ? "justify-center" : ""
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
