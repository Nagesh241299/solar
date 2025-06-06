/* eslint-disable camelcase */
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { envDetails } from 'src/config/env.utils';

@Injectable({
  providedIn: 'root'
})

export class LeadRequestService {


  private baseUrl = envDetails.apiUrl;
  private token: any = ''
  constructor(private http: HttpClient, private router: Router) { }



  getLeadListForUser() {
    const url = `${this.baseUrl}/instaroof/lead_data_table/list/`;


    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
      'Authorization': `Token ${localStorage.getItem('token')}`
    });

    return this.http.get(url, { headers });
  }



  getLeadListForUserPagination(pageId: any) {

    const url = `${this.baseUrl}/instaroof/lead_data_table/list/?page=${pageId}`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
      'Authorization': `Token ${localStorage.getItem('token')}`
    });

    return this.http.get(url, { headers });
  }


  getLeadRequestListForAdmin() {
    const url = `${this.baseUrl}/instaroof/lead-request/list/ `;


    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
      'Authorization': `Token ${localStorage.getItem('token')}`
    });

    return this.http.get(url, { headers });
  }

  getLeadRequestListForAdminPagination(pageId: any) {

    const url = `${this.baseUrl}/instaroof/lead-request/list/?page=${pageId}`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
      'Authorization': `Token ${localStorage.getItem('token')}`
    });

    return this.http.get(url, { headers });
  }

  acceptRejectLeadRequest(details: any, id: any) {
    const url = `${this.baseUrl}/instaroof/lead-request/update/${id}`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
      'Authorization': `Token ${localStorage.getItem('token')}`
    });

    return this.http.put(url, details, { headers });


  }

  saveLeadRequest(details: any) {
    const url = `${this.baseUrl}/instaroof/lead-request/create/`;

    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
      'Authorization': `Token ${localStorage.getItem('token')}`
    });

    return this.http.post(url, details, { headers });
  }
}