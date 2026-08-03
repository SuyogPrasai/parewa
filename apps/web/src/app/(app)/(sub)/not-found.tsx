import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-foreground w-full">
      <h1 className="font-heading text-6xl sm:text-4xl lg:text-5xl font-extrabold text-foreground drop-shadow-md">
        404
      </h1>
      <p className="mt-4 text-lg sm:text-xl lg:text-xl text-foreground max-w-md text-center leading-relaxed">
        Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-6 px-6 py-3 font-heading text-lg bg-primary text-primary-foreground font-semibold shadow-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300"
      >
        Return to Home
      </Link>
    </div>
  );
}