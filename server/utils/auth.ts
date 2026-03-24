import jwt from "jsonwebtoken";

export const requireAuthUserId = async (event: any) => {
  // 1. Intentamos leer el Token (El método nuevo para Quasar / Android)
  const authHeader = getHeader(event, 'Authorization');
  
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    try {
      const secretKey = process.env.JWT_SECRET || 'super_secret_key_bipedia_123';
      const decoded = jwt.verify(token, secretKey) as any;
      return Number(decoded.id); // Si hay token válido, devolvemos el ID del usuario
    } catch (error) {
        console.log('Error en encontrar el token')
      throw createError({ statusCode: 401, message: "Token inválido o expirado" });
    }
  }

  // 2. Si NO hay token, intentamos leer la Cookie (El método antiguo para tu web Nuxt)
  const session = await getUserSession(event);
  if (session && session.user) {
    return Number(session.user.id); // Si hay cookie válida, devolvemos el ID
  }

  // 3. Si no hay ni Token ni Cookie... ¡Pa' fuera!
  throw createError({
    statusCode: 401,
    message: "No autenticado",
  });
};