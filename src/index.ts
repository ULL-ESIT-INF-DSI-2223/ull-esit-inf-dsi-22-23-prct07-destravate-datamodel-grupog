import AdminManager from "./cli/managers/admin_manager.js";
import MainManager from "./cli/managers/main_manager.js";
import SessionManager from "./cli/managers/session_manager.js";
import UserPrompter from "./cli/user_prompter.js";
import Database from "./db/database.js";
import User from "./user/user.js";
import { UserData } from "./user/user_data.js";
import RouteHistory from "./user/route_history.js";
import Route from "./route/route.js";
import Group from "./group/group.js";
import RouteHistoryGroup from "./group/route_history_group.js";


const db = new Database();
await db.load();

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

const grupo12 = new Group("g12", "grupo12", ["juanjo12", "ale12", "lucas12", "miguel12"], [], [routeHistory1, routeHistory2, routeHistory3, routeHistory4, routeHistory5, routeHistory6], "juanjo12", 0);

console.log(Group.printTable([grupo12]))