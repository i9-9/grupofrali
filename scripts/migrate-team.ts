// Cargar variables de entorno
require('dotenv').config({ path: '../.env' })

const { createClient } = require('contentful-management')
const teamData = require('../src/data/team.json')

const managementClient = createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN!,
})

async function migrateTeam() {
  console.log('🚀 Starting team migration...')
  
  try {
    const space = await managementClient.getSpace(process.env.CONTENTFUL_SPACE_ID!)
    const environment = await space.getEnvironment(process.env.CONTENTFUL_ENVIRONMENT || 'master')
    
    // Verificar si ya existen miembros del equipo
    const existingTeam = await environment.getEntries({ content_type: 'teamMember' })
    
    if (existingTeam.items.length > 0) {
      console.log(`⚠️  Found ${existingTeam.items.length} existing team members. Skipping migration.`)
      return
    }

    // Migrar cada miembro del equipo
    for (let i = 0; i < teamData.management.positions.length; i++) {
      const member = teamData.management.positions[i]
      const fullName = `${member.name} ${member.surname}`

      const entry = await environment.createEntry('teamMember', {
        fields: {
          name: { 'en-US': fullName },
          position: { 'en-US': member.position },
          positionEn: { 'en-US': member.positionEn },
          displayOrder: { 'en-US': i + 1 },
          isActive: { 'en-US': true }
        }
      })
      
      await entry.publish()
      console.log(`✅ Created team member: ${fullName}`)
    }

    console.log('✅ Team migration completed successfully!')
  } catch (error) {
    console.error('❌ Team migration failed:', error)
    process.exit(1)
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  migrateTeam()
}

module.exports = migrateTeam
