"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import projectsData from "@/data/projects.json";

export default function ProjectGallery() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();
  
  // Obtener solo los 6 proyectos específicos en el orden requerido
  const validProjectIds = [
    'septiembre',
    'sofitel-la-reserva-cardales',
    'la-reserva-cardales',
    'la-banderita-parque-eolico',
    'elvis-river-sunflower-river',
    'edgewater-river'
  ];

  // Obtener los proyectos en el orden específico
  const projects = validProjectIds
    .map(id => projectsData.proyectos.find(project => project.id === id))
    .filter((project): project is NonNullable<typeof project> => 
      project !== undefined
    );
  


  return (
    <div className="relative w-full">
      <div ref={scrollRef} className="w-full overflow-x-auto scrollbar-hidden">
        <div className="flex space-x-6 pb-4 md:pb-8">
          {projects.map((project, index) => (
            <Link
              key={project.id}
              href={`/desarrollos-proyectos/${project.id}`}
              className="group w-full md:w-[343px] flex-shrink-0 cursor-pointer hover:opacity-80 transition-all duration-300 ease-in-out"
            >
              <div className="relative overflow-hidden aspect-[343/350] mb-4">
                <Image
                  src={project.imagenes.home_gallery || ''}
                  alt={project.imagenes.alt || ''}
                  width={343}
                  height={350}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
              </div>
              <div className="border-t border-black pt-6 pb-4">
                <div className="flex items-start w-full">
                  {/* Número a la izquierda */}
                  <h3 className="font-light mr-4">(0{index + 1})</h3>

                  {/* Contenedor que empuja el título al borde derecho */}
                  <div className="flex-1 text-right">
                    <h3 
                      className="font-baskerville text-sm md:text-[22px] text-black leading-tight text-left inline-block"
                      dangerouslySetInnerHTML={{ 
                        __html: language === 'en' ? project.title_en : project.titulo 
                      }}
                    />
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