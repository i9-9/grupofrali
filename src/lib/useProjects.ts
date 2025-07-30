"use client"

import { useMemo } from 'react'
import projectsData from '@/data/projects.json'
import type { ProjectsData, Project } from '@/types/global'

const data = projectsData as unknown as ProjectsData

export function useProjects() {
  return useMemo(() => ({
    // Get all projects
    getAllProjects: (): Project[] => data.proyectos,
    
    // Get project by ID
    getProjectById: (id: string): Project | undefined =>
      data.proyectos.find(project => project.id === id),
    
    // Search projects
    searchProjects: (query: string): Project[] =>
      data.proyectos.filter(project => 
        project.titulo.toLowerCase().includes(query.toLowerCase()) ||
        project.descripcion.toLowerCase().includes(query.toLowerCase()) ||
        project.categoria.toLowerCase().includes(query.toLowerCase()) ||
        project.locacion.toLowerCase().includes(query.toLowerCase())
      ),
    
    // Get project stats
    getProjectStats: () => ({
      total: data.proyectos.length,
      byCategory: data.proyectos.reduce((acc, project) => {
        acc[project.categoria] = (acc[project.categoria] || 0) + 1
        return acc
      }, {} as Record<string, number>),
      byStatus: data.proyectos.reduce((acc, project) => {
        const estado = project.estadisticas.estado || 'SIN ESTADO'
        acc[estado] = (acc[estado] || 0) + 1
        return acc
      }, {} as Record<string, number>)
    }),

    // Get unique categories
    getCategories: (): string[] => {
      const categories = data.proyectos.map(p => p.categoria)
      return [...new Set(categories)]
    },

    // Get projects by category
    getProjectsByCategory: (categoryName: string): Project[] =>
      data.proyectos.filter(project => project.categoria === categoryName),

    // Get unique status
    getStatusOptions: (): string[] => {
      const statuses = data.proyectos.map(p => p.estadisticas.estado).filter(Boolean)
      return [...new Set(statuses)]
    },

    // Get projects by status
    getProjectsByStatus: (statusName: string): Project[] =>
      data.proyectos.filter(project => project.estadisticas.estado === statusName),

    // Get different image types for project
    getHomeGalleryImage: (project: Project): string => 
      project.imagenes.home_gallery || '/images/placeholder.jpg',

    getDesarrollosMobileImage: (project: Project): string => 
      project.imagenes.desarrollos_mobile || '/images/placeholder.jpg',

    getDesarrollosDesktopImage: (project: Project): string => 
      project.imagenes.desarrollos_desktop || '/images/placeholder.jpg',

    getIndividualMobileImage: (project: Project): string => 
      project.imagenes.individual_mobile || '/images/placeholder.jpg',

    getIndividualDesktopImages: (project: Project): string[] => 
      project.imagenes.individual_desktop || ['/images/placeholder.jpg'],

    // Get project image alt text
    getImageAlt: (project: Project): string => 
      project.imagenes.alt || project.titulo,

    // Format statistic for display
    formatStatistic: (key: string, value: string): { label: string; value: string } => {
      const labels: Record<string, string> = {
        superficie: 'Superficie',
        hectareas_superficie: 'Superficie',
        superficie_construida: 'Superficie Construida',
        habitaciones: 'Habitaciones',
        lotes_residenciales: 'Lotes Residenciales',
        cantidad_lotes: 'Cantidad de Lotes',
        casas: 'Casas',
        departamentos: 'Departamentos',
        unidades_residenciales: 'Unidades Residenciales',
        capacidad_instalada: 'Capacidad Instalada',
        estado: 'Estado',
        // Agregar más según necesidad
      }
      
      return {
        label: labels[key] || key.replace(/_/g, ' ').toUpperCase(),
        value: value
      }
    }
  }), [])
}

export default useProjects 