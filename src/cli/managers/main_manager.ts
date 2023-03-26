import inquirer from "inquirer";
import Database from "../../db/database.js";
import { Choice } from "../choices.js";
import AdminManager from "./admin_manager.js";
import GroupManager from "./group_manager.js";
import PrintManager from "./print_manager.js";
import SessionManager from "./session_manager.js";

/**
 * MainManager class "manages" the main manager of the application. Managers offer functionality to the CLI.
 */
export default class MainManager {
  private admin: AdminManager
  private group: GroupManager
  private session: SessionManager
  private print: PrintManager

  /**
   * Creates a new MainManager using the Database provided.
   * @param db Database to use.
   */
  constructor(db: Database) {
    this.session = new SessionManager(db)
    this.admin = new AdminManager(db, this.session)
    this.group = new GroupManager(db, this.session)
    this.print = new PrintManager(db)
  }

  /**
   * Main menu of the program
   */
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
        {name: "Ver Top 3 usuarios Km", value: "printTop3UsersKm"},
        {name: "Ver Top 3 usuarios Elevacion", value: "printTop3UsersSlope"}
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
          this.print.printGroups();
          break;
        case "printRoutes":
          this.print.printRoutes();
          break;
        case "printUsers":
          this.print.printUsers()
          break;
        case "printTop3UsersKm":
          this.print.printTop3UsersKm()
          break;
        case "printTop3UsersSlope":
          this.print.printTop3UsersSlope()
          break;
        default:
          throw new Error(`unexpected operation: ${operation}`);
      }
    }
  }
}
