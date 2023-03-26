import { expect } from "chai";
import RouteHistory from "../../src/user/route_history.js";
import User from "../../src/user/user.js"

describe("Route History", () => {
  it("Parse", () => {
    expect(RouteHistory.parse(
      {
        routeId: "1",
        date: "2023-03-26",
        kms: 12,
        averageSlope: 0.35
      }
    )).to.deep.equal({
      routeId: "1",
        date: new Date(1679788800000),
        kms: 12,
        averageSlope: 0.35
    })
  })
})
