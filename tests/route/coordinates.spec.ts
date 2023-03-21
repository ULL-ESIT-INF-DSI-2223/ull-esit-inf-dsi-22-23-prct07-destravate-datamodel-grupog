import { expect } from "chai"
import Coordinates from "../../src/route/coordinates.js"

describe("Coordinates", () => {
  it("Constructor", () => {
    // Valid constructor
    expect(() => new Coordinates(1, 2, 3)).not.to.throw()
    // Invalid constructors
    expect(() => new Coordinates(-Infinity, 2, 3)).to.throw("Invalid North-South Coordinate")
    expect(() => new Coordinates(1, 200, 3)).to.throw("Invalid East-West Coordinate")
    expect(() => new Coordinates(1, 2, NaN)).to.throw("Invalid meters over sea level")
  })

  it("parse()", () => {
    expect(Coordinates.parse("1°N 2°E 3m")).to.deep.equal(new Coordinates(1,2,3))
    expect(Coordinates.parse("7°S 23°W 0m")).to.deep.equal(new Coordinates(-7,-23,0))
    expect(() => Coordinates.parse("asdf")).to.throw("invalid coordinates string")
  })

  it("toString()", () => {
    expect(Coordinates.toString(new Coordinates(1,2,3))).to.equal("1°N 2°E 3m")
    expect(Coordinates.toString(new Coordinates(-7,-23,0))).to.equal("7°S 23°W 0m")
  })
})
