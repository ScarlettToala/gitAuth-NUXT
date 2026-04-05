# Proyecto de Catálogo de Animales con Autenticación

Este proyecto es una aplicación web desarrollada con Nuxt 3 que permite gestionar un catálogo de animales, con funcionalidades de autenticación de usuarios mediante email/contraseña y OAuth de GitHub. Los usuarios pueden ver animales, guardar favoritos y, si son administradores, gestionar el catálogo.

## Descripción

La aplicación consta de un frontend en Vue.js/Nuxt y un backend server-side con API REST. Utiliza una base de datos SQLite con Drizzle ORM para almacenar usuarios, animales y animales guardados como favoritos.

## Características

- **Autenticación de usuarios**: Registro, login con email/contraseña y autenticación con GitHub OAuth.
- **Catálogo de animales**: Visualización de animales con información detallada (nombre, nombre científico, categoría, fecha de avistamiento, notas, imagen).
- **Gestión de favoritos**: Los usuarios pueden guardar y eliminar animales de su lista de favoritos.
- **Panel de administración**: Los administradores pueden crear, editar y gestionar animales.
- **API REST**: Endpoints para gestionar usuarios, animales y favoritos.
- **Interfaz responsiva**: Construida con Nuxt UI y Tailwind CSS.
- **CORS configurado**: Para integración con aplicaciones móviles (ej. Quasar en puerto 9000).

## Tecnologías Utilizadas

- **Frontend**: Nuxt 3, Vue 3, TypeScript, Nuxt UI, Tailwind CSS
- **Backend**: Nuxt Server API, Drizzle ORM
- **Base de datos**: SQLite (LibSQL)
- **Autenticación**: JWT, OAuth GitHub (nuxt-auth-utils)
- **Validación**: Zod
- **Herramientas de desarrollo**: ESLint, Drizzle Kit

## Prerrequisitos

Antes de inicializar el proyecto, asegúrate de tener instalado:

- **Node.js** (versión 18 o superior)
- **npm** o **yarn**
- Una cuenta de GitHub para configurar OAuth (opcional, pero recomendado para autenticación completa)

## Instalación

1. Clona el repositorio:
   ```bash
   git clone <url-del-repositorio>
   cd gitAuth-NUXT
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

## Configuración del Entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables de entorno:

```env
# OAuth GitHub (requerido para autenticación con GitHub)
NUXT_OAUTH_GITHUB_CLIENT_ID=tu_client_id_de_github
NUXT_OAUTH_GITHUB_CLIENT_SECRET=tu_client_secret_de_github

# Base de datos (SQLite por defecto, no requiere configuración adicional)
# La base de datos se crea automáticamente en ./.data/sqlite.db
```

### Configuración de OAuth GitHub

1. Ve a [GitHub Developer Settings](https://github.com/settings/developers).
2. Crea una nueva OAuth App.
3. Establece la **Authorization callback URL** como: `http://localhost:3000/auth/github` (para desarrollo local).
4. Copia el Client ID y Client Secret al archivo `.env`.

## Configuración de la Base de Datos

El proyecto utiliza SQLite con Drizzle ORM. Para inicializar la base de datos:

1. Genera las migraciones:
   ```bash
   npx drizzle-kit generate
   ```

2. Inserción manual de los datos de ejemplo:
   ```bash
   npx drizzle-kit studio
   ```

Dispone de una terminal para hacer la isnersión de lso dtaso que se encuentra en server/db/datosEjemplo.sql, puedes copiar y pegar el contenido de ese archivo para poblar la tabla `animals` con los datos de ejemplo.

Esto creará las tablas `users`, `animals` y `animals_saved`, y poblará la tabla `animals` con ejemplos de animales de Galápagos.

## Ejecutar la Aplicación

Para iniciar el servidor de desarrollo:

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`.

Para construir para producción:

```bash
npm run build
npm run preview
```

## Estructura del Proyecto

```
├── app/
│   ├── app.vue                 # Layout principal
│   ├── components/             # Componentes Vue
│   ├── pages/                  # Páginas de la aplicación
│   └── middleware/             # Middleware (autenticación)
├── server/
│   ├── api/                    # Endpoints de API
│   ├── db/                     # Configuración de BD y esquema
│   ├── routes/                 # Rutas de autenticación
│   └── utils/                  # Utilidades
├── public/                     # Archivos estáticos
├── drizzle.config.ts           # Configuración de Drizzle
├── nuxt.config.ts              # Configuración de Nuxt
└── package.json                # Dependencias y scripts
```

## API Endpoints

### Autenticación
- `POST /auth/login` - Login con email/contraseña
- `POST /auth/register` - Registro de usuario
- `GET /auth/github` - Inicio de OAuth GitHub
- `GET /auth/token/github` - Callback de OAuth GitHub

### Animales
- `GET /api/animals` - Obtener todos los animales
- `POST /api/animals` - Crear nuevo animal (requiere autenticación)
- `GET /api/animals/[id]` - Obtener animal específico
- `PUT /api/animals/[id]` - Actualizar animal (requiere autenticación)

### Animales Guardados (Favoritos)
- `GET /api/animals_saved` - Obtener favoritos del usuario (requiere autenticación)
- `POST /api/animals_saved` - Guardar animal como favorito (requiere autenticación)
- `DELETE /api/animals_saved/[id]` - Eliminar favorito (requiere autenticación)

### Otros
- `GET /api/random-animal` - Obtener animal aleatorio
- `GET /api/test-session` - Probar sesión de usuario
- `GET /api/admin` - Información de admin (requiere rol admin)

## Uso

1. **Registro/Login**: Crea una cuenta o inicia sesión con email/contraseña o GitHub.
2. **Explorar catálogo**: Ve a la página principal para ver todos los animales.
3. **Ver detalles**: Haz clic en un animal para ver más información.
4. **Guardar favoritos**: Desde la página de detalles, guarda animales en tu lista.
5. **Administrar**: Si eres admin, accede al panel para crear/editar animales.

## Notas Importantes

- La aplicación está configurada para desarrollo local. Para producción, ajusta las URLs de CORS y OAuth callbacks.
- La base de datos SQLite se crea automáticamente en `./.data/sqlite.db`.
- Asegúrate de que el puerto 3000 esté disponible para el servidor de desarrollo.
- Para integración móvil, la aplicación Quasar debe correr en `http://192.168.0.20:9000` (ajusta según tu configuración).

## Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request


OJO con el cors y git hub.get.ts del directorio server. ya que estan ahi las ip que debn cmabairse en caso de usarlo en web o en el movil, ya que si no se configuran bien no funcionará la autenticación con github ni la inserción de datos.

## Licencia

Este proyecto es privado y está destinado para fines educativos.