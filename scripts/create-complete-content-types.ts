// Cargar variables de entorno
require('dotenv').config({ path: '../.env' })

const { createClient } = require('contentful-management')

const managementClient = createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN!,
})

async function createCompleteContentTypes() {
  console.log('🚀 Creating Complete Content Types in Contentful...')
  
  try {
    const space = await managementClient.getSpace(process.env.CONTENTFUL_SPACE_ID!)
    const environment = await space.getEnvironment(process.env.CONTENTFUL_ENVIRONMENT || 'master')
    
    // 1. Crear Category Content Type
    console.log('\n🏷️ Creating Category content type...')
    const categoryContentType = await environment.createContentTypeWithId('category', {
      name: 'Category',
      displayField: 'name',
      fields: [
        {
          id: 'name',
          name: 'Name (ES)',
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
          id: 'nameEn',
          name: 'Name (EN)',
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
          id: 'slug',
          name: 'Slug',
          type: 'Symbol',
          required: true,
          localized: true,
          validations: [
            {
              regexp: {
                pattern: '^[a-z0-9-]+$',
                flags: 'i'
              }
            }
          ]
        },
        {
          id: 'description',
          name: 'Description (ES)',
          type: 'Text',
          required: false,
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
          type: 'Text',
          required: false,
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
          id: 'isActive',
          name: 'Is Active',
          type: 'Boolean',
          required: true,
          localized: true
        }
      ]
    })
    await categoryContentType.publish()
    console.log('✅ Category content type created and published')

    // 2. Crear Project Content Type
    console.log('\n🏗️ Creating Project content type...')
    const projectContentType = await environment.createContentTypeWithId('project', {
      name: 'Project',
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
                max: 150
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
                max: 150
              }
            }
          ]
        },
        {
          id: 'slug',
          name: 'Slug',
          type: 'Symbol',
          required: true,
          localized: true,
          validations: [
            {
              regexp: {
                pattern: '^[a-z0-9-]+$',
                flags: 'i'
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
                max: 2000
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
                max: 2000
              }
            }
          ]
        },
        {
          id: 'category',
          name: 'Category',
          type: 'Link',
          linkType: 'Entry',
          required: true,
          localized: true,
          validations: [
            {
              linkContentType: ['category']
            }
          ]
        },
        {
          id: 'location',
          name: 'Location (ES)',
          type: 'Symbol',
          required: false,
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
          id: 'locationEn',
          name: 'Location (EN)',
          type: 'Symbol',
          required: false,
          localized: true,
          validations: [
            {
              size: {
                max: 100
              }
            }
          ]
        },
        // Imágenes del proyecto
        {
          id: 'desarrolloDesktop',
          name: 'Imagen Principal Desktop',
          type: 'Link',
          linkType: 'Asset',
          required: false,
          localized: true
        },
        {
          id: 'desarrolloMobile',
          name: 'Imagen Principal Mobile',
          type: 'Link',
          linkType: 'Asset',
          required: false,
          localized: true
        },
        {
          id: 'galeriaDesktop',
          name: 'Galería Desktop',
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
        {
          id: 'galeriaMobile',
          name: 'Galería Mobile',
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
        {
          id: 'imagenHome',
          name: 'Imagen Home',
          type: 'Link',
          linkType: 'Asset',
          required: false,
          localized: true
        },
        // Estadísticas del proyecto (Object Array)
        {
          id: 'estadisticas',
          name: 'Estadísticas',
          type: 'Array',
          items: {
            type: 'Object'
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
          id: 'status',
          name: 'Status (ES)',
          type: 'Symbol',
          required: false,
          localized: true,
          validations: [
            {
              size: {
                max: 50
              }
            }
          ]
        },
        {
          id: 'statusEn',
          name: 'Status (EN)',
          type: 'Symbol',
          required: false,
          localized: true,
          validations: [
            {
              size: {
                max: 50
              }
            }
          ]
        },
        {
          id: 'isFeatured',
          name: 'Proyecto Destacado',
          type: 'Boolean',
          required: true,
          localized: true
        },
        {
          id: 'isActive',
          name: 'Is Active',
          type: 'Boolean',
          required: true,
          localized: true
        },
        {
          id: 'displayOrder',
          name: 'Orden',
          type: 'Integer',
          required: false,
          localized: true,
          validations: [
            {
              range: {
                min: 0
              }
            }
          ]
        }
      ]
    })
    await projectContentType.publish()
    console.log('✅ Project content type created and published')

    // 3. Crear Team Member Content Type
    console.log('\n👥 Creating Team Member content type...')
    const teamMemberContentType = await environment.createContentTypeWithId('teamMember', {
      name: 'Team Member',
      displayField: 'name',
      fields: [
        {
          id: 'name',
          name: 'Name',
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
          id: 'position',
          name: 'Position (ES)',
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
          id: 'positionEn',
          name: 'Position (EN)',
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
          id: 'photo',
          name: 'Photo',
          type: 'Link',
          linkType: 'Asset',
          required: false,
          localized: true
        },
        {
          id: 'bio',
          name: 'Bio (ES)',
          type: 'Text',
          required: false,
          localized: true,
          validations: [
            {
              size: {
                max: 1000
              }
            }
          ]
        },
        {
          id: 'bioEn',
          name: 'Bio (EN)',
          type: 'Text',
          required: false,
          localized: true,
          validations: [
            {
              size: {
                max: 1000
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
          id: 'displayOrder',
          name: 'Orden',
          type: 'Integer',
          required: false,
          localized: true,
          validations: [
            {
              range: {
                min: 0
              }
            }
          ]
        }
      ]
    })
    await teamMemberContentType.publish()
    console.log('✅ Team Member content type created and published')

    // 4. Crear Statistic Content Type
    console.log('\n📊 Creating Statistic content type...')
    const statisticContentType = await environment.createContentTypeWithId('statistic', {
      name: 'Statistic',
      displayField: 'label',
      fields: [
        {
          id: 'label',
          name: 'Label (ES)',
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
          id: 'labelEn',
          name: 'Label (EN)',
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
          id: 'value',
          name: 'Value',
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
        },
        {
          id: 'unit',
          name: 'Unit (ES)',
          type: 'Symbol',
          required: false,
          localized: true,
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
          required: false,
          localized: true,
          validations: [
            {
              size: {
                max: 20
              }
            }
          ]
        },
        {
          id: 'icon',
          name: 'Icon',
          type: 'Link',
          linkType: 'Asset',
          required: false,
          localized: true
        },
        {
          id: 'displayOrder',
          name: 'Orden',
          type: 'Integer',
          required: true,
          localized: true,
          validations: [
            {
              range: {
                min: 0
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
        }
      ]
    })
    await statisticContentType.publish()
    console.log('✅ Statistic content type created and published')

    // 5. Crear Home Page Content Type
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

    console.log('\n🎉 All complete content types created successfully!')
    console.log('\n📝 Content Types created:')
    console.log('- Category (name, nameEn, slug, description, descriptionEn, isActive)')
    console.log('- Project (title, titleEn, slug, description, descriptionEn, category, location, locationEn, images, estadisticas, status, statusEn, isFeatured, isActive, displayOrder)')
    console.log('- Team Member (name, position, positionEn, photo, bio, bioEn, isActive, displayOrder)')
    console.log('- Statistic (label, labelEn, value, unit, unitEn, icon, displayOrder, isActive)')
    console.log('- Home Page (title, titleEn, heroTitle, heroTitleEn, description, descriptionEn, videos, logos, proyectos, miembros, estadisticas, isActive, lastUpdated)')

  } catch (error) {
    console.error('❌ Error creating content types:', error)
    process.exit(1)
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  createCompleteContentTypes()
}

module.exports = createCompleteContentTypes
