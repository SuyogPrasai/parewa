import { ReactNode, Suspense } from 'react';
import '@/app/globals.css';

import AuthProvider from '@/context/AuthProvider';
import Link from 'next/link';
import { Roboto, Oswald, Bebas_Neue, Lato } from 'next/font/google';

import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/sidebar/Sidebar';
import Footer from '@/components/collections/CollectionsFooter';
import { Separator } from '@/components/ui/separator';
import ScrollFadeIn from '@/components/home/ScrollDown';
import { Navbar } from '@/components/collections/CollectionNavbar';
import { main_metadata } from "@/config/site-config";


// Font configurations
const roboto = Roboto({
  subsets: ['latin'],
  weight: '300',
  variable: '--font-roboto',
});

const oswald = Oswald({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-oswald',
});

const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-bebas_neue',
});

const lato = Lato({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-lato',
})

export const metadata = main_metadata;

// Header component
const DashboardHeader: React.FC = () => (
  <header className="sticky top-0 z-50 w-full lg:w-[400px] bg-secondary-background h-[125px]">
    <div className="flex items-center justify-between w-full p-6 bg-opacity-30 text-white mt-3">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="mr-2" />
        <Link href="/">
          <p className="text-3xl md:text-4xl font-sans font-bold">परेवा_</p>
        </Link>
      </div>
    </div>
  </header>
);

const navLinks = [
  { name: 'Literature', href: '#' },
  { name: 'Science', href: '#' },
  { name: 'National', href: '#' },
  { name: 'World', href: '#' },
  { name: 'BNKS', href: '#' },
];

interface DashboardLayoutProps {
  children: ReactNode;
}

const wordpress_ip = process.env.WORDPRESS_SITE_IP || "";


export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${oswald.variable} ${bebasNeue.variable} ${lato.variable}`}>
        <AuthProvider>
          <SidebarProvider defaultOpen={false}>
            <AppSidebar wordpress_ip={wordpress_ip} />
            <SidebarInset>
              <div className="flex flex-col  lg:flex-row lgplus:max-w-[1400px]">
                <div className="flex flex-col w-full lg:w-auto">
                  <DashboardHeader />
                  <ScrollFadeIn />
                </div>
                <Separator orientation='vertical' className='hidden lg:block lg:h-auto lg:w-[1px] bg-gray-200' />
                <main className="w-full h-full lg:pl-4">
                  <Suspense fallback={<div>Loading...</div>}>
                    <Navbar navLinks={navLinks} type="article" wordpress_ip={wordpress_ip} />
                  </Suspense>
                  {children}
                </main>
              </div>
              <Footer />
            </SidebarInset>
          </SidebarProvider>
        </AuthProvider>
      </body>
    </html>
  );
}