"use client"

import { useMemo } from 'react'
import projectsData from '@/data/projects.json'
import type { ProjectsData, Project, Language } from '@/types/global'

const data = projectsData as ProjectsData

export function useProjects() {
  return useMemo(() => ({
    // Get all projects
    getAllProjects: (): Project[] => data.projects,
    
    // Get project by ID
    getProjectById: (id: string): Project | undefined =>
      data.projects.find(project => project.id === id),
    
    // Search projects
    searchProjects: (query: string, language: Language = 'es'): Project[] =>
      data.projects.filter(project => 
        project.name[language].toLowerCase().includes(query.toLowerCase()) ||
        project.description[language].toLowerCase().includes(query.toLowerCase()) ||
        project.category[language].toLowerCase().includes(query.toLowerCase()) ||
        project.location[language].toLowerCase().includes(query.toLowerCase())
      ),
    
    // Get localized text
    getLocalizedText: (text: { es: string; en: string }, language: Language = 'es'): string =>
      text[language],
    
    // Format investment
    formatInvestment: (statistics: { inversionTotal: number; inversionCurrency: string }): string => {
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: statistics.inversionCurrency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })
      return formatter.format(statistics.inversionTotal)
    },
    
    // Format surface area
    formatSuperficie: (statistics: { superficie: number; superficieUnit: string }): string =>
      `${statistics.superficie.toLocaleString()} ${statistics.superficieUnit}`,
    
    // Get project stats
    getProjectStats: () => ({
      total: data.projects.length,
      totalInvestment: data.projects.reduce((sum, p) => sum + p.statistics.inversionTotal, 0),
      averageSuperficie: Math.round(data.projects.reduce((sum, p) => sum + p.statistics.superficie, 0) / data.projects.length)
    }),

    // Get unique categories
    getCategories: (language: Language = 'es'): string[] => {
      const categories = data.projects.map(p => p.category[language])
      return [...new Set(categories)]
    },

    // Get projects by category
    getProjectsByCategory: (categoryName: string, language: Language = 'es'): Project[] =>
      data.projects.filter(project => project.category[language] === categoryName),

    // Get unique status
    getStatusOptions: (language: Language = 'es'): string[] => {
      const statuses = data.projects.map(p => p.statistics.estado[language])
      return [...new Set(statuses)]
    },

    // Get projects by status
    getProjectsByStatus: (statusName: string, language: Language = 'es'): Project[] =>
      data.projects.filter(project => project.statistics.estado[language] === statusName)
  }), [])
}

export default useProjects 