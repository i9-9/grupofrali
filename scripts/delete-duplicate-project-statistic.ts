// Cargar variables de entorno
require('dotenv').config({ path: '../.env' })

const { createClient } = require('contentful-management')

const managementClient = createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN!,
})

async function deleteDuplicateProjectStatistic() {
  console.log('🗑️  Deleting duplicate Project Statistic content type...')
  
  try {
    const space = await managementClient.getSpace(process.env.CONTENTFUL_SPACE_ID!)
    const environment = await space.getEnvironment(process.env.CONTENTFUL_ENVIRONMENT || 'master')
    
    // Obtener ambos content types
    const contentTypes = await environment.getContentTypes()
    const projectStatistics = contentTypes.items.filter((ct: any) => 
      ct.name === 'Project Statistic'
    )
    
    console.log(`📋 Found ${projectStatistics.length} Project Statistic content types:`)
    projectStatistics.forEach((ct: any, index: number) => {
      console.log(`${index + 1}. ID: ${ct.sys.id} - Created: ${ct.sys.createdAt}`)
    })
    
    if (projectStatistics.length < 2) {
      console.log('✅ No duplicates found!')
      return
    }
    
    // Eliminar el más antiguo (el primero en la lista)
    const toDelete = projectStatistics[0]
    console.log(`\n🗑️  Deleting older content type: ${toDelete.sys.id}`)
    
    // Primero despublicar
    if (toDelete.sys.publishedAt) {
      console.log('📤 Unpublishing content type...')
      await toDelete.unpublish()
    }
    
    // Luego eliminar
    console.log('🗑️  Deleting content type...')
    await toDelete.delete()
    
    console.log('✅ Duplicate content type deleted successfully!')
    
    // Verificar el restante
    const remaining = await environment.getContentType(projectStatistics[1].sys.id)
    console.log(`\n✅ Remaining content type: ${remaining.sys.id}`)
    console.log(`📋 Name: ${remaining.name}`)
    console.log(`📋 Status: ${remaining.sys.publishedAt ? 'Published' : 'Draft'}`)
    
  } catch (error) {
    console.error('❌ Error deleting duplicate content type:', error)
    process.exit(1)
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  deleteDuplicateProjectStatistic()
}

module.exports = deleteDuplicateProjectStatistic































