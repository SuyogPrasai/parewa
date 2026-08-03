import { createClient } from "next-sanity";

export const client = createClient({
  
  projectId: process.env.SANITY_STUDIO_PROJECT_ID,
  dataset: process.env.SANITY_STUDIO_DATASET,
  apiVersion: process.env.SANITY_STUDIO_API_VERSION,
  token: process.env.SANITY_STUDIO_TOKEN,
  useCdn: false,
});