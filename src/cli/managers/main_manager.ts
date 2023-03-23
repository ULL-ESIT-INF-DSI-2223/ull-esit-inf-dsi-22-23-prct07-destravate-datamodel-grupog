import inquirer from "inquirer";
import Database from "../../db/database.js";
import { Choice } from "../choices.js";
import AdminManager from "./admin_manager.js";
import GroupManager from "./group_manager.js";
import SessionManager from "./session_manager.js";

export default class MainManager {
  private admin: AdminManager
  private group: GroupManager
  private session: SessionManager

  constructor(db: Database) {
    this.session = new SessionManager(db)
    this.admin = new AdminManager(db, this.session)
    this.group = new GroupManager(db, this.session)
  }

  async main(): Promise<void> {
    for (;;) {
      await this.session.checkSession()

      const choices: Choice<string>[] = [
        {name: "Borrar grupos", value: "deleteGroups"},
        {name: "Cerrar sesión", value: "logout"},
        {name: "Crear un grupo", value: "createGroup"},
        {name: "Editar amigos", value: "editFriends"},
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
        case "admin":
          await this.admin.main();
          break;
        case "createGroup":
          await this.group.create();
          break;
        case "deleteGroups":
          await this.group.delete();
          break;
        case "editFriends":
          throw new Error("TODO: not implemented");
          break;
        case "exit":
          return;
        case "joinGroup":
          await this.group.join();
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
