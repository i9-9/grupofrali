import { config } from 'dotenv'
import { createClient } from 'contentful'
import fs from 'fs'
import path from 'path'

// Cargar variables de entorno
config({ path: '../.env' })

// Cliente de Contentful
const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN!,
  environment: process.env.CONTENTFUL_ENVIRONMENT || 'master',
})

// Cargar datos locales
const localData = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/projects.json'), 'utf8'))

async function compareStatistics() {
  try {
    console.log('🔍 Comparing local vs Contentful statistics...\n')
    
    // Obtener proyectos de Contentful
    const projectsResponse = await client.getEntries({
      content_type: 'project',
      include: 3,
      'fields.isActive': true,
      order: ['fields.displayOrder']
    })
    
    const contentfulProjects = projectsResponse.items as any[]
    
    // Crear mapa de proyectos locales por slug
    const localProjectsMap = new Map()
    localData.proyectos.forEach((project: any) => {
      localProjectsMap.set(project.id, project)
    })
    
    console.log('📊 COMPARISON RESULTS:\n')
    console.log('=' .repeat(80))
    
    contentfulProjects.forEach((contentfulProject, index) => {
      const slug = contentfulProject.fields.slug
      const localProject = localProjectsMap.get(slug)
      
      console.log(`\n${index + 1}. ${contentfulProject.fields.title}`)
      console.log(`   Slug: ${slug}`)
      console.log(`   Local found: ${localProject ? '✅' : '❌'}`)
      
      if (!localProject) {
        console.log('   ⚠️  No local data found for this project')
        return
      }
      
      // Comparar estadísticas
      const contentfulStats = contentfulProject.fields.estadisticasReferencias || []
      const localStats = localProject.estadisticas || {}
      
      console.log(`   Contentful stats: ${contentfulStats.length}`)
      console.log(`   Local stats: ${Object.keys(localStats).length}`)
      
      // Mostrar estadísticas de Contentful
      console.log('\n   📋 CONTENTFUL STATISTICS:')
      contentfulStats.forEach((stat: any, statIndex: number) => {
        const name = stat.fields.name
        const value = stat.fields.value
        const unit = stat.fields.unit || ''
        console.log(`     ${statIndex + 1}. ${name}: ${value} ${unit}`)
      })
      
      // Mostrar estadísticas locales
      console.log('\n   📋 LOCAL STATISTICS:')
      Object.entries(localStats).forEach(([key, value], statIndex) => {
        console.log(`     ${statIndex + 1}. ${key}: ${value}`)
      })
      
      // Identificar diferencias
      console.log('\n   🔍 DIFFERENCES:')
      const contentfulStatsMap = new Map()
      contentfulStats.forEach((stat: any) => {
        const key = stat.fields.name.toLowerCase().replace(/\s+/g, '_')
        contentfulStatsMap.set(key, {
          name: stat.fields.name,
          value: stat.fields.value,
          unit: stat.fields.unit || ''
        })
      })
      
      const localStatsMap = new Map()
      Object.entries(localStats).forEach(([key, value]) => {
        localStatsMap.set(key, value)
      })
      
      // Encontrar estadísticas que están en Contentful pero no en local
      contentfulStatsMap.forEach((contentfulStat, key) => {
        if (!localStatsMap.has(key)) {
          console.log(`     ❌ Missing in local: ${contentfulStat.name} = ${contentfulStat.value} ${contentfulStat.unit}`)
        }
      })
      
      // Encontrar estadísticas que están en local pero no en Contentful
      localStatsMap.forEach((localValue, key) => {
        if (!contentfulStatsMap.has(key)) {
          console.log(`     ❌ Missing in Contentful: ${key} = ${localValue}`)
        }
      })
      
      // Comparar valores que existen en ambos
      contentfulStatsMap.forEach((contentfulStat, key) => {
        if (localStatsMap.has(key)) {
          const localValue = localStatsMap.get(key)
          const contentfulValue = `${contentfulStat.value} ${contentfulStat.unit}`.trim()
          
          if (localValue !== contentfulValue) {
            console.log(`     ⚠️  Value mismatch for ${contentfulStat.name}:`)
            console.log(`        Contentful: "${contentfulValue}"`)
            console.log(`        Local:      "${localValue}"`)
          }
        }
      })
      
      console.log('\n' + '=' .repeat(80))
    })
    
  } catch (error) {
    console.error('❌ Error comparing statistics:', error)
  }
}

compareStatistics()


