import { ReactNode } from "react";
import { Roboto, Lato, Oswald, Bebas_Neue } from "next/font/google";
import "../globals.css";

// Components
import AuthProvider  from "@/context/AuthProvider";
import { Toaster } from "@/components/ui/toaster";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import  Footer  from "@/components/footer";
import { CarouselHome } from "@/components/app-carousel";
import { Header } from "@/components/header";

// Configuration
import { main_metadata, slides } from "@/config/site-config";

// Fonts
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
              <main className="w-full px-5 min-h-screen">
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