import inquirer from "inquirer";
import { ActivityType } from "./activity_type.js";
import { Coordinates } from "./coordinates.js";
import * as db from "./db/index.js";
import { Collection } from "./db/structure.js";
import { Route } from "./route.js";

//db.add(Collection.ROUTES, new Route("123", "Route", new Coordinates(1, 2, 3), new Coordinates(4,5,6), 12, 2, ["a", "b"], ActivityType.RUNNING, 4))
/*
inquirer.prompt([{
  type: "list",
  name: "dato",
  message: "Escoja una opción",
  choices: ["Op1", "Op2", "Op3"]
}]).then(a => console.log(a)).catch(e => console.error(e))
*/
