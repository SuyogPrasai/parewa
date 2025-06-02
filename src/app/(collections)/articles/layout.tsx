import { ReactNode } from 'react';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import AuthProvider from '@/context/AuthProvider';
import { Roboto, Oswald, Bebas_Neue } from 'next/font/google';
import Footer from '@/components/collections_footer';
import Link from 'next/link';
import '@/app/globals.css';
import { Metadata } from 'next';
import { Separator } from '@/components/ui/separator';

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

export const metadata: Metadata = {
  title: "परेवा_ - Your Source for Notices, Articles & News",
  description: "Parewa is a media platform developed and managed by the students of BNKS",
};

// Header component
const DashboardHeader: React.FC = () => (
  <div className="flex">
    <header className="sticky top-0 left-0 z-20 flex shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 bg-secondary-background w-[375px] h-[125px] display-inline">
      <div className="flex items-center justify-between w-full p-6 bg-opacity-30 text-white">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="mr-2" />
          <Link href="/">
            <p className="text-xl font-sans md:text-4xl font-bold">परेवा_</p>
          </Link>
        </div>
      </div>
    </header>
  </div>
);

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${oswald.variable} ${bebasNeue.variable}`}>
        <AuthProvider>
          <SidebarProvider defaultOpen={false}>
            <AppSidebar />
            <SidebarInset>
              <div className="flex">

              <DashboardHeader />
              <Separator orientation='vertical' className='h-full'/>
              <main className="w-full h-full pl-4">{children}</main>
              </div>
              <Footer />
            </SidebarInset>
          </SidebarProvider>
        </AuthProvider>
      </body>
    </html>
  );
}