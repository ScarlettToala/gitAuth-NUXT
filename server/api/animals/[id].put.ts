import { useDb } from "../../utils";
import { animals } from "../../db/schema";
// import { getUserID } from "../../utils/getUserID"; // Descomenta si solo usuarios logueados pueden crear

export default defineEventHandler(async (event) => {
  const db = useDb();
  const body = await readBody(event);

  // Validamos que vengan los campos obligatorios (los que tienen .notNull() en tu schema)
  if (!body.name || !body.category || !body.seenAt) {
    throw createError({
      statusCode: 400,
      statusMessage: "Faltan campos obligatorios: nombre, categoría o fecha de avistamiento.",
    });
  }

  // Insertamos el nuevo animal
  const nuevoAnimal = await db
    .insert(animals)
    .values({
      name: body.name,
      scientific_name: body.scientific_name,
      category: body.category,
      // Convertimos el string que viene del formulario a formato Date
      seenAt: new Date(body.seenAt), 
      notes: body.notes,
      imageUrl: body.imageUrl,
    })
    .returning(); // .returning() nos devuelve el animal recién creado con su nuevo ID

  return { 
    message: "¡Animal creado con éxito!",
    animal: nuevoAnimal[0] 
  };
});