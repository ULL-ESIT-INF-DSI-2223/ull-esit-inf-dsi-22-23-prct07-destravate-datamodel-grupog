import { expect } from "chai";
import { hashPassword, passwordMatches } from "../../src/utils/password.js"

describe ("Password functions", () => {
  it ("Testing creating a password hash and doing the match with diferents options", () => {
    const passwordHash = hashPassword("password123456");
    expect(passwordMatches("password123456", passwordHash)).to.be.eql(true);
    expect(passwordMatches("juanjo1234", passwordHash)).to.be.eql(false);
    expect(passwordMatches("micontraseña", passwordHash)).to.be.eql(false);
  })
});