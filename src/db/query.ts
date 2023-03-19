import { Filter, filterObjects, Operation } from "./filter.js"

/**
 * Query object represents a generic query to a database.
 */
export class Query<T> {
  private _col: T[]
  private _filters: Filter[]
  private _limit: number

  /**
   * constructor creates a new Query object for the collection provided.
   * @param collection Collection to query.
   */
  constructor(collection: T[]) {
    this._col = collection
    this._filters = []
    this._limit = Infinity
  }

  /**
   * get executes the query, returning the results.
   * @returns Results of the query.
   */
  get(): T[] {
    return filterObjects(this._col, this._filters).slice(0, this._limit)
  }

  /**
   * limit sets the maximum number of objects to return.
   * @param n Limit
   * @returns This query with the limit updated.
   */
  limit(n: number): Query<T> {
    this._limit = n
    return this
  }

  /**
   * where adds a condition to filter the results by. It can be called multiple times to apply multiple filters.
   * @param fieldName Field to check.
   * @param op Comparison operation to perform.
   * @param value Value to compare to.
   * @returns This query with the filter added.
   */
  where(fieldName: string, op: Operation, value: unknown): Query<T> {
    this._filters.push({field: fieldName, op, value})
    return this
  }
}
