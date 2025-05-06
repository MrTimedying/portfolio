// src/sanityClient.js
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// Use environment variables for sensitive data like projectId and dataset
const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
const dataset = import.meta.env.VITE_SANITY_DATASET; // e.g., 'production'
const apiVersion = '2021-10-21'; // Use a recent API version date

if (!projectId || !dataset) {
  throw new Error(
    "VITE_SANITY_PROJECT_ID and VITE_SANITY_DATASET must be defined in your .env file"
  );
}

export const sanityClient = createClient({
  projectId: projectId,
  dataset: dataset,
  apiVersion: apiVersion, // use a UTC date string
  useCdn: false, // `false` if you want to ensure fresh data (useful during development)
  // token: 'SANITY_API_READ_TOKEN', // Only required for authenticated requests or drafting
});

// Helper function for generating image URLs with the Sanity client
const builder = imageUrlBuilder(sanityClient);

export function urlFor(source) {
  if (!source) {
    // Return a placeholder or null if the source is invalid
    console.warn("Invalid image source passed to urlFor:", source);
    return null; // Or return a placeholder image URL
  }
  return builder.image(source);
}
