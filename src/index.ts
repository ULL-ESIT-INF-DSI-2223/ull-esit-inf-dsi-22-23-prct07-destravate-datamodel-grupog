import Database from "./db/database.js";

const db = new Database()
await db.load()
