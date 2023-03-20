import Route from "../route/route.js";
import Challenge from "../challenge/challenge.js";

/**
 * DatabaseStructure type represents the structure of the database.
 */
export type DatabaseStructure = {
  challenges: Challenge[];
  groups: unknown[];
  routes: Route[];
  users: unknown[];
};

/**
 * Collection enum enumerates all the collections in the database.
 */
export enum Collection {
  CHALLENGES = "challenges",
  GROUPS = "groups",
  ROUTES = "routes",
  USERS = "users",
}
