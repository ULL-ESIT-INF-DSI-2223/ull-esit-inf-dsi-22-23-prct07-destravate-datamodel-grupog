/**
 * Coordinates class represents geographic coordinates.
 */
export class Coordinates {
  private degreesNorth: number
  private degreesEast: number
  private metersOverSeaLevel: number

  /**
   * constructor creates a new Coordinates object from the data provided.
   * @param degreesNorth Degrees to the north of the equator. If negative, to the south.
   * @param degreesEast Degrees to the east of the prime meridian. If negative, to the west.
   * @param metersOverSeaLevel Meters over sea level.
   */
  constructor(degreesNorth: number, degreesEast: number, metersOverSeaLevel: number) {
    if (degreesNorth > 90 || degreesNorth < -90 || isNaN(degreesNorth)) {
      throw new Error("Invalid North-South Coordinate");
    }
    if (degreesEast > 180 || degreesEast < -180 || isNaN(degreesEast)) {
      throw new Error("Invalid East-West Coordinate");
    }
    if (metersOverSeaLevel > 10_000 || metersOverSeaLevel < 0 || isNaN(metersOverSeaLevel)) {
      throw new Error("Invalid meters over sea level");
    }
    this.degreesEast = degreesEast
    this.degreesNorth = degreesNorth
    this.metersOverSeaLevel = metersOverSeaLevel
  }

  /**
   * parse function creates a new Coordinates object from the coordinates contained in the string provided.
   * @param s String containing coordinates.
   * @returns A new Coordinates object from the coordinates contained in the string.
   */
  static parse(s: string): Coordinates {
    const m = /^([\d.]+)°([NS]) ([\d.]+)°([EW]) (\d+)m$/.exec(s)
    if (!m) {
      throw new Error("invalid coordinates string");
    }
    return new Coordinates(
      Number(m[1]) * (m[2] === "N" ? 1 : -1),
      Number(m[3]) * (m[4] === "E" ? 1 : -1),
      Number(m[5]))
  }

  /**
   * toString returns a string representation of this Coordinates object.
   * @returns A string containing this coordinates.
   */
  toString(): string {
    return `${Math.abs(this.degreesNorth)}°${this.degreesNorth >= 0 ? "N" : "S"} ${Math.abs(this.degreesEast)}°${this.degreesEast >= 0 ? "E" : "W"} ${this.metersOverSeaLevel}m`
  }
}
