#!/usr/bin/env ts-node

// Cargar variables de entorno
require('dotenv').config({ path: '../.env' })

const migrateCategories = require('./migrate-categories')
const migrateProjects = require('./migrate-projects')
const migrateTeam = require('./migrate-team')
const migrateStatistics = require('./migrate-statistics')
const migrateHome = require('./migrate-home')

async function migrateAll() {
  console.log('🚀 Starting complete migration to Contentful...')
  console.log('=====================================')
  
  try {
    // 1. Migrar categorías primero (necesarias para proyectos)
    console.log('\n📁 Step 1: Migrating Categories...')
    await migrateCategories()
    
    // 2. Migrar proyectos
    console.log('\n🏗️  Step 2: Migrating Projects...')
    await migrateProjects()
    
    // 3. Migrar equipo
    console.log('\n👥 Step 3: Migrating Team...')
    await migrateTeam()
    
    // 4. Migrar estadísticas
    console.log('\n📊 Step 4: Migrating Statistics...')
    await migrateStatistics()
    
    // 5. Migrar página home
    console.log('\n🏠 Step 5: Migrating Home Page...')
    await migrateHome()
    
    console.log('\n=====================================')
    console.log('✅ Complete migration finished successfully!')
    console.log('\n📝 Next steps:')
    console.log('1. Upload images and videos to Contentful manually')
    console.log('2. Link media assets to projects in Contentful')
    console.log('3. Update the frontend to use Contentful data')
    
  } catch (error) {
    console.error('\n❌ Migration failed:', error)
    process.exit(1)
  }
}

// Ejecutar migración completa
migrateAll()
