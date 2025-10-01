// Cargar variables de entorno
require('dotenv').config({ path: '../.env' })

const { createClient } = require('contentful-management')

const managementClient = createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN!,
})

async function verifyContentTypes() {
  console.log('🔍 Verifying Content Types in Contentful...')
  
  try {
    const space = await managementClient.getSpace(process.env.CONTENTFUL_SPACE_ID!)
    const environment = await space.getEnvironment(process.env.CONTENTFUL_ENVIRONMENT || 'master')
    
    const contentTypes = await environment.getContentTypes()
    
    console.log('\n📋 Content Types found:')
    contentTypes.items.forEach((contentType: any) => {
      console.log(`✅ ${contentType.name} (${contentType.sys.id}) - ${contentType.fields.length} fields`)
    })
    
    console.log('\n🎯 Expected Content Types:')
    const expectedTypes = ['category', 'project', 'teamMember', 'statistic', 'homePage']
    
    expectedTypes.forEach(expectedType => {
      const found = contentTypes.items.find((ct: any) => ct.sys.id === expectedType)
      if (found) {
        console.log(`✅ ${expectedType} - Found`)
      } else {
        console.log(`❌ ${expectedType} - Missing`)
      }
    })
    
    console.log('\n🎉 Verification complete!')

  } catch (error) {
    console.error('❌ Error verifying content types:', error)
    process.exit(1)
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  verifyContentTypes()
}

module.exports = verifyContentTypes





























