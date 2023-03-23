import inquirer from "inquirer";
import Database from "../../db/database.js";
import { Choice } from "../choices.js";
import AdminManager from "./admin_manager.js";
import SessionManager from "./session_manager.js";

export default class MainManager {
  private admin: AdminManager
  private session: SessionManager

  constructor(db: Database) {
    this.session = new SessionManager(db)
    this.admin = new AdminManager(db, this.session)
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

      const { operation } = await inquirer.prompt([{
        type: "list",
        name: "operation",
        message: "Menú principal",
        choices
      }])
      switch (operation) {
        case "addFriends":
          throw new Error("TODO: not implemented");
          break;
        case "admin":
          this.admin.main();
          break;
        case "createGroup":
          throw new Error("TODO: not implemented");
          break;
        case "deleteFriends":
          throw new Error("TODO: not implemented");
          break;
        case "deleteGroups":
          throw new Error("TODO: not implemented");
          break;
        case "exit":
          return;
        case "joinGroup":
          throw new Error("TODO: not implemented");
          break;
        case "logout":
          this.session.logout();
          break;
        case "printGroups":
          throw new Error("TODO: not implemented");
          break;
        case "printRoutes":
          throw new Error("TODO: not implemented");
          break;
        case "printUsers":
          throw new Error("TODO: not implemented");
          break;
        default:
          throw new Error(`unexpected operation: ${operation}`);
      }
    }
  }
}
