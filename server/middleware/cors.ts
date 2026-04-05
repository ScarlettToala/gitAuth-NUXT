export default defineEventHandler((event) => {
  // 1. Configuramos las cabeceras para darle permiso VIP a tu Quasar
  setResponseHeaders(event, {
    'Access-Control-Allow-Origin': 'http://192.168.0.20:9000',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept, Authorization',
    'Access-Control-Allow-Credentials': 'true'
  })

  // 2. Si la petición es el "preflight" (OPTIONS), respondemos OK al instante
  if (getMethod(event) === 'OPTIONS') {
    event.node.res.statusCode = 204
    event.node.res.statusMessage = 'No Content'
    return 'OK'
  }
})