import { ActivityType, activityTypeToString } from "../activity_type.js";
import { getBorderCharacters, table } from "table";
import RouteHistory from "./route_history.js";
import { UserData } from "./user_data.js";

/**
 * Class to represente a User
 */
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

  /**
   * Constructor of the object User
   * @param id 
   * @param name 
   * @param friends 
   * @param groupFriends 
   * @param favoriteRoutes 
   * @param activeChallenges 
   * @param routeHistory 
   * @param activity 
   * @param passwordHash 
   * @param isAdmin 
   */
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

  /**
   * Function to parse the data from the database
   * @param data 
   * @returns 
   */
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
   * Function that returns the number of Km accumulated on a week by a user
   */
  weeklyKmStatistics(): number {
    const todaysDate: Date = new Date();
    const oneWeekLess = new Date();
    oneWeekLess.setDate(todaysDate.getDate() - 7);
    return this.routeHistory.reduce((acc, route) => acc + (route.date >= oneWeekLess ? route.kms : 0), 0)
  }

  /**
   * Function that returns the amount of slope accumulated on a week by a user
   */
  weeklySlopeStatistics(): number {
    const todaysDate: Date = new Date();
    const oneWeekLess = new Date();
    oneWeekLess.setDate(todaysDate.getDate() - 7);
    return this.routeHistory.reduce((acc, route) => acc + (route.date >= oneWeekLess ? route.averageSlope : 0), 0)
  }

  /**
   * Function that returns the number of Km accumulated on a month by a user
   */
  monthlyKmStatistics(): number {
    const todaysDate: Date = new Date();
    const oneMonthLess = new Date();
    oneMonthLess.setDate(todaysDate.getDate() - 30);
    return this.routeHistory.reduce((acc, route) => acc + (route.date >= oneMonthLess ? route.kms : 0), 0)
  }

  /**
   * Function that returns the amount of slope accumulated on a month by a user
   */
  monthlySlopeStatistics(): number {
    const todaysDate: Date = new Date();
    const oneMonthLess = new Date();
    oneMonthLess.setDate(todaysDate.getDate() - 30);
    return this.routeHistory.reduce((acc, route) => acc + (route.date >= oneMonthLess ? route.averageSlope : 0), 0)
  }

  /**
   * Function that returns the number of Km accumulated on a year by a user
   */
  yearlyKmStatistics(): number {
    const todaysDate: Date = new Date();
    const oneYearLess = new Date();
    oneYearLess.setDate(todaysDate.getDate() - 365);
    return this.routeHistory.reduce((acc, route) => acc + (route.date >= oneYearLess ? route.kms : 0), 0)
  }

  /**
   * Function that returns the amount of slope accumulated on a year by a user
   */
  yearlySlopeStatistics(): number {
    const todaysDate: Date = new Date();
    const oneYearLess = new Date();
    oneYearLess.setDate(todaysDate.getDate() - 365);
    return this.routeHistory.reduce((acc, route) => acc + (route.date >= oneYearLess ? route.averageSlope : 0), 0)
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
      "Km Semanales",
      "Elevacion Semanal",
      "Km Mensuales",
      "Elevacion Mensual",
      "Km Anuales",
      "Elevacion Anual",
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
      user.weeklyKmStatistics(),
      user.weeklySlopeStatistics(),
      user.monthlyKmStatistics(),
      user.monthlySlopeStatistics(),
      user.yearlyKmStatistics(),
      user.yearlySlopeStatistics(),
      user.favoriteRoutes.map((route) => route),
      user.activeChallenges.map((challenge) => challenge),
      user.routeHistory.map((route) => route.routeId),
      activityTypeToString(user.activity),
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
   * @param list List of users to print.
   */
  static printTableLessInfo(list: User[]): void {
    const tableData = [[
      "Identificador",
      "Nombre",
      "Amigos",
      "Grupos de Amigos",
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
      user.routeHistory.map((route) => route.routeId),
      activityTypeToString(user.activity),
    ]))

    console.log(table(tableData, {
      border: getBorderCharacters("norc"),
      columnDefault: {alignment: "center"},
      drawHorizontalLine: (lineIndex: number, rowCount: number) => lineIndex < 2 || lineIndex === rowCount
    }))
  }
}