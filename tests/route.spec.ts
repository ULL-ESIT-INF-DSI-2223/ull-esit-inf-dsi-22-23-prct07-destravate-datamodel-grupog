import { expect } from "chai"
import { ActivityType } from "../src/activity_type.js"
import Coordinates from "../src/route/coordinates.js"
import Route from "../src/route/route.js"

describe("Route", () => {
  it("Constructor", () => {
    // Valid constructor
    expect(() => new Route("123", "Route", new Coordinates(1, 2, 3), new Coordinates(4,5,6), 12, 2, ["a", "b"], ActivityType.RUNNING, 4)).not.to.throw()
    // Invalid constructors
    expect(() => new Route("123", "", new Coordinates(1, 2, 3), new Coordinates(4,5,6), 12, 2, ["a", "b"], ActivityType.RUNNING, 4)).to.throw("invalid name")
    expect(() => new Route("123", "Route", new Coordinates(1, 2, 3), new Coordinates(4,5,6), Infinity, 2, ["a", "b"], ActivityType.RUNNING, 4)).to.throw("invalid distance in kilometers")
    expect(() => new Route("123", "Route", new Coordinates(1, 2, 3), new Coordinates(4,5,6), 12, -91, ["a", "b"], ActivityType.RUNNING, 4)).to.throw("invalid average slope")
    expect(() => new Route("123", "Route", new Coordinates(1, 2, 3), new Coordinates(4,5,6), 12, 2, ["a", "b"], ActivityType.RUNNING, NaN)).to.throw("invalid average score")
  })
})
