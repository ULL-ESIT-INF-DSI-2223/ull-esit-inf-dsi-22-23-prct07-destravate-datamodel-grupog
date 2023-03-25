import inquirer from "inquirer";
import Database from "../../db/database.js";
import { users } from "../choices.js";
import SessionManager from "./session_manager.js";

export default class FriendsManager {
  constructor(private db: Database, private session: SessionManager) {}
  async edit(): Promise<void> {
    const uid = this.session.currentUserID();
    if (!uid) {
      return;
    }

    const question = await inquirer.prompt([
      {
        type: "checkbox",
        name: "friends",
        message: `Selecione los amigos a añadir o eliminar:`,
        choices: users(this.db),
      },
    ]);

    const input = await inquirer.prompt(question);
  }
}
