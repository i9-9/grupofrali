import { config } from 'dotenv'
import { createClient } from 'contentful'

// Cargar variables de entorno
config({ path: '../.env' })

// Cliente de Contentful
const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN!,
  environment: process.env.CONTENTFUL_ENVIRONMENT || 'master',
})

async function listProjectStatistics() {
  try {
    console.log('🔍 Fetching project statistics from Contentful...')
    
    // Obtener estadísticas de proyectos
    const projectStatsResponse = await client.getEntries({
      content_type: '7fjLXGmdgFUlcGjBFqrC0', // ProjectStatistic content type ID
      include: 2
    })
    
    console.log(`\n📊 Found ${projectStatsResponse.items.length} project statistics:\n`)
    
    projectStatsResponse.items.forEach((item: any, index) => {
      const fields = item.fields
      console.log(`${index + 1}. ${fields.name} (${fields.nameEn})`)
      console.log(`   Value: ${fields.value}`)
      console.log(`   Unit: ${fields.unit || 'N/A'} (${fields.unitEn || 'N/A'})`)
      console.log(`   Project: ${fields.project?.fields?.title || 'N/A'}`)
      console.log(`   ID: ${item.sys.id}`)
      console.log('')
    })
    
    // También obtener proyectos con sus estadísticas
    console.log('\n🏗️ Projects with statistics:\n')
    
    const projectsResponse = await client.getEntries({
      content_type: 'project',
      include: 3,
      'fields.isActive': true,
      order: ['fields.displayOrder']
    })
    
    projectsResponse.items.forEach((project: any, index) => {
      const fields = project.fields
      console.log(`${index + 1}. ${fields.title}`)
      console.log(`   Slug: ${fields.slug}`)
      console.log(`   Featured: ${fields.isFeatured}`)
      console.log(`   Statistics Count: ${fields.estadisticasReferencias?.length || 0}`)
      
      if (fields.estadisticasReferencias && fields.estadisticasReferencias.length > 0) {
        console.log('   Project Statistics:')
        fields.estadisticasReferencias.forEach((stat: any, statIndex: number) => {
          console.log(`     ${statIndex + 1}. ${stat.fields.name}: ${stat.fields.value} ${stat.fields.unit || ''}`)
        })
      }
      console.log('')
    })
    
  } catch (error) {
    console.error('❌ Error fetching project statistics:', error)
  }
}

listProjectStatistics()
