const fs = require('fs');
const path = require('path');

const catsDir = path.join(__dirname, '../public/images/breeds/cats');

// Get all files that start with u7892581312_
const files = fs.readdirSync(catsDir).filter(file => file.startsWith('u7892581312_'));

console.log(`🐱 RENAMING ${files.length} CAT FILES (NO DELETING!)...\n`);

let renamedCount = 0;
let errorCount = 0;

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
      // This is actually a dog breed that got mixed in with cats
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
    console.log(`✅ RENAMED: ${filename.substring(0, 50)}... → ${breedName}`);
    renamedCount++;

  } catch (error) {
    console.log(`❌ ERROR: ${filename.substring(0, 50)}... (${error.message})`);
    errorCount++;
  }
});

console.log(`\n📊 SUMMARY:`);
console.log(`   Successfully renamed: ${renamedCount} files`);
console.log(`   Errors: ${errorCount} files`);
console.log(`   NO FILES WERE DELETED!`);

// Now fix any trailing dashes
const dashFiles = fs.readdirSync(catsDir).filter(file => file.endsWith('-.png'));
if (dashFiles.length > 0) {
  console.log(`\n🔧 FIXING ${dashFiles.length} FILES WITH TRAILING DASHES...\n`);
  
  dashFiles.forEach(filename => {
    try {
      const newFilename = filename.replace('-.png', '.png');
      const oldPath = path.join(catsDir, filename);
      const newPath = path.join(catsDir, newFilename);

      if (fs.existsSync(newPath)) {
        console.log(`⚠️  SKIP: ${newFilename} (already exists)`);
        return;
      }

      fs.renameSync(oldPath, newPath);
      console.log(`✅ FIXED: ${filename} → ${newFilename}`);
      renamedCount++;

    } catch (error) {
      console.log(`❌ ERROR: ${filename} (${error.message})`);
    }
  });
}

console.log(`\n🎯 Running verification...`);
const { execSync } = require('child_process');
try {
  execSync('node scripts/check-image-names.js', { stdio: 'inherit' });
} catch (error) {
  console.log('Could not run verification');
}