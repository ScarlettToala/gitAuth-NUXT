# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.


### Enunciado
2. Requisits Tècnics Base (Starter)
Heu de partir del codi generat a les classes guiades, que ja inclou:
Framework Nuxt configurat.
Base de dades SQLite amb Drizzle ORM.
Sistema d'autenticació híbrid:
OAuth amb GitHub.
Credencials locals (Email/Password) amb encriptació.
Gestió de sessions via useUserSession.
3. Fases de Desenvolupament
Fase 1: Ampliació de la Base de Dades (Schema)
El vostre CRUD principal necessita mínim una taula a la base de dades.
Aneu a server/db/schema.ts.
Definiu la nova taula (ex: tasks, projects) utilitzant sqliteTable.
Requisit Clau: La taula ha de tenir una relació amb l'usuari. Cada recurs ha de pertànyer a un usuari (userId).
Exemple: Un camp userId que guardi l'ID de l'usuari que ha creat el recurs.

Executeu npx drizzle-kit push per actualitzar la base de dades local.

Fase 2: Creació de l'API REST (Server Routes)
Implementeu els endpoints necessaris dins de la carpeta server/api/. Necessitareu crear un CRUD complet per al vostre recurs, heu vist exemple de com insertar a la base de dades i de com fer selects, faltarà que investigueu a la documentació com fer delete i update :

GET /api/el-vostre-recurs: Retorna només els elements de l'usuari autenticat.
POST /api/el-vostre-recurs: Crea un nou element vinculat a l'usuari actual.
PUT /api/el-vostre-recurs/:id: Modifica un element (validant que pertanyi a l'usuari).
DELETE /api/el-vostre-recurs/:id: Elimina un element.

Seguretat: Tots els endpoints han de verificar la sessió utilitzant requireUserSession(event) abans de fer cap operació a la base de dades.

Fase 3: Frontend i Interfície d'Usuari
Desenvolupeu la interfície visual utilitzant Nuxt UI i els components Vue:
Dashboard: Una pàgina protegida (middleware auth ) on es llistin els elements del vostre recurs.
Formularis: Heu de crear formularis per afegir i editar dades.
Ús de Zod per validar les dades al client abans d'enviar-les.
Ús de components <UForm>, <UInput>, <UButton>.
Feedback: Utilitzeu useToast() per informar l'usuari quan es crea o s'elimina un registre correctament.

4. Lliurables
Repositori de GitHub amb el codi font complet.
Un fitxer README.md explicant com posar en marxa el projecte (instal·lació de dependències, variables d'entorn necessàries al .env).
Hauràs de fer una petita demo a classe per veure el funcionament de l’aplicatiu.
5. Consideracions

1. El Repte de la "Relació" (Foreign Keys)
A classe hem vist com crear la taula users, però no com relacionar taules.
Bonus: Utilitzar eq(schema.tasks.userId, user.id) en les consultes Drizzle per filtrar.

2. Tipatge compartit
Un dels grans avantatges de Nuxt és compartir tipus.
Defineix el tipus del teu recurs a types/index.ts (o similar) i fes-ho servir tant al Backend (per retornar dades) com al Frontend (per rebre-les al useFetch).
Exemple: const { data: tasks } = await useFetch<Task[]>('/api/tasks').

3. Validació Doble (Zod)
A classe heu vist Zod al frontend dins del <UForm>.
Fes servir el mateix esquema de Zod (readBody i parse) al Backend. 

