"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { useSession } from "next-auth/react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "6229suyog",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "General",
      logo: GalleryVerticalEnd,
      plan: "Parewa",
    },
  ],
  navMain: [
    {
      title: "Notices",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Departments",
          url: "#",
        },
        {
          title: "School",
          url: "#",
        },
        {
          title: "Council",
          url: "#",
        },
        {
          title: "Clubs",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Account",
          url: "#",
        },
        {
          title: "Terms",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Literature",
      url: "#",
      icon: Frame,
    },
    {
      name: "Economy",
      url: "#",
      icon: Frame,
    },
    {
      name: "Politics",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Science and Technology",
      url: "#",
      icon: Map,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
