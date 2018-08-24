import { Roles } from './Roles';

export interface User {
    uid: string;
    email: string;
    roles: Roles;
}
