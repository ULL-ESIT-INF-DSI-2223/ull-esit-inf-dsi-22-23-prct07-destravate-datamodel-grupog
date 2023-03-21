import inquirer from "inquirer";
import Database from "../../db/database.js";
import { Choice } from "../choices.js";
import SessionManager from "./session_manager.js";

export default class MainManager {
  private db: Database
  private session: SessionManager

  constructor(db: Database) {
    this.db = db
    this.session = new SessionManager(db)
  }

  async main(): Promise<void> {
    for (let exit = false; !exit;) {
      await this.session.checkSession()

      const choices: Choice<string>[] = [
        {name: "Añadir amigos", value: "addFriends"},
        {name: "Borrar amigos", value: "deleteFriends"},
        {name: "Borrar grupos", value: "deleteGroups"},
        {name: "Cerrar sesión", value: "logout"},
        {name: "Crear un grupo", value: "createGroup"},
        {name: "Salir del programa", value: "exit"},
        {name: "Unirse a un grupo", value: "joinGroup"},
        {name: "Ver todas las rutas", value: "printRoutes"},
        {name: "Ver todos los grupos", value: "printGroups"},
        {name: "Ver todos los usuarios", value: "printUsers"},
      ]
      if (this.session.isAdmin()) {
        choices.push({name: "Administración", value: "admin"})
      }

      const { callable } = await inquirer.prompt([{
        type: "list",
        name: "callable",
        message: "Menú principal",
        choices
      }])
      if (callable === "exit") return;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await ((this as any)[callable]())
    }
  }

  protected async addFriends(): Promise<void> {
    throw new Error("TODO not implemented");
  }
  protected async deleteFriends(): Promise<void> {
    throw new Error("TODO not implemented");
  }
  protected async deleteGroups(): Promise<void> {
    throw new Error("TODO not implemented");
  }

  protected logout(): void {
    this.session.logout()
  }

  protected async createGroup(): Promise<void> {
    throw new Error("TODO not implemented");
  }
  protected async joinGroup(): Promise<void> {
    throw new Error("TODO not implemented");
  }
  protected async printRoutes(): Promise<void> {
    throw new Error("TODO not implemented");
  }
  protected async printGroups(): Promise<void> {
    throw new Error("TODO not implemented");
  }
  protected async printUsers(): Promise<void> {
    throw new Error("TODO not implemented");
  }
  protected async admin(): Promise<void> {
    throw new Error("TODO not implemented");
  }
}
