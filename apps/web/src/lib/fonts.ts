import { Inter, Noto_Serif, Oswald, Roboto,Roboto_Mono } from "next/font/google";

const oswald = Oswald({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-oswald",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"]
});

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  variable: "--font-noto-serif",
  weight: ["400", "500", "600", "700"],
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
  weight: ["400", "500", "600", "700"],
});

const roboto = Roboto({
  subsets: ['latin'],
  weight: '300',
  variable: '--font-roboto',
});

export { inter, notoSerif, oswald, roboto,robotoMono };