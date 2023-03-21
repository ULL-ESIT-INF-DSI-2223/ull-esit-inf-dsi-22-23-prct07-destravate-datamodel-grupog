import Group from "../group/group.js"
import Route from "../route/route.js"
import Challenge from "../challenges/challenges.js";
import { UserData } from "../user/user_data.js";

/**
 * DatabaseStructure type represents the structure of the database.
 */
export type DatabaseStructure = {
  challenges: Challenge[]
  groups: Group[]
  routes: Route[]
  users: UserData[]
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
