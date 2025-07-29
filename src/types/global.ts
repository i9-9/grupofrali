// Existing types...

// Projects Data Types
export interface LocalizedString {
  es: string;
  en: string;
}

export interface ProjectStatistics {
  superficie: number;
  superficieUnit: string;
  inversionTotal: number;
  inversionCurrency: string;
  estado: LocalizedString;
  // Campos específicos por tipo de proyecto
  cantidadLotes?: number;
  habitaciones?: number;
  pisos?: number;
  hoyosGolf?: number;
  habitacionesHotel?: number;
  lotesResidenciales?: number;
  capacidadAlmacenamiento?: number;
  capacidadProcesamiento?: number;
}

export interface ProjectImages {
  hero: string;
  gallery: string[];
}

export interface Project {
  id: string;
  name: LocalizedString;
  category: LocalizedString;
  location: LocalizedString;
  description: LocalizedString;
  statistics: ProjectStatistics;
  images: ProjectImages;
}

export interface ProjectsData {
  projects: Project[];
}

// Language type
export type Language = 'es' | 'en';
