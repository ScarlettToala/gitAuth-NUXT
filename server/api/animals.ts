import { eq } from "drizzle-orm"
import * as schema from "../db/schema"

export default defineEventHandler(async (event) => {

  // 1️⃣ Obtener sesión
  const session = await requireUserSession(event)

  // 2️⃣ Buscar solo animales del usuario logueado
  const animals = await useDb().query.animals.findMany({
    where: eq(schema.animals.userId, session.user.id)
  })

  return animals
})