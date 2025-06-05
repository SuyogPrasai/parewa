"use client";

import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import { NavLink } from "@/types/navlinks";

interface NavbarProps {
  header_click: (linkName: string) => void;
  navLinks: NavLink[];
}

function Navbar({ header_click, navLinks }: NavbarProps) {
  const [activeLink, setActiveLink] = useState("General"); // State to track active link

  const handleLinkClick = (linkName: string) => {
    setActiveLink(linkName);
    header_click(linkName);
  };

  return (
    <div className="hidden bg-white mr-auto w-full max-w-[1000px] lg:relative lgplus:block shadow-sm">
      <div className="container relative">
        <nav className="flex lg:flex-row items-center justify-between">
          {/* Desktop Navigation */}
          <div className="flex justify-center">
            <NavigationMenu className="lg:flex">
              <NavigationMenuList className="flex md:flex-row md:mt-0 mt-5 flex-col space-x-0">
                {navLinks.map((link: NavLink) => (
                  <NavigationMenuItem key={link.name}>
                    <NavigationMenuLink
                      className="py-2 px-6 flex items-center justify-center text-black text-lg font-bold hover:cursor-pointer"
                      style={{
                        backgroundColor:
                          activeLink === link.name
                            ? ""
                            : "white",
                        color: activeLink === link.name ? "" : "black",
                        minWidth: "100px",
                        height: "60px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        letterSpacing: "0.05em",
                        fontFamily: "oswald, sans-serif",
                      }}
                      onClick={() => handleLinkClick(link.name)}
                    >
                      {link.name.toUpperCase()}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* About and Contact Buttons */}
          <div className="hidden lgplus:flex space-x-0 h-[60px] items-center ml-10">
            <div
              className="py-2 px-6 flex items-center justify-center hover:cursor-pointer text-black text-lg font-bold"
              style={{
                backgroundColor: "hsl(var(--primary-low-bright))",
                color: "black",
                minWidth: "100px",
                height: "60px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                letterSpacing: "0.05em",
                fontFamily: "oswald, sans-serif",
              }}
            >
              ABOUT
            </div>
            <div
              className="py-2 px-6 flex items-center justify-center hover:cursor-pointer text-white text-lg font-bold"
              style={{
                backgroundColor: "hsl(var(--primary-high-bright))",
                color: "white",
                minWidth: "100px",
                height: "60px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                letterSpacing: "0.05em",
                fontFamily: "oswald, sans-serif",
              }}
            >
              CONTACT
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export { Navbar };