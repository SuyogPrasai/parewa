import {
  X,
  Facebook, // Import Facebook icon
  Twitter, // Import Twitter icon (often represented by the 'X' logo now)
  Youtube, // Import Youtube icon
  Instagram, // Import Instagram icon
  Linkedin, // Import LinkedIn icon
  MoreHorizontal, // For the '...' or general "more" if you don't have a specific icon
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "./ui/separator";
import AuthButton from "@/components/auth-button";


const navItems = [
  { title: "GENERAL NEWS", url: "#" },
  { title: "MORE ON SPORTS", url: "#" },
  { title: "ACADEMIA", url: "#" },
  { title: "ARTS & CULTURE", url: "#" },
  { title: "TECH AND SCIENCE", url: "#" },
];

const secondaryNavItems = [
  { title: "POLITICS", url: "#" },
  { title: "ECONOMY", url: "#" },
  { title: "LITERATURE", url: "#" },
  { title: "VIDEOS", url: "#" },
  { title: "DOCUMENTATION", url: "#" },
];
const finalNavItems = [
  { title: "ABOUT", url: "#" },
  { title: "DOCUMENTATION", url: "#" },
  { title: "WAYS TO CONTRIBUTE", url: "#" },
  { title: "REPORT A BUG", url: "https://forms.gle/e7LWQa73WBmnsiDS8" },
  { title: "JOBS", url: "https://forms.gle/cybYghNXgoumfKfP6" },
  { title: "CREDITS", url: "#" },
];

export function AppSidebar() {
  return (
    <Sidebar variant="sidebar" collapsible="offcanvas">
      <SidebarContent>
        <div className="p-4">
          <div className="flex items-center justify-start mb-4">
            <SidebarTrigger sidebarVariant="opened">
              <X className="h-5 w-5 text-gray-500" />
            </SidebarTrigger>
            <div className="text-2xl font-bold p-5">परेवा_</div>
          </div>
          <div className="mx-10">
            <SidebarMenu className="mb-4">
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="font-mono text-xl">
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
            <Separator className="bg-black h-[0.0125rem]" />
            <div className="my-4 w-[75%]">
              <button className="bg-primary text-white py-2 px-4 w-full flex items-center justify-center font-sans font-bold">
                SUPPORT US <span className="ml-2 text-lg">→</span>
              </button>
            </div>
            <Separator className="bg-black h-[0.0125rem]" />
            <div className="pt-4 mb-2">
              <SidebarMenu>
                {secondaryNavItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url} className="font-mono text-xl">
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </div>
            <AuthButton />
            <Separator className="mt-4 bg-black h-[0.0125rem]" />
            <div className="pt-4 mb-2">
              <SidebarMenu>
                {finalNavItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url} className="font-mono text-md" target="_blank">
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </div>
            
            {/* Footer section */}
            <div className="mt-6 p-4 border-gray-200">
              <div className="flex items-center gap-4 mb-5">
                {/* Social Media Icons using Lucide React */}
                <a href="#" aria-label="Facebook"><Facebook className="h-5 w-5 text-gray-500" /></a>
                <a href="#" aria-label="Twitter"><Twitter className="h-5 w-5 text-gray-500" /></a>
                {/* For 'M', you might use a generic media icon or keep it as text if no suitable icon */}
                <a href="#" aria-label="Medium?"><span className="text-gray-500 text-xl font-bold">M</span></a>
                <a href="#" aria-label="YouTube"><Youtube className="h-5 w-5 text-gray-500" /></a>
                <a href="#" aria-label="Instagram"><Instagram className="h-5 w-5 text-gray-500" /></a>
                <a href="#" aria-label="LinkedIn"><Linkedin className="h-5 w-5 text-gray-500" /></a>
                {/* For the bullet point and parenthesis, you might use MoreHorizontal or just keep them as text */}
                <a href="#" aria-label="More"><MoreHorizontal className="h-5 w-5 text-gray-500" /></a>
                <a href="#" aria-label="Parenthesis"><span className="text-gray-500 text-xl font-bold">)</span></a>

              </div>
              <div className="flex flex-col justify-center">

                <p className="text-xs text-gray-600 mb-3">© PAREWA</p>
                <p className="text-xs text-gray-600 mb-3">ALL RIGHTS RESERVED</p>
                <div className="flex space-x-4">
                  <a href="#" className="text-xs text-gray-500">TERMS OF USE</a>
                  <a href="#" className="text-xs text-gray-500">PRIVACY</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}