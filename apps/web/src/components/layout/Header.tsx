import Link from "next/link";

import { SidebarTrigger2 } from "@/components/ui/sidebar";

export function Header({ title }: { title: string }) {
  return (
    <header className="absolute top-0 left-0 z-20 w-full h-20 flex items-center transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex items-center justify-between w-full p-6 text-primary-foreground">
        <div className="flex items-center gap-2">
          <SidebarTrigger2 className="mr-2 hover:bg-transparent hover:text-primary-foreground cursor-pointer" />
          <Link href="/">
            <p className="text-4xl font-bold font-sans">{title}</p>
          </Link>
        </div>
      </div>
    </header>
  );
}