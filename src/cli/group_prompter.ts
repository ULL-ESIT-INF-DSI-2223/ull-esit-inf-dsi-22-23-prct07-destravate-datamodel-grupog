import inquirer from "inquirer";
import Database from "../db/database.js";
import Group from "../group/group.js";
import { compareStringsFirstIgnoringCase } from "../utils/sort_func.js";
import Prompter from "./prompter.js";
import { activityTypes, routes, users, groups } from "./choices.js";
import RouteHistoryGroup from "../group/route_history_group.js";

/**
 * GroupPrompter creates a new Prompter object for the Group. It can manage Group input related to this class.
 */
export default class GroupPrompter extends Prompter {
  /**
   * constructor creates a new prompter using the Database provided.
   * @param db Database for querying during prompts.
   */
  constructor(db: Database) {
    super(db)
  }

  /**
   * add creates a new Group from the Group inputs and adds it to the database.
   */
  async add(): Promise<void> {
    await this.db.addGroup(await this.dataPrompt())
  }

  /**
   * delete removes multiple Groups from the database based on the user input.
   */
  async delete(): Promise<void> {
    (await inquirer.prompt([{
      type: "checkbox",
      name: "groups",
      message: "Seleccione los grupos que desea borrar:",
      choices: groups(this.db)
    }])).groups.forEach(async (id: string) => await this.db.deleteGroup(id));
  }

  /**
   * edit modifies a Group from the database based on the user input.
   */
  async edit(): Promise<void> {
    const { groupID } = (await inquirer.prompt([{
      type: "list",
      name: "groupID",
      message: "Seleccione el grupo a editar:",
      choices: groups(this.db)
    }]))

    const g = this.db.groups().find(g => g.id === groupID)
    if (!g) {
      throw new Error(`somehow a non existing ID (${groupID}) was chosen`);
    }

    await this.db.setGroup(await this.dataPrompt({
      id: g.id,
      name: g.name,
      participants: g.participants,
      favouriteRoutes: g.favoriteRoutes,
      routeHistory: g.routeHistory,
      createdBy: g.createdBy,
      activity: g.activity
    }))
  }

  /**
   * print shows the list of groups contained in the database, sorted by the criteria defined by the user.
   */
  async print(): Promise<void> {
    // Let user select sort function
    const { sortFunc } = await inquirer.prompt([{
      type: "list",
      name: "sortFunc",
      message: "¿Desea aplicar un criterio de ordenación?",
      choices: [
        {name: "No", value: undefined},
        {name: "Nombre del grupo", value: (a: Group, b: Group) => compareStringsFirstIgnoringCase(a.name, b.name)},
        {name: "Estadisticas en Km semanales", value: (a: Group, b: Group) => a.weeklyGroupKmStatistics() - b.weeklyGroupKmStatistics()},
        {name: "Estadisticas en elevación semanales", value: (a: Group, b: Group) => a.weeklyGroupSlopeStatistics() - b.weeklyGroupSlopeStatistics()},
        {name: "Estadisticas en Km mensuales", value: (a: Group, b: Group) => a.monthlyGroupKmStatistics() - b.monthlyGroupKmStatistics()},
        {name: "Estadisticas en elevación mensuales", value: (a: Group, b: Group) => a.monthlyGroupSlopeStatistics() - b.monthlyGroupSlopeStatistics()},
        {name: "Estadisticas en Km anuales", value: (a: Group, b: Group) => a.yearlyGroupKmStatistics() - b.yearlyGroupKmStatistics()},
        {name: "Estadisticas en elevación anuales", value: (a: Group, b: Group) => a.yearlyGroupSlopeStatistics() - b.yearlyGroupSlopeStatistics()},
        {name: "Creador", value: (a: Group, b: Group) => compareStringsFirstIgnoringCase(a.createdBy, b.createdBy)},
      ]
    }])
    
    // Do shallow copy to avoid modifying DB while still being performant
    const groups = this.db.groups().slice()

    if (sortFunc) {
      // Apply sort function and ask if want reverse order
      groups.sort(sortFunc)
      if ((await inquirer.prompt([{
        type: "list",
        name: "reverse",
        message: "¿En qué sentido?",
        choices: [
          {name: "Ascendente", value: false},
          {name: "Descendente", value: true},
        ]
      }])).reverse) {
        groups.reverse()
      }
    }

    // Print
    Group.printTable(groups)

    // Pause
    await inquirer.prompt([{
      type: "input",
      name: ".",
      message: "Pulse Enter para continuar..."
    }])
  }

