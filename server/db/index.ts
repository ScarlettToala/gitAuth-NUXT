
// caja basica para trabjar con las librerias 
import {drizzle} from "drizzle-orm/libsql";
import {createClient} from "@libsql/client";
import config from "../../drizzle.config";
import * as schema from "./schema"

//donde esta la base de datos para poder conectarse
const client = createClient({url:config.dbCredentials.url})
export const db = drizzle(client, {schema}); 

