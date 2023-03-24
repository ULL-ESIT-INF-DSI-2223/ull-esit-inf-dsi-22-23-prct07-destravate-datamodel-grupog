import { expect } from "chai"
import { ActivityType } from "../../src/activity_type.js"
import Coordinates  from "../../src/route/coordinates.js"
import  Route  from "../../src/route/route.js"
import Challenge from "../../src/challenge/challenge.js"

describe("Challenges", () => {
    const route1 = new Route("123", "Pico del Inglés", new Coordinates(1, 2, 3), new Coordinates(4,5,6), 12, 2, ["a", "b"], ActivityType.RUNNING, 4)
    const route2 = new Route("123", "Erjos a Las Portelas", new Coordinates(1, 2, 3), new Coordinates(4,5,6), 12, 2, ["a", "b"], ActivityType.RUNNING, 4)
  it("Constructor", () => {
    // Valid constructor
    expect(() => new Challenge("123", "Challenge", [route1, route2], ["a", "b"],ActivityType.RUNNING)).not.to.throw()
    // Invalid constructors
    expect(() => new Challenge("123", "", [route1, route2], ["a", "b"],ActivityType.RUNNING)).to.throw("invalid name")
    //expect(() => new Challenge("123", "Challenge", [route1, route2], ["a", "b"],ActivityType.RUNNING)).to.throw("invalid distance in kilometers")
    //expect(() => new Challenge("123", "Challenge", [route1, route2], ["a", "b"],ActivityType.RUNNING)).to.throw("invalid total distance in kilometers")
  })

  it("printTable()", () => {
    // Mock logger
    let out = ""
    const defaultLogger = console.log
    console.log = (str: string) => out = str

    Challenge.printTable([
      new Challenge(
        "fd549425-1869-4397-87f0-4a11b99dffbc",
        "Reto 1",
        [route1, route2],
        ["user1", "user2"],
        ActivityType.RUNNING
      ),
      new Challenge(
        "f3ee5f7a-a8b3-470d-bd90-d4c3824a8a86",
        "Reto 2",
        [route1, route2],
        ["user3", "user4"],
        ActivityType.RUNNING
      ),
      new Challenge(
        "fd549425-1869-4397-87f0-4a11b99dffbc",
        "Reto 3",
        [route2, route1],
        ["user5", "user6"],
        ActivityType.RUNNING
      )
    ])

    // Restore logger
    console.log = defaultLogger

    expect(out).to.equal(`┌──────────────────────────────────────┬────────┬──────────────────────┬────────────────┬────────────────────────────────┬───────────────────┐
│            Identificador             │ Nombre │    Rutas del reto    │ Longitud total │ Usuarios que lo estan haciendo │ Tipo de actividad │
├──────────────────────────────────────┼────────┼──────────────────────┼────────────────┼────────────────────────────────┼───────────────────┤
│ fd549425-1869-4397-87f0-4a11b99dffbc │ Reto 1 │   Pico del Inglés    │     24 km      │          user1,user2           │      Correr       │
│                                      │        │ Erjos a Las Portelas │                │                                │                   │
│                                      │        │                      │                │                                │                   │
│ f3ee5f7a-a8b3-470d-bd90-d4c3824a8a86 │ Reto 2 │   Pico del Inglés    │     24 km      │          user3,user4           │      Correr       │
│                                      │        │ Erjos a Las Portelas │                │                                │                   │
│                                      │        │                      │                │                                │                   │
│ fd549425-1869-4397-87f0-4a11b99dffbc │ Reto 3 │ Erjos a Las Portelas │     24 km      │          user5,user6           │      Correr       │
│                                      │        │   Pico del Inglés    │                │                                │                   │
│                                      │        │                      │                │                                │                   │
└──────────────────────────────────────┴────────┴──────────────────────┴────────────────┴────────────────────────────────┴───────────────────┘
`)
  })
})
