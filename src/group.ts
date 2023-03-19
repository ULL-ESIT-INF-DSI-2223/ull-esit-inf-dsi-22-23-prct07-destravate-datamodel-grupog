import { Statistics } from './statistics.js'

export default class Group {
  public id: string;
  public name: string;
  public participants: string[];
  public statistics: Statistics;
  public favouriteRoutes: string[];
  public routeHistory: string[];

  constructor(id, name, participants, statistics, favouriteRoutes, routeHistory) { 
    this.id = id;
    this.name = name;
    this.participants = participants;
    this.statistics = statistics
    this.favouriteRoutes = favouriteRoutes;
    this.routeHistory = routeHistory;
  }
}


// /**
//  * Class to representate a Group on Destravate
//  */
// export class Group {
//   /**
//    * Constructor of the new Group of Destravate
//    * @param groupID 
//    * @param groupName 
//    * @param participants 
//    */
//   constructor(private groupID: string, private groupName: string, private participants: User[]) {
//     this.groupID = groupID;
//     this.groupName = groupName;
//     this.participants = participants;
//   }

//   /**
//    * Method that returns the group ID 
//    */
//   get getGruopID() {
//     return this.groupID;
//   }

//   /**
//    * Method that returns the group name
//    */
//   get getGroupName() {
//     return this.groupName;
//   }

//   /**
//    * Method that allows to change the name of the group
//    * @param newName 
//    * @returns 
//    */
//   setNewGroupName(newName: string): string | undefined {
//     if (newName === "" || this.getGroupName === newName) {
//       return undefined;
//     }
//     this.groupName = newName;
//     return this.groupName;
//   }

//   /**
//    * Method that returns all the Users that are in the group
//    */
//   get getParticipants() {
//     return this.participants;
//   }

//   /**
//    * Method that allows to add a new user
//    * @param newUser 
//    * @returns 
//    */
//   addNewParticipant(newUser: User): User | undefined {
//     const alreadyParticipant: boolean = this.participants.includes(newUser);
//     let sameActivity = true;
    
//     this.participants.forEach((user) => {
//       if (user.getUserActivity !== newUser.getUserActivity) {
//         sameActivity = false;
//       }
//     });

//     if (alreadyParticipant === false && sameActivity === true) {
//       this.participants.push(newUser);
//       return newUser;
//     }
//     return undefined;
//   }

//   /**
//    * Method that allows to delete a user from the group
//    */
//   removeParticipant(userID: string): User | undefined {
//     let index = -1, contador = 0;
//     this.participants.forEach((user) => {
//       if (user.getUserID == userID) {
//         index = contador;
//       }
//       contador++;
//     });

//     if (index > -1) {
//       const user = this.participants[index];
//       this.participants.splice(index, 1);
//       return user;
//     }
//     return undefined;
//   }

//   /**
//    * Method that returns the weekly statistics
//    */
//   get getWeeklyStatistics() {
//     let weekly = 0;
//     this.participants.forEach((user) => {
//       weekly += user.getWeeklyStatistics;
//     })
//     return weekly;
//   }

//   /**
//    * Method that returns the monthly statistics
//    */
//   get getMonthlyStatistics() {
//     let monthly = 0;
//     this.participants.forEach((user) => {
//       monthly += user.getMonthlyStatistics;
//     })
//     return monthly;
//   }

//   /**
//    * Method that returns the yearly statistics
//    */
//   get getYearlyStatistics() {
//     let yearly = 0;
//     this.participants.forEach((user) => {
//       yearly += user.getYearlyStatistics;
//     })
//     return yearly;
//   }
// }