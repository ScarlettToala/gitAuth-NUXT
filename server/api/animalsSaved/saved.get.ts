import { eq } from "drizzle-orm";
import * as schema from "../../db/schema";
import { useDb } from "../../utils";

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event);
  const db = useDb();

  if (!session?.user?.id) {
    throw createError({
      statusCode: 401,
      statusMessage: "No autenticado",
    });
  }

  const animals = await db
    .select({
      id: schema.animals.id,
      name: schema.animals.name,
      scientific_name: schema.animals.scientific_name,
      category: schema.animals.category,
      seenAt: schema.animals.seenAt,
      notes: schema.animals.notes,
      image_url: schema.animals.image_url,
    })
    .from(schema.animals)
    .innerJoin(
      schema.animalsSaved,
      eq(schema.animals.id, schema.animalsSaved.animalsId)
    )
    .where(eq(schema.animalsSaved.userId, session.user.id));

  return animals ?? [];
});