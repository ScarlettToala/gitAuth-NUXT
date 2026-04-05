import { useDb } from "../../utils";
import { animals } from "../../db/schema";
import { eq } from "drizzle-orm"; 
// 👇 Importa tu función
import { requireAuthUserId } from "../../utils/auth";

export default defineEventHandler(async (event) => {
  const db = useDb();
  
  //  PROTEGEMOS LA RUTA (Asegura que el usuario esté logueado)
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

  //  Magia aquí: Creamos la fecha por defecto (HOY / AHORA MISMO)
  let fechaGuardar = new Date(); 

  // Si el frontend SÍ mandó una fecha, intentamos usar esa
  if (body.seenAt) {
    const fechaParseada = new Date(body.seenAt);
    
    // Si la fecha que mandó es válida (no es NaN), reemplazamos la de hoy por la suya
    if (!isNaN(fechaParseada.getTime())) {
      fechaGuardar = fechaParseada;
    }
  }

  // 3. ACTUALIZAR
  const animalActualizado = await db
    .update(animals)
    .set({
      name: body.name,
      scientific_name: body.scientific_name,
      category: body.category,
      seenAt: fechaGuardar, // Guardamos la fecha que decidimos (la de hoy o la que mandó el frontend)
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