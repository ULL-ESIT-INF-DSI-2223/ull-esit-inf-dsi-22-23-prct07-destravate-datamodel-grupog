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
    this.createdBy = createdBy;
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
    const todaysDate = new Date();
    const oneWeekLess = new Date();
    oneWeekLess.setDate(todaysDate.getDate() - 7);
    return this.routeHistory.reduce((acc, route) => acc + (route.date >= oneWeekLess ? route.kms : 0), 0)
  }

  /**
   * Function that returns the amount of slope accumulated on a week by all the group
   */
  weeklyGroupSlopeStatistics(): number {
    const todaysDate = new Date();
    const oneWeekLess = new Date();
    oneWeekLess.setDate(todaysDate.getDate() - 7);
    return this.routeHistory.reduce((acc, route) => acc + (route.date >= oneWeekLess ? route.averageSlope : 0), 0)
  }

  /**
   * Function that returns the number of Km accumulated on a month by all the group
   */
  monthlyGroupKmStatistics(): number {
    const todaysDate: Date = new Date();
    const oneMonthLess = new Date();
    oneMonthLess.setDate(todaysDate.getDate() - 30);
    return this.routeHistory.reduce((acc, route) => acc + (route.date >= oneMonthLess ? route.kms : 0), 0)
  }

  /**
   * Function that returns the amount of slope accumulated on a month by all the group
   */
  monthlyGroupSlopeStatistics(): number {
    const todaysDate: Date = new Date();
    const oneMonthLess = new Date();
    oneMonthLess.setDate(todaysDate.getDate() - 30);
    return this.routeHistory.reduce((acc, route) => acc + (route.date >= oneMonthLess ? route.averageSlope : 0), 0)
  }

  /**
   * Function that returns the number of Km accumulated on a year by all the group
   */
  yearlyGroupKmStatistics(): number {
    const todaysDate: Date = new Date();
    const oneYearLess = new Date();
    oneYearLess.setDate(todaysDate.getDate() - 365);
    return this.routeHistory.reduce((acc, route) => acc + (route.date >= oneYearLess ? route.kms : 0), 0)
  }

  /**
   * Function that returns the amount of slope accumulated on a year by all the group
   */
  yearlyGroupSlopeStatistics(): number {
    const todaysDate: Date = new Date();
    const oneYearLess = new Date();
    oneYearLess.setDate(todaysDate.getDate() - 365);
    return this.routeHistory.reduce((acc, route) => acc + (route.date >= oneYearLess ? route.averageSlope : 0), 0)
  }

  /**
   * Funcion that return the TOP 3 users from a group using the kms accumulated
   */
  top3UsersByAccDistance(): string[] {
    return this.top3UsersByField("kms")
  }

  /**
   * Funcion that return the TOP 3 users from a group using the slope accumulated
   */
  top3UsersByAccSlope(): string[] {
    return this.top3UsersByField("averageSlope")
  }

  /**
   * Generic function made to get the TOP 3 users using a field that can be:
   *  - kms
   *  - averageSlope
   * @param field 
   * @returns 
   */
  top3UsersByField(field: string): string[] {
    return Array.from(this.routeHistory.reduce((acc, val) => {
      val.participants.forEach(userID => {
        let userAcc = acc.get(userID);
        if (!userAcc) {
          userAcc = 0
        }
        acc.set(userID, userAcc + (val as never)[field]);
      });
      return acc
    }, new Map<string, number>())).sort((a, b) => a[1] - b[1]).slice(0, 3).map(x => x[0]);
  }

  /**
   * printTable prints a table containing the list of groups provided.
   * @param list List of groups to print.
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
      group.weeklyGroupKmStatistics(),
      group.weeklyGroupSlopeStatistics(),
      group.monthlyGroupKmStatistics(),
      group.monthlyGroupSlopeStatistics(),
      group.yearlyGroupKmStatistics(),
      group.yearlyGroupSlopeStatistics(),
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

  /**
   * printTableLessInfo is a method that prints a new table only with basic information
   * of the groups that are provided
   * @param list List of groups to print.
   */
  static printTableLessInfo(list: Group[]): void {
    const tableData = [[
      "Identificador",
      "Nombre",
      "Participantes",
      "Rutas Favoritas",
      "Historial de rutas",
      "Creador",
      "Actividad",
    ]] as unknown[][]
  
    list.forEach(group => tableData.push([
      group.id,
      group.name,
      group.participants.map((participant) => participant),
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
