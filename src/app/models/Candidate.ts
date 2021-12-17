import { Utilisateur } from './Utilisateur';
export enum Poste {
  FULLSTACKDEVELOPER = 'FULLSTACKDEVELOPER',
  TESTINGDEVELOPER = 'TESTINGDEVELOPER',
  SALESFORCEDEVELOPER = 'SALESFORCEDEVELOPER',
}
export enum ActivityArea {
  FINANCIALSERVICES = 'FINANCIALSERVICES',
  CONSUMERPRODUCT = 'CONSUMERPRODUCT',
  REATAILDISTRIBUTION = 'REATAILDISTRIBUTION',
  ENERGY = 'ENERGY',
  PUBLICSECTOR = 'PUBLICSECTOR',
  LIFESCIENCE = 'LIFESCIENCE',
  TELECOMMUNICATION = 'TELECOMMUNICATION',
  AUTOMOTIVE = 'AUTOMOTIVE',
}
export class Candidate extends Utilisateur {
  poste: Poste;
  activityArea: ActivityArea;

  constructor(user: Candidate) {
    super(user);
    this.poste = user.poste;
    this.activityArea = user.activityArea;
  }
}
