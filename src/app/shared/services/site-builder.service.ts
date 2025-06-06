import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { envDetails } from 'src/config/env.utils';

@Injectable({
  providedIn: 'root'
})
export class SiteBuilderService {

  private baseUrl = envDetails.apiUrl;

  constructor(private http: HttpClient, private router: Router) {
  }

  sitedatabyId(data: any) {

    const url = `${this.baseUrl}/instaroof/profile/${data}/`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.get(url, { headers });
  }

  
}
