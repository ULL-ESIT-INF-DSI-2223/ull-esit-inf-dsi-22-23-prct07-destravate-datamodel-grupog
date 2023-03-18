import { ActivityType } from "./activity_type.js";
import { Coordinates } from "./coordinates.js";

export class Route {
  public id: string
  public name: string
  public start: Coordinates
  public end: Coordinates
  public distanceKm: number
  public averageSlope: number
  public userIds: string[]
  public activity: ActivityType
  public averageScore: number

  constructor(id: string, name: string, start: Coordinates, end: Coordinates, distanceKm: number,
      averageSlope: number, userIds: string[], activity: ActivityType, averageScore: number) {
    
    if (name === "") {
      throw new Error("invalid name");
    }
    if (distanceKm < 0 || distanceKm > 41_000 || isNaN(distanceKm)) {
      throw new Error("invalid distance in kilometers");
    }
    if (averageSlope < 0 || averageSlope > 90 || isNaN(averageSlope)) {
      throw new Error("invalid average slope");
    }
    if (averageScore < 0 || averageScore > 10 || isNaN(averageScore)) {
      throw new Error("invalid average score");
    }

    this.id = id
    this.name = name
    this.start = start
    this.end = end
    this.distanceKm = distanceKm
    this.averageSlope = averageSlope
    this.userIds = userIds
    this.activity = activity
    this.averageScore = averageScore
  }
}
