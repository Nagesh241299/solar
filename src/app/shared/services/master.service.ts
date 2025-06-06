// master.service.ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { envDetails } from 'src/config/env.utils';

@Injectable({
  providedIn: 'root'
})
export class MasterService {


  private baseUrl = envDetails.apiUrl;
  private token: any = ''
  constructor(private http: HttpClient, private router: Router) { }

  getCountryList() {
    const url = `${this.baseUrl}/instaroof/country-data/list/`;


    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.get(url, { headers });
  }
  getStateList() {
    const url = `${this.baseUrl}/instaroof/state-data/list/`;


    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.get(url, { headers });
  }

  getCityList() {
    const url = `${this.baseUrl}/instaroof/city-data/list/`;


    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.get(url, { headers });
  }
  getAreaList() {
    const url = `${this.baseUrl}/instaroof/area-data/list/`;


    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.get(url, { headers });
  }

  getCreditList() {
    const url = `${this.baseUrl}/instaroof/gamification-action/list/`;


    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.get(url, { headers });
  }
  getAreaListForSolarEPC() {
    const url = `${this.baseUrl}/instaroof/area-data-for-epc/list/`;


    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.get(url, { headers });
  }
  saveCountry(details: any) {
    const url = `${this.baseUrl}/instaroof/country-data/create/`;

    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.post(url, details, { headers });
  }
  saveState(details: any) {
    const url = `${this.baseUrl}/instaroof/state-data/create/`;

    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.post(url, details, { headers });
  }
  saveCity(details: any) {
    const url = `${this.baseUrl}/instaroof/city-data/create/`;

    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.post(url, details, { headers });
  }
  saveArea(details: any) {
    const url = `${this.baseUrl}/instaroof/area-data/create/`;

    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.post(url, details, { headers });
  }
  updateCountry(details: any, id: any) {
    const url = `${this.baseUrl}/instaroof/country-data/update/${id}/`;


    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.put(url, details, { headers });
  }
  updateCredit(details: any, id: any) {
    const url = `${this.baseUrl}/instaroof/gamification-action/update/${id}/`;


    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.put(url, details, { headers });
  }
  updateState(details: any, id: any) {
    const url = `${this.baseUrl}/instaroof/state-data/update/${id}/`;


    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.put(url, details, { headers });
  }
  updateCity(details: any, id: any) {
    const url = `${this.baseUrl}/instaroof/city-data/update/${id}/`;


    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.put(url, details, { headers });
  }
  updateArea(details: any, id: any) {
    const url = `${this.baseUrl}/instaroof/area-data/update/${id}/`;


    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.put(url, details, { headers });
  }
  editCountryById(id: any) {

    const url = `${this.baseUrl}/instaroof/country-data/${id}/`;

    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.get(url, { headers });
  }
  editStateById(id: any) {

    const url = `${this.baseUrl}/instaroof/state-data/${id}/`;

    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.get(url, { headers });
  }

  editCreditById(id: any) {

    const url = `${this.baseUrl}/instaroof/gamification-action/${id}/`;

    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.get(url, { headers });
  }
  editCityById(id: any) {

    const url = `${this.baseUrl}/instaroof/city-data/${id}/`;

    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.get(url, { headers });
  }
  editAreaById(id: any) {

    const url = `${this.baseUrl}/instaroof/area-data/${id}/`;

    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.get(url, { headers });
  }
  deleteCountryById(id: any) {
    const url = `${this.baseUrl}/instaroof/country-data/delete/${id}/`;

    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.delete(url, { headers });
  }
  deleteStateById(id: any) {
    const url = `${this.baseUrl}/instaroof/state-data/delete/${id}/`;

    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.delete(url, { headers });
  }
  deleteCityById(id: any) {
    const url = `${this.baseUrl}/instaroof/city-data/delete/${id}/`;

    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.delete(url, { headers });
  }
  deleteAreaById(id: any) {
    const url = `${this.baseUrl}/instaroof/area-data/delete/${id}/`;

    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.delete(url, { headers });
  }
}
