// Cargar variables de entorno
require('dotenv').config({ path: '../.env' })

const { createClient } = require('contentful-management')

const managementClient = createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN!,
})

async function checkProjectFields() {
  console.log('🔍 Checking Project content type fields...')
  
  try {
    const space = await managementClient.getSpace(process.env.CONTENTFUL_SPACE_ID!)
    const environment = await space.getEnvironment(process.env.CONTENTFUL_ENVIRONMENT || 'master')
    
    // Obtener el content type de Project
    const projectContentType = await environment.getContentType('project')
    
    console.log(`\n📋 Current fields in Project:`)
    console.log(`Total fields: ${projectContentType.fields.length}`)
    console.log('='.repeat(50))
    
    projectContentType.fields.forEach((field: any, index: number) => {
      const status = field.omitted ? '❌ OMITTED' : '✅ ACTIVE'
      const widget = field.widgetId ? ` (${field.widgetId})` : ''
      console.log(`${status} - ${field.name} (${field.id})${widget}`)
      
      if (field.id === 'estadisticas' || field.id === 'statistics') {
        console.log(`   📝 Type: ${field.type}`)
        console.log(`   📝 Widget: ${field.widgetId || 'None'}`)
        console.log(`   📝 Omitted: ${field.omitted}`)
      }
    })
    
    console.log('\n🎯 Summary:')
    const activeFields = projectContentType.fields.filter((field: any) => !field.omitted)
    const omittedFields = projectContentType.fields.filter((field: any) => field.omitted)
    console.log(`✅ Active fields: ${activeFields.length}`)
    console.log(`❌ Omitted fields: ${omittedFields.length}`)
    
  } catch (error) {
    console.error('❌ Error checking project fields:', error)
    process.exit(1)
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  checkProjectFields()
}

module.exports = checkProjectFields
