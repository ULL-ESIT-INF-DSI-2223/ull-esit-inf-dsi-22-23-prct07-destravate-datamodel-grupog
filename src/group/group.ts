import { ActivityType, activityTypeToString } from "../activity_type.js";
import { getBorderCharacters, table } from "table";
import { GroupData } from "./group_data.js";
import RouteHistoryGroup from "./route_history_group.js";


/**
 * Class to represente a Group
 */
export default class Group {
  public id: string;
  public name: string;
  public participants: string[];
  public favoriteRoutes: string[];
  public routeHistory: RouteHistoryGroup[];
  public createdBy: string;
  public activity: ActivityType;

  /**
   * Constructor of the object Group
   * @param id 
   * @param name 
   * @param participants 
   * @param favoriteRoutes 
   * @param routeHistory 
   * @param createdBy 
   * @param activity 
   */
  constructor(id: string, name: string, participants: string[], favoriteRoutes: string[], routeHistory: RouteHistoryGroup[], createdBy: string, activity: ActivityType) { 
    this.id = id;
    this.name = name;
    this.participants = participants;
    this.favoriteRoutes = favoriteRoutes;
    this.routeHistory = routeHistory;
    this.createdBy = "";
    this.activity = activity;
  }

  /**
   * Static method to parse the data from the db
   * @param data 
   * @returns 
   */
  static parse(data: GroupData): Group {
    return new Group(
      data.id,
      data.name,
      data.participants,
      data.favoriteRoutes,
      data.routeHistory,
      data.createdBy,
      data.activity
    )
  }

  /**
   * Function that returns the number of Km accumulated on a week by all the group
   */
  weeklyGroupKmStatistics(): number {
    const todaysDate: Date = new Date();
    const oneWeekLess = new Date();
    oneWeekLess.setDate(todaysDate.getDate() - 7);
    let statistics = 0;
    this.routeHistory.forEach((route) => {
      if (route.date >= oneWeekLess) {
        statistics += route.kms;
      }
    })
    return statistics
  }

  /**
   * Function that returns the amount of slope accumulated on a week by all the group
   */
  weeklyGroupSlopeStatistics(): number {
    const todaysDate: Date = new Date();
    const oneWeekLess = new Date();
    oneWeekLess.setDate(todaysDate.getDate() - 7);
    let statistics = 0;
    this.routeHistory.forEach((route) => {
      if (route.date >= oneWeekLess) {
        statistics += route.averageSlope;
      }
    })
    return statistics
  }

  /**
   * Function that returns the number of Km accumulated on a month by all the group
   */
  monthlyGroupKmStatistics(): number {
    const todaysDate: Date = new Date();
    const oneWeekLess = new Date();
    oneWeekLess.setDate(todaysDate.getDate() - 30);
    let statistics = 0;
    this.routeHistory.forEach((route) => {
      if (route.date >= oneWeekLess) {
        statistics += route.kms;
      }
    })
    return statistics
  }

  /**
   * Function that returns the amount of slope accumulated on a month by all the group
   */
  monthlyGroupSlopeStatistics(): number {
    const todaysDate: Date = new Date();
    const oneWeekLess = new Date();
    oneWeekLess.setDate(todaysDate.getDate() - 30);
    let statistics = 0;
    this.routeHistory.forEach((route) => {
      if (route.date >= oneWeekLess) {
        statistics += route.averageSlope;
      }
    })
    return statistics
  }

  /**
   * Function that returns the number of Km accumulated on a year by all the group
   */
  yearlyGroupKmStatistics(): number {
    const todaysDate: Date = new Date();
    const oneWeekLess = new Date();
    oneWeekLess.setDate(todaysDate.getDate() - 365);
    let statistics = 0;
    this.routeHistory.forEach((route) => {
      if (route.date >= oneWeekLess) {
        statistics += route.kms;
      }
    })
    return statistics
  }

  /**
   * Function that returns the amount of slope accumulated on a year by all the group
   */
  yearlyGroupSlopeStatistics(): number {
    const todaysDate: Date = new Date();
    const oneWeekLess = new Date();
    oneWeekLess.setDate(todaysDate.getDate() - 365);
    let statistics = 0;
    this.routeHistory.forEach((route) => {
      if (route.date >= oneWeekLess) {
        statistics += route.averageSlope;
      }
    })
    return statistics
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
      // group.statistics.totalKmWeekly,
      // group.statistics.totalKmMonthly,
      // group.statistics.totalKmYearly,
      // group.statistics.totalElevationWeekly,
      // group.statistics.totalElevationMonthly,
      // group.statistics.totalElevationYearly,
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