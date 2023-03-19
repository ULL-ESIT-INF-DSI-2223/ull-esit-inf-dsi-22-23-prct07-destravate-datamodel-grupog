/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { join, dirname } from "path";
import { fileURLToPath } from "url"
import { randomUUID } from "crypto";
import { Route } from "../route.js";
import { Identifiable } from "./identifiable.js";
import { Collection, DatabaseStructure } from "./structure.js";

export class Database {
  private _db: Low<DatabaseStructure>

  constructor(path = "../../db.json") {
    this._db = new Low(new JSONFile<DatabaseStructure>(join(dirname(fileURLToPath(import.meta.url)), path)))
  }

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

  async add(col: Collection, i: Identifiable): Promise<string> {
    const id = randomUUID()
    i.id = id;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (this._db.data as any)[col].push(i)
    await this._db.write()
    return id
  }

  routes(): Route[] {
    return this._db.data!.routes
  }
}
