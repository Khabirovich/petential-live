const fs = require('fs');
const path = require('path');

const dogsDir = path.join(__dirname, '../public/images/breeds/dogs');

// Get all files that start with u7892581312_
const files = fs.readdirSync(dogsDir).filter(file => file.startsWith('u7892581312_'));

console.log(`🔧 RENAMING ${files.length} FILES (NO DELETING!)...\n`);

let renamedCount = 0;
let errorCount = 0;

files.forEach(filename => {
  try {
    // Extract breed name from the long filename
    let breedName = filename
      .replace('u7892581312_', '') // Remove prefix
      .replace(/_dog_/g, '_') // Remove _dog_ parts
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

    const oldPath = path.join(dogsDir, filename);
    const newPath = path.join(dogsDir, breedName);

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

// Run check to see results
console.log('\n🎯 Running verification...');
const { execSync } = require('child_process');
try {
  execSync('node scripts/check-image-names.js', { stdio: 'inherit' });
} catch (error) {
  console.log('Could not run verification');
}