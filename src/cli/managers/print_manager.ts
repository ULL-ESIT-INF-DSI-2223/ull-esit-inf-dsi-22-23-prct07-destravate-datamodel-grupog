import Database from "../../db/database.js";
import Group from "../../group/group.js"
import SessionManager from "./session_manager.js";
import Route from "../../route/route.js";
import User from "../../user/user.js";
import { getBorderCharacters, table } from "table";

export default class PrintManager {
  constructor(private db: Database, private session: SessionManager) {}

  printGroups() {
    const groups = this.db.groups().slice();
    Group.printTableLessInfo(groups);
  }

  printRoutes() {
    const routes = this.db.routes().slice();
    Route.printTable(routes);
  }

  printUsers() {
    const users = this.db.users().slice();
    User.printTableLessInfo(users);
  }

  printTop3UsersKm() {
    const groups = this.db.groups().slice();
    groups.forEach((group) => {
      const topUsers = group.top3UsersByAccDistance();
      const tableData = [[
        "Grupo",
        "Numero 1",
        "Numero 2",
        "Numero 3"
      ]] as unknown[][]

      tableData.push([
        group.name,
        topUsers[0],
        topUsers[1],
        topUsers[2]
      ])

      console.log(table(tableData, {
        border: getBorderCharacters("norc"),
        columnDefault: {alignment: "center"},
        drawHorizontalLine: (lineIndex: number, rowCount: number) => lineIndex < 2 || lineIndex === rowCount
      }))
    })
  }

  printTop3UsersSlope() {
    const groups = this.db.groups().slice();
    groups.forEach((group) => {
      const topUsers = group.top3UsersByAccSlope();
      const tableData = [[
        "Grupo",
        "Numero 1",
        "Numero 2",
        "Numero 3"
      ]] as unknown[][]

      tableData.push([
        group.name,
        topUsers[0],
        topUsers[1],
        topUsers[2]
      ])

      console.log(table(tableData, {
        border: getBorderCharacters("norc"),
        columnDefault: {alignment: "center"},
        drawHorizontalLine: (lineIndex: number, rowCount: number) => lineIndex < 2 || lineIndex === rowCount
      }))
    })
  }
}