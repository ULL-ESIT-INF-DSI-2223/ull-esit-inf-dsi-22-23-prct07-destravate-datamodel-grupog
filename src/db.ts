import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { join, dirname } from "path";
import { fileURLToPath } from "url"
import { randomUUID } from "crypto";
import { Route } from "./route.js";

/**
 * DatabaseStructure type represents the structure of the database.
 */
type DatabaseStructure = {
  challenges: unknown[]
  groups: unknown[]
  routes: Route[]
  users: unknown[]
}

const db = new Low(new JSONFile<DatabaseStructure>(join(dirname(fileURLToPath(import.meta.url)), "../db.json")))
await db.read()

/**
 * addRoute function adds a new Route to the database. The ID of the route (if exists) is ignored and a new one is assigned.
 * @param r Route to add to the database.
 * @returns The new ID assigned to the Route provided.
 */
export async function addRoute(r: Route): Promise<string> {
  const id = randomUUID()
  r.id = id
  db.data?.routes.push(r)
  await db.write()
  return id
}

/**
 * getRouteByID fetches the Route with the ID provided.
 * @param id ID of the route to find.
 * @returns The route with the ID provided if exists, or undefined if not.
 */
export function getRouteByID(id: string): Route|undefined {
  const results = db.data?.routes.filter(r => r.id === id)
  if (!results) {
    return undefined
  }
  return results[0]
}
