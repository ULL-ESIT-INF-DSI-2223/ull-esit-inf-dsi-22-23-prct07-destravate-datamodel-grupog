import { expect } from "chai"
import { ActivityType } from "../../src/activity_type.js"
import Coordinates from "../../src/route/coordinates.js"
import Route from "../../src/route/route.js"

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

  it("printTable()", () => {
    // Mock logger
    let out = ""
    const defaultLogger = console.log
    console.log = (str: string) => out = str

    Route.printTable([
      new Route(
        "fd549425-1869-4397-87f0-4a11b99dffbc",
        "Pico del Inglés",
        new Coordinates(28.10682524, -16.4397382, 1114),
        new Coordinates(28.28137333, -16.58673462, 2058),
        9.17,
        15,
        [],
        1,
        9
      ),
      new Route(
        "f3ee5f7a-a8b3-470d-bd90-d4c3824a8a86",
        "Cruz del Carmen a Punta del Hidalgo",
        new Coordinates(-28.10682524, 16.4397382, 1114),
        new Coordinates(-28.28137333, 16.58673462, -205),
        20.59,
        38,
        [],
        1,
        4
      ),
      new Route(
        "fd549425-1869-4397-87f0-4a11b99dffbc",
        "Erjos a Las Portelas",
        new Coordinates(0, -180, -100),
        new Coordinates(-90, 0, 0),
        7.69,
        -32,
        [],
        0,
        1
      )
    ])

    // Restore logger
    console.log = defaultLogger

    expect(out).to.equal(`┌──────────────────────────────────────┬─────────────────────────────────────┬──────────────────────────────────┬───────────────────────────────────┬──────────┬───────────────────┬───────────────────────────┬───────────────────┬──────────────────┐
│            Identificador             │               Nombre                │         Punto de inicio          │       Punto de finalización       │ Longitud │ Inclinación media │ Usuarios que la han hecho │ Tipo de actividad │ Puntuación media │
├──────────────────────────────────────┼─────────────────────────────────────┼──────────────────────────────────┼───────────────────────────────────┼──────────┼───────────────────┼───────────────────────────┼───────────────────┼──────────────────┤
│ fd549425-1869-4397-87f0-4a11b99dffbc │           Pico del Inglés           │ 28.10682524°N 16.4397382°W 1114m │ 28.28137333°N 16.58673462°W 2058m │ 9.17 km  │        15°        │                           │     Ciclismo      │       9/10       │
│ f3ee5f7a-a8b3-470d-bd90-d4c3824a8a86 │ Cruz del Carmen a Punta del Hidalgo │ 28.10682524°S 16.4397382°E 1114m │ 28.28137333°S 16.58673462°E -205m │ 20.59 km │        38°        │                           │     Ciclismo      │       4/10       │
│ fd549425-1869-4397-87f0-4a11b99dffbc │        Erjos a Las Portelas         │         0°N 180°W -100m          │            90°S 0°E 0m            │ 7.69 km  │       -32°        │                           │      Correr       │       1/10       │
└──────────────────────────────────────┴─────────────────────────────────────┴──────────────────────────────────┴───────────────────────────────────┴──────────┴───────────────────┴───────────────────────────┴───────────────────┴──────────────────┘
`)
  })
})
