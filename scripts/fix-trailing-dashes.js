const fs = require('fs');
const path = require('path');

const dogsDir = path.join(__dirname, '../public/images/breeds/dogs');

// Get all files that end with -.png
const files = fs.readdirSync(dogsDir).filter(file => file.endsWith('-.png'));

console.log(`🔧 FIXING ${files.length} FILES WITH TRAILING DASHES...\n`);

let fixedCount = 0;

files.forEach(filename => {
  try {
    const newFilename = filename.replace('-.png', '.png');
    const oldPath = path.join(dogsDir, filename);
    const newPath = path.join(dogsDir, newFilename);

    // Check if target already exists
    if (fs.existsSync(newPath)) {
      console.log(`⚠️  SKIP: ${newFilename} (already exists)`);
      return;
    }

    // ONLY RENAME, NEVER DELETE
    fs.renameSync(oldPath, newPath);
    console.log(`✅ FIXED: ${filename} → ${newFilename}`);
    fixedCount++;

  } catch (error) {
    console.log(`❌ ERROR: ${filename} (${error.message})`);
  }
});

console.log(`\n📊 SUMMARY:`);
console.log(`   Fixed trailing dashes: ${fixedCount} files`);
console.log(`   NO FILES WERE DELETED!`);

// Also fix the one remaining u7892581312_ file
const remainingFiles = fs.readdirSync(dogsDir).filter(file => file.startsWith('u7892581312_'));
if (remainingFiles.length > 0) {
  console.log(`\n🔧 FIXING REMAINING ${remainingFiles.length} FILES...\n`);
  
  remainingFiles.forEach(filename => {
    try {
      let newFilename = filename
        .replace('u7892581312_', '')
        .replace(/_dog_/g, '_')
        .replace(/ - ar_43_.*\.png$/, '.png')
        .replace(/_-_/g, '-')
        .replace(/_/g, '-')
        .replace(/--+/g, '-')
        .replace(/^-|-$/g, '')
        .toLowerCase();

      if (!newFilename.endsWith('.png')) {
        newFilename = newFilename.replace(/\.png.*/, '.png');
      }

      const oldPath = path.join(dogsDir, filename);
      const newPath = path.join(dogsDir, newFilename);

      if (fs.existsSync(newPath)) {
        console.log(`⚠️  SKIP: ${newFilename} (already exists)`);
        return;
      }

      fs.renameSync(oldPath, newPath);
      console.log(`✅ FIXED: ${filename.substring(0, 50)}... → ${newFilename}`);
      fixedCount++;

    } catch (error) {
      console.log(`❌ ERROR: ${filename.substring(0, 50)}... (${error.message})`);
    }
  });
}