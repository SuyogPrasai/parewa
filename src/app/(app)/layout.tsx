import type { Metadata } from "next";
import "../globals.css";

import AuthProvider from "@/context/AuthProvider";

import { Toaster } from "@/components/ui/toaster";
import { Input } from "@/components/ui/input";

import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { AppSidebar } from "@/components/app-sidebar";
import Footer from "@/components/footer";
import { CarouselHome } from "@/components/app-carousel";

import { Roboto, Oswald, Bebas_Neue} from "next/font/google";

const roboto = Roboto({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-roboto',
});

const oswald = Oswald({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-oswald',
});

const bebas_neue = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-bebas_neue',
});

export const metadata: Metadata = {
  title: "परेवा_ - Your Source for Notices, Articles & News",
  description: "Parewa is a media platform developed and managed by the students of BNKS",
};

const slides = [
  { id: 1, image: '/carousel_background_2.jpg', title: 'Sadness is but a wall between two gardens', author: 'Kahlil Gibran' },
  { id: 2, image: '/carousel_background_2.jpg', title: 'Sadness is but a wall between two gardens', author: 'Kahlil Gibran' },
  { id: 3, image: '/carousel_background_2.jpg', title: 'Sadness is but a wall between two gardens', author: 'Kahlil Gibran' },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={`${roboto.variable} ${oswald.variable} ${bebas_neue.variable}`}>

          <SidebarProvider defaultOpen={false}>
            <AppSidebar />
            <SidebarInset>
              {/* Header - positioned absolutely over the carousel */}
              <header className="absolute top-0 left-0 w-full z-20 flex h-20 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                <div className="flex items-center justify-between w-full p-6 bg-opacity-30 text-white">
                  <div className="flex items-center gap-2">
                    <SidebarTrigger className="mr-2" />
                    <p className="text-xl font-sans md:text-4xl font-bold">परेवा_</p>
                  </div>
                  <div className="hidden items-center gap-3 md:flex">
                    <Input
                      className="w-[20em] bg-white bg-opacity-20 border-none placeholder-gray-300 text-black"
                      type="text"
                      placeholder="Search </>"
                    />
                    <a
                      href="/signin"
                      className="bg-primary-high_bright text-white py-1 px-4 rounded-md font-medium font-mono text-lg tracking-wide hover:bg-primary"
                    >
                      Sign In
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