import { useDb } from "../../utils";
import { eq } from "drizzle-orm";
import { animals } from "../../db/schema";

export default defineEventHandler(async (event) => {
  const db = useDb();
  const id = Number(event.context.params?.id);

  const animal = await db
    .select()
    .from(animals)
    .where(eq(animals.id, id));

  if (!animal.length) {
    throw createError({
      statusCode: 404,
      statusMessage: "Animal not found",
    });
  }

  return animal[0];
});