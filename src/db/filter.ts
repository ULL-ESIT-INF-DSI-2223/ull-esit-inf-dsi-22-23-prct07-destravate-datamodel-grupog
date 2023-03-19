/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Filter interface represents a filter to use with object attributes.
 * 
 * - The "field" attribute represents the name of the attribute in the object.
 * - The "op" attribute represents the comparison Operation to do.
 *  - The "value" attribute represents the object to do the comparison with.
 */
export interface Filter {
  field: string
  op: Operation
  value: any
}

/**
 * Operation type represents all comparison operations supported by filters. Most of those operations do their
 * equivalent in JavaScript, except for the following:
 * - "==": Does type and value comparison (===)
 * - "!=": Does type and value comparison (!==)
 * - "iLIKE": Treats both objects as strings, and checks if the second argument is contained in the first ignoring
 * case.
 */
export type Operation = ">" | ">=" | "<" | "<=" | "==" | "!=" | "iLIKE"

/**
 * filterObjects function takes a list of objects and filter it removing those that do NOT fit all the filters
 * provided.
 * @param list List of objects to filter.
 * @param fList List of filters to apply.
 * @returns A list containing only the objects that match every filter.
 */
export function filterObjects<T>(list: T[], fList: Filter[]): T[] {
  return list.reduce((acc, val) => {
    if (objectMatchesFilterSet(val, fList)) {
      acc.push(val)
    }
    return acc
  }, [] as T[])
}

/**
 * objectMatchesFilterSet function checks if an object matches a list of filters.
 * @param element Object to check.
 * @param fList List of filters to apply.
 * @returns Whether the object matches the list of filters or not.
 */
function objectMatchesFilterSet(element: any, fList: Filter[]): boolean {
  return typeof element === "object" && element !== null && fList.every(f => objectMatchesFilter(element, f))
}

/**
 * objectMatchesFilter function checks if an object matches a filter.
 * @param o Object to check.
 * @param f Filter to apply.
 * @returns Whether the object matches the filter or not.
 */
function objectMatchesFilter(o: any, f: Filter): boolean {
  if (f.field in o) {
    switch (f.op) {
      case ">":
        return o[f.field] > f.value
      case ">=":
        return o[f.field] >= f.value
      case "<":
        return o[f.field] < f.value
      case "<=":
        return o[f.field] <= f.value
      case "==":
        return o[f.field] === f.value
      case "!=":
        return o[f.field] !== f.value
      case "iLIKE":
        return String(o[f.field]).toLowerCase().includes(String(f.value).toLowerCase())
      default:
        throw new Error("invalid operator");
    }
  }
  return false
}
