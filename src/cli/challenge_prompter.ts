import inquirer from "inquirer";
import Database from "../db/database.js";
import Challenge from "../challenges/challenges.js";
import BasePrompter from "./base_prompter.js";
import { activityTypes, challenges, routes, users } from "./choices.js";

/**
 * ChallengePrompter creates a new Prompter object for the Challenges. It can manage user input related to this class.
 */
export default class ChallengePrompter extends BasePrompter {
  /**
   * constructor creates a new prompter using the Database provided.
   * @param db Database for querying during prompts.
   */
  constructor(db: Database) {
    super(db);
  }

  /**
   * add creates a new Challenge from the user inputs and adds it to the database.
   */
  async add(): Promise<void> {
    await this.db.addChallenge(await this.dataPrompt());
  }

  /**
   * delete removes multiple Challenges from the database based on the user input.
   */
  async delete(): Promise<void> {
    (
      await inquirer.prompt([
        {
          type: "checkbox",
          name: "challenge",
          message: "Seleccione los retos que desea borrar:",
          choices: challenges(this.db),
        },
      ])
    ).challenges.forEach(
      async (id: string) => await this.db.deleteChallenge(id)
    );
  }

  /**
   * edit modifies a Challenge from the database based on the user input.
   */
  async edit(): Promise<void> {
    const { challengeID } = await inquirer.prompt([
      {
        type: "list",
        name: "challengeID",
        message: "Seleccione el reto a editar:",
        choices: challenges(this.db),
      },
    ]);

    const c = this.db.challenges().find((c) => c.id === challengeID);
    if (!c) {
      throw new Error(`somehow a non existing ID (${challengeID}) was chosen`);
    }

    await this.db.setChallenge(
      await this.dataPrompt({
        id: c.id,
        name: c.name,
        userIds: c.userIds,
        routes: c.routes,
        activityType: c.activity,
      })
    );
  }

  /**
   * dataPrompt prompts the user for a Challenge's data, using the defaults values if provided.
   * @param defaults Default values for each field.
   * @returns A new challenge created from the user input.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private async dataPrompt(defaults?: any): Promise<Challenge> {
    if (!defaults) {
      defaults = { id: "" };
    }

    const input = await inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: "Defina el nombre del reto:",
        default: defaults.name,
        validate: (input: string) =>
          input !== "" ? true : "El nombre no puede estar vacío",
      },
      {
        type: "checkbox",
        name: "routes",
        message: "Seleccione las rutas que tendrá el reto:",
        default: defaults.routes,
        choices: routes(this.db),
      },
      {
        type: "checkbox",
        name: "userIds",
        message: "Seleccione los usuarios que han realizado el reto:",
        default: defaults.userIds,
        choices: users(this.db),
      },
      {
        type: "list",
        name: "activityType",
        message: "Seleccione el tipo de actividad del reto:",
        default: defaults.activityType,
        choices: activityTypes(),
      },
    ]);

    return new Challenge(
      defaults.id,
      input.name,
      input.routes,
      input.userIds,
      input.activityType
    );
  }
}
