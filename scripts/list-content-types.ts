// Cargar variables de entorno
require('dotenv').config({ path: '../.env' })

const { createClient } = require('contentful-management')

const managementClient = createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN!,
})

async function listContentTypes() {
  console.log('📋 Listing all content types...')
  
  try {
    const space = await managementClient.getSpace(process.env.CONTENTFUL_SPACE_ID!)
    const environment = await space.getEnvironment(process.env.CONTENTFUL_ENVIRONMENT || 'master')
    
    const contentTypes = await environment.getContentTypes()
    
    console.log(`\n📋 Found ${contentTypes.items.length} content types:`)
    console.log('='.repeat(50))
    
    contentTypes.items.forEach((contentType: any) => {
      const status = contentType.sys.publishedAt ? '✅ Published' : '⏳ Draft'
      console.log(`${status} - ${contentType.name} (${contentType.sys.id})`)
    })
    
  } catch (error) {
    console.error('❌ Error listing content types:', error)
    process.exit(1)
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  listContentTypes()
}

module.exports = listContentTypes































