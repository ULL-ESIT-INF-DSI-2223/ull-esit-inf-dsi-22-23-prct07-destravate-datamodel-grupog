import { expect } from "chai";
import Database from "../../src/db/database.js"
import Group from "../../src/group/group.js";
import RouteHistoryGroup from "../../src/group/route_history_group.js";
import User from "../../src/user/user.js";
import Route from "../../src/route/route.js";
import { ActivityType } from "../../src/activity_type.js";
import Coordinates from "../../src/route/coordinates.js";
import Challenge from "../../src/challenge/challenge.js";

const testUser1 = new User("juanjo12", "juan jose", ["juanjo12"], ["grupo12"], [], [], [], 0, "", false);
const testUser2 = new User("ale12", "alejandro", ["juanjo12"], ["grupo12"], [], [], [], 0, "", false);

const routeHistory1 = new RouteHistoryGroup("1", new Date(2023, 2, 25), 12, 0.35, ["juanjo12", "ale12", "lucas12"])
const routeHistory2 = new RouteHistoryGroup("2", new Date(2023, 2, 26), 10, 0.40, ["juanjo12", "ale12", "lucas12"])
const routeHistory3 = new RouteHistoryGroup("3", new Date(2023, 2, 1), 21, 0.5, ["juanjo12", "ale12", "lucas12"])

const group12 = new Group("g12", "grupo12", ["juanjo12", "ale12", "lucas12", "miguel12"], [], [routeHistory1, routeHistory2, routeHistory3], "juanjo12", 0);
const group12v2 = new Group("g12", "grupo12", ["juanjo12", "ale12", "lucas12"], [], [routeHistory1, routeHistory2, routeHistory3], "juanjo12", 0);

const route1 = new Route("123", "Route Test 1", new Coordinates(1, 2, 3), new Coordinates(4,5,6), 12, 2, ["a", "b"], ActivityType.RUNNING, 4)
const route2 = new Route("124", "Route Test 2", new Coordinates(1, 2, 3), new Coordinates(4,5,6), 12, 2, ["a", "b"], ActivityType.RUNNING, 4)

const challenge1 = new Challenge("123", "Reto1", [route2, route1], ["a", "b"],ActivityType.RUNNING)
const challenge2 = new Challenge("123", "Reto2", [route1, route2], ["a", "b"],ActivityType.RUNNING)

const database = new Database("/../../db_testing.json");

describe("Database", () => {
  it ("Constructor", () => {
    expect(() => new Database("/../../db_testing.json")).not.to.throw()
  });

  it ("Load database", () => {
    expect(() => database.load()).not.to.throw()
  });

  it ("Testing group management", () => {
    expect(() => database.addGroup(group12)).not.to.throw();
    const groups = database.groups();
    expect(groups.length).to.deep.equal(1);
    expect(() => database.setGroup(group12v2)).not.to.throw();
    const groups2 = database.groups();
    expect(groups2.length).to.deep.equal(2);
    expect(() => database.deleteGroup(group12)).not.to.throw();
    expect(() => database.deleteGroup(group12v2)).not.to.throw();
    const groups3 = database.groups();
    expect(groups3.length).to.deep.equal(0);
  });

  it("Testing user management", () => {
    expect(() => database.addUser(testUser1)).not.to.throw();
    const users = database.users();
    expect(users.length).to.deep.equal(1);
    expect(() => database.setUser(testUser2)).not.to.throw();
    const users2 = database.users();
    expect(users2.length).to.deep.equal(2);
    expect(() => database.deleteUser(testUser1)).not.to.throw();
    expect(() => database.deleteUser(testUser2)).not.to.throw();
    const users3 = database.users();
    expect(users3.length).to.deep.equal(0);
  });

  it ("Testing route management", () => {
    expect(() => database.addRoute(route1)).not.to.throw();
    const routes = database.routes();
    expect(routes.length).to.deep.equal(1);
    expect(() => database.setRoute(route2)).not.to.throw();
    const routes2 = database.routes();
    expect(routes2.length).to.deep.equal(2);
    expect(() => database.deleteRoute(route1)).not.to.throw();
    expect(() => database.deleteRoute(route2)).not.to.throw();
    const routes3 = database.routes();
    expect(routes3.length).to.deep.equal(0);
  });

  it ("Testing challenge management", () => {
    database.addRoute(route1);
    database.addRoute(route2);
    expect(() => database.addChallenge(challenge1)).not.to.throw();
    // const challenges = database.challenges();
    // expect(challenges.length).to.deep.equal(1);
    expect(() => database.setChallenge(challenge2)).not.to.throw();
    // const challenges2 = database.challenges();
    // expect(challenges2.length).to.deep.equal(2);
    expect(() => database.deleteChallenge(challenge1)).not.to.throw();
    expect(() => database.deleteChallenge(challenge2)).not.to.throw();
    // const challenges3 = database.challenges();
    // expect(challenges3.length).to.deep.equal(0);
  });
});
