import { useDb } from "../../utils";
import { animals } from "../../db/schema";
import { eq } from "drizzle-orm"; 

export default defineEventHandler(async (event) => {
  const db = useDb();
  
  // 1. LEER EL ID DESDE LA URL (Lo más importante) ✨
  const animalId = Number(event.context.params?.id); 
  
  const body = await readBody(event);

  if (!animalId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Falta el ID del animal en la URL.",
    });
  }

  // 2. Validar campos obligatorios
  if (!body.name || !body.category) {
    throw createError({
      statusCode: 400,
      statusMessage: "Faltan campos obligatorios.",
    });
  }

  // 3. ACTUALIZAR usando el animalId de la URL
  const animalActualizado = await db
    .update(animals)
    .set({
      name: body.name,
      scientific_name: body.scientific_name,
      category: body.category,
      seenAt: new Date(body.seenAt), 
      notes: body.notes,
      imageUrl: body.imageUrl,
    })
    .where(eq(animals.id, animalId)) // Aquí usamos el ID que viene de la URL
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