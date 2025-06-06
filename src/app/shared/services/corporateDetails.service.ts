import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { envDetails } from "../../../config/env.utils";
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class CorporateDetailsService {
  private baseUrl = envDetails.apiUrl;
  private token: any = ''
  constructor(private http: HttpClient, private router: Router) { }


  saveCorporateData(epcObj: any) {
    const url = `${this.baseUrl}/instaroof/corporate-data/create/`;

    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.post(url, epcObj, { headers });
  }
  uploadCorporateData(file: File) {
    const url = `${this.baseUrl}/instaroof/corporate-data/upload-csv/`;
    const formData: FormData = new FormData();


    formData.append('file', file, file.name);

    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
    });

    return this.http.post(url, formData, { headers });
  }
  CorporateData() {
    const url = `${this.baseUrl}/instaroof/corporate-data/`;
    // const url = `${this.baseUrl}/djoser_custom/solar-epc-detail/`;

    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.get(url, { headers });
  }
  CorporateDatawithpagination(pageId: any) {
    const url = `${this.baseUrl}/instaroof/corporate-data/?page=${pageId}`;
    // const url = `${this.baseUrl}/djoser_custom/solar-epc-detail/`;

    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.get(url, { headers });
  }
  editCorporateData(epcObj: any, id: any) {
    const url = `${this.baseUrl}/instaroof/corporate-data/update/${id}/`;
    // const url = `${this.baseUrl}/djoser_custom/solar-epc/${id}/`;

    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.put(url, epcObj, { headers });
  }
  deleteCorporateData(id: any) {
    // const url = `${this.baseUrl}/djoser_custom/roof_top_data/${id}/`;
    const url = `${this.baseUrl}/instaroof/corporate-data/delete/${id}/`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json'
    });

    return this.http.delete(url, { headers });
  }
  editCorporateDataByCompanyId(id: any) {
    const url = `${this.baseUrl}/instaroof/corporate-data/retrieve/${id}/`;

    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.get(url, { headers });
  }

}
