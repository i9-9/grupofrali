// Cargar variables de entorno
require('dotenv').config({ path: '../.env' })

const { createClient } = require('contentful-management')
const translationsEs = require('../src/data/translations/es.json')
const translationsEn = require('../src/data/translations/en.json')

const managementClient = createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN!,
})

// Estadísticas basadas en los datos existentes
const statistics = [
  {
    label: translationsEs.home.stats.projectsDelivered,
    labelEn: translationsEn.home.stats.projectsDelivered,
    value: '14',
    unit: 'proyectos',
    unitEn: 'projects',
    displayOrder: 1
  },
  {
    label: translationsEs.home.stats.totalAssets,
    labelEn: translationsEn.home.stats.totalAssets,
    value: '300',
    unit: 'MMUSD',
    unitEn: 'MMUSD',
    displayOrder: 2
  },
  {
    label: translationsEs.home.stats.upcomingProjects,
    labelEn: translationsEn.home.stats.upcomingProjects,
    value: '5',
    unit: 'proyectos',
    unitEn: 'projects',
    displayOrder: 3
  },
  {
    label: translationsEs.home.stats.farmland,
    labelEn: translationsEn.home.stats.farmland,
    value: '7800',
    unit: 'hectáreas',
    unitEn: 'hectares',
    displayOrder: 4
  },
  {
    label: translationsEs.home.stats.team,
    labelEn: translationsEn.home.stats.team,
    value: '+300',
    unit: 'colaboradores',
    unitEn: 'collaborators',
    displayOrder: 5
  },
  {
    label: translationsEs.home.stats.builtArea,
    labelEn: translationsEn.home.stats.builtArea,
    value: '+100.000',
    unit: 'm²',
    unitEn: 'm²',
    displayOrder: 6
  }
]

async function migrateStatisticsData() {
  console.log('🚀 Starting statistics migration...')
  
  try {
    const space = await managementClient.getSpace(process.env.CONTENTFUL_SPACE_ID!)
    const environment = await space.getEnvironment(process.env.CONTENTFUL_ENVIRONMENT || 'master')
    
    // Verificar si ya existen estadísticas
    const existingStats = await environment.getEntries({ content_type: 'statistic' })
    
    if (existingStats.items.length > 0) {
      console.log(`⚠️  Found ${existingStats.items.length} existing statistics. Skipping migration.`)
      return
    }

    // Crear cada estadística
    for (const stat of statistics) {
      const entry = await environment.createEntry('statistic', {
        fields: {
          label: { 'en-US': stat.label },
          labelEn: { 'en-US': stat.labelEn },
          value: { 'en-US': stat.value },
          unit: { 'en-US': stat.unit },
          unitEn: { 'en-US': stat.unitEn },
          displayOrder: { 'en-US': stat.displayOrder },
          isActive: { 'en-US': true }
        }
      })
      
      await entry.publish()
      console.log(`✅ Created statistic: ${stat.label}`)
    }

    console.log('✅ Statistics migration completed successfully!')
  } catch (error) {
    console.error('❌ Statistics migration failed:', error)
    process.exit(1)
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  migrateStatisticsData()
}

module.exports = migrateStatisticsData
