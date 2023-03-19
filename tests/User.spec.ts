import 'mocha'
import { expect, use } from 'chai'
import { User } from '../src/User'

const userTest = new User("01", "TestUser", "cycling");

describe("Testing User class", () => {
  it("The constructor of the class should not return undefined", () => {
    expect(new User("01", "TestUser", "cycling")).not.to.be.eql(undefined)
  });

  it ("Testing getUserId should return 01", () => {
    expect(userTest.getUserID).to.be.eql("01")
  });

  it ("Testing getUserName should return TestUser", () => {
    expect(userTest.getUserName).to.be.eql("TestUser")
  });

  it ("Testing setNewUserName with a valid username", () => {
    expect(userTest.setNewUserName("Alejandro")).to.be.eql("Alejandro")
  });

  it ("Testing setNewUserName with an invalid username", () => {
    expect(userTest.setNewUserName("")).to.be.eql(undefined)
  });

  it ("Testing setNewUserName with an invalid username", () => {
    expect(userTest.setNewUserName("Alejandro")).to.be.eql(undefined)
  });

  it ("Testing getUserActivity it should return cycling", () => {
    expect(userTest.getUserActivity).to.be.eql("cycling")
  });

  it ("Testing setNewActivity with an invalid activity", () => {
    expect(userTest.setNewActivity("cycling")).to.be.eql(undefined)
  });

  it ("Testing setNewActivity with a valid activity", () => {
    expect(userTest.setNewActivity("running")).to.be.eql("running")
  });

  it ("Testing getUserFriends should return an empty array", () => {
    expect(userTest.getUserFriends).to.be.eql([])
  });

  it ("Testing addNewFriend with the same id as the user should return undefined", () => {
    expect(userTest.addNewFriend("01")).to.be.eql(undefined)
  });

  it ("Testing addNewFriend with a valid id", () => {
    expect(userTest.addNewFriend("02")).to.be.eql("02")
  });

  it ("Testing addNewFriend with an already friend", () => {
    expect(userTest.addNewFriend("02")).to.be.eql(undefined)
  });

  it ("Testing removeFriend with a valid id", () => {
    expect(userTest.removeFriend("02")).to.be.eql("02")
  });
  
  it ("Testing removeFriend with an invalid id", () => {
    expect(userTest.removeFriend("02")).to.be.eql(undefined)
  });

  it ("Testing getUserGroupFriend", () => {
    expect(userTest.getUserGroupFriends).to.be.eql([])
  });

  it ("Testing addNewGroupFriend with the same id as the user should return undefined", () => {
    expect(userTest.addNewGroupFriend("01")).to.be.eql(undefined)
  });

  it ("Testing addNewGroupFriend with a valid id", () => {
    expect(userTest.addNewGroupFriend("001")).to.be.eql("001")
  });

  it ("Testing addNewGroupFriend with an already friend", () => {
    expect(userTest.addNewGroupFriend("001")).to.be.eql(undefined)
  });

  it ("Testing removeGroupFriend with a valid id", () => {
    expect(userTest.removeGroupFriend("001")).to.be.eql("001")
  });
  
  it ("Testing removeGroupFriend with an invalid id", () => {
    expect(userTest.removeGroupFriend("002")).to.be.eql(undefined)
  });

  it ("Testing getWeeklyStatistics", () => {
    expect(userTest.getWeeklyStatistics).to.be.eql(0)
  });

  it ("Testing getMonthlyStatistics", () => {
    expect(userTest.getMonthlyStatistics).to.be.eql(0)
  });

  it ("Testing getYearlyStatistics", () => {
    expect(userTest.getYearlyStatistics).to.be.eql(0)
  });

  it ("Testing getFavouriteRoutes should be an empty array now", () => {
    expect(userTest.getFavouriteRoutes).to.be.eql([])
  });

  it ("Testing addNewFavourityRoute", () => {
    expect(userTest.addNewFavouriteRoute("R5")).to.be.eql("R5")
  });

  it ("Testing getFavouriteRoutes should be R5", () => {
    expect(userTest.getFavouriteRoutes).to.be.eql(["R5"])
  });

  it ("Testing addNewFavourityRoute, that already is a favourite route", () => {
    expect(userTest.addNewFavouriteRoute("R5")).to.be.eql(undefined)
  });

  it ("Testing removeFavouriteRoute", () => {
    expect(userTest.removeFavouriteRoute("R5")).to.be.eql("R5")
  });

  it ("Testing getFavouriteRoutes should be empty", () => {
    expect(userTest.getFavouriteRoutes).to.be.eql([])
  });

  it ("Testing removeFavouriteRoute with an invalid id", () => {
    expect(userTest.removeFavouriteRoute("R5")).to.be.eql(undefined)
  });


  /////
  it ("Testing getActiveChallenges should be an empty array now", () => {
    expect(userTest.getActiveChallenges).to.be.eql([])
  });

  it ("Testing addNewChallenge", () => {
    expect(userTest.addNewChallenge("C1")).to.be.eql("C1")
  });

  it ("Testing getActiveChallenges should be C1", () => {
    expect(userTest.getActiveChallenges).to.be.eql(["C1"])
  });

  it ("Testing addNewChallenge, that already is a favourite challenge", () => {
    expect(userTest.addNewChallenge("C1")).to.be.eql(undefined)
  });

  it ("Testing removeChallenge", () => {
    expect(userTest.removeChallenge("C1")).to.be.eql("C1")
  });

  it ("Testing getActiveChallenges should be empty", () => {
    expect(userTest.getActiveChallenges).to.be.eql([])
  });

  it ("Testing removeChallenge with an invalid id", () => {
    expect(userTest.removeChallenge("C1")).to.be.eql(undefined)
  });
});