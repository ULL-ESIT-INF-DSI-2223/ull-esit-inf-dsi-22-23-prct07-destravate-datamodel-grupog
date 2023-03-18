import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { join, dirname } from "path";
import { fileURLToPath } from "url"
import { randomUUID } from "crypto";
import { Route } from "./route.js";

type DatabaseStructure = {
  challenges: unknown[]
  groups: unknown[]
  routes: Route[]
  users: unknown[]
}

const db = new Low(new JSONFile<DatabaseStructure>(join(dirname(fileURLToPath(import.meta.url)), "../db.json")))
await db.read()

export async function addRoute(r: Route) {
  r.id = randomUUID()
  db.data?.routes.push(r)
  await db.write()
}

export function getRouteByID(id: string): Route|undefined {
  const results = db.data?.routes.filter(r => r.id === id)
  if (!results) {
    return undefined
  }
  return results[0]
}
