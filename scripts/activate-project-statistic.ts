// Cargar variables de entorno
require('dotenv').config({ path: '../.env' })

const { createClient } = require('contentful-management')

const managementClient = createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN!,
})

async function activateProjectStatistic() {
  console.log('🔓 Activating ProjectStatistic content type...')
  
  try {
    const space = await managementClient.getSpace(process.env.CONTENTFUL_SPACE_ID!)
    const environment = await space.getEnvironment(process.env.CONTENTFUL_ENVIRONMENT || 'master')
    
    // Obtener el content type
    const contentType = await environment.getContentType('projectStatistic')
    
    console.log(`📋 Content type found: ${contentType.name}`)
    console.log(`📋 Status: ${contentType.sys.publishedAt ? 'Published' : 'Draft'}`)
    
    if (!contentType.sys.publishedAt) {
      console.log('🚀 Publishing content type...')
      await contentType.publish()
      console.log('✅ Content type published successfully!')
    } else {
      console.log('✅ Content type is already published!')
    }
    
  } catch (error) {
    console.error('❌ Error activating ProjectStatistic content type:', error)
    process.exit(1)
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  activateProjectStatistic()
}

module.exports = activateProjectStatistic

































