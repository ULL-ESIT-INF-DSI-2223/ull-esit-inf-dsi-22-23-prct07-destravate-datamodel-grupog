import inquirer from "inquirer";
import Database from "../db/database.js";
import Group from "../group/group.js";
import { Statistics } from "../statistics/statistics.js"
import { compareStringsFirstIgnoringCase } from "../utils/sort_func.js";
import BasePrompter from "./base_prompter.js";
import { activityTypes, routes, users, groups } from "./choices.js";

/**
 * GroupPrompter creates a new Prompter object for the Group. It can manage Group input related to this class.
 */
export default class GroupPrompter extends BasePrompter {
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
      statistics: g.statistics,
      favouriteRoutes: g.favoriteRoutes,
      routeHistory: g.routeHistory
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
        {name: "Estadisticas en Km semanales", value: (a: Group, b: Group) => a.statistics.totalKmWeekly - b.statistics.totalKmWeekly},
        {name: "Estadisticas en elevación semanales", value: (a: Group, b: Group) => a.statistics.totalElevationWeekly - b.statistics.totalElevationWeekly},
        {name: "Estadisticas en Km mensuales", value: (a: Group, b: Group) => a.statistics.totalKmMonthly - b.statistics.totalKmMonthly},
        {name: "Estadisticas en elevación mensuales", value: (a: Group, b: Group) => a.statistics.totalElevationMonthly - b.statistics.totalElevationMonthly},
        {name: "Estadisticas en Km anuales", value: (a: Group, b: Group) => a.statistics.totalKmYearly - b.statistics.totalKmYearly},
        {name: "Estadisticas en elevación anuales", value: (a: Group, b: Group) => a.statistics.totalElevationYearly - b.statistics.totalElevationYearly},
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

    const input = await inquirer.prompt([
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
        name: "routeHistory",
        message: "Indica las rutas que ha terminado el grupo:",
        default: defaults.routeHistory,
        choices: routes(this.db)
      },
      {
        type: "list",
        name: "activity",
        message: "Seleccione el tipo de actividad que vas a realizar:",
        default: defaults.activityType,
        choices: activityTypes()
      }
    ])

    const statistics: Statistics = {
      totalKmWeekly: 0,
      totalKmMonthly: 0,
      totalKmYearly: 0,
      totalElevationWeekly: 0,
      totalElevationMonthly: 0,
      totalElevationYearly: 0,
    };

    return new Group(
      defaults.id,
      input.name,
      input.participants,
      statistics,
      input.favoriteRoutes,
      input.routeHistory,
      input.activity
    )
  }
}