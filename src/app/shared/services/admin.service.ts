/* eslint-disable camelcase */
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { envDetails } from "../../../config/env.utils";
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private baseUrl = envDetails.apiUrl;

  constructor(private http: HttpClient, private router: Router) { }

  AdminSearchUserListData(search_query: any) {
    // eslint-disable-next-line camelcase
    const url = `${this.baseUrl}/instaroof/search-user-data/?search_query=${search_query}`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.get(url, { headers });
  }
  AdminSearchUserListDataPagination(search_query: any, page: any) {
    // eslint-disable-next-line camelcase
    const url = `${this.baseUrl}/instaroof/search-user-data/?search_query=${search_query}&page=${page}`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.get(url, { headers });
  }
  //all user list data
  AdminAllUserListData() {

    const url = `${this.baseUrl}/instaroof/user-data/list/`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.get(url, { headers });
  }

  //all user list data with page change
  AdminAllUserListDataPagination(pageId: any) {

    const url = `${this.baseUrl}/instaroof/user-data/list/?page=${pageId}`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.get(url, { headers });
  }

  // delete user
  DeleteUserbyId(id: any) {

    const url = `${this.baseUrl}/instaroof/user-data/delete/${id}/`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.delete(url, { headers });
  }

  // Add user by admin
  AddUserData(epcObj: any) {

    const url = `${this.baseUrl}/instaroof/user-data/create/`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.post(url, epcObj, { headers });
  }

  // edit by id
  UserDatabyId(id: any) {

    const url = `${this.baseUrl}/instaroof/user-data/${id}/`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.get(url, { headers });
  }


  //update userdata
  updateUserData(epcObj: any, id: any) {

    const url = `${this.baseUrl}/instaroof/user-data/update/${id}/`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.put(url, epcObj, { headers });
  }

  //Solar EPC user credit Points data
  AllCreditpointsData() {

    const url = `${this.baseUrl}/instaroof/credit-transactions/list/`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.get(url, { headers });
  }

  //Solar EPC user credit Points data with Pagination
  AllCreditpointsDataPagination(pageId: any) {

    const url = `${this.baseUrl}/instaroof/credit-transactions/list/?page=${pageId}`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.get(url, { headers });
  }


  //create Company data
  CreateRooftopCompanyData(epcObj: any) {

    const url = `${this.baseUrl}/instaroof/rooftop-company-data/create/`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json'
    });

    return this.http.post(url, epcObj, { headers });
  }



  //Rooftop comany- Director data list
  RooftopCompanyDirectorssDataList(roof_id: any) {

    const url = `${this.baseUrl}/instaroof/rooftop-company-director-data/${roof_id}/`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json'
    });

    return this.http.get(url, { headers });
  }

  //Rooftop comany- Director data list using roof-id

  RooftopCompanyDirectorssDataListbyRoofid(roof_id: any) {

    const url = `${this.baseUrl}/instaroof/rooftop-company-director-data-by-roof/${roof_id}/`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.get(url, { headers });
  }


  //create Director data
  CreateRooftopCompanyDataDirector(epcObj: any) {

    const url = `${this.baseUrl}/instaroof/rooftop-company-director-data/create/`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.post(url, epcObj, { headers });
  }

  // get by director id, data for editing

  // edit by id
  DirectoreDatabyId(id: any) {


    const url = `${this.baseUrl}/instaroof/rooftop-company-director-data/${id}/`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.get(url, { headers });
  }

  // delete director
  DeleteDirectorbyId(id: any) {

    const url = `${this.baseUrl}/instaroof/rooftop-company-director-data/delete/${id}/`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.delete(url, { headers });
  }

  //update Drector Data 
  updateDirectorData(epcObj: any, id: any) {

    const url = `${this.baseUrl}/instaroof/rooftop-company-director-data/update/${id}/`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.put(url, epcObj, { headers });
  }




  CompanyDatabyRoofId(id: any) {

    const url = `${this.baseUrl}/instaroof/rooftop-company-data/${id}/`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.get(url, { headers });
  }




  updateRooftopCompanyData(epcObj: any, id: any) {

    const url = `${this.baseUrl}/instaroof/rooftop-company-data/update/${id}/`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.put(url, epcObj, { headers });
  }


  RooftopDataStatusRoofId(id: any) {

    const url = `${this.baseUrl}/instaroof/rooftop-data-status/${id}/`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.get(url, { headers });
  }


  // Download Proposal using roof id
  GetProposalRoofId(id: any) {
    const url = `${this.baseUrl}/instaroof/proposal/${id}`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    // Requesting the file as a Blob
    return this.http.get(url, { headers, responseType: 'blob' });
  }



}




