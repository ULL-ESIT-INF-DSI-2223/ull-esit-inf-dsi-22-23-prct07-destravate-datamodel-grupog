// import 'mocha'
// import { expect } from 'chai'
// import {Group} from '../src/Group'
// import { User } from '../src/User';

// const user1 = new User("U1", "Alex", "running");
// const user2 = new User("U2", "Juana", "running");
// const user3 = new User("U3", "Joshep", "running");
// const user4 = new User("U4", "Tom", "cycling");
// const group = new Group("G1", "TestGroup", [user1, user2]);

// describe ("Testing Gruop class", () => {
//   it ("The constructor should not return undefined", () => {
//     expect(new Group("G1", "TestGroup", [user1, user2])).not.to.be.eql(undefined)
//   });

//   it ("Testing getGroupId", () => {
//     expect(group.getGruopID).to.be.eql("G1")
//   });

//   it ("Testing getGroupName", () => {
//     expect(group.getGroupName).to.be.eql("TestGroup")
//   });

//   it ("Testing setNewGroupName", () => {
//     expect(group.setNewGroupName("Running S/C")).to.be.eql("Running S/C")
//   });
  
//   it ("Testing setNewGroupName with an invalid group name", () => {
//     expect(group.setNewGroupName("Running S/C")).to.be.eql(undefined)
//   });
 
//   it ("Testing setNewGroupName with an invalid group name", () => {
//     expect(group.setNewGroupName("")).to.be.eql(undefined)
//   });

//   it ("Testing getGroupName", () => {
//     expect(group.getGroupName).to.be.eql("Running S/C")
//   });

//   it ("Testing getParticipants", () => {
//     expect(group.getParticipants).to.be.eql([user1, user2])
//   });

//   it ("Testing addNewParticipant with a valid participant", () => {
//     expect(group.addNewParticipant(user3)).to.be.eql(user3)
//   });

//   it ("Testing addNewParticipant with an invalid participant", () => {
//     expect(group.addNewParticipant(user4)).to.be.eql(undefined)
//   });

//   it ("Testing getParticipants", () => {
//     expect(group.getParticipants).to.be.eql([user1, user2, user3])
//   });

//   it ("Testing removeParticipant", () => {
//     expect(group.removeParticipant("U1")).to.be.eql(user1)
//   });
  
//   it ("Testing removeParticipant with an invalid UserID", () => {
//     expect(group.removeParticipant("U10")).to.be.eql(undefined)
//   });

//   it ("Testing getParticipants", () => {
//     expect(group.getParticipants).to.be.eql([user2, user3])
//   });

//   it ("Testing getWeeklyStatistics", () => {
//     expect(group.getWeeklyStatistics).to.be.eql(0)
//   });
  
//   it ("Testing getMonthlyStatistics", () => {
//     expect(group.getMonthlyStatistics).to.be.eql(0)
//   });
  
//   it ("Testing getYearlyStatistics", () => {
//     expect(group.getYearlyStatistics).to.be.eql(0)
//   });

// });