import { create } from 'zustand';
import { sanityClient, urlFor } from '../sanityClient';

const useBlogStore = create((set, get) => ({
  blogPosts: [],
  loading: false,
  error: null,
  lastFetched: 0,
  forceFetchDev: false, // Development switch

  fetchBlogPosts: async () => {
    const { loading, lastFetched, forceFetchDev } = get();
    const now = Date.now();
    const thirtyMinutes = 30 * 60 * 1000;

    // Check if a fetch is already in progress or if cached data is recent (in production)
    if (loading) {
      return; // Prevent multiple simultaneous fetches
    }

    const shouldFetch = process.env.NODE_ENV !== 'production' ?
      forceFetchDev || (now - lastFetched > 100) : // In development, fetch if forceFetchDev is true or if it's been more than 100ms since last fetch (to avoid rapid fetches on component re-renders without forceFetch)
      now - lastFetched > thirtyMinutes; // In production, fetch if 30 minutes have passed

    if (!shouldFetch && get().blogPosts.length > 0) {
        console.log('Using cached data');
        set({ loading: false, error: null }); // Ensure loading is false if using cache
        return; // Use cached data if available and recent
    }

    set({ loading: true, error: null });
    console.log('Fetching blog posts...');

    try {
      const data = await sanityClient.fetch(
        `*[_type == "post"] | order(_createdAt desc) {
           _id,
           title,
           slug,
           mainImage,
           excerpt,
           body,
           _createdAt,
           "authorName": author->name,
           "category": categories[]->title,
           "tags": tags[]->name
         }`
      );

      if (Array.isArray(data)) {
        set({ blogPosts: data, lastFetched: Date.now(), loading: false, error: null });
      } else {
        set({ error: "Received invalid data format.", blogPosts: [], loading: false });
      }
    } catch (err) {
      console.error("Error fetching data from Sanity:", err);
      set({ error: "Failed to load posts. Please check connection or query.", loading: false });
    }
  },

  toggleForceFetchDev: () => set((state) => ({ forceFetchDev: !state.forceFetchDev })),
}));

export default useBlogStore; 