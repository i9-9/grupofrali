// Cargar variables de entorno
require('dotenv').config({ path: '../.env' })

const { createClient } = require('contentful-management')

const managementClient = createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN!,
})

async function cleanHomeConfig() {
  console.log('🚀 Cleaning unnecessary config fields from Home Page...')
  
  try {
    const space = await managementClient.getSpace(process.env.CONTENTFUL_SPACE_ID!)
    const environment = await space.getEnvironment(process.env.CONTENTFUL_ENVIRONMENT || 'master')
    
    // Obtener el content type de Home Page
    const homePageContentType = await environment.getContentType('homePage')
    
    // Marcar campos innecesarios como omitted
    const fieldsToRemove = ['isActive', 'lastUpdated']
    
    homePageContentType.fields.forEach((field: any) => {
      if (fieldsToRemove.includes(field.id)) {
        field.omitted = true
      }
    })
    
    // Actualizar el content type
    const updatedContentType = await homePageContentType.update()
    await updatedContentType.publish()
    
    console.log('✅ Unnecessary config fields removed from Home Page!')
    console.log('📋 Removed fields:')
    console.log('- isActive (not needed - only one home page)')
    console.log('- lastUpdated (redundant - Contentful handles this automatically)')
    console.log('💡 Home page is now cleaner and more focused')
    
  } catch (error) {
    console.error('❌ Error cleaning config fields:', error)
    process.exit(1)
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  cleanHomeConfig()
}

module.exports = cleanHomeConfig






























