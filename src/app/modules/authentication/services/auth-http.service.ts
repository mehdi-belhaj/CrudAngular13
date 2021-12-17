import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, retry, Subject, tap, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ResponseObject } from '../../../models/helpers/ResponseObject';
import { Utilisateur } from '../../../models/Utilisateur';
import { Router } from '@angular/router';
import { JwtResponse } from '../../../models/helpers/JwtResponse';
import { Admin } from "../../../models/Admin";
import { TokenStorageService } from "./token-storage-service.service";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

const API_AUTH_URL = `${environment.apiUrl}/auth`;
const API_URL = `${environment.apiUrl}/admin`;
@Injectable({
  providedIn: 'root',
})
export class AuthHttpService {
  currentUserSubject!: BehaviorSubject<Utilisateur | null>;
  private adminSubject = new BehaviorSubject<Admin>(null);
  adminAction$ = this.adminSubject.asObservable();
  public readonly postAction$ = new Subject();
  get currentUserValue(): Utilisateur | null {
    return this.currentUserSubject.value;
  }

  set currentUserValue(user: Utilisateur | null) {
    this.currentUserSubject.next(user);
  }
  constructor(private http: HttpClient, private router: Router, private tokenService: TokenStorageService) {
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

  getErrorHandler(errorRes: HttpErrorResponse) {
    let errorMessage = 'An Error Occurred';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'Email Already Exists';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'Email Not Found';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Invalid Password';
        break;
    }
    return throwError(errorMessage);
  }

  getUserByToken(): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(`${API_AUTH_URL}/me`);
  }

  logout(): Observable<ResponseObject<void>> {
    return this.http.get<ResponseObject<void>>(`${API_AUTH_URL}/logout`);
  }

  getAllAdmins(): Observable<Admin[]> {
    return this.http.get<Admin[]>(`${API_URL}/admins`);
  }

  UsernameExist(username: string) {
    return this.http.get(`${API_AUTH_URL}/admins/` + username).pipe();
  }
  EmailExist(email: string) {
    return this.http.get(`${API_AUTH_URL}/admins/admin/` + email).pipe();
  }
  updateProfileAdmin(data): Observable<Admin> {
    return this.http.put<Admin>(`${API_URL}/personalData`, data).pipe(
      retry(1),
      catchError(this.handleError),
      tap(() => this.postAction$.next(data)),
    );
  }
  public handleError(error: HttpErrorResponse | any) {
    let errMsg: string;

    if (error.error instanceof ErrorEvent) {
      errMsg = error.error.message;
    } else {
      errMsg = `${error.status} - ${error.statusText || ''}`;
    }

    return throwError(errMsg);

  }
}
