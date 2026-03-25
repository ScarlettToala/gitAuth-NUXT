import { useDb } from "../../utils";
import * as schema from "../../db/schema";
import { eq } from "drizzle-orm";
import { requireAuthUserId } from "../../utils/auth";

export default defineEventHandler(async (event) => {
    const db = useDb();

    // Obtener usuario logueado
    const userId = await requireAuthUserId(event);
    
    if (!userId) {
        throw createError({ statusCode: 401, statusMessage: "No autenticado" });
    }

    // Leer body
    const { name, scientific_name, category, imageUrl, notes } = await readBody(event);

    if (!name || !category) {
        throw createError({ statusCode: 400, statusMessage: "Faltan campos obligatorios" });
    }

    // Insertar en tabla global 'animals'
    const insertedAnimals = await db.insert(schema.animals).values({
        name,
        scientific_name: scientific_name || null,
        category,
        seenAt: new Date(),
        notes: notes || null,
        imageUrl: imageUrl || null,
    }).returning();

    const newAnimal = insertedAnimals[0];

    if (!newAnimal) {
        throw createError({ statusCode: 500, statusMessage: "Error al crear el animal" });
    }

    // Insertar en 'animalsSaved' para ligarlo al usuario
    await db.insert(schema.animalsSaved).values({
        userId,
        animalsId: newAnimal.id
    });

    // Retornar respuesta
    return {
        message: "Animal creado y guardado para el usuario",
        animal: newAnimal
    };
});