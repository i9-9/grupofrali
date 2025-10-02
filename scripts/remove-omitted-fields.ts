// Cargar variables de entorno
require('dotenv').config({ path: '../.env' })

const { createClient } = require('contentful-management')

const managementClient = createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN!,
})

async function removeOmittedFields() {
  console.log('🚀 Removing omitted fields completely from Home Page schema...')
  
  try {
    const space = await managementClient.getSpace(process.env.CONTENTFUL_SPACE_ID!)
    const environment = await space.getEnvironment(process.env.CONTENTFUL_ENVIRONMENT || 'master')
    
    // Obtener el content type de Home Page
    const homePageContentType = await environment.getContentType('homePage')
    
    // Filtrar solo los campos que NO están omitted
    const fieldsToKeep = homePageContentType.fields.filter((field: any) => !field.omitted)
    
    console.log(`📋 Before: ${homePageContentType.fields.length} fields`)
    console.log(`📋 After: ${fieldsToKeep.length} fields`)
    
    // Actualizar con solo los campos activos
    homePageContentType.fields = fieldsToKeep
    
    // Actualizar el content type
    const updatedContentType = await homePageContentType.update()
    await updatedContentType.publish()
    
    console.log('✅ Omitted fields completely removed from schema!')
    console.log('📋 Removed fields:')
    console.log('- miembrosEquipo')
    console.log('- maxMiembrosEquipo') 
    console.log('- isActive')
    console.log('- lastUpdated')
    console.log('💡 Schema is now clean and only shows active fields')
    
  } catch (error) {
    console.error('❌ Error removing omitted fields:', error)
    process.exit(1)
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  removeOmittedFields()
}

module.exports = removeOmittedFields































