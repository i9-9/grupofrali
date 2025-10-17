import { getStatistics, getHomeGalleryProjects, getHomePageData } from "@/lib/contentful";
import HomePage from "@/components/HomePage";

// Enable ISR (Incremental Static Regeneration)
// Revalidate every 5 minutes (300 seconds) for better cache performance
export const revalidate = 300;

export default async function Home() {
  // Fetch data server-side at build time / on-demand
  const [statistics, homeGalleryProjects, homePageData] = await Promise.all([
    getStatistics(),
    getHomeGalleryProjects(),
    getHomePageData()
  ]);

  // OPCIÓN A: Procesar desde ContentfulVideoWithPoster (RECOMENDADO - video+poster en un entry)
  const processVideoEntries = (videoEntries?: Array<{ fields: { video: { fields: { file: { url: string } } }, poster?: { fields: { file: { url: string } } } } }>) => {
    if (!videoEntries || videoEntries.length === 0) return undefined;

    return videoEntries.map(entry => ({
      src: `https:${entry.fields.video.fields.file.url}`,
      poster: entry.fields.poster ? `https:${entry.fields.poster.fields.file.url}` : undefined
    }));
  };

  // OPCIÓN B: Procesar desde arrays separados (FALLBACK - menos confiable)
  const processVideosSeparate = (videos?: Array<{ fields: { file: { url: string } } }>, posters?: Array<{ fields: { file: { url: string } } }>) => {
    if (!videos || videos.length === 0) return undefined;

    return videos.map((video, index) => ({
      src: `https:${video.fields.file.url}`,
      poster: posters?.[index] ? `https:${posters[index].fields.file.url}` : undefined
    }));
  };

  // Intentar OPCIÓN A primero, si no existe usar OPCIÓN B (retrocompatibilidad)
  const videosDesktop = homePageData?.fields.heroVideosDesktop
    ? processVideoEntries(homePageData.fields.heroVideosDesktop)
    : processVideosSeparate(homePageData?.fields.videosDesktop, homePageData?.fields.postersDesktop);

  const videosMobile = homePageData?.fields.heroVideosMobile
    ? processVideoEntries(homePageData.fields.heroVideosMobile)
    : processVideosSeparate(homePageData?.fields.videosMobile, homePageData?.fields.postersMobile);

  return (
    <HomePage
      statistics={statistics}
      homeGalleryProjects={homeGalleryProjects}
      videosDesktop={videosDesktop}
      videosMobile={videosMobile}
    />
  );
}
