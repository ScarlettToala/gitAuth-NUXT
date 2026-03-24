import { eq } from "drizzle-orm";
import * as schema from "../../db/schema";
import { useDb } from "../../utils";
import { requireAuthUserId } from "../../utils/auth"; // <-- Importar la función Uso de token

export default defineEventHandler(async (event) => {
  const db = useDb();

  // Esta línea lee Tokens de Quasar Y Cookies de Nuxt.
  const userId = await requireAuthUserId(event); 

  // Hacemos la consulta 
  const animals = await db
    .select({
      id: schema.animals.id,
      name: schema.animals.name,
      scientific_name: schema.animals.scientific_name,
      category: schema.animals.category,
      seenAt: schema.animals.seenAt,
      notes: schema.animals.notes,
      imageUrl: schema.animals.imageUrl,
    })
    .from(schema.animals)
    .innerJoin(
      schema.animalsSaved,
      eq(schema.animals.id, schema.animalsSaved.animalsId)
    )
    .where(eq(schema.animalsSaved.userId, userId));

  return animals ?? [];
});