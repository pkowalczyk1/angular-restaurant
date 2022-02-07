import {Roles} from "./roles";
import {Position} from "./position";

export interface User {
  uid: string;
  email: string | null;
  displayName: string;
  roles: Roles;
  cart: Position[];
  history: string[];
}
