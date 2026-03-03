import { eq } from "drizzle-orm";
import * as schema from "../../db/schema";
import { useDb } from "../../utils";
import { sendRedirect } from "h3";

export default defineOAuthGitHubEventHandler({
  config: {
    emailRequired: true
  },
  async onSuccess(event, { user, tokens }) {
    //  Verificar que GitHub nos dio un email
    if (!user.email) {
      throw createError({
        status: 500,
        statusMessage: "No s'ha proporcionat l'email del teu compte Github"
      });
    }

    let finalUser;
    const db = useDb();

    //  Buscar usuario en nuestra DB
    let existingUser = await db.query.users.findFirst({
      where: eq(schema.users.email, user.email)
    });

    //  Si no existe, creamos el usuario
    if (!existingUser) {
      const result = await db.insert(schema.users).values({
        email: user.email,
        login: user.login,
        name: user.name
      }).returning({ id: schema.users.id });

      finalUser = {
        id: result[0].id,
        email: user.email,
        login: user.login,
        name: user.name
      };
    } else {
      finalUser = existingUser;
    }

    //  Si aún no hay usuario, lanzamos error
    if (!finalUser) {
      throw createError({
        status: 500,
        statusMessage: "Error d'autentificació Github"
      });
    }

    //  Desestructuramos para quitar la contraseña si existiera
    const { password, ...userWithoutPswd } = finalUser;

    //  Guardamos la sesión completa con id, login, name, email
    await setUserSession(event, {
      user: {
        id: finalUser.id,
        email: finalUser.email,
        name: finalUser.name,
        login: finalUser.login
      },
      loggedInAt: new Date().toISOString() // Esto ayuda a refrescar la cookie
    });

    //  Redirigimos al catálogo (o donde quieras)
    return sendRedirect(event, '/catalogo');
  },

  onError(event, error) {
    console.error('GitHub OAuth error:', error);
    return sendRedirect(event, '/');
  }
});