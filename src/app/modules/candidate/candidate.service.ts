import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Candidate } from '../../models/Candidate';


const API_AUTH_URL = `${environment.apiUrl}`;
const API_CAND_UPDATE = `${environment.apiUrl}/candidat/personalData`;



@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  constructor(private http : HttpClient) { }


  getCandidateById(): Observable<any> {
    return this.http.get(`${API_AUTH_URL}/auth/me`);

  }

  //   update(id, candidate): Observable<Candidate> {
  //   return this.http.put<Candidate>(`${API_AUTH_URL}/${id}`, candidate);
  // }

  update(candidate): Observable<Candidate> {
    return this.http.put<Candidate>(`${API_CAND_UPDATE}`, candidate);
  }
}
