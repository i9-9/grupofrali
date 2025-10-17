import { getStatistics, getHomeGalleryProjects } from "@/lib/contentful";
import HomePage from "@/components/HomePage";

// Enable ISR (Incremental Static Regeneration)
// Revalidate every 5 minutes (300 seconds) for better cache performance
export const revalidate = 300;

export default async function Home() {
  // Fetch data server-side at build time / on-demand
  const [statistics, homeGalleryProjects] = await Promise.all([
    getStatistics(),
    getHomeGalleryProjects()
  ]);

  return <HomePage statistics={statistics} homeGalleryProjects={homeGalleryProjects} />;
}
