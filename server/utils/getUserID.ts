import * as schema from '../db/schema'
import { eq } from 'drizzle-orm'
import type { H3Event } from 'h3'
import { useDb } from '../utils'

export async function getUserID(event: H3Event) {
    // 1️⃣ Obtener sesión (¡CON AWAIT!)
    // Nota: No necesitas importar getUserSession, Nuxt lo inyecta globalmente
    const session = await getUserSession(event)
    
    console.log("🔍 [DEBUG] Sesión completa:", session)

    // Extraemos el usuario de la sesión
    const sessionUser = session?.user

    if (!sessionUser) {
        console.error(" [DEBUG] No hay usuario en la sesión")
        throw createError({
            statusCode: 401,
            statusMessage: 'Sesión no encontrada'
        })
    }

    // 2️⃣ Intentar obtener el ID
    let userId: number | undefined = sessionUser.id ? Number(sessionUser.id) : undefined

    // 3️⃣ Si no hay ID pero sí email, buscamos en DB (Backup por si acaso)
    if (!userId && sessionUser.email) {
        console.warn("[DEBUG] ID no encontrado en sesión, buscando por email:", sessionUser.email)
        const db = useDb()
        const userFromDb = await db.query.users.findFirst({
            where: eq(schema.users.email, sessionUser.email)
        })

        if (userFromDb) {
            userId = Number(userFromDb.id)
        }
    }

    // 4️⃣ Validación final
    if (!userId || isNaN(userId)) {
        console.error(" [DEBUG] Resultado final: Usuario no identificado")
        throw createError({
            statusCode: 401,
            statusMessage: 'Usuario no autenticado o no encontrado en BD'
        })
    }

    console.log(" [DEBUG] ID de usuario final:", userId)
    return userId
}