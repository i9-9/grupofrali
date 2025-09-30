import { config } from 'dotenv'
import { createClient } from 'contentful-management'

// Cargar variables de entorno
config({ path: '../.env' })

// Cliente de Contentful Management API
const client = createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN!,
})

async function addValueEnField() {
  try {
    console.log('🔧 Adding valueEn field to ProjectStatistic content type...\n')
    
    // Obtener el espacio
    const space = await client.getSpace(process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!)
    const environment = await space.getEnvironment(process.env.CONTENTFUL_ENVIRONMENT || 'master')
    
    // Obtener el content type
    const contentType = await environment.getContentType('7fjLXGmdgFUlcGjBFqrC0')
    
    console.log(`Found content type: ${contentType.name}`)
    
    // Verificar si el campo ya existe
    const existingField = contentType.fields.find(field => field.id === 'valueEn')
    if (existingField) {
      console.log('❌ Field valueEn already exists!')
      return
    }
    
    // Agregar el nuevo campo
    contentType.fields.push({
      id: 'valueEn',
      name: 'Value (English)',
      type: 'Symbol',
      localized: false,
      required: false,
      validations: [],
      disabled: false,
      omitted: false
    })
    
    // Actualizar el content type
    const updatedContentType = await contentType.update()
    
    console.log('✅ Successfully added valueEn field to ProjectStatistic content type!')
    console.log('📝 Field details:')
    console.log('   - ID: valueEn')
    console.log('   - Name: Value (English)')
    console.log('   - Type: Symbol (Text)')
    console.log('   - Required: No')
    console.log('   - Localized: No')
    
  } catch (error) {
    console.error('❌ Error adding valueEn field:', error)
  }
}

addValueEnField()


