import { Role } from '../Utilisateur';
export interface userInfo {}
export class JwtResponse {
  token: string;
  id: string;
  username: string;
  firstname:string;
  lastname:string;
  email: string;
  role: Role;
  constructor(jwtResponse: JwtResponse) {
    this.token = jwtResponse.token;
    this.id = jwtResponse.id;
    this.username = jwtResponse.username;
    this.firstname=jwtResponse.firstname;
    this.lastname=jwtResponse.lastname;
    this.email = jwtResponse.email;
    this.role = jwtResponse.role;
  }
}
