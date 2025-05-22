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
import Footer from "@/components/footer";

import { CarouselHome } from "@/components/app-carousel";

export const metadata: Metadata = {
  title: "Parewa | 6000E +2 CS",
  description: "Parewa is a media platform developeed and managed by the students of BNKS",
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
              {/* Header - positioned absolutely over the carousel */}
              <header className="absolute top-0 left-0 w-full z-20 flex h-20 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                <div className="flex justify-between items-center w-full p-4 md:p-6 bg-opacity-30 text-white">
                  <p className="text-xl md:text-2xl font-bold text-center">परेवा</p>
                  <div className="flex items-center mx-[2em] gap-3">
                    <Input className="w-[20em] bg-white bg-opacity-20 border-none placeholder-gray-300 text-white" type="text" placeholder="Search </>" />
                    <Button variant="secondary" className="bg-white bg-opacity-30 text-white hover:bg-white hover:bg-opacity-40">Theme Toggle</Button>
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
        </body>
      </AuthProvider>
    </html>
  );
}
