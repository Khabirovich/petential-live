const fs = require('fs');
const path = require('path');

const dogsDir = path.join(__dirname, '../public/images/breeds/dogs');

// Manual mapping of the problematic files to correct names
const fileMapping = {
  'brittany- - ar-43- - raw- - profile-v4iybux- - v-d0a23346-8dd5-44ca-acc5-88b6775b08a5-1.png': 'brittany.png',
  'bullmastiff- - ar-43- - raw- - profile-v4iybux- - v-7-7996b349-4f0c-40a1-aafe-ebbdc637d690-3.png': 'bullmastiff.png',
  'cairn-terrier- - ar-43- - raw- - profile-v4iybux- - v-2d59d4b4-95d4-442c-8b5b-b2cde04c3ae1-2.png': 'cairn-terrier.png',
  'cane-corso- - ar-43- - raw- - profile-v4iybux- - v-7-ae73c7f0-18f3-47b2-a88a-744e801575bd-1.png': 'cane-corso.png',
  'cardigan-welsh-corgi- - ar-43- - raw- - profile-v4iy-826e772e-aa3c-4662-846d-706edc9ca8f1-0.png': 'cardigan-welsh-corgi.png',
  'cavalier-king-charles-spaniel- - ar-43- - raw- - pro-a85ead12-908a-47e3-a1e0-1d2c26c1b987-2.png': 'cavalier-king-charles-spaniel.png',
  'chesapeake-bay-retriever- - ar-43- - raw- - profile-b2f597ab-ab2a-45b6-8df0-e263671ebb3e-0.png': 'chesapeake-bay-retriever.png',
  'chihuahua- - ar-43- - raw- - profile-v4iybux- - v-7-610d379a-ea7f-4e93-acc3-9c12c8a5ada1-1.png': 'chihuahua.png',
  'chinese-crested- - ar-43- - raw- - profile-v4iybux-154e05b8-9fc7-4797-b78a-764d4d82a04b-1.png': 'chinese-crested.png',
  'chinese-crested-dog- - ar-43- - raw- - profile-v4iyb-0a8574cc-fd3d-440e-a234-2bd24b217b58-3.png': 'chinese-crested-dog.png',
  'chinese-sharpei- - ar-43- - raw- - profile-v4iybux-5d4948f0-6ca3-4910-bc7f-0405058a129d-0.png': 'chinese-sharpei.png',
  'chow-chow- - ar-43- - raw- - profile-v4iybux- - v-7-649cbb69-f9c1-4922-a50e-02499ad7042a-0.png': 'chow-chow.png',
  'clumber-spaniel- - ar-43- - raw- - profile-v4iybux-4a05fba6-2ebd-49db-98f1-5821b0d311f7-1.png': 'clumber-spaniel.png',
  'cocker-spaniel- - ar-43- - raw- - profile-v4iybux- - -f060dc5b-fd00-49d8-ae49-f618de41c682-0.png': 'cocker-spaniel.png',
  'collie- - ar-43- - raw- - profile-v4iybux- - v-7-b7c873f9-d966-4b0d-9b34-5bc9de865080-1.png': 'collie.png',
  'coton-de-tulear- - ar-43- - raw- - profile-v4iybux-8fe138ad-c799-45a1-90d9-75ef7c092d68-1.png': 'coton-de-tulear.png',
  'curlycoated-retriever- - ar-43- - raw- - profile-v4i-b711c4ca-2c62-4a2e-974b-b36e2b3c248a-1.png': 'curlycoated-retriever.png',
  'dachshund- - ar-43- - raw- - profile-v4iybux- - v-7-f448da50-de49-4643-aaeb-b60dac71fcb2-1.png': 'dachshund.png',
  'dalmatian- - ar-43- - raw- - profile-v4iybux- - v-7-baf5fb11-12af-4e5c-bf4b-bd3c0fd5450b-1.png': 'dalmatian.png',
  'dandie-dinmont-terrier- - ar-43- - raw- - profile-v4-122978b3-de7c-4e2a-bc4a-bae11109e1f4-3.png': 'dandie-dinmont-terrier.png',
  'doberman-pinscher- - ar-43- - raw- - profile-v4iybux-941ae01c-6e54-4584-b42d-ad12b1120f2a-1.png': 'doberman-pinscher.png',
  'dogo-argentino- - ar-43- - raw- - profile-v4iybux- - -629aaa0c-39df-4e14-904b-8de6ddc39794-1.png': 'dogo-argentino.png',
  'dogue-de-bordeaux- - ar-43- - raw- - profile-v4iybux-84e929b8-8416-458e-ba24-15c886f5b39f-2.png': 'dogue-de-bordeaux.png',
  'dutch-shepherd- - ar-43- - raw- - profile-v4iybux- - -44df6889-c935-4658-b1ab-ebb3a2df408e-0.png': 'dutch-shepherd.png',
  'english-cocker-spaniel- - ar-43- - raw- - profile-v4-fefcebd2-4e4e-4d1f-93a9-bd28bc96df28-1.png': 'english-cocker-spaniel.png',
  'english-foxhound- - ar-43- - raw- - profile-v4iybux-f4fa21ae-a27b-4b8e-9fb8-f760891b5c46-3.png': 'english-foxhound.png',
  'english-setter- - ar-43- - raw- - profile-v4iybux- - -f367f8e9-0269-4947-a5a4-ca4b7f1c7d9f-2.png': 'english-setter.png',
  'english-springer-spaniel- - ar-43- - raw- - profile-b0725d3d-f864-40c1-bdd0-18d0114f7f53-3.png': 'english-springer-spaniel.png',
  'english-toy-spaniel- - ar-43- - raw- - profile-v4iyb-ebe34a1e-eda2-447b-9cb0-0f8f286fa15b-2.png': 'english-toy-spaniel.png',
  'english-toy-terrier- - ar-43- - raw- - profile-v4iyb-783c5c9b-c897-4d7f-800c-a9d7e44b68b9-2.png': 'english-toy-terrier.png',
  'entlebucher-mountain-dog- - ar-43- - raw- - profile-f51ffc3d-1b72-451b-9234-e1e0b0cab3c7-1.png': 'entlebucher-mountain-dog.png',
  'field-spaniel- - ar-43- - raw- - profile-v4iybux- - v-668f43cd-6e4d-432e-956c-0b490da1cd1e-2.png': 'field-spaniel.png',
  'finnish-lapphund- - ar-43- - raw- - profile-v4iybux-fb7463be-cbee-467e-a3e4-80b81446cc0f-1.png': 'finnish-lapphund.png',
  'finnish-spitz- - ar-43- - raw- - profile-v4iybux- - v-f369eae4-63e3-469b-b2d0-dcc2f2239d7c-1.png': 'finnish-spitz.png',
  'flatcoated-retriever- - ar-43- - raw- - profile-v4iy-29f6f05f-c2e9-432d-b4b2-d964a31807fa-2.png': 'flatcoated-retriever.png',
  'french-bulldog- - ar-43- - raw- - profile-v4iybux- - -eb0e954c-ef5c-4080-a303-1932b8e5ac76-3.png': 'french-bulldog.png',
  'german-pinscher- - ar-43- - raw- - profile-v4iybux-480013ba-9f95-4504-b51a-d2838e44018e-0.png': 'german-pinscher.png',
  'german-shepherd-dog- - ar-43- - raw- - profile-v4iyb-972bdeba-a9a7-4373-97fa-615e52805187-3.png': 'german-shepherd-dog.png',
  'german-shorthaired-pointer- - ar-43- - raw- - profil-feb30709-30bc-4333-b742-2cdc9e7ebb78-0.png': 'german-shorthaired-pointer.png',
  'german-wirehaired-pointer- - ar-43- - raw- - profile-a0dc3b2e-962d-4d5b-8925-bf48c94cca3b-3.png': 'german-wirehaired-pointer.png',
  'giant-schnauzer- - ar-43- - raw- - profile-v4iybux-ceb2120d-a9e9-4d25-b661-b99d7ae1ad53-2.png': 'giant-schnauzer.png',
  'glen-of-imaal-terrier- - ar-43- - raw- - profile-v4i-18da7a33-cbdb-46c4-9099-fcb2b333cb1b-1.png': 'glen-of-imaal-terrier.png',
  'golden-retriever- - ar-43- - raw- - profile-v4iybux-c1732f5c-5998-4d67-8b1e-edee75f397be-2.png': 'golden-retriever.png',
  'gordon-setter- - ar-43- - raw- - profile-v4iybux- - v-a908f2d8-0526-437e-89e2-00ae399d13b7-2.png': 'gordon-setter.png',
  'great-dane- - ar-43- - raw- - profile-v4iybux- - v-7-2d7fce36-f9ae-49b3-b0b9-6343ce2cc0dd-2.png': 'great-dane.png',
  'great-pyrenees- - ar-43- - raw- - profile-v4iybux- - -09989777-cf75-4a69-bf83-f218be277d53-3.png': 'great-pyrenees.png',
  'greater-swiss-mountain-dog- - ar-43- - raw- - profil-b3852d75-140d-45a8-96c1-7c9e20477bf0-1.png': 'greater-swiss-mountain-dog.png',
  'greyhound- - ar-43- - raw- - profile-v4iybux- - v-7-54beddae-5534-43f8-a7cb-715a2de8059a-3.png': 'greyhound.png',
  'griffon-bruxellois- - ar-43- - raw- - profile-v4iybu-cd7ac537-2a91-4c60-bbe6-862e8e83b06f-0.png': 'griffon-bruxellois.png',
  'harrier- - ar-43- - raw- - profile-v4iybux- - v-7-442093df-b087-4ebf-88d3-6a98d50cb722-1.png': 'harrier.png',
  'havanese- - ar-43- - raw- - profile-v4iybux- - v-7-ff5f2bb9-b3a7-45b9-ae3f-6cfb5944ba3c-2.png': 'havanese.png'
};

