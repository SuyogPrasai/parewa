"use client";

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
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const features = [
    { title: "Dashboard", description: "Overview of your activity", href: "#" },
    { title: "Analytics", description: "Track your performance", href: "#" },
    { title: "Settings", description: "Configure your preferences", href: "#" },
    { title: "Integrations", description: "Connect with other tools", href: "#" },
    { title: "Storage", description: "Manage your files", href: "#" },
    { title: "Support", description: "Get help when needed", href: "#" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white py-4 shadow-md">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-center">
          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList className="flex space-x-6">
              <NavigationMenuItem>
                <NavigationMenuTrigger>Features</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[500px] grid-cols-2 gap-3 p-4">
                    {features.map((feature, index) => (
                      <NavigationMenuLink
                        href={feature.href}
                        key={index}
                        className="rounded-md p-3 transition-all hover:bg-gray-100"
                      >
                        <p className="mb-1 font-semibold">{feature.title}</p>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                      </NavigationMenuLink>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>
                  Products
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>
                  Resources
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>
                  Contact
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Mobile Menu Toggle */}
          <Button variant="ghost" size="icon" className="lg:hidden">
            <MenuIcon className="h-6 w-6" />
          </Button>
        </nav>
      </div>
    </header>
  );
};

export { Navbar };
