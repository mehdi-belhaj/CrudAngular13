import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
const API_AUTH_URL = `${environment.apiUrl}/admin`;
@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}

  getCandidates(): Observable<any> {
    return this.http.get<any>(`${API_AUTH_URL}/candidates`);
  }
deleteCandidate(id:number):Observable<any> {
  return this.http.delete<any>(`${API_AUTH_URL}/candidate/${id}`);
}
}