console.log('🔧 FIXING DOG IMAGE NAMES...\n');

let renamedCount = 0;
let errorCount = 0;

Object.entries(fileMapping).forEach(([oldName, newName]) => {
  const oldPath = path.join(dogsDir, oldName);
  const newPath = path.join(dogsDir, newName);

  try {
    if (fs.existsSync(oldPath)) {
      // Check if target already exists
      if (fs.existsSync(newPath)) {
        console.log(`⚠️  SKIP: ${newName} (target already exists)`);
        // Remove the old file since we have the correct one
        fs.unlinkSync(oldPath);
        console.log(`🗑️  REMOVED: ${oldName}`);
      } else {
        fs.renameSync(oldPath, newPath);
        console.log(`✅ RENAMED: ${oldName.substring(0, 50)}... → ${newName}`);
        renamedCount++;
      }
    } else {
      console.log(`❌ NOT FOUND: ${oldName.substring(0, 50)}...`);
    }
  } catch (error) {
    console.log(`❌ ERROR: ${newName} (${error.message})`);
    errorCount++;
  }
});

console.log(`\n📊 SUMMARY:`);
console.log(`   Renamed: ${renamedCount} files`);
console.log(`   Errors: ${errorCount} files`);

// Continue with more mappings...
const moreMapping = {
  'ibizan-hound- - ar-43- - raw- - profile-v4iybux- - v-b8f6c14b-f6b5-4ba4-b4ae-5c4996829d23-1.png': 'ibizan-hound.png',
  'icelandic-sheepdog- - ar-43- - raw- - profile-v4iybu-ac2a6d01-dcfb-407c-b559-06339ab9aafd-2.png': 'icelandic-sheepdog.png',
  'irish-red-and-white-setter- - ar-43- - raw- - profil-ae4779fa-8147-4acb-b96b-2219674125b5-2.png': 'irish-red-and-white-setter.png',
  'irish-setter- - ar-43- - raw- - profile-v4iybux- - v-e90c6094-c42e-4628-81eb-818dc1c0adcb-1.png': 'irish-setter.png',
  'irish-terrier- - ar-43- - raw- - profile-v4iybux- - v-a72032be-3987-4ce9-8371-61f25db97e37-2.png': 'irish-terrier.png',
  'irish-water-spaniel- - ar-43- - raw- - profile-v4iyb-a1423a39-2287-4fbe-be6b-a962ac9ec9ab-0.png': 'irish-water-spaniel.png',
  'irish-wolfhound- - ar-43- - raw- - profile-v4iybux-cfb45ffa-2150-4123-b658-b949cbd21872-3.png': 'irish-wolfhound.png',
  'italian-greyhound- - ar-43- - raw- - profile-v4iybux-899eafee-b75f-49f6-b3aa-a2724f52c0f0-2.png': 'italian-greyhound.png',
  'jack-russell-terrier- - ar-43- - raw- - profile-v4iy-6c05a4ba-beb7-4d01-9ee7-16d276873620-0.png': 'jack-russell-terrier.png',
  'japanese-chin- - ar-43- - raw- - profile-v4iybux- - v-9a35e215-6f0c-4864-b737-40e8857045c9-3.png': 'japanese-chin.png',
  'keeshond- - ar-43- - raw- - profile-v4iybux- - v-9c471ab2-e4d1-4131-bd11-62a22eaf72a1-0.png': 'keeshond.png',
  'kerry-blue-terrier- - ar-43- - raw- - profile-v4iybu-b42df785-a0f5-4f77-9184-7e9eeaa10399-3.png': 'kerry-blue-terrier.png',
  'komondor- - ar-43- - raw- - profile-v4iybux- - v-e097ba7d-1911-481e-8dc7-27aa22f5d85b-2.png': 'komondor.png',
  'kooikerhondje- - ar-43- - raw- - profile-v4iybux-4c1a7389-ba49-424d-9320-9b9a677b99e4-1.png': 'kooikerhondje.png',
  'kuvasz- - ar-43- - raw- - profile-v4iybux- - v-7-e4a4a7ec-1647-401a-a32d-aa769c98d507-1.png': 'kuvasz.png',
  'labrador-retriever- - ar-43- - raw- - profile-v4iybu-abbdc763-0f09-4f8e-9420-0c8525756d44-1.png': 'labrador-retriever.png',
  'lagotto-romagnolo- - ar-43- - raw- - profile-v4iybux-f373ca3e-1504-4000-a05d-0671ce6db3c7-3.png': 'lagotto-romagnolo.png',
  'lakeland-terrier- - ar-43- - raw- - profile-v4iybux-0e1c6c08-9b67-4808-8442-5e9777947888-2.png': 'lakeland-terrier.png',
  'leonberger- - ar-43- - raw- - profile-v4iybux- - -4ab565ba-65a4-4733-b9f2-ae185e876e0b-2.png': 'leonberger.png',
  'lhasa-apso- - ar-43- - raw- - profile-v4iybux- - -ad7a02a8-3bbd-4e13-9e52-748870467c46-0.png': 'lhasa-apso.png',
  'lowchen- - ar-43- - raw- - profile-v4iybux- - v-7-cba2ef79-5860-4cc1-b677-300052dd93e3-1.png': 'lowchen.png',
  'maltese- - ar-43- - raw- - profile-v4iybux- - v-7-16147924-a3ee-48c0-af6d-c770ecd87cbc-2.png': 'maltese.png',
  'manchester-terrier- - ar-43- - raw- - profile-v4iybu-feea3629-3f33-492a-be2f-c68de3926063-1.png': 'manchester-terrier.png',
  'mastiff- - ar-43- - raw- - profile-v4iybux- - v-7-cbd6d2e8-0858-4fdd-8de6-04f6186be3b0-2.png': 'mastiff.png',
  'miniature-pinscher- - ar-43- - raw- - profile-v4iybu-b9ae03db-ac30-4925-801a-298b280be4d6-0.png': 'miniature-pinscher.png',
  'miniature-schnauzer- - ar-43- - raw- - profile-v4iyb-1fba8fd9-9823-4270-9e6f-6d5970696a89-1.png': 'miniature-schnauzer.png',
  'neapolitan-mastiff- - ar-43- - raw- - profile-v4iybu-a3b41881-539b-4b78-b1db-d736dcf0201b-1.png': 'neapolitan-mastiff.png',
  'newfoundland- - ar-43- - raw- - profile-v4iybux-066c78ce-3803-4c2e-a752-0f582fe46e35-2.png': 'newfoundland.png'
};

console.log('\n🔧 CONTINUING WITH MORE RENAMES...\n');

Object.entries(moreMapping).forEach(([oldName, newName]) => {
  const oldPath = path.join(dogsDir, oldName);
  const newPath = path.join(dogsDir, newName);

  try {
    if (fs.existsSync(oldPath)) {
      if (fs.existsSync(newPath)) {
        console.log(`⚠️  SKIP: ${newName} (target already exists)`);
        fs.unlinkSync(oldPath);
        console.log(`🗑️  REMOVED: ${oldName.substring(0, 50)}...`);
      } else {
        fs.renameSync(oldPath, newPath);
        console.log(`✅ RENAMED: ${oldName.substring(0, 50)}... → ${newName}`);
        renamedCount++;
      }
    }
  } catch (error) {
    console.log(`❌ ERROR: ${newName} (${error.message})`);
    errorCount++;
  }
});

console.log(`\n📊 FINAL SUMMARY:`);
console.log(`   Total Renamed: ${renamedCount} files`);
console.log(`   Total Errors: ${errorCount} files`);