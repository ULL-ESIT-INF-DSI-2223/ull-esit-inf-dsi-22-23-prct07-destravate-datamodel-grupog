import Group from "../group/group.js"
import Route from "../route/route.js"
import User from "../user/user.js"
import Challenge from "../challenges/challenges.js";

/**
 * DatabaseStructure type represents the structure of the database.
 */
export type DatabaseStructure = {
  challenges: Challenge[]
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
