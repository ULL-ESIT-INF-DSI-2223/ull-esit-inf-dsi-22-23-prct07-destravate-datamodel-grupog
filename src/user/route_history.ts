export default class RouteHistory {
  public routeId: string;
  public date: Date;
  public kms: number;
  public averageSlope: number;

  constructor(routeId: string, date: Date, kms: number, averageSlope: number) {
    this.routeId = routeId;
    this.date = date;
    this.kms = kms;
    this.averageSlope = averageSlope;
  }

  static parse(data: RouteHistoryData): RouteHistory {
    return new RouteHistory(
      data.routeId,
      new Date(data.date),
      data.kms,
      data.averageSlope
    )
  }
}

export interface RouteHistoryData {
  routeId: string
  date: string
  kms: number
  averageSlope: number
}
