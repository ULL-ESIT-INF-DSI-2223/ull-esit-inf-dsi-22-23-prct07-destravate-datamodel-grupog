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
    userIds: string[],
    activity: ActivityType
  ) {
    if (name === "") {
      throw new Error("invalid name");
    }

    let kmSum = 0;
    routes.forEach((route) => {
      kmSum = kmSum + route.distanceKm;
    });

    this.id = id;
    this.name = name;
    this.routes = routes;
    this.totalKm = kmSum;
    this.userIds = userIds;
    this.activity = activity;
  }
}
