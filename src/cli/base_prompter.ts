import Database from "../db/database.js";

/**
 * BasePrompter represents the basic prompter for a given class.
 */
export default abstract class BasePrompter {
  /**
   * constructor creates a new prompter using the Database provided.
   * @param db Database for querying during prompts.
   */
  constructor(protected db: Database) {}

  /**
   * add creates a new object of the prompter type.
   */
  abstract add(): Promise<void>

  /**
   * delete removes multiple object of the prompter type from the database.
   */
  abstract delete(): Promise<void>

  /**
   * edit modifies an object of the prompter type from the database.
   */
  abstract edit(): Promise<void>
}
