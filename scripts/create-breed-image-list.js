const fs = require('fs');
const path = require('path');

// Read the breed data files
const dogBreedsPath = path.join(__dirname, '../data/breeds.json');
const catBreedsPath = path.join(__dirname, '../data/cats_breeds.json');

const dogBreeds = JSON.parse(fs.readFileSync(dogBreedsPath, 'utf8'));
const catBreeds = JSON.parse(fs.readFileSync(catBreedsPath, 'utf8'));

// Function to convert breed name to filename
function breedToFilename(breedName) {
  return breedName
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
}

// Create CSV file for easy tracking
const csvContent = [
  'Pet Type,Breed Name,Filename,Status',
  ...dogBreeds.map(breed => `Dog,"${breed["Dog Breeds"]}",${breedToFilename(breed["Dog Breeds"])}.jpg,Needed`),
  ...catBreeds.map(breed => `Cat,"${breed["Cat Breeds"]}",${breedToFilename(breed["Cat Breeds"])}.jpg,Needed`)
].join('\n');

fs.writeFileSync(path.join(__dirname, '../breed-images-checklist.csv'), csvContent);

// Create a simple HTML page to visualize what's needed
const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <title>Breed Images Checklist</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .section { margin-bottom: 30px; }
        .breed-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 15px; }
        .breed-item { border: 1px solid #ddd; padding: 10px; border-radius: 5px; }
        .breed-name { font-weight: bold; margin-bottom: 5px; }
        .filename { font-family: monospace; color: #666; font-size: 12px; }
        .status { margin-top: 5px; padding: 2px 6px; border-radius: 3px; font-size: 11px; }
        .needed { background: #ffebee; color: #c62828; }
        .count { color: #666; margin-bottom: 15px; }
    </style>
</head>
<body>
    <h1>Pet Breed Images Checklist</h1>
    
    <div class="section">
        <h2>🐕 Dog Breeds</h2>
        <div class="count">Total: ${dogBreeds.length} breeds</div>
        <div class="breed-grid">
            ${dogBreeds.map(breed => `
                <div class="breed-item">
                    <div class="breed-name">${breed["Dog Breeds"]}</div>
                    <div class="filename">${breedToFilename(breed["Dog Breeds"])}.jpg</div>
                    <div class="status needed">Image Needed</div>
                </div>
            `).join('')}
        </div>
    </div>
    
    <div class="section">
        <h2>🐱 Cat Breeds</h2>
        <div class="count">Total: ${catBreeds.length} breeds</div>
        <div class="breed-grid">
            ${catBreeds.map(breed => `
                <div class="breed-item">
                    <div class="breed-name">${breed["Cat Breeds"]}</div>
                    <div class="filename">${breedToFilename(breed["Cat Breeds"])}.jpg</div>
                    <div class="status needed">Image Needed</div>
                </div>
            `).join('')}
        </div>
    </div>
    
    <div class="section">
        <h2>📁 Directory Structure</h2>
        <pre>
public/
└── images/
    └── breeds/
        ├── dogs/
        │   ├── golden-retriever.jpg
        │   ├── labrador-retriever.jpg
        │   ├── german-shepherd-dog.jpg
        │   └── ... (${dogBreeds.length} total)
        └── cats/
            ├── persian.jpg
            ├── siamese.jpg
            ├── maine-coon.jpg
            └── ... (${catBreeds.length} total)
        </pre>
    </div>
    
    <div class="section">
        <h2>📋 Instructions</h2>
        <ol>
            <li>Create images for each breed (recommended size: 400x300px)</li>
            <li>Save them as JPG files with the exact filenames shown above</li>
            <li>Place dog images in: <code>public/images/breeds/dogs/</code></li>
            <li>Place cat images in: <code>public/images/breeds/cats/</code></li>
            <li>Use the CSV file to track your progress</li>
        </ol>
    </div>
</body>
</html>
`;

fs.writeFileSync(path.join(__dirname, '../breed-images-checklist.html'), htmlContent);

console.log('✅ Created breed-images-checklist.csv');
console.log('✅ Created breed-images-checklist.html');
console.log('');
console.log('📊 Summary:');
console.log(`   Dogs: ${dogBreeds.length} breeds`);
console.log(`   Cats: ${catBreeds.length} breeds`);
console.log(`   Total: ${dogBreeds.length + catBreeds.length} images needed`);
console.log('');
console.log('📂 Files created:');
console.log('   - breed-images-checklist.csv (for tracking progress)');
console.log('   - breed-images-checklist.html (visual checklist)');
console.log('   - public/images/breeds/README.md (instructions)');
console.log('');
console.log('🎯 Next steps:');
console.log('   1. Open breed-images-checklist.html in your browser');
console.log('   2. Use the CSV file to track which images you have');
console.log('   3. Add images to public/images/breeds/dogs/ and public/images/breeds/cats/');