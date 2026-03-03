export default defineEventHandler(async (event) => {
  // Leemos la sesión
  const session = await getUserSession(event)
  
  // Imprimimos en la TERMINAL (tu consola de VSCode/Command Prompt)
  console.log("🔑 Contraseña detectada por el servidor:", process.env.NUXT_SESSION_PASSWORD)

  return { 
    mensaje: "Test de sesión profundo",
    // Devolvemos true o false para ver si Nuxt cargó el .env
    elServidorLeeElEnv: !!process.env.NUXT_SESSION_PASSWORD, 
    sesion: session 
  }
})