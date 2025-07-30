"use client";

import { useState } from "react";
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
  return (
    <div className="w-full overflow-x-auto scrollbar-hidden">
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
  );
}
