import Link from "next/link";

import { cn } from "@/lib/utils";

import { Categories, Link as LinkType} from "@/schemas/backend_schemas/CategoriesSchema";

function Navbar({
  categories,
  supportUs,
  about,
  className,
}: {
  categories: Categories[];
  supportUs: LinkType;
  about: LinkType;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col lg:flex-row justify-between font-heading text-2xl font-extrabold", className)}>
      <ul className='flex text-center lg:text-start flex-col lg:flex-row'>
        {categories.map((category) => (
          <li
            key={category.slug}
            className={"p-5 cursor-pointer text-foreground"}>
            <Link href={`/articles?category=${category.slug}`}>
              {category.title.toUpperCase().split(" ")[0]}
            </Link>
          </li>
        ))}
      </ul>
      <ul className='flex text-center lg:text-start flex-col lg:flex-row'>
        {[supportUs, about].map((link, index) => (
          <li
            key={link.label}
            className={`p-5 py-7 cursor-pointer ${index === 1 ? "font-bold bg-primary text-primary-foreground md:pr-20" : "bg-accent"}`}
          >
            <Link href={link.url} target={link.openInNewTab ? "_blank" : "_self"} rel="noopener noreferrer">
              {link.label.toUpperCase()}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default Navbar