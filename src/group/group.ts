import { ActivityType, activityTypeToString } from "../activity_type.js";
import { Statistics } from "../statistics/statistics.js";
import { getBorderCharacters, table } from "table";

export default class Group {
  public id: string;
  public name: string;
  public participants: string[];
  public statistics: Statistics;
  public favoriteRoutes: string[];
  public routeHistory: string[];
  public createdBy: string;
  public activity: ActivityType;

  constructor(id: string, name: string, participants: string[], statistics: Statistics, favoriteRoutes: string[], routeHistory: string[], activity: ActivityType) { 
    this.id = id;
    this.name = name;
    this.participants = participants;
    this.statistics = statistics
    this.favoriteRoutes = favoriteRoutes;
    this.routeHistory = routeHistory;
    this.createdBy = "";
    this.activity = activity;
  }

  /**
   * printTable prints a table containing the list of routes provided.
   * @param list List of routes to print.
   */
  static printTable(list: Group[]): void {
    const tableData = [[
      "Identificador",
      "Nombre",
      "Participantes",
      "Total Km Semanales",
      "Total Km Mensuales",
      "Total Km Anuales",
      "Total de Elevacion semanal",
      "Total de Elevacion mensual",
      "Total de Elevacion anual",
      "Rutas Favoritas",
      "Historial de rutas",
      "Creador",
      "Actividad",
    ]] as unknown[][]
  
    list.forEach(group => tableData.push([
      group.id,
      group.name,
      group.participants.map((participant) => participant),
      group.statistics.totalKmWeekly,
      group.statistics.totalKmMonthly,
      group.statistics.totalKmYearly,
      group.statistics.totalElevationWeekly,
      group.statistics.totalElevationMonthly,
      group.statistics.totalElevationYearly,
      group.favoriteRoutes.map((route) => route),
      group.routeHistory.map((route) => route),
      group.createdBy,
      activityTypeToString(group.activity),
    ]))

    console.log(table(tableData, {
      border: getBorderCharacters("norc"),
      columnDefault: {alignment: "center"},
      drawHorizontalLine: (lineIndex: number, rowCount: number) => lineIndex < 2 || lineIndex === rowCount
    }))
  }
}