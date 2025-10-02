// Cargar variables de entorno
require('dotenv').config({ path: '../.env' })

const { createClient } = require('contentful-management')

const managementClient = createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN!,
})

async function cleanProjectFields() {
  console.log('🧹 Cleaning Project content type fields...')
  
  try {
    const space = await managementClient.getSpace(process.env.CONTENTFUL_SPACE_ID!)
    const environment = await space.getEnvironment(process.env.CONTENTFUL_ENVIRONMENT || 'master')
    
    // Obtener el content type de Project
    const projectContentType = await environment.getContentType('project')
    
    console.log(`📋 Before: ${projectContentType.fields.length} fields`)
    
    // Filtrar campos problemáticos
    const fieldsToKeep = projectContentType.fields.filter((field: any) => {
      // Eliminar campos problemáticos
      if (field.id === 'estadisticas' && field.type === 'Array') {
        console.log(`❌ Removing problematic field: ${field.id} (${field.type})`)
        return false
      }
      if (field.id === 'estadisticasJson') {
        console.log(`❌ Removing duplicate field: ${field.id}`)
        return false
      }
      return true
    })
    
    console.log(`📋 After: ${fieldsToKeep.length} fields`)
    
    // Actualizar con solo los campos válidos
    projectContentType.fields = fieldsToKeep
    
    // Actualizar el content type
    const updatedContentType = await projectContentType.update()
    await updatedContentType.publish()
    
    console.log('✅ Project content type cleaned!')
    console.log('📋 Removed fields:')
    console.log('- estadisticas (Array) - problematic field without widget')
    console.log('- estadisticasJson (Text) - duplicate field')
    console.log('💡 Kept field: statistics (Text) - working JSON field')
    
  } catch (error) {
    console.error('❌ Error cleaning project fields:', error)
    process.exit(1)
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  cleanProjectFields()
}

module.exports = cleanProjectFields































