import { throwIfUserExists } from "~~/server/utils/registerUtils";
import { registerUser } from "~~/server/utils/registerUtils"; // Añadido asumiendo que está aquí
import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
    // 1) Accedeixo als camps del formulari
    const { name, email, password } = await readBody(event);

    // 2) Comprovo que estiguin tots els camps
    if (!name || !email || !password) {
        // Si no estan tots --> error
        throw createError({ statusCode: 400, statusMessage: 'Falten camps per introduir :(' })
    }

    // 3) Estan totes les dades. Comprovo si usuari existeix --> faig consulta
    // (si existeix salta error )
    await throwIfUserExists(email);

    // 4) Creo un usuari
    const newUser = await registerUser(name, email, password);
    
    // 5) Desestructurem per treure el password
    const { password: repassword, ...userWithoutPassword } = newUser;

    // --- EL CAMBIO MAGISTRAL PARA JWT ---
    
    // 6) Creem el Token en lloc de la sessió amb galetes (cookies)
    const secretKey = process.env.JWT_SECRET || 'super_secret_key_bipedia_123';
    
    const token = jwt.sign(
        { 
            id: newUser.id, 
            email: newUser.email 
        }, 
        secretKey, 
        { expiresIn: '7d' } // El token durará 7 días
    );

    // 7) Retornem el token Y l'usuari
    return {
        token: token,
        user: userWithoutPassword
    };
});