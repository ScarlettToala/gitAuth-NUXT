import { eq, and } from "drizzle-orm";
import * as schema from "../../db/schema";
import { useDb } from "../../utils";
import { requireAuthUserId } from "../../utils/auth"; //  Importas tu función mágica

export default defineEventHandler(async (event) => {

  const body = await readBody(event);
  const db = useDb();
  const animalId = Number(body.animalId)
  const userId = await requireAuthUserId(event);

  if (!userId) {
    throw createError({
      statusCode: 401,
      statusMessage: "No autenticado",
    });
  }


  if (!animalId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Falta animalId",
    });
  }

  // Evitar duplicados
  const existing = await db.query.animalsSaved.findFirst({
    where: and(
      eq(schema.animalsSaved.userId, userId),
      eq(schema.animalsSaved.animalsId, animalId)
    )
  });

  if (existing) {
    return { message: "Ya está guardado" };
  }

  await db.insert(schema.animalsSaved).values({
    userId: userId,
    animalsId: animalId,
  });

  return { message: "Animal guardado" };
});