  /**
   * dataPrompt prompts the user for a Group's data, using the defaults values if provided.
   * @param defaults Default values for each field.
   * @returns A new group created from the user input.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private async dataPrompt(defaults?: any): Promise<Group> {
    if (!defaults) {
      defaults = {id: ""}
    }

    const usersWithSystem = users(this.db)
    usersWithSystem.push({name: "Sistema", value: ""})

    const questions = [
    // const input = await inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: "Defina el nombre del grupo:",
        default: defaults.name,
        validate: (input: string) => input !== "" ? true : "El nombre del grupo no puede estar vacío"
      },
      {
        type: "checkbox",
        name: "participants",
        message: "Indique los participantes del grupo: ",
        default: defaults.userIds,
        choices: users(this.db)
      },
      {
        type: "checkbox",
        name: "favoriteRoutes",
        message: "Indique sus rutas favoritas:",
        default: defaults.favoriteRoutes,
        choices: routes(this.db)
      },
      {
        type: "checkbox",
        name: "routeIDs",
        message: "Indica las rutas que ha terminado el grupo:",
        default: defaults.routeHistory?.map((rh: RouteHistoryGroup) => rh.routeId),
        choices: routes(this.db)
      },
      {
        type: "list",
        name: "createdBy",
        message: "Indica el creador del grupo:",
        default: defaults.createdBy,
        choices: usersWithSystem
      },
      {
        type: "list",
        name: "activity",
        message: "Seleccione el tipo de actividad que vas a realizar:",
        default: defaults.activityType,
        choices: activityTypes()
      }
    ] as unknown[]

    const input = await inquirer.prompt(questions)

    input.routeHistory = await Promise.all(input.routeIDs.map(async (routeID: string) => {
      const originalDate = {
        year: undefined as (number|undefined),
        month: undefined as (number|undefined),
        day: undefined as (number|undefined)
      }
      
      const originalRouteHistory = input.routeHistory?.find((rh: RouteHistoryGroup) => rh.routeId === routeID)
      if (originalRouteHistory) {
        originalDate.year = originalRouteHistory.date.getFullYear()
        originalDate.month = originalRouteHistory.date.getMonth() + 1
        originalDate.day = originalRouteHistory.date.getDate()
      }

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const route = this.db.routes().find(r => r.id === routeID)!;
      const {y, m, d} = await inquirer.prompt([
        {
          type: "number",
          name: "y",
          message: `Indique el año en el que ha realizado la ruta ${route.name}:`,
          default: originalDate.year,
          validate: (y: number) => y >= 1979 && y <= new Date().getFullYear() ? true : "El año debe estar entre 1970 y el actual"
        },
        {
          type: "number",
          name: "m",
          message: `Indique (con número) el mes en el que ha realizado la ruta ${route.name}:`,
          default: originalDate.month,
          validate: (m: number) => m >= 1 && m <= 12 ? true : "Mes inválido"
        },
        {
          type: "number",
          name: "d",
          message: `Indique el día del mes en el que ha realizado la ruta ${route.name}:`,
          default: originalDate.day,
          validate: (d: number) => d >= 1 && d <= 31 ? true : "Día del mes inválido"
        }
      ])

      const participants: string[] = await inquirer.prompt([
        {
          type: "checkbox",
          name: "participants",
          message: `Indique los usuarios que han participado en la ruta ${route.name}:`,
          default: defaults.participants,
          choices: users(this.db)
        }
      ])
      return new RouteHistoryGroup(routeID, new Date(y, m-1, d, 0, 0, 0, 0), route.distanceKm, route.averageSlope, participants)
    }))

    return new Group(
      defaults.id,
      input.name,
      input.participants,
      input.favoriteRoutes,
      input.routeHistory,
      input.createdBy,
      input.activity
    )
  }
}
