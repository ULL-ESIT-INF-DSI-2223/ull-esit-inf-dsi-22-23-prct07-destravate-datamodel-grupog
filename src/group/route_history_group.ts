/**
 * Class to represent the information of a route it contains:
 *  - The ID of the route
 *  - The date in which it was done
 *  - The kms of the route
 *  - The average slope of the route
 *  - The users that participated on the route
 */
export default class RouteHistoryGroup {
  public routeId: string;
  public date: Date;
  public kms: number;
  public averageSlope: number;
  public participants: string[];

  /**
   * Constructor of the object RouteHistoryGroup
   * @param routeId 
   * @param date 
   * @param kms 
   * @param averageSlope 
   * @param participants 
   */
  constructor(routeId: string, date: Date, kms: number, averageSlope: number, participants: string[]) {
    this.routeId = routeId;
    this.date = date;
    this.kms = kms;
    this.averageSlope = averageSlope;
    this.participants = participants;
  }
  
  /**
   * Static method to parse information
   * @param data 
   * @returns 
   */
  static parse(data: RouteHistoryGroupData): RouteHistoryGroup {
    return new RouteHistoryGroup(
      data.routeId,
      new Date(data.date),
      data.kms,
      data.averageSlope,
      data.participants
    )
  }
}

/**
 * Interface made to known the data of a route that will be read from the db
 */
export interface RouteHistoryGroupData {
  routeId: string
  date: string
  kms: number
  averageSlope: number
  participants: string[]
}