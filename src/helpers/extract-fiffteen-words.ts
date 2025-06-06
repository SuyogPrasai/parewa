import striptags from "striptags"; // Import striptags library

// Function to extract first 15 words from HTML content
export default function extractFirst15Words(htmlContent: any): string {
  // Strip HTML tags
  const plainText = striptags(htmlContent);
  // Split into words and take first 15
  const words = plainText.trim().split(/\s+/).slice(0, 15);
  // Join back into a string
  return words.join(" ");
}