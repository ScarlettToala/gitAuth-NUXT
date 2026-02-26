// db/seeds.ts
//no funciono La inserción fue medianet drizzle studio con el sql console 
 
import { animals } from "./schema";
import { useDb } from "../utils";

const galapagosAnimals = [
  {
    name: "Tortuga gigante de Galápagos",
    scientificName: "Chelonoidis nigra",
    category: "reptile",
    seenAt: Date.now(),
    notes: "Majestuosas y longevas",
    imageUrl: "https://turismoanimal.es/wp-content/themes/lorraine/images/tortuga-gigante-galapagos.webp"
  },
  {
    name: "Pinzón de Darwin",
    scientificName: "Geospiza fortis",
    category: "bird",
    seenAt: Date.now(),
    notes: "Famoso por la evolución",
    imageUrl: "https://s3.animalia.bio/animals/photos/full/1.25x1/large-ground-finch.webp?id=2cf5f3181fc065e8acf64514db32f2ce"
  },
  {
    name: "Iguana marina",
    scientificName: "Amblyrhynchus cristatus",
    category: "reptile",
    seenAt: Date.now(),
    notes: "Nada y toma el sol en las rocas",
    imageUrl: "https://s3.animalia.bio/animals/photos/full/original/marine-iguana-1.webp"
  },
  {
    name: "Sula patas azules",
    scientificName: "Sula nebouxii",
    category: "bird",
    seenAt: Date.now(),
    notes: "Bailan para conquistar pareja",
    imageUrl: "https://s3.animalia.bio/animals/photos/full/original/BD383TvbWzd8YChPdZZO.webp"
  },
  {
    name: "León marino de Galápagos",
    scientificName: "Zalophus wollebaeki",
    category: "mammal",
    seenAt: Date.now(),
    notes: "Comportamiento muy social en playas",
    imageUrl: "https://s3.animalia.bio/animals/photos/full/original/sea-lion-on-north-seymour-island.webp"
  }
];

export async function seedGalapagosAnimals() {
  const db = useDb();

  for (const animal of galapagosAnimals) {
    await db.insert(animals).values(animal);
  }

  console.log("Animales de Galápagos insertados!");
}

if (process.argv[1]?.includes("seeds.ts")) {
  seedGalapagosAnimals()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}