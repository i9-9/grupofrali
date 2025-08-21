"use client";

import { Suspense } from "react";
import RandomVideo from "@/components/RandomVideo";
import ProjectGallery from "@/components/ProjectGallery";
import { StatItem } from "@/components/StatItem";
import Link from "next/link";

function HomeContent() {
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
      </section>

      {/* Desarrollo */}
      <section className="pt-16 bg-[#EFEFEF] ">
        <div className="content-wrapper">
          <div className="grid">
            {/* TÍTULO - 6 columnas */}
            <div className="col-6 md:col-6">
              {/* Mobile */}
              <h2 className="md:hidden text-h1-baskerville text-black mb-8">
                IMPULSAMOS EL
                <br />
                DESARROLLO
                <br />
                CON VISIÓN
                <br />
                ESTRATÉGICA
                <br />
              </h2>

              {/* Desktop */}
              <h2 className="hidden md:block text-h1-baskerville text-black mb-8">
                <span className="whitespace-nowrap mb-1">
                  IMPULSAMOS EL DESARROLLO
                </span>
                <br />
                <span className="whitespace-nowrap">
                  CON VISIÓN ESTRATÉGICA
                </span>
              </h2>
            </div>

            {/* CONCEPTOS - arriba de stats izquierdas (columnas 1-5) */}
            <div className="col-6 md:col-1-to-5 flex flex-col order-2 md:order-1">
              <div className="flex justify-between pb-8 items-center mt-auto">
                <h3 className="font-baskerville text-black">
                  VISIÓN DE FUTURO
                </h3>
                <h3 className="font-baskerville text-black">
                  INNOVACIÓN
                </h3>
                <h3 className="font-baskerville text-black">
                  SOLIDEZ
                </h3>
              </div>
            </div>

            {/* PÁRRAFO - arriba de stats derechas (columnas 8-12) */}
            <div className="col-6 md:col-8-to-12 order-1 md:order-2 flex flex-col">
              <p className="text-body2-archivo text-black mb-12 mt-auto leading-[1]">
                Con casi 30 años de trayectoria, en Grupo Frali desarrollamos
                inversiones estratégicas en real estate, agroindustria,
                hotelería y energías renovables. Apostamos a proyectos que
                combinan crecimiento económico, compromiso con el entorno y
                generación de valor en Argentina, EE. UU. y Uruguay.
              </p>
            </div>

            {/* ESTADÍSTICAS - Layout 5+2+5 en Desktop */}
            {/* Columna 1: Estadísticas izquierda (columnas 1-5) */}
            <div className="col-6 md:col-1-to-5 order-3 md:order-3 md:pb-8">
              <StatItem
                number="14"
                label="PROYECTOS DESARROLLADOS"
                delay="stat-number-delay-1"
                lineDelay="stat-line-delay-1"
              />
              <StatItem
                number="300 MM"
                unit="USD"
                label="VALOR TOTAL DE ACTIVOS"
                delay="stat-number-delay-2"
                lineDelay="stat-line-delay-2"
              />
              <StatItem
                number="5"
                label="PROYECTOS EN PLANIFICACIÓN"
                delay="stat-number-delay-3"
                lineDelay="stat-line-delay-3"
              />
            </div>

            {/* Columna 2: Estadísticas derecha (columnas 8-12) */}
            <div className="col-6 md:col-8-to-12 order-4 md:order-4 md:pb-8">
              <StatItem
                number="7800"
                unit="ha"
                label="HÉCTAREAS AGRÍCOLAS"
                delay="stat-number-delay-4"
                lineDelay="stat-line-delay-4"
              />
              <StatItem
                number="+300"
                label="N° EMPLEADOS & COLABORADORES"
                delay="stat-number-delay-5"
                lineDelay="stat-line-delay-5"
              />
              <StatItem
                number="+100.000"
                unit="m²"
                label="SUPERFICIE CONSTRUIDA"
                delay="stat-number-delay-6"
                lineDelay="stat-line-delay-6"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Marquee Logos */}
      <section className="py-40 overflow-hidden bg-[#efefef]">
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
        <div className="content-wrapper">
          {/* Header */}
          <div className="flex justify-between items-baseline mb-8">
            <h3 className="text-small-archivo">PROYECTOS</h3>
            <Link href="/desarrollos-proyectos" className="md:hidden">
              <h3 className="text-small-archivo underline hover:text-black/50 transition-colors duration-300">
                VER MÁS
              </h3>
            </Link>
          </div>

          <div className="mb-12 flex justify-between items-end">
            <div>
              <h2 className="md:hidden text-h1-baskerville">
                DIVERSIFICACIÓN <br />
                PARA CRECER DE
                <br />
                MANERA SOSTENIBLE
              </h2>
              <h2 className="hidden md:block text-h1-baskerville">
                DIVERSIFICACIÓN PARA <br />
                CRECER DE MANERA <br />
                SOSTENIBLE
              </h2>
            </div>
            <Link href="/desarrollos-proyectos" className="hidden md:block">
              <h3 className="text-small-archivo underline hover:text-black/50 transition-colors duration-300">
                VER MÁS
              </h3>
            </Link>
          </div>

          <ProjectGallery />
        </div>
      </section>
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#EFEFEF] flex items-center justify-center">
        <div className="text-center animate-pulse">
          <h1 className="font-baskerville header-logo-mobile text-black text-2xl md:text-3xl animate-scale-grow">GRUPO FRALI</h1>
        </div>
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}