// Cargar variables de entorno
require('dotenv').config({ path: '../.env' })

const { createClient } = require('contentful-management')

const managementClient = createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN!,
})

async function linkStatisticsToProjects() {
  console.log('🔗 Linking statistics to their corresponding projects...')
  
  try {
    const space = await managementClient.getSpace(process.env.CONTENTFUL_SPACE_ID!)
    const environment = await space.getEnvironment(process.env.CONTENTFUL_ENVIRONMENT || 'master')
    
    // Obtener todos los proyectos
    const projects = await environment.getEntries({
      content_type: 'project'
    })
    
    // Obtener todas las estadísticas
    const statistics = await environment.getEntries({
      content_type: '7fjLXGmdgFUlcGjBFqrC0' // ProjectStatistic content type ID
    })
    
    console.log(`📋 Found ${projects.items.length} projects`)
    console.log(`📊 Found ${statistics.items.length} statistics`)
    
    let linkedCount = 0
    
    // Para cada proyecto, encontrar sus estadísticas y vincularlas
    for (const project of projects.items) {
      const projectSlug = project.fields.slug?.['en-US']
      if (!projectSlug) continue
      
      // Buscar estadísticas que pertenecen a este proyecto
      const projectStatistics = statistics.items.filter((stat: any) => {
        const statProjectId = stat.fields.project?.['en-US']?.sys?.id
        return statProjectId === project.sys.id
      })
      
      if (projectStatistics.length === 0) {
        console.log(`⚠️  No statistics found for project: ${project.fields.title?.['en-US']}`)
        continue
      }
      
      console.log(`\n📊 Linking ${projectStatistics.length} statistics to: ${project.fields.title?.['en-US']}`)
      
      // Crear array de referencias
      const statisticsReferences = projectStatistics.map((stat: any) => ({
        sys: {
          type: 'Link',
          linkType: 'Entry',
          id: stat.sys.id
        }
      }))
      
      // Actualizar el proyecto con las referencias
      project.fields.estadisticasReferencias = {
        'en-US': statisticsReferences
      }
      
      // Guardar los cambios
      const updatedProject = await project.update()
      await updatedProject.publish()
      
      linkedCount += projectStatistics.length
      
      // Mostrar las estadísticas vinculadas
      projectStatistics.forEach((stat: any) => {
        console.log(`  ✅ ${stat.fields.name?.['en-US']} = ${stat.fields.value?.['en-US']} ${stat.fields.unit?.['en-US'] || ''}`)
      })
    }
    
    console.log(`\n🎉 Linking completed!`)
    console.log(`📊 Total statistics linked: ${linkedCount}`)
    console.log(`💡 Projects now have proper statistics references`)
    
  } catch (error) {
    console.error('❌ Error linking statistics to projects:', error)
    process.exit(1)
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  linkStatisticsToProjects()
}

module.exports = linkStatisticsToProjects






























