/* eslint-disable @typescript-eslint/no-explicit-any */
import inquirer from "inquirer";
import Database from "../../db/database.js";
import User from "../../user/user.js";
import { passwordMatches } from "../../utils/password.js";
import { users } from "../choices.js";

export default class SessionManager {
  private db: Database
  private user: User | null

  constructor(db: Database) {
    this.db = db
    this.user = null
  }

  async checkSession(): Promise<void> {
    for (let firstTry = true; !this.user; firstTry = false) {
      if (!firstTry) {
        console.log("¡Credenciales inválidas!")
      }

      this.user = await ((this as any)[(await inquirer.prompt([{
        type: "list",
        name: "callable",
        message: "Elija una acción:",
        choices: [
          {name: "Iniciar sesión", value: "login"},
          {name: "Registrarse", value: "register"},
        ]
      }])).callable]())
    }
  }

  isAdmin(): boolean {
    return (!!this.user) && this.user.isAdmin
  }

  logout(): void {
    this.user = null
  }

  protected async login(): Promise<User|null> {
    const credentials = await inquirer.prompt([
      {
        type: "list",
        name: "user",
        message: "Iniciar sesión como usuario:",
        choices: users(this.db)
      },
      {
        type: "password",
        name: "pass",
        message: "Contraseña:",
        mask: "*"
      },
    ])
    
    const user = this.db.users().find(user => user.id === credentials.user)
    if (!user) {
      throw new Error(`somehow a non existing user ID (${credentials.user}) was chosen`);
    }

    if (passwordMatches(credentials.pass, user.passwordHash)) {
      return user
    }
    return null
  }

  protected async register(): Promise<User|null> {
    throw new Error("TODO: not implemented");
  }
}
