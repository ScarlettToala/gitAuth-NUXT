import { eq } from "drizzle-orm";
import * as schema from "../../db/schema";
import { useDb } from "../../utils";

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);
  
    const db = useDb();

  if (!session?.user) {
    throw createError({
      statusCode: 401,
      statusMessage: "No autenticado",
    });
  }

  const userId = Number(session?.user?.id);

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