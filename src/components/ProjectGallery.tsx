"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import projectsData from "@/data/projects.json";
import { renderTitle } from "@/lib/titleUtils";

export default function ProjectGallery() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();
  
  type GalleryProject = {
    id: string;
    titulo: string;
    title_en: string;
    home_title?: string;
    home_title_en?: string;
  };

  const getDisplayTitle = (project: GalleryProject): string => {
    const home = language === 'en' ? project.home_title_en : project.home_title;
    if (home && home.length > 0) return home;
    return language === 'en' ? project.title_en : project.titulo;
  };
  
  // Obtener los proyectos en el orden específico desde projects.json
  const projects = (projectsData.home_gallery_ids || [])
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
                  {/* Número a la izquierda - alineado con la primera línea */}
                  <h3 className="font-light mr-4 leading-[1.1]">(0{index + 1})</h3>

                  {/* Contenedor que empuja el título al borde derecho */}
                  <div className="flex-1 flex justify-end">
                    <h3 className="font-baskerville text-sm md:text-[22px] text-black text-left inline-block whitespace-pre-line" style={{ lineHeight: '1.1' }}>
                      {renderTitle(getDisplayTitle(project))}
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