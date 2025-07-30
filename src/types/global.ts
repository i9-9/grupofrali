// Existing types...

// Projects Data Types
export interface ProjectImages {
  // Para galería del home
  home_gallery: string;
  
  // Para página de desarrollos
  desarrollos_mobile: string;   // Imagen vertical/cuadrada para mobile
  desarrollos_desktop: string;  // Imagen horizontal para desktop
  
  // Para páginas individuales
  individual_mobile: string;        // Una imagen principal para mobile
  individual_desktop: string[];     // Una o más imágenes para desktop (galería)
  
  // Alt texts
  alt: string;
}

export interface ProjectStatistics {
  [key: string]: string; // Estadísticas dinámicas como strings
}

export interface Project {
  id: string;
  titulo: string;
  categoria: string;
  locacion: string;
  descripcion: string;
  imagenes: ProjectImages;
  estadisticas: ProjectStatistics;
}

export interface ProjectsData {
  proyectos: Project[];
}
