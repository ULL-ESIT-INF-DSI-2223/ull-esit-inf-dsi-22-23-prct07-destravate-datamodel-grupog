import { ActivityType, activityTypeToString } from "../activity_type.js";
import { getBorderCharacters, table } from "table";
import RouteHistory from "./route_history.js";
import { UserData } from "./user_data.js";

export default class User {
  public id: string; 
  public name: string;
  public friends: string[];
  public groupFriends: string[]
  public favoriteRoutes: string[];
  public activeChallenges: string[];
  public routeHistory: RouteHistory[];
  public activity: ActivityType;
  public passwordHash: string;
  public isAdmin: boolean;

  constructor(id: string, name: string, friends: string[], groupFriends: string[], favoriteRoutes: string[], activeChallenges: string[], routeHistory: RouteHistory[], activity: ActivityType, passwordHash: string, isAdmin: boolean) {
    this.id = id;
    this.name = name;
    this.friends = friends;
    this.groupFriends = groupFriends;
    this.favoriteRoutes = favoriteRoutes;
    this.activeChallenges = activeChallenges;
    this.routeHistory = routeHistory;
    this.activity = activity;
    this.passwordHash = passwordHash;
    this.isAdmin = isAdmin;
  }

  static parse(data: UserData): User {
    return new User(
      data.id,
      data.name,
      data.friends,
      data.groupFriends,
      data.favoriteRoutes,
      data.activeChallenges,
      data.routeHistory.map(data => RouteHistory.parse(data)),
      data.activity,
      data.passwordHash,
      data.isAdmin
    )
  }

  /**
   * printTable prints a table containing the list of users provided.
   * @param list List of users to print.
   */
  static printTable(list: User[]): void {
    const tableData = [[
      "Identificador",
      "Nombre",
      "Amigos",
      "Grupos de Amigos",
      "Total Km Semanales",
      "Total Km Mensuales",
      "Total Km Anuales",
      "Total de Elevacion semanal",
      "Total de Elevacion mensual",
      "Total de Elevacion anual",
      "Rutas Favoritas",
      "Retos activos",
      "Historial de rutas",
      "Actividad",
    ]] as unknown[][]

    list.forEach(user => tableData.push([
      user.id,
      user.name,
      user.friends.map((friend) => friend),
      user.groupFriends.map((group) => group),
      user.favoriteRoutes.map((route) => route),
      user.activeChallenges.map((challenge) => challenge),
      user.routeHistory.map((route) => route),
      activityTypeToString(user.activity),
    ]))

    console.log(table(tableData, {
      border: getBorderCharacters("norc"),
      columnDefault: {alignment: "center"},
      drawHorizontalLine: (lineIndex: number, rowCount: number) => lineIndex < 2 || lineIndex === rowCount
    }))
  }
}