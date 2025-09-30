# Contentful Migration Scripts

Este directorio contiene los scripts para migrar los datos del sitio de Grupo Frali desde archivos JSON a Contentful.

## Prerequisitos

1. **Configurar variables de entorno** en `.env`:
```bash
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ACCESS_TOKEN=your_access_token
CONTENTFUL_ENVIRONMENT=master
```

2. **Instalar dependencias**:
```bash
cd scripts
npm install
```

## Scripts Disponibles

### Migración Completa
```bash
npm run migrate:all
```
Migra todos los datos en el orden correcto.

### Migraciones Individuales
```bash
# Solo categorías
npm run migrate:categories

# Solo proyectos
npm run migrate:projects

# Solo equipo
npm run migrate:team

# Solo página home
npm run migrate:home
```

## Orden de Migración

1. **Categorías** - Deben crearse primero
2. **Proyectos** - Dependen de las categorías
3. **Equipo** - Independiente
4. **Home Page** - Depende de proyectos para featured

## Datos Migrados

### Categorías
- Real Estate
- Energía Renovable
- Hotelería
- Agronegocios

### Proyectos (12 proyectos)
- La Banderita Parque Eólico
- Septiembre
- La Reserva Cardales
- Sofitel La Reserva Cardales
- Terrazas de Septiembre
- Casas de Septiembre
- Green House
- Chacras de Mar
- Edgewater River
- Santa Regina
- Elvis River & SunFlower River
- La Villette Golf Residences

### Equipo (6 miembros)
- Sebastian Lanusse
- Horacio Antelo
- Inés Gemini
- Sean Duggan
- Joaquín Goicoechea
- Joaquín Nazar Anchorena

### Home Page
- Títulos y descripciones
- Estadísticas
- Configuración de featured projects

## Notas Importantes

- Los scripts verifican si ya existen datos antes de migrar
- Las imágenes y videos deben subirse manualmente a Contentful
- Después de la migración, actualizar el frontend para usar Contentful
- Los scripts son idempotentes (se pueden ejecutar múltiples veces)

## Troubleshooting

Si hay errores:
1. Verificar las credenciales de Contentful
2. Asegurarse de que los content types existen en Contentful
3. Revisar los logs para errores específicos
