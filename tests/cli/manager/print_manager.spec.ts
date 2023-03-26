import { expect } from "chai";
import PrintManager from "../../../src/cli/managers/print_manager.js"
import User from "../../../src/user/user.js";
import RouteHistoryGroup from "../../../src/group/route_history_group.js";
import Group from "../../../src/group/group.js";

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


describe ("PrintManager", () => {
  it ("Constructor", () => {

  })
});