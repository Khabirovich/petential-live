const fs = require('fs');
const path = require('path');

const catImagesDir = 'public/images/breeds/cats';

// Rename mappings for problematic cat breed names
const renameMappings = {
  'european-burmese-ca6.png': 'european-burmese.png',
  'uropean-burmese.png': 'european-burmese-alt.png', // Keep as alternative since we have another european-burmese
  'bosque-de-noruega.png': 'norwegian-forest.png',
  'brasileo-de-pelo-corto.png': 'brazilian-shorthair.png',
  'britnico-de-pelo-corto-azul.png': 'british-blue-shorthair.png',
  'extico-de-pelo-largo.png': 'exotic-longhair.png',
  'kurilean-bobtail-de-pelo-largo.png': 'kurilian-bobtail-longhair.png',
  'oriental-de-pelo-semilargo.png': 'oriental-semi-longhair.png',
  'sagrado-de-birmania.png': 'birman.png',
  'seychellois-de-pelo-corto.png': 'seychellois-shorthair.png'
};

console.log('Checking cat breed image names...');

Object.entries(renameMappings).forEach(([oldName, newName]) => {
  const oldPath = path.join(catImagesDir, oldName);
  const newPath = path.join(catImagesDir, newName);
  
  if (fs.existsSync(oldPath)) {
    console.log(`Found: ${oldName} -> should be renamed to: ${newName}`);
  } else {
    console.log(`Not found: ${oldName}`);
  }
});

console.log('\nTo rename these files, run the rename commands manually or approve the script execution.');