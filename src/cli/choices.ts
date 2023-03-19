import { ActivityType } from "../activity_type.js";
import Database from "../db/database.js";

/**
 * Choice type represents a generic choice for inquirer.js
 */
type Choice<T> = {
  name: string;
  value: T;
};

/**
 * activityTypes function returns a list of choices for all Activity Types.
 * @returns A list of all the activity type choices.
 */
export function activityTypes(): Choice<ActivityType>[] {
  return [
    {
      name: "Correr",
      value: ActivityType.RUNNING,
    },
    {
      name: "Ciclismo",
      value: ActivityType.BICYCLE,
    },
  ];
}

/**
 * routes function returns a list of choices for all routes.
 * @param db Database to read the routes from.
 * @returns A list of all the route choices, using their ID as value.
 */
export function routes(db: Database): Choice<string>[] {
  return db
    .routes()
    .reduce((acc, route) => {
      acc.push({
        name: `${route.name} (${route.id})`,
        value: route.id,
      });
      return acc;
    }, [] as Choice<string>[])
    .sort(sortByNameThenValue);
}

/**
 * challenge function returns a list of choices for all challenges.
 * @param db Database to read the challenge from.
 * @returns A list of all the challenge choices, using their ID as value.
 */
export function challenges(db: Database): Choice<string>[] {
  return db
    .challenges()
    .reduce((acc, challenge) => {
      acc.push({
        name: `${challenge.name} (${challenge.id})`,
        value: challenge.id,
      });
      return acc;
    }, [] as Choice<string>[])
    .sort(sortByNameThenValue);
}

/**
 * routes function returns a list of choices for all users.
 * @param db Database to read the users from.
 * @returns A list of all the user choices, using their ID as value.
 */
export function users(db: Database): Choice<string>[] {
  // TODO: Change for users when they are added.
  return db
    .routes()
    .reduce((acc, user) => {
      acc.push({
        name: `${user.name} (${user.id})`,
        value: user.id,
      });
      return acc;
    }, [] as Choice<string>[])
    .sort(sortByNameThenValue);
}

/**
 * sortByNameThenValue is a generic comparison function for sorting all the choices provided first by name (ignoring
 * case), then by name (case sensitive) and last by value.
 * @param a First choice.
 * @param b Second choice.
 * @returns 1 if a goes after b, -1 if a goes before b, or 0 if they are identical.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function sortByNameThenValue(a: Choice<any>, b: Choice<any>): number {
  const [aLow, bLow] = [a.name.toLowerCase, b.name.toLowerCase];
  if (aLow < bLow) {
    return -1;
  } else if (aLow > bLow) {
    return 1;
  } else if (a.name < b.name) {
    // Sort second by case-sensitive name
    return -1;
  } else if (a.name > b.name) {
    return 1;
  } else if (a.value < b.value) {
    // Sort third by ID
    return -1;
  } else if (a.value > b.value) {
    return 1;
  } else {
    return 0;
  }
}
