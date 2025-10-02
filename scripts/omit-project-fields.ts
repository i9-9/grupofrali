// Cargar variables de entorno
require('dotenv').config({ path: '../.env' })

const { createClient } = require('contentful-management')

const managementClient = createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN!,
})

async function omitProjectFields() {
  console.log('🚫 Omitting problematic Project fields...')
  
  try {
    const space = await managementClient.getSpace(process.env.CONTENTFUL_SPACE_ID!)
    const environment = await space.getEnvironment(process.env.CONTENTFUL_ENVIRONMENT || 'master')
    
    // Obtener el content type de Project
    const projectContentType = await environment.getContentType('project')
    
    console.log(`📋 Before: ${projectContentType.fields.length} fields`)
    
    // Marcar campos problemáticos como omitted
    projectContentType.fields.forEach((field: any) => {
      if (field.id === 'estadisticas' && field.type === 'Array') {
        console.log(`🚫 Omitting field: ${field.id} (${field.type})`)
        field.omitted = true
      }
      if (field.id === 'estadisticasJson') {
        console.log(`🚫 Omitting field: ${field.id}`)
        field.omitted = true
      }
    })
    
    // Actualizar el content type
    const updatedContentType = await projectContentType.update()
    await updatedContentType.publish()
    
    console.log('✅ Problematic fields marked as omitted!')
    console.log('📋 Next step: Run clean:project-fields to remove them completely')
    
  } catch (error) {
    console.error('❌ Error omitting project fields:', error)
    process.exit(1)
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  omitProjectFields()
}

module.exports = omitProjectFields































