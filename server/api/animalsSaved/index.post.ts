import { eq, and } from "drizzle-orm";
import * as schema from "../../db/schema";
import { useDb } from "../../utils";

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event);
  const db = useDb();
  const body = await readBody(event);

  if (!session?.user?.id) {
    throw createError({
      statusCode: 401,
      statusMessage: "No autenticado",
    });
  }

  const { animalId } = body;

  if (!animalId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Falta animalId",
    });
  }

  // Evitar duplicados
  const existing = await db
    .select()
    .from(schema.animalsSaved)
    .where(
      and(
        eq(schema.animalsSaved.userId, session.user.id),
        eq(schema.animalsSaved.animalsId, animalId)
      )
    );

  if (existing.length > 0) {
    return { message: "Ya está guardado" };
  }

  await db.insert(schema.animalsSaved).values({
    userId: session.user.id,
    animalsId: animalId,
  });

  return { message: "Animal guardado" };
});