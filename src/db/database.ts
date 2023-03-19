/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { join, dirname } from "path";
import { fileURLToPath } from "url"
import { randomUUID } from "crypto";
import { Route } from "../route.js";
import Identifiable from "./identifiable.js";
import { Collection, DatabaseStructure } from "./structure.js";

/**
 * Database class represents the storage of data of this program.
 */
export default class Database {
  private _db: Low<DatabaseStructure>

  /**
   * constructor creates a new Database object.
   * @param path Optional route to the Database file. It's relative to this file.
   */
  constructor(path = "../../db.json") {
    this._db = new Low(new JSONFile<DatabaseStructure>(join(dirname(fileURLToPath(import.meta.url)), path)))
  }

  /**
   * load reads the database from disk and loads its content. If it doesn't exist, a new one is initialized.
   */
  async load(): Promise<void> {
    await this._db.read()
    if (!this._db.data) {
      this._db.data = {
        challenges: [],
        groups: [],
        routes: [],
        users: []
      } as DatabaseStructure
    }
  }

  /**
   * addRoute adds a new Route to the database. The ID of the Route is ignored and a new one is assigned.
   * @param col Collection to add the Route to.
   * @param i Route to add to the collection.
   * @returns The new ID of the Route added.
   */
  async addRoute(r: Route): Promise<string> {
    return this.add(Collection.ROUTES, r)
  }

  /**
   * routes returns the list of routes in the database.
   * @returns The list of routes in the database.
   */
  routes(): Route[] {
    return this._db.data!.routes
  }

  /**
   * add method adds a new object to the database. The ID of the object is ignored and a new one is assigned.
   * @param col Collection to add the object to.
   * @param i Object to add to the collection.
   * @returns The new ID of the object added.
   */
  private async add(col: Collection, i: Identifiable): Promise<string> {
    const id = randomUUID()
    i.id = id;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (this._db.data as any)[col].push(i)
    await this._db.write()
    return id
  }
}
