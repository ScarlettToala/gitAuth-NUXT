import { eq } from "drizzle-orm";
import * as schema from "../../../db/schema";
import jwt from "jsonwebtoken"; // <-- Añadimos la importación de JWT

export default defineEventHandler(async (event) => {
    // 1) Accedeixo als camps del formulari
    const { email, password } = await readBody(event);

    // 2) Comprovo que estiguin tots els camps
    if ( !email || !password) {
        throw createError({ statusCode: 400, statusMessage: 'Falten camps per introduir :(' })
    }

    // 3) Comprovo si usuari existeix --> faig consulta
    const existingUser = await useDb().query.users.findFirst({
        where: eq(schema.users.email, email)
    })
    
    if(!existingUser) {
        throw createError({ statusCode: 400, statusMessage: 'Mail o password incorrecte' })
    }

    if(!existingUser.password) {
        throw createError({ statusCode: 400, statusMessage: 'Invalid password Github' })
    }

    const isValid = await verifyPassword(existingUser.password, password)

    if(!isValid){
        throw createError({ statusCode: 400, statusMessage: 'Password Incorrecte' })
    }

    const { password: repassword, ...userWithoutPassword } = existingUser

    // --- AQUÍ ESTÁ EL CAMBIO MAGISTRAL ---
    
    // 4) Eliminamos el setUserSession (que crea la cookie) y creamos el Token
    const secretKey = process.env.JWT_SECRET || 'super_secret_key_bipedia_123'
    
    const token = jwt.sign(
        { 
            id: existingUser.id, 
            email: existingUser.email 
        }, 
        secretKey, 
        { expiresIn: '7d' } // El token durará 7 días
    )

    // 5) Retornamos el token Y el usuario
    return {
        token: token,
        user: userWithoutPassword
    };
});