import Group from "../group.js"
import Route from "../route/route.js"
import User from "../user.js"

/**
 * DatabaseStructure type represents the structure of the database.
 */
export type DatabaseStructure = {
  challenges: unknown[]
  groups: Group[]
  routes: Route[]
  users: User[]
}

/**
 * Collection enum enumerates all the collections in the database.
 */
export enum Collection {
  CHALLENGES = "challenges",
  GROUPS = "groups",
  ROUTES = "routes",
  USERS = "users",
}
