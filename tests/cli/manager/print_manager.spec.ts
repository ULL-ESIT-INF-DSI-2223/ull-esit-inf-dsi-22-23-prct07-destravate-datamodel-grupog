import { expect } from "chai";
import PrintManager from "../../../src/cli/managers/print_manager.js"
import User from "../../../src/user/user.js";
import RouteHistoryGroup from "../../../src/group/route_history_group.js";
import Group from "../../../src/group/group.js";
import Database from "../../../src/db/database.js";
import Route from "../../../src/route/route.js";
import Coordinates from "../../../src/route/coordinates.js";

const testUser1 = new User("juanjo12", "juan jose", ["juanjo12"], ["grupo12"], [], [], [], 0, "", false);
const testUser2 = new User("ale12", "alejandro", ["juanjo12"], ["grupo12"], [], [], [], 0, "", false);
const testUser3 = new User("lucas12", "lucas", ["juanjo12"], ["grupo12"], [], [], [], 0, "", false);
const testUser4 = new User("miguel12", "miguel", ["juanjo12"], ["grupo12"], [], [], [], 0, "", false);

const route1 = new Route( "fd549425-1869-4397-87f0-4a11b99dffbc", "Pico del Inglés", new Coordinates(28.10682524, -16.4397382, 1114), new Coordinates(28.28137333, -16.58673462, 2058), 9.17, 15, [], 1, 9);
const route2 = new Route("f3ee5f7a-a8b3-470d-bd90-d4c3824a8a86", "Cruz del Carmen a Punta del Hidalgo", new Coordinates(-28.10682524, 16.4397382, 1114), new Coordinates(-28.28137333, 16.58673462, -205), 20.59, 38, [], 1, 4);

const routeHistory1 = new RouteHistoryGroup("1", new Date(2023, 2, 25), 12, 0.35, ["juanjo12", "ale12", "lucas12", "miguel12"])
const routeHistory2 = new RouteHistoryGroup("2", new Date(2023, 2, 26), 10, 0.40, ["juanjo12", "ale12", "lucas12", "miguel12"])
const routeHistory3 = new RouteHistoryGroup("3", new Date(2023, 2, 1), 21, 0.5, ["juanjo12", "ale12", "lucas12"])
const routeHistory4 = new RouteHistoryGroup("4", new Date(2023, 2, 2), 15, 0.5, ["juanjo12", "ale12", "lucas12"])
const routeHistory5 = new RouteHistoryGroup("5", new Date(2022, 11, 15), 40, 0.40, ["juanjo12", "ale12"])
const routeHistory6 = new RouteHistoryGroup("6", new Date(2022, 11, 12), 10, 0.23, ["juanjo12"])

const group12 = new Group("g12", "grupo12", ["juanjo12", "ale12", "lucas12", "miguel12"], [], [routeHistory1, routeHistory2, routeHistory3, routeHistory4, routeHistory5, routeHistory6], "juanjo12", 0);
const group11 = new Group("g11", "grupo12", ["juanjo12", "miguel12"], [], [routeHistory1, routeHistory2], "miguel12", 0);

const database = new Database("/../../db_testing3.json");
database.load();


const manager = new PrintManager(database);

