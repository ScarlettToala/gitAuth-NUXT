import { useDb } from "../../utils";

export default defineEventHandler(async (event) => {
  const db = useDb();
  const animals = await db.query.animals.findMany();

  return animals
})