#!/bin/bash

# Copy hashed files to standard names for npm compatibility
echo "Copying hashed files to standard names..."

# Find the latest hashed files
MAIN_JS=$(ls -t dist/index-*.js | head -1)
MAIN_MJS=$(ls -t dist/index-*.mjs | head -1) 
MAIN_CSS=$(ls -t dist/styles/*.css | head -1)

echo "Main JS file: $MAIN_JS"
echo "Main MJS file: $MAIN_MJS" 
echo "Main CSS file: $MAIN_CSS"

# Copy to standard names
if [ -n "$MAIN_JS" ]; then
  cp "$MAIN_JS" dist/index.js
  cp "${MAIN_JS}.map" dist/index.js.map
  echo "✓ Copied $MAIN_JS to dist/index.js"
fi

if [ -n "$MAIN_MJS" ]; then
  cp "$MAIN_MJS" dist/index.mjs
  cp "${MAIN_MJS}.map" dist/index.mjs.map
  echo "✓ Copied $MAIN_MJS to dist/index.mjs"
fi

if [ -n "$MAIN_CSS" ]; then
  cp "$MAIN_CSS" dist/index.css
  cp "${MAIN_CSS}.map" dist/index.css.map
  echo "✓ Copied $MAIN_CSS to dist/index.css"
fi

echo "Done!"