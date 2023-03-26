import { expect } from "chai"
import { activityTypes, routes, challenges, users, groups  } from "../../src/cli/choices.js"
import User from "../../src/user/user.js";
import Group from "../../src/group/group.js";
import Route from "../../src/route/route.js";
import Coordinates from "../../src/route/coordinates.js";
import Challenge from "../../src/challenge/challenge.js";
import RouteHistoryGroup from "../../src/group/route_history_group.js";
import { ActivityType } from "../../src/activity_type.js";
import Database from "../../src/db/database.js";

const testUser1 = new User("juanjo12", "juan jose", ["juanjo12"], ["grupo12"], [], [], [], 0, "", false);
const testUser2 = new User("ale12", "alejandro", ["juanjo12"], ["grupo12"], [], [], [], 0, "", false);

const routeHistory1 = new RouteHistoryGroup("1", new Date(2023, 2, 25), 12, 0.35, ["juanjo12", "ale12", "lucas12"])
const routeHistory2 = new RouteHistoryGroup("2", new Date(2023, 2, 26), 10, 0.40, ["juanjo12", "ale12", "lucas12"])
const routeHistory3 = new RouteHistoryGroup("3", new Date(2023, 2, 1), 21, 0.5, ["juanjo12", "ale12", "lucas12"])

const group12 = new Group("g12", "grupo12", ["juanjo12", "ale12", "lucas12", "miguel12"], [], [routeHistory1, routeHistory2, routeHistory3], "juanjo12", 0);
const grupo11 = new Group("g11", "grupo11", ["juanjo12", "ale12", "lucas12"], [], [routeHistory1, routeHistory2, routeHistory3], "juanjo12", 0);

const route1 = new Route("123", "Route", new Coordinates(1, 2, 3), new Coordinates(4,5,6), 12, 2, ["a", "b"], ActivityType.RUNNING, 4)
const route2 = new Route("124", "Route", new Coordinates(1, 2, 3), new Coordinates(4,5,6), 12, 2, ["a", "b"], ActivityType.RUNNING, 4)

const challenge1 = new Challenge("123", "Reto1", [route2, route1], ["a", "b"],ActivityType.RUNNING)
const challenge2 = new Challenge("124", "Reto2", [route1, route2], ["a", "b"],ActivityType.RUNNING)

const database = new Database("/../../db_testing2.json");
database.load();

describe("Choices", () => {
  it ("activityTypes", () => {
    expect(activityTypes()).to.deep.equal([
      {
        "name": "Correr",
        "value": 0
      },
      {
        "name": "Ciclismo",
        "value": 1
      }
    ])
  });

  it ("routes", () => {
    database.setRoute(route1);
    database.setRoute(route2);
    expect(routes(database)).to.be.eql([ { name: 'Route', value: '123' }, { name: 'Route', value: '124' } ]);
  });

  it ("challenges", () => {
    database.setChallenge(challenge1);
    database.setChallenge(challenge2);
    expect(challenges(database)).to.be.eql([ { name: 'Reto1', value: '123' }, { name: 'Reto2', value: '124' } ])
  });

  it ("users", () => {
    database.setUser(testUser1);
    database.setUser(testUser2);
    expect(users(database)).to.be.eql([
      { name: 'alejandro (ale12)', value: 'ale12' },
      { name: 'juan jose (juanjo12)', value: 'juanjo12' }
    ])
  });

  it ("groups", () => {    
    database.setGroup(group12);
    database.setGroup(grupo11);
    expect(groups(database)).to.be.eql([
      { name: 'grupo11 (g11)', value: 'g11' },
      { name: 'grupo12 (g12)', value: 'g12' }
    ])
  });
})