import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ResponseObject } from '../../../models/helpers/ResponseObject';
import { Utilisateur } from '../../../models/Utilisateur';
import { Router } from '@angular/router';
import { JwtResponse } from '../../../models/helpers/JwtResponse';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

const API_AUTH_URL = `${environment.apiUrl}/auth`;
@Injectable({
  providedIn: 'root',
})
export class AuthHttpService {
  currentUserSubject!: BehaviorSubject<Utilisateur | null>;
  get currentUserValue(): Utilisateur | null {
    return this.currentUserSubject.value;
  }

  set currentUserValue(user: Utilisateur | null) {
    this.currentUserSubject.next(user);
  }
  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<Utilisateur | null>(null);
  }

  login(
    usernameOrEmail: string,
    password: string
  ): Observable<ResponseObject<JwtResponse>> {
    return this.http.post<ResponseObject<JwtResponse>>(
      `${API_AUTH_URL}/signin`,
      {
        usernameOrEmail,
        password,
      },
      httpOptions
    );
  }
  createUser(user: Utilisateur): Observable<Utilisateur> {
    return this.http.post<Utilisateur>(
      `${API_AUTH_URL}/signup`,
      user,
      httpOptions
    );
  }

  getUserByToken(): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(`${API_AUTH_URL}/me`);
  }

  logout(): Observable<ResponseObject<void>> {
    return this.http.get<ResponseObject<void>>(`${API_AUTH_URL}/logout`);
  }
}
