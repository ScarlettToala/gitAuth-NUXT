import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
    id: integer("id").primaryKey(),
    name: text("name"),
    email: text("email").notNull(),
    login: text("login"),
    password: text("password"),
});

export const animals = sqliteTable("animals", {
    id: integer("id").primaryKey(),

    // Información básica
    name: text("name").notNull(),                // Nombre común
    scientificName: text("scientific_name"),    // Nombre científico
    category: text("category").notNull(),       // reptile, bird, mammal, marine, etc.

    // Detalles del avistamiento
    seenAt: integer("seen_at", { mode: "timestamp" }).notNull(),
    notes: text("notes"),

    // Multimedia
    imageUrl: text("image_url"),

    // Referencia de usuario FK
    userId: integer("user_id")
    .notNull()
    .references(() => users.id),

    // Metadata
    createdAt: integer("created_at", { mode: "timestamp" })
        .$defaultFn(() => Date.now())
});