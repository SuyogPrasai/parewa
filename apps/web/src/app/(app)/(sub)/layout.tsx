import "@/app/globals.css";

export { metadata } from "@/lib/site-config";

import { defineQuery } from "next-sanity";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { AppSidebar } from "@/components/layout/Sidebar";
import SubHeader from "@/components/layout/SubHeader";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { inter, notoSerif, oswald, roboto,robotoMono } from "@/lib/fonts";
import { sanityFetch, SanityLive } from "@/sanity/live";
import { CategoriesSchema, LinkSchema } from "@/schemas/backend_schemas/CategoriesSchema";

const SUB_LAYOUT_QUERY = defineQuery(`
  *[_type == "general"][0]{
    logoText,
    categories[]->{
      _id,
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

  const { data: general } = await sanityFetch({ query: SUB_LAYOUT_QUERY });

  const categories = general?.categories?.flatMap((category) => {
    const parsed = CategoriesSchema.safeParse(category);
    if (!parsed.success) return [];

    return [{
      _id: parsed.data._id,
      slug: parsed.data.slug,
      title: parsed.data.title
    }];
  }) || [];

  const supportUsParsed = LinkSchema.safeParse(general?.supportUs);

  const aboutParsed = LinkSchema.safeParse(general?.about);

  const supportUs = supportUsParsed.success
    ? supportUsParsed.data
    : {
      label: "Support Us",
      openInNewTab: false,
      url: "https://sebsna.org/donate/",
    };

  const about = aboutParsed.success
    ? aboutParsed.data
    : {
      label: "About Us",
      openInNewTab: false,
      url: "/about",
    };
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
            <div className="flex flex-col xl:flex-row xl:items-start">
              <SubHeader
                title={general?.logoText ?? ""}
                contribute={{
                  title: general?.supportUs?.label ?? "",
                  link: general?.supportUs?.url ?? "",
                }}
              />
              <div className="w-full border-l">
                <Navbar
                  categories={categories}
                  supportUs={supportUs}
                  about={about}
                  className="2xl:mx-auto max-w-7xl"
                />
                {children}
              </div>
            </div>
            <Footer />
            <SanityLive />
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  );
}
