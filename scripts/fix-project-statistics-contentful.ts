import { config } from 'dotenv'
import { createClient } from 'contentful-management'

// Cargar variables de entorno
config({ path: '../.env' })

// Cliente de Contentful Management API
const client = createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN!,
})

// Función para aplicar correcciones
function applyCorrections(text: any): any {
  if (!text || typeof text !== 'string') return text
  
  let corrected = text
  
  // Textos truncados
  corrected = corrected.replace(/EN OPERACIÓ\s*N/g, 'EN OPERACIÓN')
  corrected = corrected.replace(/EN PLANIFICACIÓ\s*N/g, 'EN PLANIFICACIÓN')
  corrected = corrected.replace(/ALGODÓ\s*N/g, 'ALGODÓN')
  
  // Espacios en porcentajes
  corrected = corrected.replace(/(\d+(?:\.\d+)?)\s*%/g, '$1%')
  
  return corrected
}

async function fixProjectStatistics() {
  try {
    console.log('🔧 Fixing project statistics in Contentful...\n')
    
    // Obtener el espacio
    const space = await client.getSpace(process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!)
    const environment = await space.getEnvironment(process.env.CONTENTFUL_ENVIRONMENT || 'master')
    
    // Obtener todas las estadísticas de proyectos
    const response = await environment.getEntries({
      content_type: '7fjLXGmdgFUlcGjBFqrC0', // ProjectStatistic content type ID
      include: 2
    })
    
    console.log(`Found ${response.items.length} project statistics to review\n`)
    
    let fixedCount = 0
    
    for (const item of response.items) {
      const fields = item.fields
      let needsUpdate = false
      const updates: any = {}
      
      // Debug: mostrar algunos valores para verificar
      if (fields.name && typeof fields.name === 'string' && (fields.name.includes('OPERACIÓ') || fields.name.includes('PLANIFICACIÓ'))) {
        console.log(`🔍 Found potential match: "${fields.name}" (${fields.project?.fields?.title || 'Unknown'})`)
      }
      
      if (fields.value && typeof fields.value === 'string' && (fields.value.includes('OPERACIÓ') || fields.value.includes('PLANIFICACIÓ'))) {
        console.log(`🔍 Found potential value match: "${fields.value}" (${fields.project?.fields?.title || 'Unknown'})`)
      }
      
      // Verificar si el valor necesita corrección
      if (fields.value) {
        const correctedValue = applyCorrections(fields.value)
        if (correctedValue !== fields.value) {
          console.log(`📝 Fixing value: "${fields.value}" → "${correctedValue}"`)
          updates.value = correctedValue
          needsUpdate = true
        }
      }
      
      // Verificar si la unidad necesita corrección
      if (fields.unit) {
        const correctedUnit = applyCorrections(fields.unit)
        if (correctedUnit !== fields.unit) {
          console.log(`📝 Fixing unit: "${fields.unit}" → "${correctedUnit}"`)
          updates.unit = correctedUnit
          needsUpdate = true
        }
      }
      
      // Verificar si el nombre necesita corrección
      if (fields.name) {
        const correctedName = applyCorrections(fields.name)
        if (correctedName !== fields.name) {
          console.log(`📝 Fixing name: "${fields.name}" → "${correctedName}"`)
          updates.name = correctedName
          needsUpdate = true
        }
      }
      
      // Verificar si el nombre en inglés necesita corrección
      if (fields.nameEn) {
        const correctedNameEn = applyCorrections(fields.nameEn)
        if (correctedNameEn !== fields.nameEn) {
          console.log(`📝 Fixing nameEn: "${fields.nameEn}" → "${correctedNameEn}"`)
          updates.nameEn = correctedNameEn
          needsUpdate = true
        }
      }
      
      if (needsUpdate) {
        try {
          item.fields = {
            ...fields,
            ...updates
          }
          
          await item.update()
          
          console.log(`✅ Updated: ${fields.name} (${fields.project?.fields?.title || 'Unknown Project'})`)
          fixedCount++
        } catch (error) {
          console.error(`❌ Error updating ${fields.name}:`, error)
        }
      }
    }
    
    console.log(`\n🎉 Fixed ${fixedCount} project statistics`)
    
  } catch (error) {
    console.error('❌ Error fixing project statistics:', error)
  }
}

fixProjectStatistics()
