const fs = require('fs');
const path = require('path');

// Einfaches Script um SVG Icons zu kopieren und zu beschreiben
// Für echte PNG-Konvertierung bräuchten wir sharp oder einen Browser

const iconSizes = [192, 512];
const svgPath = path.join(__dirname, '..', 'public', 'favicon.svg');
const iconsDir = path.join(__dirname, '..', 'public', 'icons');

// Lese SVG
const svgContent = fs.readFileSync(svgPath, 'utf8');

console.log('📱 Generiere PWA Icons...\n');

iconSizes.forEach(size => {
  // Erstelle angepasstes SVG mit korrekter Größe
  const iconContent = svgContent
    .replace(/width="512"/, `width="${size}"`)
    .replace(/height="512"/, `height="${size}"`);

  // Speichere als SVG (Platzhalter - sollte später in PNG konvertiert werden)
  const outputPath = path.join(iconsDir, `icon-${size}.svg`);
  fs.writeFileSync(outputPath, iconContent, 'utf8');

  console.log(`✅ Erstellt: icon-${size}.svg`);
});

console.log('\n⚠️  HINWEIS: Für beste Kompatibilität sollten diese SVGs in PNGs konvertiert werden.');
console.log('   Nutze ein Online-Tool wie: https://cloudconvert.com/svg-to-png');
console.log('   Oder installiere sharp: npm install sharp\n');
