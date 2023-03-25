import ChallengePrompter from "./cli/challenge_prompter.js";
import Database from "./db/database.js";

const db = new Database();
await db.load();

new ChallengePrompter(db).add();
