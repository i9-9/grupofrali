// Cargar variables de entorno
require('dotenv').config({ path: '../.env' })

const { createClient } = require('contentful-management')

const managementClient = createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN!,
})

async function addStatisticsReferenceToProject() {
  console.log('🔗 Adding statistics reference field to Project content type...')
  
  try {
    const space = await managementClient.getSpace(process.env.CONTENTFUL_SPACE_ID!)
    const environment = await space.getEnvironment(process.env.CONTENTFUL_ENVIRONMENT || 'master')
    
    // Obtener el content type de Project
    const projectContentType = await environment.getContentType('project')
    
    console.log(`📋 Current fields: ${projectContentType.fields.length}`)
    
    // Verificar si ya existe el campo
    const existingField = projectContentType.fields.find((field: any) => field.id === 'estadisticasReferencias')
    if (existingField) {
      console.log('⚠️  Field estadisticasReferencias already exists!')
      return
    }
    
    // Agregar el nuevo campo de referencia
    projectContentType.fields.push({
      id: 'estadisticasReferencias',
      name: 'Estadísticas (Referencias)',
      type: 'Array',
      localized: false,
      required: false,
      validations: [
        {
          size: {
            max: 20
          }
        }
      ],
      items: {
        type: 'Link',
        validations: [
          {
            linkContentType: ['7fjLXGmdgFUlcGjBFqrC0'] // ID del content type ProjectStatistic
          }
        ],
        linkType: 'Entry'
      }
    })
    
    // Actualizar el content type
    const updatedContentType = await projectContentType.update()
    await updatedContentType.publish()
    
    console.log('✅ Statistics reference field added successfully!')
    console.log('📋 Field: estadisticasReferencias (Array of Links to ProjectStatistic)')
    console.log('💡 Now you can link statistics to projects instead of using JSON')
    
  } catch (error) {
    console.error('❌ Error adding statistics reference field:', error)
    process.exit(1)
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  addStatisticsReferenceToProject()
}

module.exports = addStatisticsReferenceToProject




























