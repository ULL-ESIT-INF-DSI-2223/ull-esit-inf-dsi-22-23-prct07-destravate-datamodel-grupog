import Identifiable from "../db/identifiable.js";
import { ActivityType } from "../activity_type.js";
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
    totalKm: number,
    userIds: string[],
    activity: ActivityType
  ) {
    if (name === "") {
      throw new Error("invalid name");
    }
    if (totalKm < 0 || totalKm > 41_000 || isNaN(totalKm)) {
      throw new Error("invalid distance in kilometers");
    }
    let kmSum = 0;
    routes.forEach((route) => {
      kmSum = kmSum + route.distanceKm;
    });
    if (kmSum !== totalKm || isNaN(totalKm)) {
      throw new Error("invalid total distance in kilometers");
    }

    this.id = id;
    this.name = name;
    this.routes = routes;
    this.totalKm = totalKm;
    this.userIds = userIds;
    this.activity = activity;
  }
}
