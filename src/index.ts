import inquirer from "inquirer";

inquirer.prompt([{
  type: "list",
  name: "dato",
  message: "Escoja una opción",
  choices: ["Op1", "Op2", "Op3"]
}]).then(a => console.log(a)).catch(e => console.error(e))
