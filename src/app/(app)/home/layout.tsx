import { ReactNode } from "react";
import "@/app/globals.css";

import { Roboto, Lato, Oswald, Bebas_Neue } from "next/font/google";
import AuthProvider  from "@/context/AuthProvider";

import  Footer  from "@/components/layout/Footer";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";
import { Separator } from "@/components/ui/separator";
import { AppSidebar } from "@/components/layout/sidebar/Sidebar";
import { CarouselHome } from "@/components/home/Carousel";
import { Header } from "@/components/layout/Header";

import { main_metadata, slides } from "@/config/site-config";

const roboto = Roboto({
  subsets: ["latin"],
  weight: "300",
  variable: "--font-roboto",
});

const oswald = Oswald({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-oswald",
});

const bebas_neue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas_neue",
});

const lato = Lato({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-lato',
})

export const metadata = main_metadata;

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${lato.variable}  ${oswald.variable} ${bebas_neue.variable}`}>
        <AuthProvider>
          {/* PreloaderWrapper is commented out as per original code */}
          {/* <PreloaderWrapper> */}
          <SidebarProvider defaultOpen={false}>
            <AppSidebar />
            <SidebarInset>
              {/* Header with sidebar trigger and branding */}
              <Header />
              {/* Carousel as the background */}
              <CarouselHome slides={slides} />
              <Separator orientation="horizontal" />
              {/* Main content area */}
              <main className="w-full px-1 *:lg:px-5 min-h-screen">
                {children}
              </main>
              <Footer />
              <Toaster />
            </SidebarInset>
          </SidebarProvider>
          {/* </PreloaderWrapper> */}
        </AuthProvider>
      </body>
    </html>
  );
}