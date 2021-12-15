import { Utilisateur } from './Utilisateur';

export class Admin extends Utilisateur {
  organization: string;
  constructor(admin: Admin) {
    super(admin);
    this.organization = admin.organization;
  }
}
