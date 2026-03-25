import { useDb } from "../../utils";
import { eq, and } from "drizzle-orm";
import * as schema from "../../db/schema";
import { requireAuthUserId } from "../../utils/auth";

export default defineEventHandler(async (event) => {
  const db = useDb();
  
  // Verificamos quién es el usuario autenticado
  const userId = await requireAuthUserId(event);
  
  // Obtenemos el ID del animal que viene en la URL (/api/animals_saved/5)
  const animalId = Number(event.context.params?.id);

  if (!animalId) {
    throw createError({ statusCode: 400, statusMessage: "Falta el ID del animal" });
  }

  // ¡ATENCIÓN! Borramos de 'animalsSaved', NO de 'animals'
  // Y nos aseguramos de que el userId coincida, para que no borre los de otro usuario
  await db
    .delete(schema.animalsSaved)
    .where(
      and(
        eq(schema.animalsSaved.userId, userId),
        eq(schema.animalsSaved.animalsId, animalId)
      )
    );

  return { message: "Animal eliminado de tu lista correctamente" };
});