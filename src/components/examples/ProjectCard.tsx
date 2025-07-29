"use client"

import Image from 'next/image'
import Link from 'next/link'
import { useProjects } from '@/lib/useProjects'
import type { Project, Language } from '@/types/global'

interface ProjectCardProps {
  project: Project
  language?: Language
}

export function ProjectCard({ project, language = 'es' }: ProjectCardProps) {
  const { getLocalizedText, formatInvestment, formatSuperficie } = useProjects()

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {/* Hero Image */}
      <div className="relative h-64">
        <Image
          src={project.images.hero}
          alt={getLocalizedText(project.name, language)}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Category & Status */}
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm text-gray-500 uppercase tracking-wider">
            {getLocalizedText(project.category, language)}
          </span>
          <span className={`text-xs px-2 py-1 rounded-full ${
            project.statistics.estado[language] === 'Completado' || project.statistics.estado[language] === 'Completed' ? 'bg-green-100 text-green-800' :
            project.statistics.estado[language] === 'En Desarrollo' || project.statistics.estado[language] === 'In Development' ? 'bg-blue-100 text-blue-800' :
            'bg-yellow-100 text-yellow-800'
          }`}>
            {getLocalizedText(project.statistics.estado, language)}
          </span>
        </div>

        {/* Name */}
        <h3 className="font-baskerville text-xl text-black mb-2">
          {getLocalizedText(project.name, language)}
        </h3>

        {/* Location */}
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          {getLocalizedText(project.location, language)}
        </div>

        {/* Description */}
        <p className="text-gray-700 text-sm mb-4 line-clamp-3">
          {getLocalizedText(project.description, language)}
        </p>

        {/* Statistics */}
        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div>
            <span className="text-gray-500">
              {language === 'es' ? 'Superficie' : 'Surface'}:
            </span>
            <div className="font-semibold">{formatSuperficie(project.statistics)}</div>
          </div>
          <div>
            <span className="text-gray-500">
              {language === 'es' ? 'Inversión' : 'Investment'}:
            </span>
            <div className="font-semibold">{formatInvestment(project.statistics)}</div>
          </div>
        </div>

        {/* Additional Statistics */}
        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          {project.statistics.cantidadLotes && (
            <div>
              <span className="text-gray-500">
                {language === 'es' ? 'Lotes' : 'Lots'}:
              </span>
              <div className="font-semibold">{project.statistics.cantidadLotes}</div>
            </div>
          )}
          {project.statistics.habitaciones && (
            <div>
              <span className="text-gray-500">
                {language === 'es' ? 'Habitaciones' : 'Rooms'}:
              </span>
              <div className="font-semibold">{project.statistics.habitaciones}</div>
            </div>
          )}
          {project.statistics.hoyosGolf && (
            <div>
              <span className="text-gray-500">
                {language === 'es' ? 'Hoyos Golf' : 'Golf Holes'}:
              </span>
              <div className="font-semibold">{project.statistics.hoyosGolf}</div>
            </div>
          )}
        </div>

        {/* CTA Button */}
        <Link
          href={`/proyectos/${project.id}`}
          className="inline-block w-full text-center bg-black text-white py-2 px-4 hover:bg-gray-800 transition-colors"
        >
          {language === 'es' ? 'Ver Proyecto' : 'View Project'}
        </Link>
      </div>
    </div>
  )
}

// Example usage component
export function ProjectsGrid({ language = 'es' }: { language?: Language }) {
  const { getAllProjects } = useProjects()
  const projects = getAllProjects()

  return (
    <section className="py-16">
      <div className="content-wrapper">
        <h2 className="font-baskerville text-3xl text-black mb-8 text-center">
          {language === 'es' ? 'Nuestros Proyectos' : 'Our Projects'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              language={language}
            />
          ))}
        </div>
      </div>
    </section>
  )
} 