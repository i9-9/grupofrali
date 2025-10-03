// Cargar variables de entorno
require('dotenv').config({ path: '../.env' })

const { createClient } = require('contentful-management')

const managementClient = createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN!,
})

async function createHomePageContentType() {
  console.log('🚀 Creating Home Page Content Type in Contentful...')
  
  try {
    const space = await managementClient.getSpace(process.env.CONTENTFUL_SPACE_ID!)
    const environment = await space.getEnvironment(process.env.CONTENTFUL_ENVIRONMENT || 'master')
    
    // Crear Home Page Content Type
    console.log('\n🏠 Creating Home Page content type...')
    const homePageContentType = await environment.createContentTypeWithId('homePage', {
      name: 'Home Page',
      displayField: 'title',
      fields: [
        {
          id: 'title',
          name: 'Title (ES)',
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
          id: 'titleEn',
          name: 'Title (EN)',
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
          id: 'heroTitle',
          name: 'Hero Title (ES)',
          type: 'Symbol',
          required: true,
          localized: true,
          validations: [
            {
              size: {
                max: 150
              }
            }
          ]
        },
        {
          id: 'heroTitleEn',
          name: 'Hero Title (EN)',
          type: 'Symbol',
          required: true,
          localized: true,
          validations: [
            {
              size: {
                max: 150
              }
            }
          ]
        },
        {
          id: 'description',
          name: 'Description (ES)',
          type: 'RichText',
          required: true,
          localized: true,
          validations: [
            {
              size: {
                max: 500
              }
            }
          ]
        },
        {
          id: 'descriptionEn',
          name: 'Description (EN)',
          type: 'RichText',
          required: true,
          localized: true,
          validations: [
            {
              size: {
                max: 500
              }
            }
          ]
        },
        // Videos del home
        {
          id: 'videosDesktop',
          name: 'Videos Desktop',
          type: 'Array',
          items: {
            type: 'Link',
            linkType: 'Asset'
          },
          required: false,
          localized: true,
          validations: [
            {
              size: {
                max: 3
              }
            }
          ]
        },
        {
          id: 'videosMobile',
          name: 'Videos Mobile',
          type: 'Array',
          items: {
            type: 'Link',
            linkType: 'Asset'
          },
          required: false,
          localized: true,
          validations: [
            {
              size: {
                max: 3
              }
            }
          ]
        },
        // Logos del marquee
        {
          id: 'logosMarquee',
          name: 'Logos Marquee',
          type: 'Array',
          items: {
            type: 'Link',
            linkType: 'Asset'
          },
          required: false,
          localized: true,
          validations: [
            {
              size: {
                max: 10
              }
            }
          ]
        },
        // Proyectos destacados
        {
          id: 'proyectosDestacados',
          name: 'Proyectos Destacados',
          type: 'Array',
          items: {
            type: 'Link',
            linkType: 'Entry',
            validations: [
              {
                linkContentType: ['project']
              }
            ]
          },
          required: false,
          localized: true,
          validations: [
            {
              size: {
                max: 6
              }
            }
          ]
        },
        {
          id: 'maxProyectosDestacados',
          name: 'Max Proyectos Destacados',
          type: 'Integer',
          required: false,
          localized: true,
          validations: [
            {
              range: {
                min: 1,
                max: 10
              }
            }
          ]
        },
        // Miembros del equipo
        {
          id: 'miembrosEquipo',
          name: 'Miembros Equipo',
          type: 'Array',
          items: {
            type: 'Link',
            linkType: 'Entry',
            validations: [
              {
                linkContentType: ['teamMember']
              }
            ]
          },
          required: false,
          localized: true,
          validations: [
            {
              size: {
                max: 10
              }
            }
          ]
        },
        {
          id: 'maxMiembrosEquipo',
          name: 'Max Miembros Equipo',
          type: 'Integer',
          required: false,
          localized: true,
          validations: [
            {
              range: {
                min: 1,
                max: 15
              }
            }
          ]
        },
        // Estadísticas dinámicas
        {
          id: 'estadisticas',
          name: 'Estadísticas',
          type: 'Array',
          items: {
            type: 'Link',
            linkType: 'Entry',
            validations: [
              {
                linkContentType: ['statistic']
              }
            ]
          },
          required: false,
          localized: true,
          validations: [
            {
              size: {
                max: 10
              }
            }
          ]
        },
        {
          id: 'maxEstadisticas',
          name: 'Max Estadísticas',
          type: 'Integer',
          required: false,
          localized: true,
          validations: [
            {
              range: {
                min: 1,
                max: 10
              }
            }
          ]
        },
        {
          id: 'isActive',
          name: 'Is Active',
          type: 'Boolean',
          required: true,
          localized: true
        },
        {
          id: 'lastUpdated',
          name: 'Last Updated',
          type: 'Date',
          required: false,
          localized: true
        }
      ]
    })
    await homePageContentType.publish()
    console.log('✅ Home Page content type created and published')

    console.log('\n🎉 Home Page content type created successfully!')

  } catch (error) {
    console.error('❌ Error creating Home Page content type:', error)
    process.exit(1)
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  createHomePageContentType()
}

module.exports = createHomePageContentType



































