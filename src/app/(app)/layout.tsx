import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";

import AuthProvider from "@/context/AuthProvider";

import { Toaster } from "@/components/ui/toaster";

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
                  <Separator orientation="vertical" className="h-8" />                </div>
                  <p className="text-xl font-bold">Parewa</p>
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
