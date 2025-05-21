import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";

import AuthProvider from "@/context/AuthProvider";

import { Toaster } from "@/components/ui/toaster";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react"

import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"


export const metadata: Metadata = {
  title: "Parewa | 6000E +2 CS",
  description: "Parewa is a media platform developeed and managed by the students of BNKS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className="">
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <header className="flex h-20 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                <div className="flex items-center gap-2 px-4">
                  <SidebarTrigger className="-ml-1" />      
                </div>
                <div className="flex cloumn justify-between w-full">
                  <p className="text-xl font-bold text-center">परेवा</p>
                  <div className="flex column mx-[2em] gap-3">
                    <Input className="w-[20em]" type="text" placeholder="Search </>"/>
                    <Button variant="secondary">Theme Toggle</Button>
                  </div>
                </div>

              </header>
              <main className="w-full h-full px-5">
                {children}
              </main>
            </SidebarInset>
          </SidebarProvider>
          <Toaster />
        </body>
      </AuthProvider>
    </html>
  );
}
