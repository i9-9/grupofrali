// Cargar variables de entorno
require('dotenv').config({ path: '../.env' })

const { createClient } = require('contentful-management')

const managementClient = createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN!,
})

async function createProjectStatisticContentType() {
  console.log('🏗️  Creating ProjectStatistic content type...')
  
  try {
    const space = await managementClient.getSpace(process.env.CONTENTFUL_SPACE_ID!)
    const environment = await space.getEnvironment(process.env.CONTENTFUL_ENVIRONMENT || 'master')
    
    // Verificar si ya existe
    try {
      const existing = await environment.getContentType('projectStatistic')
      console.log('⚠️  ProjectStatistic content type already exists!')
      return existing
    } catch (error) {
      // No existe, continuar con la creación
    }
    
    // Crear el content type
    const contentType = await environment.createContentType({
      sys: {
        id: 'projectStatistic'
      },
      name: 'Project Statistic',
      displayField: 'name',
      description: 'Estadísticas específicas de cada proyecto',
      fields: [
        {
          id: 'name',
          name: 'Name (ES)',
          type: 'Symbol',
          localized: true,
          required: true,
          validations: [
            {
              size: {
                max: 100
              }
            }
          ]
        },
        {
          id: 'nameEn',
          name: 'Name (EN)',
          type: 'Symbol',
          localized: true,
          required: true,
          validations: [
            {
              size: {
                max: 100
              }
            }
          ]
        },
        {
          id: 'value',
          name: 'Value',
          type: 'Symbol',
          localized: false,
          required: true,
          validations: [
            {
              size: {
                max: 50
              }
            }
          ]
        },
        {
          id: 'unit',
          name: 'Unit (ES)',
          type: 'Symbol',
          localized: true,
          required: false,
          validations: [
            {
              size: {
                max: 20
              }
            }
          ]
        },
        {
          id: 'unitEn',
          name: 'Unit (EN)',
          type: 'Symbol',
          localized: true,
          required: false,
          validations: [
            {
              size: {
                max: 20
              }
            }
          ]
        },
        {
          id: 'project',
          name: 'Project',
          type: 'Link',
          localized: false,
          required: true,
          validations: [
            {
              linkContentType: ['project']
            }
          ],
          linkType: 'Entry'
        }
      ]
    })
    
    // Publicar el content type
    await contentType.publish()
    
    console.log('✅ ProjectStatistic content type created successfully!')
    console.log('📋 Fields created:')
    console.log('- name / nameEn - Nombre de la estadística')
    console.log('- value - Valor de la estadística')
    console.log('- unit / unitEn - Unidad de medida')
    console.log('- project - Referencia al proyecto')
    
    return contentType
    
  } catch (error) {
    console.error('❌ Error creating ProjectStatistic content type:', error)
    process.exit(1)
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  createProjectStatisticContentType()
}

module.exports = createProjectStatisticContentType
