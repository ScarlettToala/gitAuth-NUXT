import { eq } from "drizzle-orm";
import * as schema from "../../db/schema";

export default defineEventHandler(async (event) => {
    //1) Accedeixo als camps del formularinew 
    const { email, password } = await readBody(event);

    //2) Comprovo que estiguin tots els camps
    if ( !email || !password) {
        // Si no estan tots --> error
        throw createError({ statusCode: 400, statusMessage: 'Falten camp per introduir :(' })

    }

    // 3) Estan totes les dades. Comprovo si usuari existeix --> faig consulta
    // (si existeix salta error )


    const existingUser = await useDb().query.users.findFirst({
            where: eq(schema.users.email, email)
        })
    
        if(!existingUser) {
            throw createError({ statusCode: 400, statusMessage: 'mail o password incorrecte' })
        }

        if(!existingUser.password) {
            throw createError({ statusCode: 400, statusMessage: 'Invalid paasword Github' })
        }

        const isValid = await verifyPassword(existingUser.password, password)

        if(!isValid){
            throw createError( {statusCode: 400, statusMessage: 'Password Incorrecte'})
        }

    const {password: repassword, ...userWithoutPassword} = existingUser

    await setUserSession(event, {user: userWithoutPassword});

    return userWithoutPassword;
});