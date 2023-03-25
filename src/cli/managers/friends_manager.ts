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
    let defaults: string[] = [];
    this.db.users().map((user) => {
      if (user.id === uid) {
        defaults = user.friends;
      }
    });
    const input = await inquirer.prompt([
      {
        type: "checkbox",
        name: "friends",
        message: `Selecione los amigos a añadir o eliminar:`,
        default: defaults,
        choices: users(this.db),
      },
    ]);

    const u = this.db.users().find((u) => u.id === uid);
    if (!u) {
      throw new Error(`somehow a non existing user ID (${uid}) was chosen`);
    }
    u.friends = input.friends;

    this.db.setUser(u);
  }
}
