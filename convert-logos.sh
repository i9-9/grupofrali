#!/bin/bash

# Script para convertir logos SVG a PNG y WebP
# Requiere ImageMagick y cwebp instalados

echo "Convirtiendo logos SVG a PNG y WebP..."

# Crear directorio si no existe
mkdir -p public/images/logos

# Convertir SVGs a PNG con alta calidad
convert public/images/logos/sofitel.svg -density 300 -quality 100 public/images/logos/sofitel.png
convert public/images/logos/cardales.svg -density 300 -quality 100 public/images/logos/cardales.png
convert public/images/logos/regina.svg -density 300 -quality 100 public/images/logos/regina.png
convert public/images/logos/septiembre.svg -density 300 -quality 100 public/images/logos/septiembre.png

# Convertir PNGs a WebP
cwebp -q 90 public/images/logos/sofitel.png -o public/images/logos/sofitel.webp
cwebp -q 90 public/images/logos/cardales.png -o public/images/logos/cardales.webp
cwebp -q 90 public/images/logos/regina.png -o public/images/logos/regina.webp
cwebp -q 90 public/images/logos/septiembre.png -o public/images/logos/septiembre.webp

echo "¡Conversión completada!"
echo "Los archivos PNG y WebP han sido creados en public/images/logos/" 