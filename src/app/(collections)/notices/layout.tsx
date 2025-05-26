import AuthProvider from "@/context/AuthProvider";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Roboto, Oswald, Bebas_Neue } from "next/font/google";
import Footer from "@/components/collections_footer";
import "@/app/globals.css";
import Link from "next/link";

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

const bebas_neue = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-bebas_neue',
});

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={`${roboto.variable} ${oswald.variable} ${bebas_neue.variable}`}>


          <SidebarProvider defaultOpen={false}>
            <AppSidebar />
            <SidebarInset>
              {/* Header - positioned absolutely over the carousel */}
              <div className="flex">

                <header className="sticky top-0 left-0 w-full z-20 flex shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 bg-secondary-background max-w-[375px] h-[125px] display-inline">
                  <div className="flex items-center justify-between w-full p-6 bg-opacity-30 text-white">
                    <div className="flex items-center gap-2">
                      <SidebarTrigger className="mr-2" />
                      <Link href={"/"}>
                      <p className="text-xl font-sans md:text-4xl font-bold">परेवा_</p>
                      </Link>
                    </div>
                  </div>
                </header>


                <main className="w-full h-full pl-4">
                  {children}
                </main>
              </div>
              <Footer />
            </SidebarInset>
          </SidebarProvider>
        </body>
      </AuthProvider>
    </html>
  )
}