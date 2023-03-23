/* eslint-disable @typescript-eslint/no-explicit-any */
import inquirer from "inquirer";
import Database from "../../db/database.js";
import { UserData } from "../../user/user_data.js";
import { passwordMatches } from "../../utils/password.js";
import { users } from "../choices.js";

export default class SessionManager {
  private db: Database
  private user: UserData | null

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

  currentUserID(): string|null {
    return this.user ? this.user.id : null
  }

  isAdmin(): boolean {
    return (!!this.user) && this.user.isAdmin
  }

  logout(): void {
    this.user = null
  }

  refresh(): void {
    if (!this.user) {
      return
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const user = this.db.userData().find(user => user.id === this.user!.id)
    this.user = user ? user : null
  }

  protected async login(): Promise<UserData|null> {
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
    
    const user = this.db.userData().find(user => user.id === credentials.user)
    if (!user) {
      throw new Error(`somehow a non existing user ID (${credentials.user}) was chosen`);
    }

    if (passwordMatches(credentials.pass, user.passwordHash)) {
      return user
    }
    return null
  }

  protected async register(): Promise<UserData|null> {
    throw new Error("TODO: not implemented");
  }
}