describe ("PrintManager", () => {
  it ("Constructor", () => {
    expect(() => new PrintManager(database)).not.to.throw()
  });

  it ("printGroups", () => {
    database.setGroup(group12);
    database.setGroup(group11);
    // Mock logger
    let out = "";
    const defaultLogger = console.log
    console.log = (str: string) => out = str
    
    manager.printGroups()

    // Restore logger
    console.log = defaultLogger

    expect(out).to.equal(`┌───────────────┬─────────┬─────────────────────────────────┬─────────────────┬────────────────────┬──────────┬───────────┐
│ Identificador │ Nombre  │          Participantes          │ Rutas Favoritas │ Historial de rutas │ Creador  │ Actividad │
├───────────────┼─────────┼─────────────────────────────────┼─────────────────┼────────────────────┼──────────┼───────────┤
│      g12      │ grupo12 │ juanjo12,ale12,lucas12,miguel12 │                 │    1,2,3,4,5,6     │ juanjo12 │  Correr   │
│      g11      │ grupo12 │        juanjo12,miguel12        │                 │        1,2         │ miguel12 │  Correr   │
└───────────────┴─────────┴─────────────────────────────────┴─────────────────┴────────────────────┴──────────┴───────────┘
`)
  });

  it ("printRoutes", () => {
    database.setRoute(route1);
    database.setRoute(route2);

    // Mock logger
    let out = "";
    const defaultLogger = console.log
    console.log = (str: string) => out = str
    
    manager.printRoutes()

    // Restore logger
    console.log = defaultLogger

    expect(out).to.equal(`┌──────────────────────────────────────┬─────────────────────────────────────┬──────────────────────────────────┬───────────────────────────────────┬──────────┬───────────────────┬───────────────────────────┬───────────────────┬──────────────────┐
│            Identificador             │               Nombre                │         Punto de inicio          │       Punto de finalización       │ Longitud │ Inclinación media │ Usuarios que la han hecho │ Tipo de actividad │ Puntuación media │
├──────────────────────────────────────┼─────────────────────────────────────┼──────────────────────────────────┼───────────────────────────────────┼──────────┼───────────────────┼───────────────────────────┼───────────────────┼──────────────────┤
│ fd549425-1869-4397-87f0-4a11b99dffbc │           Pico del Inglés           │ 28.10682524°N 16.4397382°W 1114m │ 28.28137333°N 16.58673462°W 2058m │ 9.17 km  │        15°        │                           │     Ciclismo      │       9/10       │
│ f3ee5f7a-a8b3-470d-bd90-d4c3824a8a86 │ Cruz del Carmen a Punta del Hidalgo │ 28.10682524°S 16.4397382°E 1114m │ 28.28137333°S 16.58673462°E -205m │ 20.59 km │        38°        │                           │     Ciclismo      │       4/10       │
└──────────────────────────────────────┴─────────────────────────────────────┴──────────────────────────────────┴───────────────────────────────────┴──────────┴───────────────────┴───────────────────────────┴───────────────────┴──────────────────┘
`)
  });

  it ("printUsers", () => {
    database.setUser(testUser1);
    database.setUser(testUser2);
    database.setUser(testUser3);
    database.setUser(testUser4);
    // Mock logger
    let out = "";
    const defaultLogger = console.log
    console.log = (str: string) => out = str
    
    manager.printUsers()

    // Restore logger
    console.log = defaultLogger

    expect(out).to.equal(`┌───────────────┬───────────┬──────────┬──────────────────┬─────────────────┬───────────────┬────────────────────┬───────────┐
│ Identificador │  Nombre   │  Amigos  │ Grupos de Amigos │ Rutas Favoritas │ Retos activos │ Historial de rutas │ Actividad │
├───────────────┼───────────┼──────────┼──────────────────┼─────────────────┼───────────────┼────────────────────┼───────────┤
│   juanjo12    │ juan jose │ juanjo12 │     grupo12      │                 │               │                    │  Correr   │
│     ale12     │ alejandro │ juanjo12 │     grupo12      │                 │               │                    │  Correr   │
│    lucas12    │   lucas   │ juanjo12 │     grupo12      │                 │               │                    │  Correr   │
│   miguel12    │  miguel   │ juanjo12 │     grupo12      │                 │               │                    │  Correr   │
└───────────────┴───────────┴──────────┴──────────────────┴─────────────────┴───────────────┴────────────────────┴───────────┘
`)
  })

  it ("printTop3UsersKm", () => {
    // Mock logger
    let out = "";
    const defaultLogger = console.log
    console.log = (str: string) => out = str
    
    manager.printTop3UsersKm()

    // Restore logger
    console.log = defaultLogger

    expect(out).to.equal(`┌─────────┬──────────┬──────────┬──────────┐
│  Grupo  │ Numero 1 │ Numero 2 │ Numero 3 │
├─────────┼──────────┼──────────┼──────────┤
│ grupo12 │ juanjo12 │  ale12   │ lucas12  │
└─────────┴──────────┴──────────┴──────────┘
`)
  }),

  it ("printTop3UsersSlope", () => {
    // Mock logger
    let out = "";
    const defaultLogger = console.log
    console.log = (str: string) => out = str
    
    manager.printTop3UsersKm()

    // Restore logger
    console.log = defaultLogger

    expect(out).to.equal(`┌─────────┬──────────┬──────────┬──────────┐
│  Grupo  │ Numero 1 │ Numero 2 │ Numero 3 │
├─────────┼──────────┼──────────┼──────────┤
│ grupo12 │ juanjo12 │  ale12   │ lucas12  │
└─────────┴──────────┴──────────┴──────────┘
`)
  })
});