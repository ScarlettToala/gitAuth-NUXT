import { eq } from "drizzle-orm";
import * as schema from "../db/schema";

export async function throwIfAnimalExists(name: string, island: string) {
    const existingAnimal = await useDb().query.animals.findFirst({
        where: eq(schema.animals.name, name)
    });

    if (existingAnimal) {
        throw createError({ statusCode: 400, statusMessage: "Animal ya registrado" });
    }
}

export async function registerAnimal(
    name: string, 
    scientific_name: string | undefined, 
    category: string, 
    seenAt: number, 
    notes: string | undefined, 
    imageUrl: string | undefined, 
) {
    const data = await useDb().insert(schema.animals).values({
        name,
        scientific_name,
        category,
        seenAt,
        notes,
        imageUrl,
    }).returning()

    const newAnimal = data.at(0);

    if (!newAnimal) {
        throw createError({ statusCode: 500, statusMessage: "Error al registrar el animal" });
    }

    return newAnimal;
}