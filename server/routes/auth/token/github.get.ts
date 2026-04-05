import { eq } from "drizzle-orm";
import * as schema from "../../../db/schema";
import { useDb } from "../../../utils";
import jwt from "jsonwebtoken";
import { send } from "h3"; // <-- 1. Añadimos 'send' aquí

export default defineOAuthGitHubEventHandler({
  config: {
    emailRequired: true
  },
  async onSuccess(event, { user, tokens }) { // <-- 2. Volvemos a poner 'tokens' por si acaso la librería lo exige
    
    if (!user.email) {
      throw createError({
        status: 500,
        statusMessage: "No s'ha proporcionat l'email del teu compte Github"
      });
    }

    let finalUser;
    const db = useDb();

    let existingUser = await db.query.users.findFirst({
      where: eq(schema.users.email, user.email)
    });

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

    if (!finalUser) {
      throw createError({
        status: 500,
        statusMessage: "Error d'autentificació Github"
      });
    }

    // Generamos el Token
    const secretKey = process.env.JWT_SECRET || 'super_secret_key_bipedia_123';
    const token = jwt.sign(
      { id: finalUser.id, email: finalUser.email },
      secretKey,
      { expiresIn: '7d' }
    );

    const html = `
    <html>
      <head><title>Autenticant...</title></head>
      <body>
        <script>
          if (window.opener) {
            window.opener.postMessage({ token: '${token}' }, 'http://192.168.0.20:9000');
            window.close();
          }
        </script>
      </body>
    </html>
    `;

    await send(event, html, 'text/html');
    return; // Devolvemos un "vacío" para que TypeScript no marque el error rojo
  },

  async onError(event, error) {
    console.error('GitHub OAuth error:', error);
    
    const html = `
    <html>
      <body>
        <script>
          if (window.opener) {
            window.opener.postMessage({ error: 'Error al autenticar con GitHub' }, 'http://192.168.0.20:9000');
            window.close();
          }
        </script>
      </body>
    </html>
    `;
    
    await send(event, html, 'text/html');
    return; // Igual aquí
  }
});