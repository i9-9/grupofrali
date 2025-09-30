// Cargar variables de entorno
require('dotenv').config({ path: '../.env' })

const { createClient } = require('contentful-management')

const managementClient = createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN!,
})

async function updateProjectStatisticsJson() {
  console.log('🚀 Updating Project content type with JSON statistics field...')
  
  try {
    const space = await managementClient.getSpace(process.env.CONTENTFUL_SPACE_ID!)
    const environment = await space.getEnvironment(process.env.CONTENTFUL_ENVIRONMENT || 'master')
    
    // Obtener el content type de Project
    const projectContentType = await environment.getContentType('project')
    
    // Verificar si ya existe el campo estadisticasJson
    const existingField = projectContentType.fields.find((field: any) => field.id === 'estadisticasJson')
    
    if (!existingField) {
      // Agregar nuevo campo de estadísticas como JSON
      projectContentType.fields.push({
        id: 'estadisticasJson',
        name: 'Estadísticas (JSON)',
        type: 'Text',
        required: false,
        localized: true,
        validations: [
          {
            size: {
              max: 2000
            }
          }
        ]
      })
      
      // Actualizar el content type
      const updatedContentType = await projectContentType.update()
      await updatedContentType.publish()
      
      console.log('✅ Project content type updated with JSON statistics field!')
      console.log('📋 New field added: estadisticasJson (Text, max 2000 chars)')
      console.log('💡 This field will store statistics as JSON string')
      
    } else {
      console.log('✅ Statistics JSON field already exists!')
    }

  } catch (error) {
    console.error('❌ Error updating project statistics:', error)
    process.exit(1)
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  updateProjectStatisticsJson()
}

module.exports = updateProjectStatisticsJson

