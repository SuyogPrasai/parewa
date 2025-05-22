"use client";

import { useState } from "react";
import { MenuIcon } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import Image from "next/image";

const Navbar = () => {
  const [activeLink, setActiveLink] = useState("General"); // State to track active link

  const handleLinkClick = (linkName: string) => {
    setActiveLink(linkName);
  };

  // Define custom colors that resemble the image
  const mintColor = "rgb(59, 130, 246)"; // A teal/mint color for active and contact button
  const lightMintColor = "rgb(204, 218, 232)"; // A lighter mint for the about button

  // Define your navigation links in an array
  const navLinks = [
    { name: "General", href: "#" },
    { name: "Sports", href: "#" },
    { name: "Academics", href: "#" },
    { name: "Arts", href: "#" },
    { name: "Tech", href: "#" },
    // You can add more links here as needed
  ];

  return (
    <div className=" bg-white mx-auto lg:relative lg:block shadow-sm">
      <div className="container mx-auto px-4 relative">
        <nav className="flex lg:flex-row items-center justify-center">
          {/* Desktop Navigation */}
          <div className="flex justify-center">
            <NavigationMenu className="lg:flex">
              <NavigationMenuList className="flex md:flex-row md:mt-0 mt-5 flex-col space-x-0">
                {/* Iterate over your navigation links */}
                {navLinks.map((link) => (
                  <NavigationMenuItem key={link.name}>
                    <NavigationMenuLink
                      className="py-2 px-6 flex items-center justify-center text-black text-lg font-bold hover:cursor-pointer" // Base styles
                      style={{
                        backgroundColor:
                          activeLink === link.name ? mintColor : "white",
                        color: activeLink === link.name ? "white" : "black",
                        minWidth: "100px", // Ensure consistent width if needed
                        height: "60px", // Adjust height to match the image's blocky look
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        letterSpacing: "0.05em", // Adjust letter spacing to match the image
                        fontFamily: "monospace, sans-serif", // Or a custom font
                      }}
                      onClick={() => handleLinkClick(link.name)}
                    >
                      {link.name}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* About and Contact Buttons */}
          <div className="hidden lg:flex space-x-0 h-[60px] items-center ml-10">
            {" "}
            {/* Align with nav items' height */}
            <div
              className="py-2 px-6 flex items-center justify-center hover:cursor-pointer text-black text-lg font-bold"
              style={{
                backgroundColor: lightMintColor,
                color: "black",
                minWidth: "100px",
                height: "60px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                letterSpacing: "0.05em",
                fontFamily: "monospace, sans-serif",
              }}
            >
              ABOUT
            </div>
            <div
              className="py-2 px-6 flex items-center justify-center hover:cursor-pointer text-white text-lg font-bold"
              style={{
                backgroundColor: mintColor,
                color: "white",
                minWidth: "100px",
                height: "60px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                letterSpacing: "0.05em",
                fontFamily: "monospace, sans-serif",
              }}
            >
              Contact
            </div>
          </div>
        </nav>
      </div>
      <div className="min-w-[150px] relative">
        <Image
          src="/lightning.png"
          alt="Eagle Logo"
          width={150}
          height={150}
          className="hidden lg:block object-contain absolute left-[5%] top-0 w-[20%] max-w-[300px] 3xl:right-none"
        />
      </div>
    </div>
  );
};

export { Navbar };