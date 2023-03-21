import UserPrompter from "./cli/user_prompter.js";
import GroupPrompter from "./cli/group_prompter.js";
import Database from "./db/database.js";

const db = new Database()
await db.load()

new UserPrompter(db).delete()