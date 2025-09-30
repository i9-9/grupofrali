// Cargar variables de entorno
require('dotenv').config({ path: '../.env' })

const { createClient } = require('contentful-management')
const fs = require('fs')
const path = require('path')

const managementClient = createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN!,
})

async function migrateProjectStatistics() {
  console.log('📊 Migrating project statistics to ProjectStatistic content type...')
  
  try {
    const space = await managementClient.getSpace(process.env.CONTENTFUL_SPACE_ID!)
    const environment = await space.getEnvironment(process.env.CONTENTFUL_ENVIRONMENT || 'master')
    
    // Leer datos de proyectos
    const projectsData = JSON.parse(
      fs.readFileSync(path.join(__dirname, '../src/data/projects.json'), 'utf8')
    )
    
    // Obtener proyectos existentes en Contentful
    const projects = await environment.getEntries({
      content_type: 'project'
    })
    
    console.log(`📋 Found ${projects.items.length} projects in Contentful`)
    
    let totalStatistics = 0
    
    for (const project of projects.items) {
      const projectData = projectsData.proyectos.find((p: any) => p.id === project.fields.slug?.['en-US'])
      
      if (!projectData || !projectData.estadisticas) {
        console.log(`⚠️  No statistics found for project: ${project.fields.title?.['en-US']}`)
        continue
      }
      
      console.log(`\n📊 Processing statistics for: ${project.fields.title?.['en-US']}`)
      
      // Procesar cada estadística
      for (const [key, value] of Object.entries(projectData.estadisticas)) {
        const statEn = projectData.statistics_en?.[key] || value
        
        // Mapear nombres de estadísticas
        const statNames: { [key: string]: { es: string; en: string } } = {
          'capacidad_instalada': { es: 'Capacidad Instalada', en: 'Installed Capacity' },
          'factor_capacidad_historico': { es: 'Factor de Capacidad Histórico', en: 'Historical Capacity Factor' },
          'produccion_anual_promedio': { es: 'Producción Anual Promedio', en: 'Average Annual Production' },
          'estado': { es: 'Estado', en: 'Status' },
          'hogares_abastecidos': { es: 'Hogares Abastecidos', en: 'Households Supplied' },
          'reduccion_emisiones_anuales': { es: 'Reducción de Emisiones Anuales', en: 'Annual Emissions Reduction' },
          'superficie_total': { es: 'Superficie Total', en: 'Total Area' },
          'unidades_totales': { es: 'Unidades Totales', en: 'Total Units' },
          'unidades_vendidas': { es: 'Unidades Vendidas', en: 'Units Sold' },
          'porcentaje_vendido': { es: 'Porcentaje Vendido', en: 'Percentage Sold' },
          'inversion_total': { es: 'Inversión Total', en: 'Total Investment' },
          'empleos_generados': { es: 'Empleos Generados', en: 'Jobs Created' }
        }
        
        const statName = statNames[key] || { es: key.replace(/_/g, ' ').toUpperCase(), en: key.replace(/_/g, ' ').toUpperCase() }
        
        // Extraer unidad del valor
        const valueStr = String(value)
        const unitMatch = valueStr.match(/([A-Za-z%]+)$/)
        const unit = unitMatch ? unitMatch[1] : ''
        const cleanValue = valueStr.replace(/[A-Za-z%]+$/, '').trim()
        
        // Crear entry de estadística
        const statisticEntry = await environment.createEntry('7fjLXGmdgFUlcGjBFqrC0', {
          fields: {
            name: {
              'en-US': statName.es
            },
            nameEn: {
              'en-US': statName.en
            },
            value: {
              'en-US': cleanValue
            },
            unit: {
              'en-US': unit
            },
            unitEn: {
              'en-US': unit
            },
            project: {
              'en-US': {
                sys: {
                  type: 'Link',
                  linkType: 'Entry',
                  id: project.sys.id
                }
              }
            }
          }
        })
        
        await statisticEntry.publish()
        totalStatistics++
        
        console.log(`  ✅ Created: ${statName.es} = ${cleanValue} ${unit}`)
      }
    }
    
    console.log(`\n🎉 Migration completed!`)
    console.log(`📊 Total statistics created: ${totalStatistics}`)
    console.log(`💡 Now you can use references instead of JSON strings`)
    
  } catch (error) {
    console.error('❌ Error migrating project statistics:', error)
    process.exit(1)
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  migrateProjectStatistics()
}

module.exports = migrateProjectStatistics
