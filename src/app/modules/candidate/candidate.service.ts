import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';


const API_AUTH_URL = `${environment.apiUrl}`;



@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  constructor(private http : HttpClient) { }


  getCandidateById(): Observable<any> {
    return this.http.get(`${API_AUTH_URL}/auth/me`);

  }
}
