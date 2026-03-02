//update
import { useDb } from "../../utils";
import { eq } from "drizzle-orm";
import { animals } from "../../db/schema";

export default defineEventHandler(async (event) => {
  const db = useDb();
  const id = Number(event.context.params?.id);
  const body = await readBody(event);

  await db
    .update(animals)
    .set({
      ...body,
      seenAt: body.seenAt ? new Date(body.seenAt) : undefined,
    })
    .where(eq(animals.id, id));

  return { message: "Animal updated" };
});