/**
 * Class to represents a User on Destravate
 */
export class User {
  /** Private Attributes that are not needed on the constructor */
  private friends: string[];
  private groupFriends: string[]
  private weeklyStatistics: number;
  private monthlyStatistics: number;
  private yearlyStatistics: number;
  private favouriteRoutes: string[];
  private activeChallenges: string[];
  // private routeHistory: []; 
  
  /**
   * Constructor of a new User of Destravate
   * @param userID 
   * @param userName 
   * @param activity 
   */
  constructor(private userID: string, private userName: string, private activity: "running" | "cycling") {
    this.userID = userID;
    this.userName = userName;
    this.activity = activity;
    this.friends = [];
    this.groupFriends = [];
    this.weeklyStatistics = 0;
    this.monthlyStatistics = 0;
    this.yearlyStatistics = 0;
    this.favouriteRoutes = [];
    this.activeChallenges = [];
    // this.routeHistory
  }

  /**
   * Method that returns the user id, this can't be change
   */
  get getUserID() {
    return this.userID;
  }

  /**
   * Method that returns the username
   */
  get getUserName() {
    return this.userName;
  }

  /**
   * Method that allows to change the username
   */
  setNewUserName(newUserName: string): string | undefined{
    if (newUserName === "" || this.userName === newUserName) {
      return undefined;
    }
    this.userName = newUserName;
    return this.userName;
  }

  /**
   * Method that returns the activity done by the user
   * it can be:
   *  - Cycling
   *  - Running
   */
  get getUserActivity() {
    return this.activity;
  }

  /**
   * Method that allows to change the activity done by the user
   * it checks if the new activity is already the activity done by the user
   * @param newActivity 
   * @returns 
   */
  setNewActivity(newActivity: "running" | "cycling"): undefined | string {
    if (this.activity === newActivity) {
      return undefined;
    }
    this.activity = newActivity;
    return this.activity;
  }

  /**
   * Method that returns all the friends of the user
   */
  get getUserFriends() {
    return this.friends;
  }

  /**
   * Method that allows to add a new friend
   * it checks if the new friends is already a friend
   * @param friendID 
   * @returns 
   */
  addNewFriend(friendID: string): undefined | string {
    const alreadyFriends: boolean = this.friends.includes(friendID);
    if (alreadyFriends === false && friendID !== this.userID) {
      this.friends.push(friendID);
      return friendID;
    }
    return undefined;
  } 

  /**
   * Method that allows to remove a friend it checks if the friend exists
   * @param friendID 
   * @returns 
   */
  removeFriend(friendID: string): undefined | string {
    const index: number = this.friends.indexOf(friendID)
    if (index > -1) {
      this.friends.splice(index, 1);
      return friendID;
    } 
    return undefined;
  }

  /**
   * Method that returns all the group friends
   */
  get getUserGroupFriends() {
    return this.groupFriends;
  }

  /**
   * Method that allows to add a new group to friends
   * it checks if the new group is already a friend
   * @param groupFriendID 
   * @returns 
   */
  addNewGroupFriend(groupFriendID: string): undefined | string {
    const alreadyFriends: boolean = this.groupFriends.includes(groupFriendID);
    if (alreadyFriends === false && groupFriendID !== this.userID) {
      this.groupFriends.push(groupFriendID);
      return groupFriendID;
    }
    return undefined;
  } 

  /**
   * Method that allows to remove a group from friends it checks if the friend exists
   * @param groupFriendID 
   * @returns 
   */
  removeGroupFriend(groupFriendID: string): undefined | string {
    const index: number = this.groupFriends.indexOf(groupFriendID)
    if (index > -1) {
      this.groupFriends.splice(index, 1);
      return groupFriendID;
    } 
    return undefined;
  }

  /**
   * Method that returns the weekly statistics
   */
  get getWeeklyStatistics() {
    return this.weeklyStatistics;
  }

  // setWeeklyStatistics() {

  // }

  /**
   * Method that returns the monthly statistics
   */
  get getMonthlyStatistics() {
    return this.monthlyStatistics;
  }

  // setMonthlylyStatistics() {
    
  // }

  /**
   * Method that returns the yearly statistics
   */
  get getYearlyStatistics() {
    return this.yearlyStatistics;
  }

  // setYearlyStatistics() {
    
  // }

  /**
   * Method that returns all the favourite routes
   */
  get getFavouriteRoutes() {
    return this.favouriteRoutes;
  }

  /**
   * Method that allows to add a new favourite route
   * it checks if the route already is favourite
   * @param newRouteId 
   * @returns 
   */
  addNewFavouriteRoute(newRouteId: string): string | undefined {
    const alreadyFavourite: boolean = this.favouriteRoutes.includes(newRouteId);
    if (alreadyFavourite === false) {
      this.favouriteRoutes.push(newRouteId);
      return newRouteId;
    }
    return undefined;
  } 

  /**
   * Method that allows to remove a route from the favourites list
   * @param routeId 
   * @returns 
   */
  removeFavouriteRoute(routeId: string): string | undefined {
    const index: number = this.favouriteRoutes.indexOf(routeId)
    if (index > -1) {
      this.favouriteRoutes.splice(index, 1);
      return routeId;
    } 
    return undefined;
  }

  /**
   * Method that returns all the active challenges
   */
  get getActiveChallenges() {
    return this.activeChallenges;
  }

  /**
   * Method that allows to add a new challenge
   * @param newChallenge 
   * @returns 
   */
  addNewChallenge(newChallenge: string): string | undefined {
    const alreadyActive: boolean = this.activeChallenges.includes(newChallenge);
    if (alreadyActive === false) {
      this.activeChallenges.push(newChallenge);
      return newChallenge;
    }
    return undefined;
  }

  /**
   * Method that allows to remove a challenge
   * @param challengeID 
   * @returns 
   */
  removeChallenge(challengeID: string): string | undefined {
    const index: number = this.activeChallenges.indexOf(challengeID)
    if (index > -1) {
      this.activeChallenges.splice(index, 1);
      return challengeID;
    } 
    return undefined;
  }

  // get getRouteHistory() {
  //   return this.routeHistory;
  // }

}