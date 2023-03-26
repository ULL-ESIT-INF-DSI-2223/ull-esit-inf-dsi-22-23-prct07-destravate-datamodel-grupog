import { expect } from "chai"
import { ActivityType } from "../../src/activity_type.js"
import Coordinates  from "../../src/route/coordinates.js"
import  Route  from "../../src/route/route.js"
import Challenge from "../../src/challenge/challenge.js"
import Database from "../../src/db/database.js"

// Init test db
const db = new Database("/../../db_testing4.json");
await db.load()
await db.setRoute(new Route("5a42602c-21bb-42d6-930c-c32c54317a9c", "Barranco de Ruiz", new Coordinates(28.25608023, -16.20676622, 1204), new Coordinates(28.30095618, -16.28478967, 1720), 15.56, 25, [], ActivityType.BICYCLE, 5))
await db.setRoute(new Route("80ba8d14-057e-4c5d-abb7-92346bc4722c", "Paisaje Lunar de Vilaflor", new Coordinates(28.30936985, -16.17865267, 1194), new Coordinates(28.46924575, -16.63499774, 2444), 20.6, 25, [], ActivityType.BICYCLE, 3))

describe("Challenges", () => {
    const route1 = new Route("123", "Pico del Inglés", new Coordinates(1, 2, 3), new Coordinates(4,5,6), 12, 2, ["a", "b"], ActivityType.RUNNING, 4)
    const route2 = new Route("321", "Erjos a Las Portelas", new Coordinates(1, 2, 3), new Coordinates(4,5,6), 12, 2, ["a", "b"], ActivityType.RUNNING, 4)
    const reto1 = new Challenge("123", "Reto1", [route2, route1], ["a", "b"],ActivityType.RUNNING)
    const reto2 = new Challenge("123", "Reto2", [route1, route2], ["a", "b"],ActivityType.RUNNING)
  it("Constructor", () => {
    // Valid constructor
    expect(() => new Challenge("123", "Challenge", [route1, route2], ["a", "b"],ActivityType.RUNNING)).not.to.throw()
    // Invalid constructors
    expect(() => new Challenge("123", "", [route1, route2], ["a", "b"],ActivityType.RUNNING)).to.throw("invalid name")

  })

  it("Parse function", () => {
    expect(Challenge.parse(
      {
        id: "123",
        name: "Reto2",
        routes: [
          "5a42602c-21bb-42d6-930c-c32c54317a9c",
          "80ba8d14-057e-4c5d-abb7-92346bc4722c",
        ],
        userIds: ["a", "b"],
        activity: 0,
      },
      db
    )).to.deep.equal({
      id: '123',
      name: 'Reto2',
      routes: [
        {
          id: '5a42602c-21bb-42d6-930c-c32c54317a9c',
          name: 'Barranco de Ruiz',
          "start": {
            "latitude": 28.25608023,
            "longitude": -16.20676622,
            "mosl": 1204
          },
          "end": {
            "latitude": 28.30095618,
            "longitude": -16.28478967,
            "mosl": 1720
          },
          distanceKm: 15.56,
          averageSlope: 25,
          userIds: [],
          activity: 1,
          averageScore: 5
        },
        {
          id: '80ba8d14-057e-4c5d-abb7-92346bc4722c',
          name: 'Paisaje Lunar de Vilaflor',
          "start": {
            "latitude": 28.30936985,
            "longitude": -16.17865267,
            "mosl": 1194
          },
          "end": {
            "latitude": 28.46924575,
            "longitude": -16.63499774,
            "mosl": 2444
          },
          distanceKm: 20.6,
          averageSlope: 25,
          userIds: [],
          activity: 1,
          averageScore: 3
        }
      ],
      totalKm: 36.160000000000004,
      userIds: [ 'a', 'b' ],
      activity: 0
    })
    expect(Challenge.parse(
      {
        id: "321",
        name: "Reto1",
        routes: [
          "80ba8d14-057e-4c5d-abb7-92346bc4722c",
          "5a42602c-21bb-42d6-930c-c32c54317a9c",
        ],
        userIds: ["a", "b"],
        activity: 0,
      },
      db
    )).to.eql({
      id: '321',
      name: 'Reto1',
      routes: [
        {
          id: '80ba8d14-057e-4c5d-abb7-92346bc4722c',
          name: 'Paisaje Lunar de Vilaflor',
          "start": {
            "latitude": 28.30936985,
            "longitude": -16.17865267,
            "mosl": 1194
          },
          "end": {
            "latitude": 28.46924575,
            "longitude": -16.63499774,
            "mosl": 2444
          },
          distanceKm: 20.6,
          averageSlope: 25,
          userIds: [],
          activity: 1,
          averageScore: 3
        },
        {
          id: '5a42602c-21bb-42d6-930c-c32c54317a9c',
          name: 'Barranco de Ruiz',
          "start": {
            "latitude": 28.25608023,
            "longitude": -16.20676622,
            "mosl": 1204
          },
          "end": {
            "latitude": 28.30095618,
            "longitude": -16.28478967,
            "mosl": 1720
          },
          distanceKm: 15.56,
          averageSlope: 25,
          userIds: [],
          activity: 1,
          averageScore: 5
        }
      ],
      totalKm: 36.160000000000004,
      userIds: [ 'a', 'b' ],
      activity: 0
    })
  })

  it("toJSON()", () => {
    expect(reto1.toJSON()).to.deep.equal({
      id: '123',
      name: 'Reto1',
      routes: [ '321', '123' ],
      userIds: [ 'a', 'b' ],
      activity: 0
    })
    expect(reto2.toJSON()).to.deep.equal({
      id: '123',
      name: 'Reto2',
      routes: [ '123', '321' ],
      userIds: [ 'a', 'b' ],
      activity: 0
    })
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
