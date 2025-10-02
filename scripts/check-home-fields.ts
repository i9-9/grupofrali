// Cargar variables de entorno
require('dotenv').config({ path: '../.env' })

const { createClient } = require('contentful-management')

const managementClient = createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN!,
})

async function checkHomeFields() {
  console.log('🔍 Checking Home Page content type fields...')
  
  try {
    const space = await managementClient.getSpace(process.env.CONTENTFUL_SPACE_ID!)
    const environment = await space.getEnvironment(process.env.CONTENTFUL_ENVIRONMENT || 'master')
    
    // Obtener el content type de Home Page
    const homePageContentType = await environment.getContentType('homePage')
    
    console.log('\n📋 Current fields in Home Page:')
    homePageContentType.fields.forEach((field: any) => {
      const status = field.omitted ? '❌ OMITTED' : '✅ ACTIVE'
      console.log(`${status} - ${field.name} (${field.id})`)
    })
    
    console.log('\n🎯 Summary:')
    const activeFields = homePageContentType.fields.filter((field: any) => !field.omitted)
    const omittedFields = homePageContentType.fields.filter((field: any) => field.omitted)
    
    console.log(`✅ Active fields: ${activeFields.length}`)
    console.log(`❌ Omitted fields: ${omittedFields.length}`)
    
  } catch (error) {
    console.error('❌ Error checking fields:', error)
    process.exit(1)
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  checkHomeFields()
}

module.exports = checkHomeFields






























