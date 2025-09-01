import type { Metadata } from 'next'
import projectsData from "@/data/projects.json"

// Metadata dinámica para cada proyecto
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const project = projectsData.proyectos.find(p => p.id === id)
  
  if (!project) {
    return {
      title: 'Proyecto no encontrado - Grupo Frali',
      description: 'El proyecto solicitado no fue encontrado.'
    }
  }

  const projectTitle = project.titulo
  const projectDescription = project.descripcion
  const projectImage = project.imagenes?.individual_desktop?.[0] || project.imagenes?.desarrollos_desktop || '/images/seo/OGImage.png'

  return {
    title: `${projectTitle} - Grupo Frali`,
    description: projectDescription,
    openGraph: {
      title: projectTitle,
      description: projectDescription,
      images: [
        {
          url: projectImage,
          alt: projectTitle,
          width: 1200,
          height: 630,
        }
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: projectTitle,
      description: projectDescription,
      images: [projectImage],
    },
  }
}
