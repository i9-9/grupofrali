// Cargar variables de entorno
require('dotenv').config({ path: '../.env' })

const { createClient } = require('contentful-management')
const projectsData = require('../src/data/projects.json')

const managementClient = createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN!,
})

// Mapeo de categorías del JSON a slugs de Contentful
const categoryMapping: { [key: string]: string } = {
  'REAL ESTATE': 'real-estate',
  'ENERGIA RENOVABLE': 'renewable-energy',
  'HOTELERIA': 'hospitality',
  'AGROPECUARIA': 'agribusiness'
}

async function migrateProjects() {
  console.log('🚀 Starting projects migration...')
  
  try {
    const space = await managementClient.getSpace(process.env.CONTENTFUL_SPACE_ID!)
    const environment = await space.getEnvironment(process.env.CONTENTFUL_ENVIRONMENT || 'master')
    
    // Obtener categorías existentes
    const categories = await environment.getEntries({ content_type: 'category' })
    const categoryMap = new Map()
    
    categories.items.forEach((category: any) => {
      categoryMap.set(category.fields.slug['en-US'], category.sys.id)
    })

    // Verificar si ya existen proyectos
    const existingProjects = await environment.getEntries({ content_type: 'project' })
    
    if (existingProjects.items.length > 0) {
      console.log(`⚠️  Found ${existingProjects.items.length} existing projects. Skipping migration.`)
      return
    }

    // Migrar cada proyecto
    for (let i = 0; i < projectsData.proyectos.length; i++) {
      const proyecto = projectsData.proyectos[i]
      const categorySlug = categoryMapping[proyecto.categoria]
      const categoryId = categoryMap.get(categorySlug)

      if (!categoryId) {
        console.warn(`⚠️  Category not found for project ${proyecto.id}: ${proyecto.categoria}`)
        continue
      }

      // Determinar si está en featured projects
      const isFeatured = projectsData.home_gallery_ids.includes(proyecto.id)

      // Crear slug desde el título
      const slug = proyecto.id.toLowerCase().replace(/\s+/g, '-')

      const entry = await environment.createEntry('project', {
        fields: {
          title: { 'en-US': proyecto.titulo },
          titleEn: { 'en-US': proyecto.title_en },
          slug: { 'en-US': slug },
          description: { 'en-US': { nodeType: 'document', data: {}, content: [{ nodeType: 'paragraph', data: {}, content: [{ nodeType: 'text', value: proyecto.descripcion, marks: [], data: {} }] }] } },
          descriptionEn: { 'en-US': { nodeType: 'document', data: {}, content: [{ nodeType: 'paragraph', data: {}, content: [{ nodeType: 'text', value: proyecto.description_en, marks: [], data: {} }] }] } },
          category: { 'en-US': { sys: { type: 'Link', linkType: 'Entry', id: categoryId } } },
          location: { 'en-US': proyecto.locacion },
          locationEn: { 'en-US': proyecto.location_en },
          statistics: { 'en-US': JSON.stringify(Object.entries(proyecto.estadisticas || {}).map(([key, value]) => ({
            nombre: key.replace(/_/g, ' ').toUpperCase(),
            nombreEn: key.replace(/_/g, ' ').toUpperCase(),
            valor: value
          }))) },
          status: { 'en-US': proyecto.estadisticas?.estado || 'EN DESARROLLO' },
          statusEn: { 'en-US': proyecto.statistics_en?.status || 'IN DEVELOPMENT' },
          isFeatured: { 'en-US': isFeatured },
          isActive: { 'en-US': true },
          displayOrder: { 'en-US': i + 1 }
        }
      })
      
      await entry.publish()
      console.log(`✅ Created project: ${proyecto.titulo}`)
    }

    console.log('✅ Projects migration completed successfully!')
  } catch (error) {
    console.error('❌ Projects migration failed:', error)
    process.exit(1)
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  migrateProjects()
}

module.exports = migrateProjects
