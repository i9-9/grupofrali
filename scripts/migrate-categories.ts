require('dotenv').config({ path: '../.env' })

const { createClient } = require('contentful-management')

const managementClient = createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN!,
})

// Categorías basadas en los datos existentes
const categories = [
  {
    name: 'REAL ESTATE',
    nameEn: 'REAL ESTATE',
    slug: 'real-estate',
    description: 'Desarrollos inmobiliarios residenciales y comerciales',
    descriptionEn: 'Residential and commercial real estate developments',
    displayOrder: 1,
    color: '#2E7D32'
  },
  {
    name: 'ENERGIA RENOVABLE',
    nameEn: 'RENEWABLE ENERGY',
    slug: 'renewable-energy',
    description: 'Proyectos de energía renovable y sustentable',
    descriptionEn: 'Renewable and sustainable energy projects',
    displayOrder: 2,
    color: '#1976D2'
  },
  {
    name: 'HOTELERIA',
    nameEn: 'HOSPITALITY',
    slug: 'hospitality',
    description: 'Desarrollos hoteleros y de hospitalidad',
    descriptionEn: 'Hotel and hospitality developments',
    displayOrder: 3,
    color: '#D32F2F'
  },
  {
    name: 'AGROPECUARIA',
    nameEn: 'AGRIBUSINESS',
    slug: 'agribusiness',
    description: 'Proyectos agropecuarios y agrícolas',
    descriptionEn: 'Agricultural and farming projects',
    displayOrder: 4,
    color: '#F57C00'
  }
]

async function migrateCategories() {
  console.log('🚀 Starting categories migration...')
  
  try {
    const space = await managementClient.getSpace(process.env.CONTENTFUL_SPACE_ID!)
    const environment = await space.getEnvironment(process.env.CONTENTFUL_ENVIRONMENT || 'master')
    
    // Verificar si ya existen categorías
    const existingCategories = await environment.getEntries({ content_type: 'category' })
    
    if (existingCategories.items.length > 0) {
      console.log(`⚠️  Found ${existingCategories.items.length} existing categories. Skipping migration.`)
      return
    }

    // Crear cada categoría
    for (const category of categories) {
      const entry = await environment.createEntry('category', {
        fields: {
          name: { 'en-US': category.name },
          nameEn: { 'en-US': category.nameEn },
          slug: { 'en-US': category.slug },
          description: { 'en-US': category.description },
          descriptionEn: { 'en-US': category.descriptionEn },
          isActive: { 'en-US': true }
        }
      })
      
      await entry.publish()
      console.log(`✅ Created category: ${category.name}`)
    }

    console.log('✅ Categories migration completed successfully!')
  } catch (error) {
    console.error('❌ Categories migration failed:', error)
    process.exit(1)
  }
}

// Ejecutar si se llama directamentee
if (require.main === module) {
  migrateCategories()
}

module.exports = migrateCategories
