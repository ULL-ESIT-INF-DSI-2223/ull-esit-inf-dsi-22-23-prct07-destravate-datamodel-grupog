/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { randomUUID } from "crypto";
import Route from "../route/route.js";
import Identifiable from "./identifiable.js";
import { Collection, DatabaseStructure } from "./structure.js";
import Challenge from "../challenge/challenge.js";

/**
 * Database class represents the storage of data of this program.
 */
export default class Database {
  private _db: Low<DatabaseStructure>;

  /**
   * constructor creates a new Database object.
   * @param path Optional route to the Database file. It's relative to this file.
   */
  constructor(path = "../../db.json") {
    this._db = new Low(
      new JSONFile<DatabaseStructure>(
        join(dirname(fileURLToPath(import.meta.url)), path)
      )
    );
  }

  /**
   * load reads the database from disk and loads its content. If it doesn't exist, a new one is initialized.
   */
  async load(): Promise<void> {
    await this._db.read();
    if (!this._db.data) {
      this._db.data = {
        challenges: [],
        groups: [],
        routes: [],
        users: [],
      } as DatabaseStructure;
    }
  }

  //Routes

  /**
   * addRoute adds a new Route to the database. The ID of the Route is ignored and a new one is assigned.
   * @param r Route to add to the collection.
   * @returns The new ID of the Route added.
   */
  async addRoute(r: Route): Promise<string> {
    return this.add(Collection.ROUTES, r);
  }

  /**
   * setRoute sets the Route provided to the matching one (same ID) in the database. If no Route with the same ID exist
   * in the database, a new one is created.
   * @param r Route to add to the collection.
   */
  async setRoute(r: Route): Promise<void> {
    return this.set(Collection.ROUTES, r);
  }

  /**
   * delete deletes the Route with the ID provided from the collection provided. If no Route with matching ID is found,
   * it does not return error.
   * @param r Either the Route to remove, or the ID of the Route to remove.
   */
  async deleteRoute(r: Route | string): Promise<void> {
    if (typeof r !== "string") {
      r = r.id;
    }
    return this.delete(Collection.ROUTES, r);
  }

  /**
   * routes returns the list of routes in the database.
   * @returns The list of routes in the database.
   */
  routes(): Route[] {
    return this._db.data!.routes;
  }

  //Challenge

  /**
   * addChallenge adds a new Challenge to the database. The ID of the Challenge is ignored and a new one is assigned.
   * @param c Challenge to add to the collection.
   * @returns The new ID of the Challenge added.
   */
  async addChallenge(c: Challenge): Promise<string> {
    return this.add(Collection.CHALLENGES, c);
  }

  /**
   * setChallenge sets the Challenge provided to the matching one (same ID) in the database. If no Challenge with the same ID exist
   * in the database, a new one is created.
   * @param c Challenge to add to the collection.
   */
  async setChallenge(c: Challenge): Promise<void> {
    return this.set(Collection.CHALLENGES, c);
  }

  /**
   * delete deletes the Challenge with the ID provided from the collection provided. If no Challenge with matching ID is found,
   * it does not return error.
   * @param c Either the Challenge to remove, or the ID of the Challenge to remove.
   */
  async deleteChallenge(c: Challenge | string): Promise<void> {
    if (typeof c !== "string") {
      c = c.id;
    }
    return this.delete(Collection.CHALLENGES, c);
  }

  /**
   * challenge returns the list of challenges in the database.
   * @returns The list of challenges in the database.
   */
  challenges(): Challenge[] {
    return this._db.data!.challenges;
  }

  //Generic

  /**
   * add method adds a new object to the database. The ID of the object is ignored and a new one is assigned.
   * @param col Collection to add the object to.
   * @param i Object to add to the collection.
   * @returns The new ID of the object added.
   */
  private async add(col: Collection, i: Identifiable): Promise<string> {
    const id = randomUUID();
    i.id = id;
    (this._db.data as any)[col].push(i);
    await this._db.write();
    return id;
  }

  /**
   * set method sets the object provided to the matching one (same ID) in the database. If no object with the same ID
   * exist in the database, a new one is created.
   * @param col Collection to add the object to.
   * @param obj Object to add to the collection.
   */
  private set(col: Collection, obj: Identifiable): Promise<void> {
    const i = (this._db.data as any)[col].findIndex(
      (e: Identifiable) => e.id === obj.id
    ) as number;
    if (i < 0) {
      (this._db.data as any)[col].push(obj);
    } else {
      (this._db.data as any)[col][i] = obj;
    }
    return this._db.write();
  }

  /**
   * delete method deletes the object with the ID provided from the collection provided. If no object with matching ID
   * is found, it does not return error.
   * @param col Collection to remove the object from.
   * @param id ID of the object to remove.
   */
  private delete(col: Collection, id: string): Promise<void> {
    const i = (this._db.data as any)[col].findIndex(
      (e: Identifiable) => e.id === id
    ) as number;
    if (i < 0) {
      return Promise.resolve();
    }
    (this._db.data as any)[col].splice(i, 1);
    return this._db.write();
  }
}
