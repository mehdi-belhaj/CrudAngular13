import { Injectable } from '@angular/core';
import { Admin } from "../../../models/Admin";

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  constructor() { }
  userAdmin;
  signOut(): void {
    if (this.getToken()) window.sessionStorage.removeItem(TOKEN_KEY);
    if (this.getUser()) window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public createUser(user: any): void {
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      this.userAdmin = JSON.parse(user);
      return JSON.parse(user);
    }

    return {};
  }
  // public setUser(user2): any {
  //   let user = window.sessionStorage.getItem(USER_KEY);
  //   if (user) {
  //     user=
  //     this.userAdmin = JSON.parse(user);
  //     return JSON.parse(user);
  //   }

  //   return {};
  // }
}
