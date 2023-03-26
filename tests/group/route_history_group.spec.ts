import { expect } from "chai";
import RouteHistoryGroup from "../../src/group/route_history_group.js";
import User from "../../src/user/user.js"

describe("Route History Group", () => {
  it("Parse", () => {
    expect(RouteHistoryGroup.parse(
      {
        routeId: "1",
        date: "2023-03-26",
        kms: 12,
        averageSlope: 0.35,
        participants: ["juanjo12", "miguel12"]
      }
    )).to.deep.equal({
      routeId: "1",
        date: new Date(1679788800000),
        kms: 12,
        averageSlope: 0.35,
        participants: ["juanjo12", "miguel12"]
    })
  })
})