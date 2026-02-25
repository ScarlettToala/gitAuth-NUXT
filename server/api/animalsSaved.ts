import { eq } from "drizzle-orm";
import * as schema from "../db/schema";
import { useDb } from "../utils";

export default defineEventHandler(async (event) => {
  // 1️⃣ Obtener sesión
  const session = await requireUserSession(event);

  const db = useDb();

  // 2️⃣ Buscar animales guardados por el usuario
  const animals = await db
    .select()
    .from(schema.animals)
    .innerJoin(
      schema.animalsSaved,
      eq(schema.animals.id, schema.animalsSaved.animalsId)
    )
    .where(eq(schema.animalsSaved.userId, Number(session.user.id)));

  return animals;
});