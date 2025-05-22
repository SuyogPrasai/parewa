import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";

import AuthProvider from "@/context/AuthProvider";

import { Toaster } from "@/components/ui/toaster";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { AppSidebar } from "@/components/app-sidebar";
import Footer from "@/components/footer";
import { CarouselHome } from "@/components/app-carousel";

export const metadata: Metadata = {
  title: "Parewa | 6000E +2 CS",
  description: "Parewa is a media platform developed and managed by the students of BNKS",
};

const slides = [
  { id: 1, image: '/carousel_background_2.jpg', title: 'Sadness is but a wall between two gardens.', author: 'Kahlil Gibran' },
];

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
              {/* Header - positioned absolutely over the carousel */}
              <header className="absolute top-0 left-0 w-full z-20 flex h-20 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                <div className="flex items-center justify-between w-full p-6 bg-opacity-30 text-white">
                  <div className="flex items-center gap-2">
                    <SidebarTrigger className="mr-2" />
                    <p className="text-xl font-sans md:text-4xl font-bold">परेवा_</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Input
                      className="w-[20em] bg-white bg-opacity-20 border-none placeholder-gray-300 text-black"
                      type="text"
                      placeholder="Search </>"
                    />
                    <a
                      href="/signup"
                      className="bg-blue-600 text-white py-1 px-4 rounded-md font-medium font-mono text-lg tracking-wide hover:bg-blue-700"
                    >
                      Sign Up
                    </a>
                  </div>
                </div>
              </header>

              {/* Carousel - acts as the background */}
              <CarouselHome slides={slides} />
              <Separator orientation="horizontal" className="" />
              <main className="w-full h-full px-5">
                {children}
              </main>
              <Footer />
              <Toaster />
            </SidebarInset>
          </SidebarProvider>
        </body>
      </AuthProvider>
    </html>
  );
}