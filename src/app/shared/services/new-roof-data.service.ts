import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { envDetails } from "../../../config/env.utils";
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class NewRoofDataService {

  constructor(private http: HttpClient, private router: Router) { }

  private baseUrl = envDetails.apiUrl;
  private token: any = ''

  //get  list Roofdata
  getRoofData() {
    const url = `${this.baseUrl}/instaroof/rooftopBasicDetails/list/`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.get(url, { headers });
  }


  //get  list/data with pagination
  getRoofDataPagination(pageId: any) {
    const url = `${this.baseUrl}/instaroof/rooftopBasicDetails/list/?page=${pageId}`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.get(url, { headers });
  }


  // Create Roof data
  createRoofData(epcObj: any) {

    const url = `${this.baseUrl}/instaroof/rooftopBasicDetails/create/`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.post(url, epcObj, { headers });
  }

  // get Roof data by particular id
  getRoofDataById(id: any) {
    const url = `${this.baseUrl}/instaroof/rooftopBasicDetails/get/${id}/`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.get(url, { headers });
  }


  //update 
  updateRoofData(epcObj: any, id: any) {

    const url = `${this.baseUrl}/instaroof/rooftopBasicDetails/update/${id}/`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.put(url, epcObj, { headers });
  }


  DeleteRoofData(id: any) {
    const url = `${this.baseUrl}/instaroof/rooftopBasicDetails/delete/${id}/`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.delete(url, { headers });
  }


  //get area by pincode
  getAreaByPincode(pincode: any) {
    const url = `${this.baseUrl}/instaroof/getareabypincode/${pincode}/`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.get(url, { headers });
  }

  //get lat,long  by area
  getlatlongByArea(area: any) {
    const url = `${this.baseUrl}/instaroof/getpincodebyarea/${area}/`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.get(url, { headers });
  }

  //get distinct/city  by area & pin code 
  getDistrictByPincodeArea(pincode: any, area: any) {
    const url = `${this.baseUrl}/instaroof/getpincodeareabydistrict/${pincode}/${area}/`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.get(url, { headers });
  }


}


