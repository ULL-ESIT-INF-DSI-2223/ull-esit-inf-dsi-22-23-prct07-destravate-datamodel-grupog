import inquirer from "inquirer";
import Database from "../../db/database.js";
import Group from "../../group/group.js"
import { activityTypes, groups, routes, users } from "../choices.js";
import { promptForRouteHistoryGroup } from "../route_history_helper.js";
import SessionManager from "./session_manager.js";

export default class GroupManager {
  constructor(private db: Database, private session: SessionManager) {}

  async create(): Promise<void> {
    const uid = this.session.currentUserID()
    if (!uid) {
      return
    }

    const input = await inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: "Defina el nombre del grupo:",
        validate: (input: string) => input !== "" ? true : "El nombre del grupo no puede estar vacío"
      },
      {
        type: "checkbox",
        name: "participants",
        message: "Indique los participantes del grupo: ",
        choices: users(this.db)
      },
      {
        type: "checkbox",
        name: "favoriteRoutes",
        message: "Indique las rutas favoritas del grupo:",
        choices: routes(this.db)
      },
      {
        type: "checkbox",
        name: "routeIDs",
        message: "Indica las rutas que ha terminado el grupo:",
        choices: routes(this.db)
      },
      {
        type: "list",
        name: "activity",
        message: "Seleccione el tipo de actividad que va a realizar el grupo:",
        choices: activityTypes()
      }
    ] as unknown[]);

    this.db.addGroup(new Group(
      "",
      input.name,
      input.participants,
      input.favoriteRoutes,
      await promptForRouteHistoryGroup(this.db, input.routeIDs),
      uid,
      input.activity
    ));
  }

  async delete(): Promise<void> {
    const uid = this.session.currentUserID()
    if (!uid) {
      return
    }
    const { groupIDs } = await inquirer.prompt([{
      type: "checkbox",
      name: "groupIDs",
      message: "Seleccione los grupos que desea borrar:",
      choices: groups(this.db, uid)
    }])
    for (const gid of groupIDs) {
      await this.db.deleteGroup(gid)
    }
  }

  async join(): Promise<void> {
    const uid = this.session.currentUserID()
    if (!uid) {
      return
    }
    const { groupIDs } = await inquirer.prompt([{
      type: "checkbox",
      name: "groupIDs",
      message: "Seleccione los grupos a los que desea estar unido:",
      default: this.db.groups().filter(group => group.participants.includes(uid)).map(group => group.id),
      choices: groups(this.db, uid)
    }])
    for (const gid of groupIDs) {
      const g = this.db.groups().find(group => group.id === gid)
      if (!g) {
        throw new Error(`somehow a non existing group ID (${gid}) was chosen`);
      }
      if (g.participants.includes(uid)) {
        continue
      }
      g.participants.push(uid)
      await this.db.setGroup(g)
    }
  }
}
