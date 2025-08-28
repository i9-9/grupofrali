#!/bin/bash

# Script para generar favicon.ico desde favicon.svg
# Requiere: ImageMagick (convert)

echo "Generando favicon.ico desde favicon.svg..."

# Verificar si ImageMagick está instalado
if ! command -v magick &> /dev/null; then
    echo "Error: ImageMagick no está instalado."
    echo "Instala ImageMagick con: brew install imagemagick (macOS) o apt-get install imagemagick (Ubuntu)"
    exit 1
fi

# Crear favicon.ico con múltiples tamaños
magick public/favicon.svg -resize 16x16 public/favicon-16x16.png
magick public/favicon.svg -resize 32x32 public/favicon-32x32.png
magick public/favicon.svg -resize 48x48 public/favicon-48x48.png
magick public/favicon.svg -resize 64x64 public/favicon-64x64.png
magick public/favicon.svg -resize 128x128 public/favicon-128x128.png
magick public/favicon.svg -resize 256x256 public/favicon-256x256.png

# Generar favicon.ico con los tamaños estándar
magick public/favicon-16x16.png public/favicon-32x32.png public/favicon-48x48.png public/favicon.ico

echo "Favicon generado exitosamente!"
echo "Archivos creados:"
ls -la public/favicon*

# Limpiar archivos PNG temporales
rm public/favicon-*.png
echo "Archivos temporales PNG eliminados."
