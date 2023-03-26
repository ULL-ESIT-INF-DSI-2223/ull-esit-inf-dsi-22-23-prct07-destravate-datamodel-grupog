import { expect } from "chai";
import User from "../src/user/user.js"

describe("User", () => {
  it ("Constructor", () => {
    expect(() => new User("ale", "alejandro", [], [], [], [], [], 0, "", false)).not.to.throw()
  })

  it("")
})