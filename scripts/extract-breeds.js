const fs = require('fs');
const path = require('path');

// Read the breed data files
const dogBreedsPath = path.join(__dirname, '../data/breeds.json');
const catBreedsPath = path.join(__dirname, '../data/cats_breeds.json');

const dogBreeds = JSON.parse(fs.readFileSync(dogBreedsPath, 'utf8'));
const catBreeds = JSON.parse(fs.readFileSync(catBreedsPath, 'utf8'));

// Extract breed names
const dogBreedNames = dogBreeds.map(breed => breed["Dog Breeds"]).sort();
const catBreedNames = catBreeds.map(breed => breed["Cat Breeds"]).sort();

console.log('=== DOG BREEDS ===');
console.log(`Total: ${dogBreedNames.length} breeds\n`);
dogBreedNames.forEach((breed, index) => {
  console.log(`${index + 1}. ${breed}`);
});

console.log('\n\n=== CAT BREEDS ===');
console.log(`Total: ${catBreedNames.length} breeds\n`);
catBreedNames.forEach((breed, index) => {
  console.log(`${index + 1}. ${breed}`);
});

// Create image filename suggestions
console.log('\n\n=== SUGGESTED IMAGE FILENAMES ===');
console.log('\nDog breed images (place in public/images/breeds/dogs/):');
dogBreedNames.forEach(breed => {
  const filename = breed.toLowerCase()
    .replace(/[^a-z0-9\s]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
  console.log(`${filename}.jpg`);
});

console.log('\nCat breed images (place in public/images/breeds/cats/):');
catBreedNames.forEach(breed => {
  const filename = breed.toLowerCase()
    .replace(/[^a-z0-9\s]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
  console.log(`${filename}.jpg`);
});

// Create directory structure and placeholder files
const createDirectories = () => {
  const dogsDir = path.join(__dirname, '../public/images/breeds/dogs');
  const catsDir = path.join(__dirname, '../public/images/breeds/cats');
  
  // Create directories
  fs.mkdirSync(dogsDir, { recursive: true });
  fs.mkdirSync(catsDir, { recursive: true });
  
  console.log('\n\n=== DIRECTORIES CREATED ===');
  console.log('Created: public/images/breeds/dogs/');
  console.log('Created: public/images/breeds/cats/');
  
  // Create a README file with instructions
  const readmeContent = `# Breed Images

## Directory Structure
- \`dogs/\` - Contains all dog breed images
- \`cats/\` - Contains all cat breed images

## Image Requirements
- Format: JPG or PNG
- Recommended size: 400x300px (4:3 aspect ratio)
- File naming: Use lowercase with hyphens (e.g., "golden-retriever.jpg")

## Dog Breeds (${dogBreedNames.length} total)
${dogBreedNames.map(breed => {
  const filename = breed.toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  return `- ${breed} → ${filename}.jpg`;
}).join('\n')}

## Cat Breeds (${catBreedNames.length} total)
${catBreedNames.map(breed => {
  const filename = breed.toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  return `- ${breed} → ${filename}.jpg`;
}).join('\n')}
`;
  
  fs.writeFileSync(path.join(__dirname, '../public/images/breeds/README.md'), readmeContent);
  console.log('Created: public/images/breeds/README.md with complete breed list and naming guide');
};

createDirectories();