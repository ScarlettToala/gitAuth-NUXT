import type { Config } from "drizzle-kit";

//Son los objetos que se utlizará se crea un esquema para una tabla
export default {
 dialect: "sqlite",
 schema: "./server/db/schema.ts",
 out: "./server/db/migrations",
 dbCredentials: {
   url: "file:./.data/sqlite.db",
 },} satisfies Config;