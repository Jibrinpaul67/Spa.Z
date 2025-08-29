"use client";
import React, { useState, useEffect, useMemo } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Building2, Columns2, Users ,CircleUserRound, Settings, Grid2x2Plus, MenuIcon, X, HandCoins } from 'lucide-react';

import { Button } from "@/components/ui/button";


import logo from "../../app/assets/logo.svg";


const menuItems = [
  { path: "/main/dashboard", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { path: "/main/organizations", label: "Organizations", icon: Building2 },
  { path: "/main/subscriptions", label: "Subscriptions", icon: HandCoins },
  { path: "/main/space", label: "Space Management", icon: Columns2 },
  { path: "/main/users", label: "User Management", icon: Users },
  { path: "/main/booking", label: "Booking Management", icon: Grid2x2Plus },
  { path: "/main/administration", label: "Administration", icon: CircleUserRound },
  { path: "/main/settings", label: "Settings & Config", icon: Settings },
];

export default function SidebarContainer() {
  const [isMobile, setIsMobile] = useState(false);
  const [toggled, setToggled] = useState(false);
  const pathname = usePathname();

  // Check screen size and set mobile view
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 1010);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Memoize the active check to prevent unnecessary re-renders
  const getIsActive = useMemo(() => {
    return (path: string) => {
      return pathname === path || 
             (path !== "/main/dashboard" && pathname.startsWith(path));
    };
  }, [pathname]);

  // Shared menu styles to reduce duplication
  const menuItemStyles = {
    button: ({ active }: { active: boolean }) => ({
      height: "2.5rem",
      borderRadius: "8px",
      width: "auto",
      paddingLeft: "4px",
      borderLeft: active ? "solid 2px #CE00F7 " : "solid 2px transparent ",
      backgroundColor: active ? "#FDF3FF" : undefined,
      color: active ? "#5105A9" : "rgb(107, 114, 128)",
      "&:hover": {
        backgroundColor: active ? "#FDF3FF" : "rgb(243, 244, 246)",
        color: "rgb(17, 24, 39)",
      },
    }),
  };

  // Render logos
  const renderLogos = () => (
    <div className="flex flex-row gap-1 ">
      <div>
      <Image
          src={logo}
          alt="Spacer Logo"
          width={90}
          height={24}
          className="h-8 w-auto"
        />
      </div>
     
    </div>
  );

  return (
    <>
      {isMobile && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setToggled(!toggled)}
          className={`fixed top-3   ${toggled ? "translate-x-48 border-none" : "translate-x-4 border border-gray-300 bg-[#ffffff] shadow-sm"} z-50`}
        >
          {toggled ? <X size={24} /> : <MenuIcon size={25} />}
        </Button>
      )}

      {/* Mobile Sidebar (Overlay) */}
      {isMobile && (
        <div
          className={`
            fixed top-0 left-0 h-screen w-[250px] 
            transition-transform duration-300 ease-out z-40
            ${!toggled ? "translate-x-[-100%]" : "translate-x-0"}
          `}
        >
          <Sidebar
            width="250px"
            className="h-screen border-r bg-white border-gray-200 opacity-100"
          >
            <div className="flex items-center justify-between p-4 mt-2 mb-6">
              {renderLogos()}
            </div>

            <Menu menuItemStyles={menuItemStyles}>
              {menuItems.map(({ path, label, icon: Icon }) => (
                <MenuItem
                  key={path}
                  active={getIsActive(path)}
                  icon={<Icon size={20} />}
                  component={
                    <Link href={path} onClick={() => setToggled(false)} />
                  }
                >
                  {label}
                </MenuItem>
              ))}
            </Menu>

            
          </Sidebar>
        </div>
      )}

      {/* Desktop Sidebar (Inline) */}
      {!isMobile && (
        <Sidebar
          width="210px"
          className="h-screen border-r bg-white border-gray-200"
        >
          <div className="flex items-center justify-between p-0 h-16 mb-6">
            {renderLogos()}
          </div>

          <Menu menuItemStyles={menuItemStyles}>
            {menuItems.map(({ path, label, icon: Icon }) => (
              <MenuItem
                key={path}
                active={getIsActive(path)}
                icon={<Icon size={16} />}
                component={<Link href={path} />}
              >
                {label}
              </MenuItem>
            ))}
          </Menu>

          
        </Sidebar>
      )}

      {/* Backdrop for mobile when sidebar is open */}
      {isMobile && toggled && (
        <div
          className="fixed inset-0 bg-black/50 z-30"
          onClick={() => setToggled(false)}
        />
      )}
    </>
  );
}

