import AdminManager from "./cli/managers/admin_manager.js";
import MainManager from "./cli/managers/main_manager.js";
import SessionManager from "./cli/managers/session_manager.js";
import UserPrompter from "./cli/user_prompter.js";
import Database from "./db/database.js";

const db = new Database();
await db.load();

const x = new SessionManager(db)
new AdminManager(db, x).main()


