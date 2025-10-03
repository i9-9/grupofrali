// Cargar variables de entorno
require('dotenv').config({ path: '../.env' })

const { createClient } = require('contentful-management')
const projectsData = require('../src/data/projects.json')

const managementClient = createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN!,
})

async function updateProjectsWithStats() {
  console.log('🚀 Updating existing projects with statistics...')
  
  try {
    const space = await managementClient.getSpace(process.env.CONTENTFUL_SPACE_ID!)
    const environment = await space.getEnvironment(process.env.CONTENTFUL_ENVIRONMENT || 'master')
    
    // Obtener todos los proyectos existentes
    const existingProjects = await environment.getEntries({ content_type: 'project' })
    
    console.log(`📋 Found ${existingProjects.items.length} existing projects`)
    
    // Actualizar cada proyecto con las estadísticas
    for (let i = 0; i < existingProjects.items.length; i++) {
      const project = existingProjects.items[i]
      const projectData = projectsData.proyectos[i]
      
      if (!projectData) {
        console.warn(`⚠️  No data found for project ${project.fields.title?.['en-US']}`)
        continue
      }
      
      // Crear estadísticas en formato JSON string
      const statisticsJson = JSON.stringify(Object.entries(projectData.estadisticas || {}).map(([key, value]) => ({
        nombre: key.replace(/_/g, ' ').toUpperCase(),
        nombreEn: key.replace(/_/g, ' ').toUpperCase(),
        valor: value
      })))
      
      // Actualizar el proyecto
      project.fields.statistics = { 'en-US': statisticsJson }
      
      const updatedProject = await project.update()
      await updatedProject.publish()
      
      console.log(`✅ Updated project: ${projectData.titulo}`)
    }
    
    console.log('✅ All projects updated with statistics!')
    
  } catch (error) {
    console.error('❌ Error updating projects:', error)
    process.exit(1)
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  updateProjectsWithStats()
}

module.exports = updateProjectsWithStats


































