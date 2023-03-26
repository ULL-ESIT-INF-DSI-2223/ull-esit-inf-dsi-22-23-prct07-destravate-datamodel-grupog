import { expect } from "chai";
import RouuteHistoryGroup from "../../src/group/route_history_group.js"
import RouteHistory from "../../src/user/route_history.js";
import User from "../../src/user/user.js"
import Group from "../../src/group/group.js";
import RouteHistoryGroup from "../../src/group/route_history_group.js";

const testUser1 = new User("juanjo12", "juan jose", ["juanjo12"], ["grupo12"], [], [], [], 0, "", false);
const testUser2 = new User("ale12", "alejandro", ["juanjo12"], ["grupo12"], [], [], [], 0, "", false);
const testUser3 = new User("lucas12", "lucas", ["juanjo12"], ["grupo12"], [], [], [], 0, "", false);
const testUser4 = new User("miguel12", "miguel", ["juanjo12"], ["grupo12"], [], [], [], 0, "", false);


const routeHistory1 = new RouteHistoryGroup("1", new Date(2023, 2, 25), 12, 0.35, ["juanjo12", "ale12", "lucas12", "miguel12"])
const routeHistory2 = new RouteHistoryGroup("2", new Date(2023, 2, 26), 10, 0.40, ["juanjo12", "ale12", "lucas12", "miguel12"])
const routeHistory3 = new RouteHistoryGroup("3", new Date(2023, 2, 1), 21, 0.5, ["juanjo12", "ale12", "lucas12"])
const routeHistory4 = new RouteHistoryGroup("4", new Date(2023, 2, 2), 15, 0.5, ["juanjo12", "ale12", "lucas12"])
const routeHistory5 = new RouteHistoryGroup("5", new Date(2022, 11, 15), 40, 0.40, ["juanjo12", "ale12"])
const routeHistory6 = new RouteHistoryGroup("6", new Date(2022, 11, 12), 10, 0.23, ["juanjo12"])

const group12 = new Group("g12", "grupo12", ["juanjo12", "ale12", "lucas12", "miguel12"], [], [routeHistory1, routeHistory2, routeHistory3, routeHistory4, routeHistory5, routeHistory6], "juanjo12", 0);

describe("Group", () => {
  it ("Constructor", () => {
    expect(() => new Group("g12", "grupo12", ["juanjo12", "ale12", "lucas12", "miguel12"], [], [], "juanjo12", 0)).not.to.throw()
  });

  it("Parse function", () => {
    expect(Group.parse(
      {
        id: 'g12',
        name: 'grupo12',
        participants: [ 'juanjo12', 'ale12', 'lucas12', 'miguel12' ],
        favoriteRoutes: [],
        routeHistory: [],
        createdBy: 'juanjo12',
        activity: 0
      }
    )).to.deep.equal(
      {
        id: 'g12',
        name: 'grupo12',
        participants: [ 'juanjo12', 'ale12', 'lucas12', 'miguel12' ],
        favoriteRoutes: [],
        routeHistory: [],
        createdBy: 'juanjo12',
        activity: 0
      }
    )
  })

  it ("Getting weekly statistis km", () => {
    expect(group12.weeklyGroupKmStatistics()).to.be.eql(22)
  });
  
  it ("Getting weekly statistis slope", () => {
    expect(group12.weeklyGroupSlopeStatistics()).to.be.eql(0.75)
  });

  it ("Getting monthly statistis km", () => {
    expect(group12.monthlyGroupKmStatistics()).to.be.eql(58)
  });
  
  it ("Getting monthly statistis slope", () => {
    expect(group12.monthlyGroupSlopeStatistics()).to.be.eql(1.75)
  });

  it ("Getting yearly statistis km", () => {
    expect(group12.yearlyGroupKmStatistics()).to.be.eql(108)
  });
  
  it ("Getting yearly statistis slope", () => {
    expect(group12.yearlyGroupSlopeStatistics()).to.be.eql(2.38)
  });

  it("Top 3 user Km", () => {
    expect(group12.top3UsersByAccDistance()).to.be.eql([ 'juanjo12', 'ale12', 'lucas12' ])
  });

  it("Top 3 user slope", () => {
    expect(group12.top3UsersByAccSlope()).to.be.eql([ 'juanjo12', 'ale12', 'lucas12' ])
  });

  it("printTable", () => {
    // Mock logger
    let out = "";
    const defaultLogger = console.log
    console.log = (str: string) => out = str
    
    Group.printTable([group12])

    // Restore logger
    console.log = defaultLogger

    expect(out).to.equal(`┌───────────────┬─────────┬─────────────────────────────────┬────────────────────┬────────────────────┬──────────────────┬────────────────────────────┬────────────────────────────┬──────────────────────────┬─────────────────┬────────────────────┬──────────┬───────────┐
│ Identificador │ Nombre  │          Participantes          │ Total Km Semanales │ Total Km Mensuales │ Total Km Anuales │ Total de Elevacion semanal │ Total de Elevacion mensual │ Total de Elevacion anual │ Rutas Favoritas │ Historial de rutas │ Creador  │ Actividad │
├───────────────┼─────────┼─────────────────────────────────┼────────────────────┼────────────────────┼──────────────────┼────────────────────────────┼────────────────────────────┼──────────────────────────┼─────────────────┼────────────────────┼──────────┼───────────┤
│      g12      │ grupo12 │ juanjo12,ale12,lucas12,miguel12 │         22         │        0.75        │        58        │            1.75            │            108             │           2.38           │                 │    1,2,3,4,5,6     │ juanjo12 │  Correr   │
└───────────────┴─────────┴─────────────────────────────────┴────────────────────┴────────────────────┴──────────────────┴────────────────────────────┴────────────────────────────┴──────────────────────────┴─────────────────┴────────────────────┴──────────┴───────────┘
`)
  });

  it ("printTableLessInfo", () => {
    // Mock logger
    let out = "";
    const defaultLogger = console.log
    console.log = (str: string) => out = str
    
    Group.printTableLessInfo([group12])

    // Restore logger
    console.log = defaultLogger

    expect(out).to.equal(`┌───────────────┬─────────┬─────────────────────────────────┬─────────────────┬────────────────────┬──────────┬───────────┐
│ Identificador │ Nombre  │          Participantes          │ Rutas Favoritas │ Historial de rutas │ Creador  │ Actividad │
├───────────────┼─────────┼─────────────────────────────────┼─────────────────┼────────────────────┼──────────┼───────────┤
│      g12      │ grupo12 │ juanjo12,ale12,lucas12,miguel12 │                 │    1,2,3,4,5,6     │ juanjo12 │  Correr   │
└───────────────┴─────────┴─────────────────────────────────┴─────────────────┴────────────────────┴──────────┴───────────┘
`)
  });
})