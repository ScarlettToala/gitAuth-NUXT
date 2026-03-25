import { useDb } from "../../utils";
import { animals } from "../../db/schema";
import { eq } from "drizzle-orm"; 
// 👇 Importa tu función
import { requireAuthUserId } from "../../utils/auth";

export default defineEventHandler(async (event) => {
  const db = useDb();
  
  // 👇 PROTEGEMOS LA RUTA (Asegura que el usuario esté logueado)
  const userId = await requireAuthUserId(event);
  
  // 1. LEER EL ID DESDE LA URL
  const animalId = Number(event.context.params?.id); 
  
  const body = await readBody(event);

  if (!animalId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Falta el ID del animal en la URL.",
    });
  }

  if (!body.name || !body.category) {
    throw createError({
      statusCode: 400,
      statusMessage: "Faltan campos obligatorios.",
    });
  }

  // 3. ACTUALIZAR
  const animalActualizado = await db
    .update(animals)
    .set({
      name: body.name,
      scientific_name: body.scientific_name,
      category: body.category,
      seenAt: body.seenAt ? new Date(body.seenAt) : undefined, 
      notes: body.notes,
      imageUrl: body.imageUrl,
    })
    .where(eq(animals.id, animalId))
    .returning();

  if (!animalActualizado.length) {
    throw createError({
      statusCode: 404,
      statusMessage: "No se encontró el animal para actualizar.",
    });
  }

  return { 
    message: "¡Animal editado con éxito!",
    animal: animalActualizado[0] 
  };
});