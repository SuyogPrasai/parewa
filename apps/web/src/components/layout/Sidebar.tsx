import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";

import {
  Sidebar,
  SidebarContent,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { HOME_LAYOUT_QUERY_RESULT } from "@/sanity/types";

import { SidebarSearch } from "./SidebarSearch";

type NavLinkData = {
  url?: string | null;
  label?: string | null;
  openInNewTab?: boolean | null;
};

function NavLink({
  data,
  className,
}: {
  data: NavLinkData | null | undefined;
  className: string;
}) {
  if (!data?.url || !data?.label) return null;

  return (
    <li className="mb-3 list-none">
      <Link
        href={data.url}
        target={data.openInNewTab ? "_blank" : undefined}
        rel={data.openInNewTab ? "noopener noreferrer" : undefined}
        className={className}
      >
        {data.label.toUpperCase()}
      </Link>
    </li>
  );
}

export function AppSidebar({ general }: { general: HOME_LAYOUT_QUERY_RESULT }) {
  return (
    <Sidebar
      variant="sidebar"
      collapsible="offcanvas"
      className="fixed z-[100] bg-background"
    >
      <SidebarContent>
        <div className="flex flex-col h-full px-8 py-10">
          <div className="flex items-center justify-between mb-4">
            <Link
              href="/"
              className="text-3xl font-extrabold flex items-center gap-3"
            >
              <Image src="/logo.png" alt="Parewa Logo" width={64} height={64} />
              {general?.logoText}
            </Link>
            <SidebarTrigger className="text-foreground hover:bg-transparent hover:text-foreground cursor-pointer" />
          </div>

          <div className="mt-5 px-5 pr-10">
            <SidebarSearch />

            <ul className="mt-5">
              {general?.categories?.map((item) => (
                <SidebarMenuItem
                  key={item.slug ?? item.title}
                  className="mb-3 list-none text-base font-extrabold"
                >
                  <Link href={`/articles?category=${item.slug ?? ""}`}>
                    {item.title?.toUpperCase()}
                  </Link>
                </SidebarMenuItem>
              ))}
            </ul>

            <ul className="mt-4">
              <NavLink
                data={general?.supportUs}
                className="mb-3 list-none text-base font-extrabold p-4 cursor-pointer bg-primary text-primary-foreground block"
              />
              <NavLink
                data={general?.about}
                className="mb-3 list-none text-base font-extrabold p-4 cursor-pointer text-foreground bg-accent border-2 border-foreground block"
              />

              <div className="links my-4">
                {general?.links && (
                  <div className="flex flex-col text-base font-mono font-bold">
                    {general.links.map((link) => (
                      <Link
                        key={link.label}
                        href={link.url ?? "#"}
                        target={link.openInNewTab ? "_blank" : undefined}
                        rel={link.openInNewTab ? "noopener noreferrer" : undefined}
                        className="p-2 rounded-md hover:bg-accent transition-colors text-muted"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <NavLink
                data={general?.sebsdb}
                className="mb-3 list-none text-base font-extrabold p-4 cursor-pointer text-foreground bg-accent border-2 border-foreground block"
              />
            </ul>

            {general?.socials && general.socials.length > 0 && (
              <div className="flex flex-row mt-6">
                {general.socials.map((social) => (
                  <Link
                    key={social.platform}
                    href={social.url || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label ?? social.platform ?? "social link"}
                    className="p-2 rounded-md hover:bg-accent transition-colors text-muted"
                  >
                    {social.icon && (
                      <Icon icon={social.icon} width={22} height={22} />
                    )}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="mt-auto border-t border-border px-8 py-5 text-muted-foreground font-mono">
            <p className="mt-0.5 text-xs">
              &copy; {new Date().getFullYear()} All rights reserved.
            </p>
            <div className="flex gap-3 mt-2 text-xs">
              {general?.terms && (
                <Link
                  href={general.terms}
                  className="hover:text-foreground underline underline-offset-2 transition-colors"
                >
                  Terms of Service
                </Link>
              )}
              {general?.privacy && (
                <Link
                  href={general.privacy}
                  className="hover:text-foreground underline underline-offset-2 transition-colors"
                >
                  Privacy Policy
                </Link>
              )}
            </div>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}