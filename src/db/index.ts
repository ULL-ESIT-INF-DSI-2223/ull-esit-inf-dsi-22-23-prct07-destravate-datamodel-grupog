/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { join, dirname } from "path";
import { fileURLToPath } from "url"
import { randomUUID } from "crypto";
import { Route } from "../route.js";
import { Query } from "./query.js";
import { Identifiable } from "./identifiable.js";
import { Collection, DatabaseStructure } from "./structure.js";

// Init: Load db. If it doesn't exist, init the structure in memory.
const db = new Low(new JSONFile<DatabaseStructure>(join(dirname(fileURLToPath(import.meta.url)), "../../db.json")))
await db.read()
if (!db.data) {
  db.data = {
    challenges: [],
    groups: [],
    routes: [],
    users: []
  } as DatabaseStructure
}

/**
 * add functions adds a new object to the database. The ID of the object is ignored and a new one is assigned.
 * @param col Collection to add the object to.
 * @param i Object to add to the collection.
 * @returns The new ID of the object added.
 */
export async function add(col: Collection, i: Identifiable): Promise<string> {
  const id = randomUUID()
  i.id = id;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (db.data as any)[col].push(i)
  await db.write()
  return id
}

/**
 * routes starts a new query to the collection that contains Routes.
 * @returns A query to the routes collection.
 */
export function routes(): Query<Route> {
  return new Query(db.data!.routes)
}
