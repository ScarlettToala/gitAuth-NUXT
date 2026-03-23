import { useDb } from "../../utils";
import { eq } from "drizzle-orm";
import { animals } from "../../db/schema";

export default defineEventHandler(async (event) => {
  const db = useDb();
  const animalId = Number(event.context.params?.id);

  if (!animalId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Falta el ID del animal.",
    });
  }

  const animal = await db
    .select()
    .from(animals)
    .where(eq(animals.id, animalId)); // ✨ Ahora sí usamos la variable correcta

  if (!animal || animal.length === 0) {
    throw createError({
      statusCode: 404,
      statusMessage: "Animal no encontrado",
    });
  }

  return animal[0];
});