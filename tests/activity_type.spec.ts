import { expect } from "chai"
import { ActivityType, activityTypeToString } from "../src/activity_type.js"

describe("ActivityType", () => {
  it("activityTypeToString()", () => {
    expect(activityTypeToString(ActivityType.BICYCLE)).to.equal("Ciclismo")
    expect(activityTypeToString(ActivityType.RUNNING)).to.equal("Correr")
  })
})
