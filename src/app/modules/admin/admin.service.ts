import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Candidate } from '../../models/Candidate';
import { Page } from './candidates/view-candidate/Page';
const API_AUTH_URL = `${environment.apiUrl}/admin`;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};


@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) { }

  getCandidates(): Observable<any> {
    let returnedData: any;
    let params = new HttpParams();

    return this.http.get<any>(`${API_AUTH_URL}/candidates`);
  }



  addCandidate(candidate: Candidate): Observable<Candidate> {
    return this.http.post<Candidate>(
      `${API_AUTH_URL}/candidate`,
      candidate,
      httpOptions
    );
  }

  deleteCandidate(id: number): Observable<any> {
    return this.http.delete<any>(`${API_AUTH_URL}/candidate/${id}`);
  }
}
