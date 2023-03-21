import { ActivityType, activityTypeToString } from "./activity_type.js";
import { Statistics } from "./statistics.js";
import { getBorderCharacters, table } from "table";

export default class User {
  public id: string; 
  public name: string;
  public friends: string[];
  public groupFriends: string[]
  public statistics: Statistics;
  public favoriteRoutes: string[];
  public activeChallenges: string[];
  public routeHistory: string[];
  public activity: ActivityType;
  public passwordHash: string;
  public isAdmin: boolean;

  constructor(id: string, name: string, friends: string[], groupFriends: string[], statistics: Statistics, favoriteRoutes: string[], activeChallenges: string[], routeHistory: string[], activity: ActivityType) {
    this.id = id;
    this.name = name;
    this.friends = friends;
    this.groupFriends = groupFriends;
    this.statistics = statistics;
    this.favoriteRoutes = favoriteRoutes;
    this.activeChallenges = activeChallenges;
    this.routeHistory = routeHistory;
    this.activity = activity;
    this.passwordHash = "";
    this.isAdmin = false;
  }

  /**
   * printTable prints a table containing the list of routes provided.
   * @param list List of routes to print.
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
      user.statistics.totalKmWeekly,
      user.statistics.totalKmMonthly,
      user.statistics.totalKmYearly,
      user.statistics.totalElevationWeekly,
      user.statistics.totalElevationMonthly,
      user.statistics.totalElevationYearly,
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