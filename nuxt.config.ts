// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  future: {
    compatibilityVersion: 4,
  },
  devtools: { enabled: true },
  //css:["tailwindcss","@nuxt/ui"],
  modules: ["@nuxt/eslint", "@nuxt/ui", "nuxt-auth-utils"],
  runtimeConfig: {
    oauth: {
      // provider in lowercase (github, google, etc.)
      // Deixem clientId i clientSecret a cadena buida, pero d'on vindran els valors de les variables d'entorn?
      // dins la nostra conta de github
      github: {
        clientId: "",
        clientSecret: ""
      }
    }
  },
  devServer: {
    host: '0.0.0.0',
    port: 3000
  },
  routeRules: {
    '/**': {
      cors: true,
      headers: {
        // Ponemos la URL exacta de tu Quasar (sin la barra / al final)
        'Access-Control-Allow-Origin': 'http://192.168.0.20:9000',//#version móvil //'http://localhost:9000', //#version PC
        // Le decimos que SÍ aceptamos cookies/credenciales
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      }

    }

  }

});
