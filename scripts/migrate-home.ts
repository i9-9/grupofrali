// Cargar variables de entorno
require('dotenv').config({ path: '../.env' })

const { createClient } = require('contentful-management')
const translationsEs = require('../src/data/translations/es.json')
const translationsEn = require('../src/data/translations/en.json')

const managementClient = createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN!,
})

async function migrateHome() {
  console.log('🚀 Starting home page migration...')
  
  try {
    const space = await managementClient.getSpace(process.env.CONTENTFUL_SPACE_ID!)
    const environment = await space.getEnvironment(process.env.CONTENTFUL_ENVIRONMENT || 'master')
    
    // Verificar si ya existe la página home
    const existingHome = await environment.getEntries({ content_type: 'homePage' })
    
    if (existingHome.items.length > 0) {
      console.log(`⚠️  Found ${existingHome.items.length} existing home pages. Skipping migration.`)
      return
    }

    // Obtener proyectos destacados
    const projects = await environment.getEntries({ content_type: 'project', 'fields.isFeatured': true })
    const featuredProjectIds = projects.items.map((project: any) => ({
      sys: { type: 'Link', linkType: 'Entry', id: project.sys.id }
    }))

    // Obtener miembros del equipo
    const teamMembers = await environment.getEntries({ content_type: 'teamMember' })
    const teamMemberIds = teamMembers.items.map((member: any) => ({
      sys: { type: 'Link', linkType: 'Entry', id: member.sys.id }
    }))

    // Obtener estadísticas
    const statistics = await environment.getEntries({ content_type: 'statistic' })
    const statisticIds = statistics.items.map((stat: any) => ({
      sys: { type: 'Link', linkType: 'Entry', id: stat.sys.id }
    }))

    const entry = await environment.createEntry('homePage', {
      fields: {
        title: { 'en-US': 'Grupo Frali' },
        titleEn: { 'en-US': 'Grupo Frali' },
        heroTitle: { 'en-US': translationsEs.home.hero.title },
        heroTitleEn: { 'en-US': translationsEn.home.hero.title },
        description: { 'en-US': { nodeType: 'document', data: {}, content: [{ nodeType: 'paragraph', data: {}, content: [{ nodeType: 'text', value: translationsEs.home.description, marks: [], data: {} }] }] } },
        descriptionEn: { 'en-US': { nodeType: 'document', data: {}, content: [{ nodeType: 'paragraph', data: {}, content: [{ nodeType: 'text', value: translationsEn.home.description, marks: [], data: {} }] }] } },
        proyectosDestacados: { 'en-US': featuredProjectIds },
        maxProyectosDestacados: { 'en-US': 6 },
        miembrosEquipo: { 'en-US': teamMemberIds },
        maxMiembrosEquipo: { 'en-US': 10 },
        estadisticas: { 'en-US': statisticIds },
        maxEstadisticas: { 'en-US': 6 },
        isActive: { 'en-US': true }
      }
    })
    
    await entry.publish()
    console.log('✅ Home page migration completed successfully!')
  } catch (error) {
    console.error('❌ Home page migration failed:', error)
    process.exit(1)
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  migrateHome()
}

module.exports = migrateHome
