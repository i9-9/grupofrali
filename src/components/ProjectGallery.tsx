"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

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
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative w-full">
      <div ref={scrollRef} className="w-full overflow-x-auto scrollbar-hidden">
        <div className="flex space-x-6 pb-4 md:pb-8">
          {projects.map((project, index) => (
            <Link
              key={project.id}
              href={`/desarrollos-proyectos/${project.id}`}
              className="group w-[343px] flex-shrink-0 cursor-pointer hover:opacity-80 transition-all duration-300 ease-in-out"
            >
              <div className="relative overflow-hidden aspect-[343/350] mb-4">
                <Image
                  src={project.imagen}
                  alt={project.alt}
                  width={343}
                  height={350}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
              </div>
              <div className="border-t border-black pt-6 pb-4">
                <div className="flex justify-between items-start w-full">
                  {/* Número a la izquierda */}
                  <h3 className="font-light">(0{index + 1})</h3>

                  {/* Título alineado a la izquierda, pegado al margen derecho */}
                  <div className="text-left w-[160px] md:w-[200px] lg:w-[220px]">
                    <h3 className="font-baskerville text-sm md:text-[22px] text-black leading-tight">
                      {project.titulo}
                    </h3>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}