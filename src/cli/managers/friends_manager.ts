import inquirer from "inquirer";
import Database from "../../db/database.js";
import { users } from "../choices.js";
import SessionManager from "./session_manager.js";

export default class FriendsManager {
  /**
   * Constructor creates a new FriendsManager object from the data provided.
   * @param db
   * @param session
   */
  constructor(private db: Database, private session: SessionManager) {}
  /**
   *
   * This function changes a user's friend list. You can add or remove friends from the potential ones in the database
   */
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
