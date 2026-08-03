import "@/app/globals.css";

export { metadata } from "@/lib/site-config";

import { defineQuery } from "next-sanity";

import Footer from "@/components/layout/Footer";
import { AppSidebar } from "@/components/layout/Sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { inter, notoSerif, oswald, roboto,robotoMono } from "@/lib/fonts";

import { sanityFetch, SanityLive } from "@/sanity/live";

const HOME_LAYOUT_QUERY = defineQuery(`
  *[_type == "general"][0]{
    logoText,
    categories[]->{
      "slug": slug.current,
       title 
    },
    socials[]->{
      "icon": icon.name,
      label,
      platform,
      url
    },
    privacy,
    terms,
    sebsdb->{
      label,
      openInNewTab,
      url
    },
    supportUs->{
      label,
      openInNewTab,
      url
    },
    about->{
      label,
      openInNewTab,
      url
    },
    links[]->{
      label,
      openInNewTab,
      url
    }
  }
`);

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const { data: general } = await sanityFetch({ query: HOME_LAYOUT_QUERY });

  return (
    <html
      lang="en"
      className={`${oswald.variable} ${inter.variable} ${notoSerif.variable} ${robotoMono.variable} ${roboto.variable} h-full antialiased`}
    >
      <head>
        <meta name="apple-mobile-web-app-title" content="Parewa" />
      </head>
      <body className="min-h-full flex flex-col">
        <SidebarProvider defaultOpen={false}>
          <AppSidebar general={general} />
          <SidebarInset>
            {children}
            <Footer />
            <SanityLive />
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  );
}
