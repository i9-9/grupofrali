// Cargar variables de entorno
require('dotenv').config({ path: '../.env' })

const { createClient } = require('contentful-management')

const managementClient = createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN!,
})

async function updateProjectStatistics() {
  console.log('🚀 Updating Project content type with statistics structure...')
  
  try {
    const space = await managementClient.getSpace(process.env.CONTENTFUL_SPACE_ID!)
    const environment = await space.getEnvironment(process.env.CONTENTFUL_ENVIRONMENT || 'master')
    
    // Obtener el content type de Project
    const projectContentType = await environment.getContentType('project')
    
    // Actualizar el campo estadisticas con la estructura del objeto
    const estadisticasField = projectContentType.fields.find((field: any) => field.id === 'estadisticas')
    
    if (estadisticasField) {
      // Actualizar la estructura del objeto
      estadisticasField.items = {
        type: 'Object',
        fields: [
          {
            id: 'nombre',
            name: 'Nombre (ES)',
            type: 'Symbol',
            required: true,
            localized: true,
            validations: [
              {
                size: {
                  max: 100
                }
              }
            ]
          },
          {
            id: 'nombreEn',
            name: 'Nombre (EN)',
            type: 'Symbol',
            required: true,
            localized: true,
            validations: [
              {
                size: {
                  max: 100
                }
              }
            ]
          },
          {
            id: 'valor',
            name: 'Valor',
            type: 'Symbol',
            required: true,
            localized: true,
            validations: [
              {
                size: {
                  max: 50
                }
              }
            ]
          }
        ]
      }
      
      // Actualizar el content type
      const updatedContentType = await projectContentType.update()
      await updatedContentType.publish()
      
      console.log('✅ Project content type updated with statistics structure!')
      console.log('📋 Statistics object structure:')
      console.log('- nombre (ES): Required, max 100 chars')
      console.log('- nombreEn (EN): Required, max 100 chars') 
      console.log('- valor: Required, max 50 chars')
      
    } else {
      console.log('❌ Statistics field not found in Project content type')
    }

  } catch (error) {
    console.error('❌ Error updating project statistics:', error)
    process.exit(1)
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  updateProjectStatistics()
}

module.exports = updateProjectStatistics

