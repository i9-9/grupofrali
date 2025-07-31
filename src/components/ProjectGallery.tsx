"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

interface Project {
  id: string;
  titulo: string;
  categoria: string;
  locacion: string;
  imagen: string;
  alt: string;
}

const projects: Project[] = [
  {
    id: "septiembre",
    titulo: "SEPTIEMBRE",
    categoria: "REAL ESTATE",
    locacion: "Escobar, Buenos Aires",
    imagen: "/images/projects/septiembre/home-gallery/septiembre-home.jpg",
    alt: "Vista aérea del barrio Septiembre con club house",
  },
  {
    id: "sofitel-la-reserva-cardales",
    titulo: "SOFITEL LA RESERVA CARDALES",
    categoria: "HOTELERIA",
    locacion: "Campana, Buenos Aires",
    imagen: "/images/projects/sofitel/home-gallery/sofitel-home.jpg",
    alt: "Hotel Sofitel con piscina y paisajismo",
  },
  {
    id: "la-reserva-cardales",
    titulo: "LA RESERVA CARDALES",
    categoria: "REAL ESTATE",
    locacion: "Campana, Buenos Aires",
    imagen: "/images/projects/la-reserva-cardales/home-gallery/reserva-home.jpg",
    alt: "Club house junto al campo de golf",
  },
  {
    id: "la-banderita-parque-eolico",
    titulo: "LA BANDERITA PARQUE EÓLICO",
    categoria: "ENERGIA RENOVABLE",
    locacion: "General Acha, La Pampa",
    imagen: "/images/projects/la-banderita-parque-eolico/home-gallery/labanderita-home.jpg",
    alt: "Parque eólico con aerogeneradores",
  },
  {
    id: "elvis-river-sunflower-river",
    titulo: "ELVIS RIVER Y SUNFLOWER RIVER",
    categoria: "AGROPECUARIA",
    locacion: "Mississippi, Estados Unidos",
    imagen: "/images/projects/elvis-river-sunflower-river/home-gallery/elvis-home.jpg",
    alt: "Vista aérea de campos agrícolas con sistemas de riego",
  },
  {
    id: "edgewater-river",
    titulo: "EDGEWATER RIVER",
    categoria: "REAL ESTATE",
    locacion: "Miami, Estados Unidos",
    imagen: "/images/projects/edgewater-river/home-gallery/edgewater-home.jpg",
    alt: "Desarrollo residencial moderno en Miami",
  },
];

export default function ProjectGallery() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeProjectIndex, setActiveProjectIndex] = useState(0)

  // Detectar proyecto activo en el scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return
      
      const container = scrollRef.current
      const scrollLeft = container.scrollLeft
      const containerWidth = container.clientWidth
      const scrollWidth = container.scrollWidth
      
      // Calcular el progreso del scroll (0 a 1)
      const scrollProgress = scrollLeft / (scrollWidth - containerWidth)
      
      // Convertir el progreso a índice de proyecto
      const activeIndex = Math.round(scrollProgress * (projects.length - 1))
      setActiveProjectIndex(Math.max(0, Math.min(activeIndex, projects.length - 1)))
    }

    const container = scrollRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll)
      return () => container.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className="relative w-full">
      <div ref={scrollRef} className="w-full overflow-x-auto scrollbar-hidden">
        <div className="flex space-x-6 pb-4 md:pb-8">
        {projects.map((project, index) => (
          <Link
            key={project.id}
            href={`/desarrollos-proyectos/${project.id}`}
            className="group min-w-[250px] md:min-w-[280px] lg:min-w-[300px] flex-shrink-0 cursor-pointer"
          >
        <div className="relative overflow-hidden mb-3 h-[369px] pb-5 border-b border-black" >
              <img
                src={project.imagen}
                alt={project.alt}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
            </div>
            <div className="flex justify-between items-center md:items-start">
                <h3 className="font-light col-start-1 col-span-1">
                    (0{index + 1})
                </h3>
                <h3 className="font-baskerville text-sm md:text-[22px] text-black leading-tight text-left col-start-6 col-span-11">
                {project.titulo}
                </h3>
            </div>
          </Link>
        ))}
        </div>
      </div>
      
      {/* Barra de paginación - solo mobile */}
      {projects.length > 1 && (
        <div className="md:hidden absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-2">
          <div className="rounded-full px-3 py-2">
            <div className="relative w-24 h-1 bg-white/30 rounded-full overflow-hidden">
              <div 
                className="absolute top-0 h-full bg-white rounded-full transition-all duration-300 ease-out"
                style={{ 
                  width: `${100 / projects.length}%`,
                  left: `${(activeProjectIndex * 100) / projects.length}%`
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
