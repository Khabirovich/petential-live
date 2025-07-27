const fs = require('fs');
const path = require('path');

const catsDir = path.join(__dirname, '../public/images/breeds/cats');

// Get all files that start with u7892581312_
const files = fs.readdirSync(catsDir).filter(file => file.startsWith('u7892581312_'));

console.log(`🐱 RENAMING ${files.length} CAT FILES (NO DELETING!)...\n`);

let renamedCount = 0;

files.forEach(filename => {
  try {
    // Extract breed name from the long filename
    let breedName = filename
      .replace('u7892581312_', '') // Remove prefix
      .replace(/_cat_/g, '_') // Remove _cat_ parts
      .replace(/_cat$/g, '') // Remove _cat at end
      .replace(/_breed_/g, '_') // Remove _breed_ parts
      .replace(/_breed$/g, '') // Remove _breed at end
      .replace(/ - ar_43_.*\.png$/, '.png') // Remove everything after breed name
      .replace(/_-_/g, '-') // Replace _-_ with -
      .replace(/_/g, '-') // Replace _ with -
      .replace(/--+/g, '-') // Replace multiple - with single -
      .replace(/^-|-$/g, '') // Remove leading/trailing -
      .toLowerCase();

    // Clean up the extension
    if (!breedName.endsWith('.png')) {
      breedName = breedName.replace(/\.png.*/, '.png');
    }

    // Special case fixes for specific breeds
    if (breedName === 'basset-bleu-de-gascogne.png') {
      console.log(`⚠️  SKIP: ${breedName} (this is a dog breed, not a cat)`);
      return;
    }

    const oldPath = path.join(catsDir, filename);
    const newPath = path.join(catsDir, breedName);

    // Check if target already exists
    if (fs.existsSync(newPath)) {
      console.log(`⚠️  SKIP: ${breedName} (already exists)`);
      return;
    }

    // ONLY RENAME, NEVER DELETE
    fs.renameSync(oldPath, newPath);
    console.log(`✅ RENAMED: ${breedName}`);
    renamedCount++;

  } catch (error) {
    console.log(`❌ ERROR: ${filename.substring(0, 30)}... (${error.message})`);
  }
});

console.log(`\n📊 SUMMARY: Successfully renamed ${renamedCount} cat files!`);
console.log(`NO FILES WERE DELETED!`);