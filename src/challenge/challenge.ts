import { getBorderCharacters, table } from "table";
import { ActivityType, activityTypeToString } from "../activity_type.js";
import Route from "../route/route.js";

export default class Challenge {
  public id: string;
  public name: string;
  public routes: Route[];
  public totalKm: number;
  public userIds: string[];
  public activity: ActivityType;

  /**
   * constructor creates a new Challenge object from the data provided.
   * @param id ID of the challenge.
   * @param name Name of the challenge.
   * @param routes List of routes that are part of the challenge
   * @param totalKm Total length of all routes of the challenge.
   * @param userIds List of users that have traveled through the challenge.
   * @param activity Type of activity in this challenge.
   */
  constructor(
    id: string,
    name: string,
    routes: Route[],
    userIds: string[],
    activity: ActivityType
  ) {
    if (name === "") {
      throw new Error("invalid name");
    }

    this.id = id;
    this.name = name;
    this.routes = routes;
    this.totalKm = routes.reduce((acc, r) => acc + r.distanceKm, 0);
    this.userIds = userIds;
    this.activity = activity;
  }

  /**
   * printTable prints a table containing the list of challenges provided.
   * @param list List of challenges to print.
   */
  static printTable(list: Challenge[]): void {
    const tableData = [
      [
        "Identificador",
        "Nombre",
        "Rutas del reto",
        "Longitud total",
        "Usuarios que lo estan haciendo",
        "Tipo de actividad",
      ],
    ] as unknown[][];

    list.forEach((challenge) =>
      tableData.push([
        challenge.id,
        challenge.name,
        challenge.routes.map(route => route.name).reduce((acc, val) => acc + val + "\n", ""),
        `${challenge.totalKm} km`,
        challenge.userIds,
        activityTypeToString(challenge.activity),
      ])
    );

    console.log(
      table(tableData, {
        border: getBorderCharacters("norc"),
        columnDefault: { alignment: "center" },
        drawHorizontalLine: (lineIndex: number, rowCount: number) =>
          lineIndex < 2 || lineIndex === rowCount,
      })
    );
  }
}
