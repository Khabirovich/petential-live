const fs = require('fs');
const path = require('path');

// Read the breed data files
const dogBreedsPath = path.join(__dirname, '../data/breeds.json');
const catBreedsPath = path.join(__dirname, '../data/cats_breeds.json');

const dogBreeds = JSON.parse(fs.readFileSync(dogBreedsPath, 'utf8'));
const catBreeds = JSON.parse(fs.readFileSync(catBreedsPath, 'utf8'));

// Function to convert breed name to expected filename
function breedToFilename(breedName) {
  return breedName
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
}

// Check dog images
console.log('🐕 CHECKING DOG IMAGES...\n');

const dogsDir = path.join(__dirname, '../public/images/breeds/dogs');
let dogFiles = [];
try {
  dogFiles = fs.readdirSync(dogsDir).filter(file => 
    file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg')
  );
} catch (error) {
  console.log('❌ Dogs directory not found');
}

const expectedDogFiles = dogBreeds.map(breed => ({
  breedName: breed["Dog Breeds"],
  expectedFilename: breedToFilename(breed["Dog Breeds"])
}));

let dogMatches = 0;
let dogMissing = 0;
let dogUnexpected = [];

console.log('✅ CORRECTLY NAMED DOG IMAGES:');
expectedDogFiles.forEach(({ breedName, expectedFilename }) => {
  const pngFile = `${expectedFilename}.png`;
  const jpgFile = `${expectedFilename}.jpg`;
  
  if (dogFiles.includes(pngFile) || dogFiles.includes(jpgFile)) {
    console.log(`   ${breedName} → ${dogFiles.includes(pngFile) ? pngFile : jpgFile}`);
    dogMatches++;
  } else {
    dogMissing++;
  }
});

console.log(`\n❌ MISSING DOG IMAGES (${dogMissing}):`);
expectedDogFiles.forEach(({ breedName, expectedFilename }) => {
  const pngFile = `${expectedFilename}.png`;
  const jpgFile = `${expectedFilename}.jpg`;
  
  if (!dogFiles.includes(pngFile) && !dogFiles.includes(jpgFile)) {
    console.log(`   ${breedName} → ${expectedFilename}.png/.jpg`);
  }
});

// Check for unexpected files
const expectedFilenames = expectedDogFiles.map(({ expectedFilename }) => [
  `${expectedFilename}.png`,
  `${expectedFilename}.jpg`
]).flat();

dogUnexpected = dogFiles.filter(file => !expectedFilenames.includes(file) && file !== '.DS_Store');

if (dogUnexpected.length > 0) {
  console.log(`\n⚠️  UNEXPECTED DOG FILES (${dogUnexpected.length}):`);
  dogUnexpected.forEach(file => {
    console.log(`   ${file} (should be renamed or removed)`);
  });
}

// Check cat images
console.log('\n\n🐱 CHECKING CAT IMAGES...\n');

const catsDir = path.join(__dirname, '../public/images/breeds/cats');
let catFiles = [];
try {
  catFiles = fs.readdirSync(catsDir).filter(file => 
    file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg')
  );
} catch (error) {
  console.log('❌ Cats directory not found');
}

const expectedCatFiles = catBreeds.map(breed => ({
  breedName: breed["Cat Breeds"],
  expectedFilename: breedToFilename(breed["Cat Breeds"])
}));

let catMatches = 0;
let catMissing = 0;
let catUnexpected = [];

console.log('✅ CORRECTLY NAMED CAT IMAGES:');
expectedCatFiles.forEach(({ breedName, expectedFilename }) => {
  const pngFile = `${expectedFilename}.png`;
  const jpgFile = `${expectedFilename}.jpg`;
  
  if (catFiles.includes(pngFile) || catFiles.includes(jpgFile)) {
    console.log(`   ${breedName} → ${catFiles.includes(pngFile) ? pngFile : jpgFile}`);
    catMatches++;
  } else {
    catMissing++;
  }
});

console.log(`\n❌ MISSING CAT IMAGES (${catMissing}):`);
expectedCatFiles.forEach(({ breedName, expectedFilename }) => {
  const pngFile = `${expectedFilename}.png`;
  const jpgFile = `${expectedFilename}.jpg`;
  
  if (!catFiles.includes(pngFile) && !catFiles.includes(jpgFile)) {
    console.log(`   ${breedName} → ${expectedFilename}.png/.jpg`);
  }
});

// Check for unexpected cat files
const expectedCatFilenames = expectedCatFiles.map(({ expectedFilename }) => [
  `${expectedFilename}.png`,
  `${expectedFilename}.jpg`
]).flat();

catUnexpected = catFiles.filter(file => !expectedCatFilenames.includes(file) && file !== '.DS_Store');

if (catUnexpected.length > 0) {
  console.log(`\n⚠️  UNEXPECTED CAT FILES (${catUnexpected.length}):`);
  catUnexpected.forEach(file => {
    console.log(`   ${file} (should be renamed or removed)`);
  });
}

// Summary
console.log('\n\n📊 SUMMARY:');
console.log(`🐕 Dogs: ${dogMatches}/${expectedDogFiles.length} images (${((dogMatches/expectedDogFiles.length)*100).toFixed(1)}%)`);
console.log(`🐱 Cats: ${catMatches}/${expectedCatFiles.length} images (${((catMatches/expectedCatFiles.length)*100).toFixed(1)}%)`);
console.log(`📈 Total: ${dogMatches + catMatches}/${expectedDogFiles.length + expectedCatFiles.length} images (${(((dogMatches + catMatches)/(expectedDogFiles.length + expectedCatFiles.length))*100).toFixed(1)}%)`);

if (dogUnexpected.length > 0 || catUnexpected.length > 0) {
  console.log(`\n⚠️  ${dogUnexpected.length + catUnexpected.length} files need attention (renaming or removal)`);
}