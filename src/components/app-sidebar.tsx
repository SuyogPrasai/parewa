"use client";

import * as React from "react";
import {
  BookOpen,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { useSession } from "next-auth/react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession();

  // Extract user info from session
  const user = session?.user || {
    name: "Guest",
    email: "guest@example.com",
    avatar: "/avatars/default.jpg",
  };

  // Sample teams and navigation items (can be extended from session if available)
  const teams = [
    {
      name: "General",
      logo: GalleryVerticalEnd,
      plan: "Parewa",
    },
  ];

  const navMain = [
    {
      title: "Notices",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        { title: "General", url: "#" },
        { title: "Departments", url: "#" },
        { title: "School", url: "#" },
        { title: "Council", url: "#" },
        { title: "Clubs", url: "#" },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        { title: "Introduction", url: "#" },
        { title: "Get Started", url: "#" },
        { title: "Tutorials", url: "#" },
        { title: "Changelog", url: "#" },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        { title: "General", url: "#" },
        { title: "Account", url: "#" },
        { title: "Terms", url: "#" },
      ],
    },
  ];

  const projects = [
    { name: "Literature", url: "#", icon: Frame },
    { name: "Economy", url: "#", icon: Frame },
    { name: "Politics", url: "#", icon: PieChart },
    { name: "Science and Technology", url: "#", icon: Map },
  ];

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
        <NavProjects projects={projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
