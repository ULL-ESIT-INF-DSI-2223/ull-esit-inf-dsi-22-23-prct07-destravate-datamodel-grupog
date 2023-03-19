import { expect } from "chai"
import { ActivityType } from "../src/activity_type.js"
import Coordinates  from "../src/route/coordinates.js"
import  Route  from "../src/route/route.js"
import Challenge from "../src/challenges/challenges.js"

describe("Challenges", () => {
    const route1 = new Route("123", "Route", new Coordinates(1, 2, 3), new Coordinates(4,5,6), 12, 2, ["a", "b"], ActivityType.RUNNING, 4)
    const route2 = new Route("123", "Route", new Coordinates(1, 2, 3), new Coordinates(4,5,6), 12, 2, ["a", "b"], ActivityType.RUNNING, 4)
  it("Constructor", () => {
    // Valid constructor
    expect(() => new Challenge("123", "Challenge", [route1, route2], ["a", "b"],ActivityType.RUNNING)).not.to.throw()
    // Invalid constructors
    expect(() => new Challenge("123", "", [route1, route2], ["a", "b"],ActivityType.RUNNING)).to.throw("invalid name")
    //expect(() => new Challenge("123", "Challenge", [route1, route2], ["a", "b"],ActivityType.RUNNING)).to.throw("invalid distance in kilometers")
    //expect(() => new Challenge("123", "Challenge", [route1, route2], ["a", "b"],ActivityType.RUNNING)).to.throw("invalid total distance in kilometers")
  })
})
