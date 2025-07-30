// Utility functions for handling breed images

export function getBreedImagePath(breedName: string, petType: 'dog' | 'cat', extension: string = 'jpg'): string {
  // Convert breed name to filename format
  const filename = breedName
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens

  const petFolder = petType === 'dog' ? 'dogs' : 'cats';
  return `/images/breeds/${petFolder}/${filename}.${extension}`;
}

export function getBreedImageWithFallback(breedName: string, petType: 'dog' | 'cat'): string {
  // Try PNG first (since your current images are PNG), then JPG, then fallback
  const filename = breedName
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  const petFolder = petType === 'dog' ? 'dogs' : 'cats';
  
  // Return PNG path first (since your images are PNG)
  return `/images/breeds/${petFolder}/${filename}.png`;
}

// List of all dog breeds from your data
export const DOG_BREEDS = [
  "Affenpinscher", "Afghan Hound", "Airedale Terrier", "Akita", "Alaskan Malamute",
  "American Bulldog", "American Eskimo Dog", "American Foxhound", "American Pit Bull Terrier",
  "American Staffordshire Terrier", "American Water Spaniel", "Anatolian Shepherd Dog",
  "Appenzeller Sennenhund", "Australian Cattle Dog", "Australian Shepherd", "Australian Terrier",
  "Basenji", "Basset Bleu de Gascogne", "Basset Hound", "Beagle", "Bearded Collie",
  "Belgian Malinois", "Belgian Sheepdog", "Belgian Tervuren", "Bernese Mountain Dog",
  "Bichon Frise", "Bichon Maltese", "Black Russian Terrier", "Black and Tan Coonhound",
  "Bloodhound", "Bluetick Coonhound", "Border Collie", "Border Terrier", "Borzoi",
  "Boston Terrier", "Bouvier des Flandres", "Boxer", "Boykin Spaniel", "Briard",
  "Brittany", "Bull Terrier", "Bull Terrier (Miniature)", "Bullmastiff", "Cairn Terrier",
  "Cane Corso", "Cardigan Welsh Corgi", "Cavalier King Charles Spaniel", "Chesapeake Bay Retriever",
  "Chihuahua", "Chinese Crested", "Chinese Crested Dog", "Chinese Shar-Pei", "Chow Chow",
  "Clumber Spaniel", "Cocker Spaniel", "Collie", "Coton de Tulear", "Curly-Coated Retriever",
  "Dachshund", "Dalmatian", "Dandie Dinmont Terrier", "Doberman Pinscher", "Dogo Argentino",
  "Dogue de Bordeaux", "Dutch Shepherd", "English Cocker Spaniel", "English Foxhound",
  "English Setter", "English Springer Spaniel", "English Toy Spaniel", "English Toy Terrier",
  "Entlebucher Mountain Dog", "Field Spaniel", "Finnish Lapphund", "Finnish Spitz",
  "Flat-Coated Retriever", "French Bulldog", "German Pinscher", "German Shepherd Dog",
  "German Shorthaired Pointer", "German Wirehaired Pointer", "Giant Schnauzer",
  "Glen of Imaal Terrier", "Golden Retriever", "Gordon Setter", "Great Dane", "Great Pyrenees",
  "Greater Swiss Mountain Dog", "Greyhound", "Griffon Bruxellois", "Harrier", "Havanese",
  "Ibizan Hound", "Icelandic Sheepdog", "Irish Red and White Setter", "Irish Setter",
  "Irish Terrier", "Irish Water Spaniel", "Irish Wolfhound", "Italian Greyhound",
  "Jack Russell Terrier", "Japanese Chin", "Keeshond", "Kerry Blue Terrier", "Komondor",
  "Kooikerhondje", "Kuvasz", "Labrador Retriever", "Lagotto Romagnolo", "Lakeland Terrier",
  "Leonberger", "Lhasa Apso", "Lowchen", "Maltese", "Manchester Terrier", "Mastiff",
  "Miniature Pinscher", "Miniature Schnauzer", "Neapolitan Mastiff", "Newfoundland",
  "Norfolk Terrier", "Norwegian Buhund", "Norwegian Elkhound", "Norwegian Lundehund",
  "Norwich Terrier", "Nova Scotia Duck Tolling Retriever", "Old English Sheepdog",
  "Otterhound", "Papillon", "Pekingese", "Pembroke Welsh Corgi", "Perro de Presa Canario",
  "Pharaoh Hound", "Plott", "Pointer", "Polish Lowland Sheepdog", "Pomeranian",
  "Poodle (Miniature)", "Poodle (Toy)", "Portuguese Water Dog", "Pug", "Puli",
  "Pyrenean Shepherd", "Rat Terrier", "Redbone Coonhound", "Rhodesian Ridgeback",
  "Rottweiler", "Saint Bernard", "Saluki", "Samoyed", "Schipperke", "Scottish Deerhound",
  "Scottish Terrier", "Sealyham Terrier", "Shetland Sheepdog", "Shiba Inu", "Shih Tzu",
  "Siberian Husky", "Silky Terrier", "Skye Terrier", "Smooth Fox Terrier",
  "Soft Coated Wheaten Terrier", "Spanish Water Dog", "Spinone Italiano",
  "Staffordshire Bull Terrier", "Standard Schnauzer", "Sussex Spaniel", "Swedish Vallhund",
  "Tibetan Mastiff", "Tibetan Spaniel", "Tibetan Terrier", "Toy Fox Terrier",
  "Treeing Walker Coonhound", "Vizsla", "Weimaraner", "Welsh Springer Spaniel",
  "Welsh Terrier", "West Highland White Terrier", "Whippet", "White Swiss Shepherd",
  "Wirehaired Pointing Griffon", "Xoloitzcuintli"
];

// List of all cat breeds from your data
export const CAT_BREEDS = [
  "Abyssinian", "American Bobtail", "American Curl", "American Shorthair", "American Wirehair",
  "Arabian Mau", "Arctic Curl", "Asiatico", "Australian Mist", "Balinese", "Bengalí",
  "Bombay", "Bosque de Noruega", "Brasileño de Pelo Corto", "British Longhair",
  "British Shorthair", "Británico de Pelo Corto Azul", "Burmese", "Burmilla",
  "California Spangled", "Chartreux", "Cornish Rex", "Devon Rex", "Don Sphynx",
  "European Burmese", "Exotic Shorthair", "Exótico de Pelo Largo", "Foldex", "German Rex",
  "Havana Brown", "Highland Fold", "Highland Straight", "Himalayan", "Japanese Bobtail",
  "Javanese", "Korat", "Kurilean Bobtail de Pelo Largo", "Kurilian", "LaPerm", "Lycoi",
  "Maine Coon", "Manx", "Munchkin", "Nebelung", "Neva Masquerade", "Ocicat", "Oriental",
  "Oriental de Pelo Semilargo", "Persian", "Peterbald", "Pixie-bob", "Ragdoll", "Raza Mixta",
  "Russian Blue", "Sagrado de Birmania", "Scottish Fold", "Scottish Straight", "Selkirk Rex",
  "Seychellois de Pelo Corto", "Siamese", "Siberian", "Singapura", "Snowshoe", "Sokoke",
  "Somalí", "Sphynx", "Thai", "Tonkinese", "Toyger", "Turkish Angora", "Turkish Van",
  "York Chocolate"
];