// Cargar variables de entorno
require('dotenv').config({ path: '../.env' })

const { createClient } = require('contentful-management')

const managementClient = createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN!,
})

async function removeTeamFromHome() {
  console.log('🚀 Removing team members reference from Home Page content type...')
  
  try {
    const space = await managementClient.getSpace(process.env.CONTENTFUL_SPACE_ID!)
    const environment = await space.getEnvironment(process.env.CONTENTFUL_ENVIRONMENT || 'master')
    
    // Obtener el content type de Home Page
    const homePageContentType = await environment.getContentType('homePage')
    
    // Marcar los campos de miembros del equipo como omitted
    const fieldsToRemove = ['miembrosEquipo', 'maxMiembrosEquipo']
    
    homePageContentType.fields.forEach((field: any) => {
      if (fieldsToRemove.includes(field.id)) {
        field.omitted = true
      }
    })
    
    // Actualizar el content type
    const updatedContentType = await homePageContentType.update()
    await updatedContentType.publish()
    
    console.log('✅ Team members fields removed from Home Page content type!')
    console.log('📋 Removed fields:')
    console.log('- miembrosEquipo')
    console.log('- maxMiembrosEquipo')
    console.log('💡 Team members will be fetched directly from teamMember content type')
    
  } catch (error) {
    console.error('❌ Error removing team fields:', error)
    process.exit(1)
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  removeTeamFromHome()
}

module.exports = removeTeamFromHome
