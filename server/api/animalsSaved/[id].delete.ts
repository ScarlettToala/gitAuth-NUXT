import { useDb } from "../../utils";
import { eq } from "drizzle-orm";
import { animals } from "../../db/schema";

export default defineEventHandler(async (event) => {
  const db = useDb();
  const id = Number(event.context.params?.id);

  await db
    .delete(animals)
    .where(eq(animals.id, id));

  return { message: "Animal deleted" };
});