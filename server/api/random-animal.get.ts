// server/api/random-animal.get.ts
import * as schema from "../db/schema";
import { useDb } from "../utils";

export default defineEventHandler(async () => {
  const db = useDb();
  
  // Obtener todos los animales
  const allAnimals = await db.select().from(schema.animals);

  // Elegir uno aleatorio
  const randomAnimal = allAnimals[Math.floor(Math.random() * allAnimals.length)];

  return randomAnimal;
});