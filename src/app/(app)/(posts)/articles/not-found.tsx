export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100px-4 font-inter text-gray-800">
      <h1 className="font-oswald text-6xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 drop-shadow-md">
        404
      </h1>
      <p className="mt-4 font-roboto text-lg sm:text-xl lg:text-xl text-gray-600 max-w-md text-center leading-relaxed">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>
      <a
        href="/"
        className="mt-6 px-6 py-3 font-oswald text-lg bg-blue-500 text-white font-semibold shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300"
      >
        Return to Home
      </a>
    </div>
  );
}