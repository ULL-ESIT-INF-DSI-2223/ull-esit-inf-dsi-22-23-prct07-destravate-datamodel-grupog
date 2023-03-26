import { expect } from "chai";
import RouteHistory from "../../src/user/route_history.js";
import User from "../../src/user/user.js"

// Last week
const routeHistory1 = new RouteHistory("1", new Date(2023, 2, 25), 12, 0.35)
const routeHistory2 = new RouteHistory("2", new Date(2023, 2, 26), 10, 0.40)
// Last moth
const routeHistory3 = new RouteHistory("3", new Date(2023, 2, 1), 21, 0.5)
const routeHistory4 = new RouteHistory("4", new Date(2023, 2, 2), 15, 0.5)
// Last year
const routeHistory5 = new RouteHistory("5", new Date(2022, 11, 12), 40, 0.40)
const routeHistory6 = new RouteHistory("6", new Date(2022, 11, 15), 10, 0.23)

const testUser1 = new User("ale12", "alejandro", ["juanjo12"], ["grupo12"], [], [], [routeHistory1, routeHistory2, routeHistory3, routeHistory4, routeHistory5, routeHistory6], 0, "", false);

describe("User", () => {
  it ("Constructor", () => {
    expect(() => new User("ale", "alejandro", [], [], [], [], [], 0, "", false)).not.to.throw()
  });

  it ("Getting weekly statistis km", () => {
    expect(testUser1.weeklyKmStatistics()).to.be.eql(22)
  });
  
  it ("Getting weekly statistis slope", () => {
    expect(testUser1.weeklySlopeStatistics()).to.be.eql(0.75)
  });

  it ("Getting monthly statistis km", () => {
    expect(testUser1.monthlyKmStatistics()).to.be.eql(58)
  });
  
  it ("Getting monthly statistis slope", () => {
    expect(testUser1.monthlySlopeStatistics()).to.be.eql(1.75)
  });

  it ("Getting yearly statistis km", () => {
    expect(testUser1.yearlyKmStatistics()).to.be.eql(108)
  });
  
  it ("Getting yearly statistis slope", () => {
    expect(testUser1.yearlySlopeStatistics()).to.be.eql(2.38)
  });

  it("Parse function", () => {
    expect(User.parse(
      {
        id: "ale12",
        name: "alejandro",
        friends: ["juanjo12"],
        groupFriends: ["grupo12"],
        favoriteRoutes: ["fd549425-1869-4397-87f0-4a11b99dffbc", "f3ee5f7a-a8b3-470d-bd90-d4c3824a8a86"],
        activeChallenges: [],
        routeHistory: [],
        activity: 0,
        passwordHash: '',
        isAdmin: false
      })).to.deep.equals(
        {
          id: "ale12",
          name: "alejandro",
          friends: ["juanjo12"],
          groupFriends: ["grupo12"],
          favoriteRoutes: ["fd549425-1869-4397-87f0-4a11b99dffbc", "f3ee5f7a-a8b3-470d-bd90-d4c3824a8a86"],
          activeChallenges: [],
          routeHistory: [],
          activity: 0,
          passwordHash: '',
          isAdmin: false
      })
  });
  
  it("printTable", () => {
    // Mock logger
    let out = "";
    const defaultLogger = console.log
    console.log = (str: string) => out = str
    
    User.printTable([testUser1])

    // Restore logger
    console.log = defaultLogger

    expect(out).to.equal(`┌───────────────┬───────────┬──────────┬──────────────────┬──────────────┬───────────────────┬──────────────┬───────────────────┬────────────┬─────────────────┬─────────────────┬───────────────┬────────────────────┬───────────┐
│ Identificador │  Nombre   │  Amigos  │ Grupos de Amigos │ Km Semanales │ Elevacion Semanal │ Km Mensuales │ Elevacion Mensual │ Km Anuales │ Elevacion Anual │ Rutas Favoritas │ Retos activos │ Historial de rutas │ Actividad │
├───────────────┼───────────┼──────────┼──────────────────┼──────────────┼───────────────────┼──────────────┼───────────────────┼────────────┼─────────────────┼─────────────────┼───────────────┼────────────────────┼───────────┤
│     ale12     │ alejandro │ juanjo12 │     grupo12      │      22      │       0.75        │      58      │       1.75        │    108     │      2.38       │                 │               │    1,2,3,4,5,6     │  Correr   │
└───────────────┴───────────┴──────────┴──────────────────┴──────────────┴───────────────────┴──────────────┴───────────────────┴────────────┴─────────────────┴─────────────────┴───────────────┴────────────────────┴───────────┘
`)
  });

  it ("printTableLessInfo", () => {
    // Mock logger
    let out = "";
    const defaultLogger = console.log
    console.log = (str: string) => out = str
    
    User.printTableLessInfo([testUser1])

    // Restore logger
    console.log = defaultLogger

    expect(out).to.equal(`┌───────────────┬───────────┬──────────┬──────────────────┬─────────────────┬───────────────┬────────────────────┬───────────┐
│ Identificador │  Nombre   │  Amigos  │ Grupos de Amigos │ Rutas Favoritas │ Retos activos │ Historial de rutas │ Actividad │
├───────────────┼───────────┼──────────┼──────────────────┼─────────────────┼───────────────┼────────────────────┼───────────┤
│     ale12     │ alejandro │ juanjo12 │     grupo12      │                 │               │    1,2,3,4,5,6     │  Correr   │
└───────────────┴───────────┴──────────┴──────────────────┴─────────────────┴───────────────┴────────────────────┴───────────┘
`)
  });
})
