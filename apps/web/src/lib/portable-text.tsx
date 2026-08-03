import Image from "next/image";
import type { PortableTextComponents } from "@portabletext/react";

import { urlFor } from "@/sanity/image";

export const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-6 leading-loose font-serif text-lg text-muted">
        {children}
      </p>
    ),
    h1: ({ children }) => (
      <h1 className="font-heading text-5xl font-extrabold uppercase tracking-tight mt-12 mb-5 text-foreground leading-tight">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="font-heading text-3xl font-extrabold uppercase tracking-tight mt-10 mb-4 text-foreground border-t-2 border-primary pt-5 leading-tight">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-heading text-2xl font-bold uppercase tracking-tight mt-8 mb-3 text-foreground leading-tight">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="font-heading text-xl font-bold uppercase mt-6 mb-2 text-foreground leading-tight">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-10 mx-auto max-w-xl text-center">
        <span className="block font-serif text-2xl sm:text-3xl leading-snug italic text-foreground">
          <span className="font-heading not-italic text-primary mr-1 text-5xl">&ldquo;</span>
          {children}
          <span className="font-heading not-italic text-primary ml-1 text-5xl">&rdquo;</span>
        </span>
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-6 space-y-2 pl-5 list-disc font-serif text-xl leading-loose text-foreground marker:text-primary">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mb-6 space-y-2 pl-5 list-decimal font-serif text-xl leading-loose text-foreground marker:text-primary">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold text-foreground">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    underline: ({ children }) => <span className="underline underline-offset-2">{children}</span>,
    "strike-through": ({ children }) => <s className="text-muted-foreground">{children}</s>,
    code: ({ children }) => (
      <code className="bg-accent text-foreground font-mono text-[0.875em] px-1.5 py-0.5 rounded-sm">
        {children}
      </code>
    ),
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target={value?.blank ? "_blank" : "_self"}
        rel={value?.blank ? "noopener noreferrer" : undefined}
        className="text-primary underline underline-offset-2 decoration-primary/40 hover:decoration-primary transition-all"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) return null;
      return (
        <figure className="my-10 -mx-5 sm:mx-0">
          <div className="relative w-full aspect-16/10 bg-muted">
            <Image
              src={urlFor(value).url()}
              alt={value.alt ?? ""}
              fill
              className="object-cover"
            />
          </div>
          {value.caption && (
            <figcaption className="mt-2 px-5 sm:px-0 text-sm text-muted-foreground font-primary leading-snug">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

