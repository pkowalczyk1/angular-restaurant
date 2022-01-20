import {Roles} from "./roles";

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  roles: Roles;
}
