import "@/app/globals.css";
import Link from "next/link";

import { inter, notoSerif, oswald, roboto, robotoMono } from "@/lib/fonts";

export const metadata = {
  title: "404 - Page Not Found",
};

export default function GlobalNotFound() {
  return (
    <html
      lang="en"
      className={`${oswald.variable} ${inter.variable} ${notoSerif.variable} ${robotoMono.variable} ${roboto.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <div className="flex min-h-screen w-full flex-col items-center justify-center px-4 text-foreground">
          <h1 className="font-heading text-6xl font-extrabold text-foreground drop-shadow-md sm:text-4xl lg:text-5xl">
            404
          </h1>
          <p className="mt-4 max-w-md text-center text-lg leading-relaxed text-foreground sm:text-xl lg:text-xl">
            Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <Link
            href="/"
            className="mt-6 bg-primary px-6 py-3 font-heading text-lg font-semibold text-primary-foreground shadow-md transition-colors duration-300 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Return to Home
          </Link>
        </div>
      </body>
    </html>
  );
}