import { expect } from "chai";
import User from "../src/user/user.js"

const testUser = new User("ale12", "alejandro", ["juanjo12"], ["grupo12"], ["fd549425-1869-4397-87f0-4a11b99dffbc", "f3ee5f7a-a8b3-470d-bd90-d4c3824a8a86"], [], [], 0, "", false);

const userJSON = JSON.parse(
  `
  {
    "id": "ale12",
    "name": "alejandro",
    "friends": ["juanjo12"],
    "groupFriends": ["grupo12"],
    "favoriteRoutes": ["fd549425-1869-4397-87f0-4a11b99dffbc", "f3ee5f7a-a8b3-470d-bd90-d4c3824a8a86"],
    "activeChallenges": [],
    "routeHistory": [],
    "activity": 0,
    "passwordHash": "",
    "isAdmin": false
  }
  `
)

describe("User", () => {
  it ("Constructor", () => {
    expect(() => new User("ale", "alejandro", [], [], [], [], [], 0, "", false)).not.to.throw()
  })

  it("Parse function", () => {
    console.log(User.parse(userJSON));
    console.log(testUser);
    // expect(() => User.parse(userJSON)).to.be.eql(testUser)
  });
})