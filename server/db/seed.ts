import * as animalUtils from "./animalsUtils";

export async function registerUser(name: string, email: string, password: string) {
  const res = await useDb().insert(schema.users).values({
    name,
    email,
    password: await hashPassword(password),
    login: email
  }).returning();

  const newUser = res.at(0);

  if (!newUser) {
    throw createError({ statusCode: 500, statusMessage: "Error al registrar el usuario" });
  }

  // 🐢 Animales por defecto para este usuario
  const defaultAnimals = [
    {
      name: "Tortuga Gigante",
      scientificName: "Chelonoidis nigra",
      category: "reptile",
      seenAt: Date.now(),
      notes: "Animal por defecto",
      imageUrl: "/images/tortuga.jpg",
      userId: newUser.id
    },
    {
      name: "Pingüino de Galápagos",
      scientificName: "Spheniscus mendiculus",
      category: "bird",
      seenAt: Date.now(),
      notes: "Animal por defecto",
      imageUrl: "/images/pinguino.jpg",
      userId: newUser.id
    }
  ];

  // Inserta todos los animales por defecto
  for (const animal of defaultAnimals) {
    await useDb().insert(schema.animals).values(animal);
  }

  return newUser;
}