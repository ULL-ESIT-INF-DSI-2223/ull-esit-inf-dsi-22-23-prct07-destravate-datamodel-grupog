import { ActivityType } from "../activity_type.js";
import { RouteHistoryData } from "./route_history.js";

export interface UserData {
  id: string; 
  name: string;
  friends: string[];
  groupFriends: string[]
  favoriteRoutes: string[];
  activeChallenges: string[];
  routeHistory: RouteHistoryData[];
  activity: ActivityType;
  passwordHash: string;
  isAdmin: boolean;
}
