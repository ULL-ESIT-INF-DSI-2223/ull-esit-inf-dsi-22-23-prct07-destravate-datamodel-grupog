import bcrypt from "bcrypt"

const rounds = 12

/**
 * Function to hash the password of the user
 * @param pass 
 * @returns 
 */
export function hashPassword(pass: string): string {
  return bcrypt.hashSync(pass, rounds)
}

/**
 * Funtion to comprobate if a the password is correct
 * @param pass 
 * @param hash 
 * @returns 
 */
export function passwordMatches(pass: string, hash: string): boolean {
  return bcrypt.compareSync(pass, hash)
}
