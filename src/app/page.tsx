import { getStatistics, getHomeGalleryProjects, getHomePageData } from "@/lib/contentful";
import HomePage from "@/components/HomePage";

// Enable ISR (Incremental Static Regeneration)
// Revalidate every 5 minutes (300 seconds) for better cache performance
export const revalidate = 300;

export default async function Home() {
  // Fetch data server-side at build time / on-demand
  // All data is already cleaned in the fetch functions to prevent circular references
  const [statistics, homeGalleryProjects, homePageData] = await Promise.all([
    getStatistics(),
    getHomeGalleryProjects(),
    getHomePageData()
  ]);

  // OPCIÓN A: Procesar desde ContentfulVideoWithPoster (RECOMENDADO - video+poster en un entry)
  // Asegurar máxima calidad: usar URL original sin parámetros de compresión
  const processVideoEntries = (videoEntries?: Array<{ fields: { video: { fields: { file: { url: string } } }, poster?: { fields: { file: { url: string } } } } }>) => {
    if (!videoEntries || videoEntries.length === 0) return undefined;

    return videoEntries.map(entry => {
      // Obtener URL original del video sin modificaciones para máxima calidad
      const videoUrl = entry.fields.video.fields.file.url;
      // Asegurar que la URL comience con // (Contentful devuelve URLs sin protocolo)
      const fullVideoUrl = videoUrl.startsWith('//') ? `https:${videoUrl}` : videoUrl.startsWith('https:') ? videoUrl : `https://${videoUrl}`;
      
      const posterUrl = entry.fields.poster?.fields?.file?.url;
      const fullPosterUrl = posterUrl 
        ? (posterUrl.startsWith('//') ? `https:${posterUrl}` : posterUrl.startsWith('https:') ? posterUrl : `https://${posterUrl}`)
        : undefined;

      return {
        src: fullVideoUrl,
        poster: fullPosterUrl
      };
    });
  };

  // OPCIÓN B: Procesar desde arrays separados (FALLBACK - menos confiable)
  // Asegurar máxima calidad: usar URL original sin parámetros de compresión
  const processVideosSeparate = (videos?: Array<{ fields: { file: { url: string } } }>, posters?: Array<{ fields: { file: { url: string } } }>) => {
    if (!videos || videos.length === 0) return undefined;

    return videos.map((video, index) => {
      const videoUrl = video.fields.file.url;
      const fullVideoUrl = videoUrl.startsWith('//') ? `https:${videoUrl}` : videoUrl.startsWith('https:') ? videoUrl : `https://${videoUrl}`;
      
      const posterUrl = posters?.[index]?.fields?.file?.url;
      const fullPosterUrl = posterUrl
        ? (posterUrl.startsWith('//') ? `https:${posterUrl}` : posterUrl.startsWith('https:') ? posterUrl : `https://${posterUrl}`)
        : undefined;

      return {
        src: fullVideoUrl,
        poster: fullPosterUrl
      };
    });
  };

  // Intentar OPCIÓN A primero, si no existe usar OPCIÓN B (retrocompatibilidad)
  const videosDesktop = homePageData?.fields.heroVideosDesktop
    ? processVideoEntries(homePageData.fields.heroVideosDesktop)
    : processVideosSeparate(homePageData?.fields.videosDesktop, homePageData?.fields.postersDesktop);

  const videosMobile = homePageData?.fields.heroVideosMobile
    ? processVideoEntries(homePageData.fields.heroVideosMobile)
    : processVideosSeparate(homePageData?.fields.videosMobile, homePageData?.fields.postersMobile);

  // Los datos ya están limpios porque la limpieza se hace en las funciones de fetch
  // cleanCircularReferencesFromProjects ya se aplica en getHomeGalleryProjects()
  const cleanedHomeGalleryProjects = homeGalleryProjects;

  return (
    <HomePage
      statistics={statistics}
      homeGalleryProjects={cleanedHomeGalleryProjects}
      videosDesktop={videosDesktop}
      videosMobile={videosMobile}
    />
  );
}
