import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Candidate } from '../../models/Candidate';
import { Page } from './candidates/view-candidate/Page';
const API_AUTH_URL = `${environment.apiUrl}/admin`;
@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}

  getCandidates(): Observable<any> {
    let returnedData: any;
    let params = new HttpParams();

    return this.http.get<any>(`${API_AUTH_URL}/candidates`);
  }
  /**
   * Get all candidates, we use also this method to call search and filter.
   *
   * @param pageSize - Page size
   * @param pageIndex - Page index
   * @param filter - Optional value used in the filter
   * @param search - Optional value used in the search
   * @returns Observable<Page<Candidate>>
   */
  // getCandidates(
  //   size?: number,
  //   page: number = 0,
  //   filter?: string,
  //   search?: string
  // ): Observable<Page<Candidate>> {
  //   let returnedData: any;
  //   let params = new HttpParams();

  //   if (search) {
  //     params = params.append('search', search.trim());
  //   }
  //   if (filter) {
  //     params = params.append('filter', filter.trim());
  //   }
  //   if (page !== undefined && size !== undefined) {
  //     params = params.append('page', page);
  //     params = params.append('size', size);
  //   }

  //   return this.http.get<any>(`${API_AUTH_URL}/candidate`, {
  //     params,
  //   });
  // }
}
