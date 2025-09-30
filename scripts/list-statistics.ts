import { config } from 'dotenv'
import { createClient } from 'contentful'

// Cargar variables de entorno
config({ path: '../.env' })

// Cliente de Contentful
const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN!,
  environment: process.env.CONTENTFUL_ENVIRONMENT || 'master',
})

async function listStatistics() {
  try {
    console.log('🔍 Fetching statistics from Contentful...')
    
    const response = await client.getEntries({
      content_type: 'statistic',
      'fields.isActive': true,
      order: ['fields.displayOrder']
    })
    
    console.log(`\n📊 Found ${response.items.length} statistics:\n`)
    
    response.items.forEach((item: any, index) => {
      const fields = item.fields
      console.log(`${index + 1}. ${fields.label} (${fields.labelEn})`)
      console.log(`   Value: ${fields.value}`)
      console.log(`   Unit: ${fields.unit || 'N/A'} (${fields.unitEn || 'N/A'})`)
      console.log(`   Display Order: ${fields.displayOrder}`)
      console.log(`   Active: ${fields.isActive}`)
      console.log(`   ID: ${item.sys.id}`)
      console.log('')
    })
    
  } catch (error) {
    console.error('❌ Error fetching statistics:', error)
  }
}

listStatistics()
