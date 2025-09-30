'use client'

import RandomVideo from "@/components/RandomVideo";
import ContentfulProjects from "@/components/ContentfulProjects";
import ContentfulStats from "@/components/ContentfulStats";
import Link from "next/link";
import ScrollArrow from "@/components/ScrollArrow";
import { getStatistics, getHomeGalleryProjects } from "@/lib/contentful";
import { useTranslations } from "@/hooks/useTranslations";
import { useEffect, useState } from "react";

function HomeContent() {
  const { t, isReady } = useTranslations();
  const [statistics, setStatistics] = useState<unknown[] | undefined>(undefined);
  const [homeGalleryProjects, setHomeGalleryProjects] = useState<unknown[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [statsData, projectsData] = await Promise.all([
          getStatistics(),
          getHomeGalleryProjects()
        ]);
        setStatistics(statsData);
        setHomeGalleryProjects(projectsData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Mostrar loading mientras se cargan las traducciones y los datos
  if (!isReady || isLoading) {
    return (
      <main>
        <div className="h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mx-auto mb-4"></div>
            <p className="text-sm text-gray-600">Cargando...</p>
          </div>
        </div>
      </main>
    );
  }
  
  return (
    <main>
      {/* Video Hero */}
      <section className="relative h-screen overflow-hidden">
        <RandomVideo type="mobile" />
        <RandomVideo type="desktop" />
        {/* Content over video */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center text-white"></div>
        </div>
        {/* Arrow bottom right */}
        <ScrollArrow />
      </section>

      {/* Desarrollo */}
      <section id="desarrollo-section" className="bg-[#EFEFEF]" style={{ paddingTop: 'clamp(4rem, 2.2vw, 8rem)' }}>
        <div className="w-full max-w-[1600px] mx-auto" style={{ paddingLeft: 'clamp(1rem, 0.4vw, 1.5rem)', paddingRight: 'clamp(1rem, 0.4vw, 1.5rem)' }}>
          <div className="grid grid-cols-6 md:grid-cols-12" style={{ gap: 'clamp(1rem, 0.4vw, 1.5rem)' }}>
            {/* TÍTULO - 6 columnas */}
            <div className="col-span-6 md:col-span-12 md:max-w-[60%]">
              {/* Mobile version - 4 líneas */}
              <h2 
                className="md:hidden font-baskerville text-black font-normal" 
                style={{ 
                  fontSize: 'clamp(40px, 10.2vw, 40px)', 
                  lineHeight: 'clamp(40px, 10.2vw, 40px)',
                  letterSpacing: '0%',
                  fontWeight: '400',
                  marginBottom: 'clamp(1rem, 0.5vw, 2rem)'
                }}
              >
                <div>{t("home.hero.titleMobileLine1")}</div>
                <div>{t("home.hero.titleMobileLine2")}</div>
                <div>{t("home.hero.titleMobileLine3")}</div>
                <div>{t("home.hero.titleMobileLine4")}</div>
              </h2>
              
              {/* Desktop/Tablet version - 2 líneas */}
              <h2 
                className="hidden md:block font-baskerville text-black font-normal" 
                style={{
                  fontSize: 'clamp(40px, 3.7vw, 56px)',
                  lineHeight: 'clamp(40px, 4.5vw, 68.14px)',
                  letterSpacing: '0%',
                  fontWeight: '400',
                  marginBottom: 'clamp(1rem, 0.5vw, 2rem)'
                }}
              >
                <div style={{ whiteSpace: 'nowrap' }}>{t("home.hero.titleLine1")}</div>
                <div style={{ whiteSpace: 'nowrap' }}>{t("home.hero.titleLine2")}</div>
              </h2>
            </div>

            {/* CONCEPTOS - arriba de stats izquierdas (columnas 1-5) */}
            <div className="col-span-6 md:col-start-1 md:col-end-6 flex flex-col order-2 md:order-1 md:pt-24 md:pb-32">
              <div className="flex justify-between items-center mt-auto pb-10 md:pb-0">
                <h3 
                  className="font-baskerville text-black font-normal leading-[100%] tracking-[0%]"
                  style={{
                    fontSize: 'clamp(13.66px, 1.15vw, 17.39px)', /* Mobile: 13.66px, Desktop: 17.39px */
                    lineHeight: '100%'
                  }}
                >
                  {t("home.concepts.vision")}
                </h3>
                <h3 
                  className="font-baskerville text-black font-normal leading-[100%] tracking-[0%]"
                  style={{
                    fontSize: 'clamp(13.66px, 1.15vw, 17.39px)', /* Mobile: 13.66px, Desktop: 17.39px */
                    lineHeight: '100%'
                  }}
                >
                  {t("home.concepts.innovation")}
                </h3>
                <h3 
                  className="font-baskerville text-black font-normal leading-[100%] tracking-[0%]"
                  style={{
                    fontSize: 'clamp(13.66px, 1.15vw, 17.39px)', /* Mobile: 13.66px, Desktop: 17.39px */
                    lineHeight: '100%'
                  }}
                >
                  {t("home.concepts.solidity")}
                </h3>
              </div>
            </div>

            {/* PÁRRAFO - arriba de stats derechas (columnas 8-12) */}
            <div className="col-span-6 md:col-start-8 md:col-end-13 order-1 md:order-2 flex flex-col md:pt-24 md:pb-32">
              <p 
                className="font-archivo text-black mt-auto font-normal leading-[100%] tracking-[0%] mb-20 md:mb-0"
                style={{
                  fontSize: 'clamp(16px, 1.27vw, 19.21px)', /* Mobile: 16px, Desktop: 19.21px */
                  lineHeight: '100%',
                }}
              >
                {t("home.description")}
              </p>
            </div>

            {/* ESTADÍSTICAS - Layout 5+2+5 en Desktop */}
            {/* Columna 1: Estadísticas izquierda (columnas 1-5) */}
            <div className="col-span-6 md:col-start-1 md:col-end-6 order-3 md:order-3" style={{ paddingBottom: 'clamp(1rem, 0.5vw, 2rem)' }}>
              {/* @ts-expect-error - Type mismatch with ContentfulStats component */}
              <ContentfulStats maxStats={3} startIndex={0} statistics={statistics} />
            </div>
            
            {/* Columna 2: Estadísticas derecha (columnas 8-12) */}
            <div className="col-span-6 md:col-start-8 md:col-end-13 order-4 md:order-4" style={{ paddingBottom: 'clamp(1rem, 0.5vw, 2rem)' }}>
              {/* @ts-expect-error - Type mismatch with ContentfulStats component */}
              <ContentfulStats maxStats={3} startIndex={3} statistics={statistics} />
            </div>
          </div>
        </div>
      </section>



      {/* Marquee Logos */}
      <section className="py-20 md:py-40 overflow-hidden bg-[#efefef]">
        <div className="w-full overflow-hidden">
          <div className="flex gap-32 w-max animate-marquee">
            {/* Primera iteración de logos */}
            <div className="flex items-center gap-32">
              <div className="shrink-0 flex items-center justify-center">
                <picture>
                  <source
                    srcSet="/images/logos/sofitel.png"
                    type="image/webp"
                  />
                  <img
                    src="/images/logos/sofitel.png"
                    alt="Sofitel"
                    width={120}
                    height={80}
                    className="h-28 w-auto object-contain"
                  />
                </picture>
              </div>
              <div className="shrink-0 flex items-center justify-center">
                <picture>
                  <source
                    srcSet="/images/logos/cardales.png"
                    type="image/webp"
                  />
                  <img
                    src="/images/logos/cardales.png"
                    alt="Cardales"
                    width={120}
                    height={144}
                    className="h-48 w-auto object-contain"
                  />
                </picture>
              </div>
              <div className="shrink-0 flex items-center justify-center">
                <picture>
                  <source srcSet="/images/logos/regina.png" type="image/webp" />
                  <img
                    src="/images/logos/regina.png"
                    alt="Regina"
                    width={120}
                    height={96}
                    className="h-32 w-auto object-contain"
                  />
                </picture>
              </div>
              <div className="shrink-0 flex items-center justify-center">
                <picture>
                  <source
                    srcSet="/images/logos/septiembre.png"
                    type="image/webp"
                  />
                  <img
                    src="/images/logos/septiembre.png"
                    alt="Septiembre"
                    width={120}
                    height={80}
                    className="h-24 w-auto object-contain"
                  />
                </picture>
              </div>
            </div>
            {/* Segunda iteración (duplicada para efecto infinito) */}
            <div className="flex items-center gap-32">
              <div className="shrink-0 flex items-center justify-center">
                <picture>
                  <source
                    srcSet="/images/logos/sofitel.png"
                    type="image/webp"
                  />
                  <img
                    src="/images/logos/sofitel.png"
                    alt="Sofitel"
                    width={120}
                    height={80}
                    className="h-28 w-auto object-contain"
                  />
                </picture>
              </div>
              <div className="shrink-0 flex items-center justify-center">
                <picture>
                  <source
                    srcSet="/images/logos/cardales.png"
                    type="image/webp"
                  />
                  <img
                    src="/images/logos/cardales.png"
                    alt="Cardales"
                    width={120}
                    height={144}
                    className="h-48 w-auto object-contain"
                  />
                </picture>
              </div>
              <div className="shrink-0 flex items-center justify-center">
                <picture>
                  <source srcSet="/images/logos/regina.png" type="image/webp" />
                  <img
                    src="/images/logos/regina.png"
                    alt="Regina"
                    width={120}
                    height={96}
                    className="h-32 w-auto object-contain"
                  />
                </picture>
              </div>
              <div className="shrink-0 flex items-center justify-center">
                <picture>
                  <source
                    srcSet="/images/logos/septiembre.png"
                    type="image/webp"
                  />
                  <img
                    src="/images/logos/septiembre.png"
                    alt="Septiembre"
                    width={120}
                    height={80}
                    className="h-24 w-auto object-contain"
                  />
                </picture>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Proyectos Section */}
      <section className="pt-16 bg-[#efefef]">
        <div className="w-full max-w-[1600px] mx-auto px-4 md:px-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div className="w-fit">
              <h3 
                className="font-baskerville text-black font-normal tracking-[0%] leading-none"
                style={{
                  fontSize: 'clamp(16px, 1.9vw, 28.69px)'
                }}
              >
                {t("home.featuredProjects.subtitle")}
              </h3>
            </div>
            <div className="w-fit md:hidden">
              <Link href="/desarrollos-proyectos">
                <h3 
                  className="font-baskerville font-normal uppercase hover:text-black/50 transition-colors duration-300"
                  style={{
                    fontSize: 'clamp(16px, 4.1vw, 16px)',
                    lineHeight: 'clamp(20.23px, 5.1vw, 20.23px)',
                    letterSpacing: '0%',
                    fontWeight: '400',
                    textAlign: 'right',
                    textDecoration: 'underline',
                    textDecorationStyle: 'solid',
                    textDecorationThickness: '1px',
                    textUnderlineOffset: '2px',
                    textDecorationSkipInk: 'auto'
                  }}
                >
                  {t("common.buttons.viewAll")}
                </h3>
              </Link>
            </div>
          </div>

          <div className="mb-12 flex justify-between items-end">
            {/* Mobile: Use separate lines for better wrapping */}
            <div className="md:hidden">
              <h2 
                className="font-baskerville font-normal"
                style={{
                  fontSize: 'clamp(31.38px, 8vw, 31.38px)',
                  lineHeight: 'clamp(35.9px, 9.1vw, 35.9px)',
                  letterSpacing: '0%',
                  fontWeight: '400'
                }}
              >
                {t("home.businessAreas.titleLine1")}
              </h2>
              <h2 
                className="font-baskerville font-normal"
                style={{
                  fontSize: 'clamp(31.38px, 8vw, 31.38px)',
                  lineHeight: 'clamp(35.9px, 9.1vw, 35.9px)',
                  letterSpacing: '0%',
                  fontWeight: '400'
                }}
              >
                {t("home.businessAreas.titleLine2")}
              </h2>
              <h2 
                className="font-baskerville font-normal"
                style={{
                  fontSize: 'clamp(31.38px, 8vw, 31.38px)',
                  lineHeight: 'clamp(35.9px, 9.1vw, 35.9px)',
                  letterSpacing: '0%',
                  fontWeight: '400'
                }}
              >
                {t("home.businessAreas.titleLine3")}
              </h2>
            </div>
            {/* Desktop: Use full title */}
            <div className="hidden md:block md:max-w-[40%]">
              <h2 
                className="font-baskerville font-normal"
                style={{
                  fontSize: 'clamp(31.38px, 3.2vw, 48.81px)',
                  lineHeight: 'clamp(35.9px, 3.7vw, 55.83px)',
                  letterSpacing: '0%',
                  fontWeight: '400'
                }}
              >
                {t("home.businessAreas.title")}
              </h2>
            </div>
            <Link href="/desarrollos-proyectos" className="hidden md:block">
              <h3 
                className="font-archivo font-normal uppercase hover:text-black/50 transition-colors duration-300"
                style={{
                  fontSize: 'clamp(16px, 1.2vw, 17.74px)',
                  lineHeight: 'clamp(20.23px, 1.2vw, 18.74px)',
                  letterSpacing: '0%',
                  fontWeight: '400',
                  textDecoration: 'underline',
                  textDecorationStyle: 'solid',
                  textDecorationThickness: '1px',
                  textUnderlineOffset: '2px',
                  textDecorationSkipInk: 'auto'
                }}
              >
                {t("common.buttons.viewAll")}
              </h3>
            </Link>
          </div>

          <ContentfulProjects 
            maxProjects={6} 
            showAll={true}
            // @ts-expect-error - Type mismatch with ContentfulProjects component
            homeGalleryProjects={homeGalleryProjects}
          />
        </div>
      </section>
    </main>
  );
}

export default function Home() {
  return <HomeContent />;
}