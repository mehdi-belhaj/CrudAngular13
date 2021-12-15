export enum Role {
  ROLE_ADMIN = 'ROLE_ADMIN',
  ROLE_CANDIDAT = 'ROLE_CANDIDAT',
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export abstract class Utilisateur {
  id?: string;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  picture?: string;
  dateOfBirth?: Date;
  role: Role;
  password: string;
  confirmedPassword?: string;
  gender?: Gender;
  phone?: string;
  address?: string;
  state?: boolean;
  constructor(user: Utilisateur) {
    this.id = user.id;
    this.firstname = user.firstname;
    this.lastname = user.lastname;
    this.username = user.username;
    this.email = user.email;
    this.picture = user.picture
      ? user.picture
      : user.gender === Gender.FEMALE
      ? '../../assets/img/avatar2.png'
      : '../../assets/img/avatar.png';

    this.dateOfBirth = user.dateOfBirth;
    this.password = user.password;
    this.confirmedPassword = user.confirmedPassword;
    this.role = user.role;
    this.gender = user.gender;
    this.phone = user.phone;
    this.address = user.address;
    this.state = user.state;
  }
}
