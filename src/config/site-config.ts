// src/config/site-config.ts
import type { Metadata } from "next";


export const main_metadata: Metadata = {
  title: "परेवा_ - Your Source for Notices, Articles & News",
  description: "Parewa is a media platform developed and managed by the students of BNKS",
  icons: {
    icon: [
      { url: "/favicon/favicon.ico" },
      { url: "/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/favicon/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "manifest",
        url: "/favicon/site.webmanifest",
      },
    ],
  },
  other: {
    "apple-mobile-web-app-title": "परेवा_",
  },
};


export const slides = [
  {
    id: 1,
    image: "/carousel_backend_3.jpg",
    title: "Your world, your news, know what matters",
    author: "",
  },
  {
    id: 2,
    image: "/crop.jpg",
    title: "I think that I shall never see A poem lovely as a tree",
    author: "Joyce Kilmer",
  },
  {
    id: 3,
    image: "/trophy.jpg",
    title: "Winning isn’t everything, but wanting to win is",
    author: "Vince Lombardi",
  },
];

// Pagination Stuff
export const article_link = "/articles/article?id=";
export const notice_link = "/notices/notice?id=";

export const ITEMS_PER_PAGE = 8;
export const MAX_PAGES_TO_SHOW = 5;