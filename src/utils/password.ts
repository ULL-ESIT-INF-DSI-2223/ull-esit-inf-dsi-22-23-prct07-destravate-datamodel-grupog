import bcrypt from "bcrypt"

const rounds = 12

export function hashPassword(pass: string): string {
  return bcrypt.hashSync(pass, rounds)
}

export function passwordMatches(pass: string, hash: string): boolean {
  return bcrypt.compareSync(pass, hash)
}
