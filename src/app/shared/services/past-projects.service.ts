import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { envDetails } from "../../../config/env.utils";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PastProjectsService {
  constructor(private http: HttpClient, private router: Router) { }

  private baseUrl = envDetails.apiUrl;
  private token: any = ''

  getPastProjectData() {

    const url = `${this.baseUrl}/instaroof/past_project/list/`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    // Requesting the file as a Blob

    return this.http.get(url, { headers });
  }



  getPastProjectDataPagination(pageId: any) {
    const url = `${this.baseUrl}/instaroof/past_project/list/?page=${pageId}`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.get(url, { headers });
  }

  // Create Past Projects
  CreatePastProjectData(epcObj: any) {

    const url = `${this.baseUrl}/instaroof/past_project/create/`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
    });

    return this.http.post(url, epcObj, { headers });
  }

  // get Past Project data by particular id
  getPastProjectDataById(id: any) {
    const url = `${this.baseUrl}/instaroof/past_project/${id}/`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.get(url, { headers });
  }


  //update Past project data
  updatePastProjectData(epcObj: any, id: any) {

    const url = `${this.baseUrl}/instaroof/past_project/update/${id}/`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      // 'Content-Type': 'application/json',
    });

    return this.http.put(url, epcObj, { headers });
  }


  DeletePastProjectData(id: any) {
    const url = `${this.baseUrl}/instaroof/past_project/delete/${id}/`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.delete(url, { headers });
  }



  //get proposals list/data
  getProposalsData(pageId:any , pageSize:any) {
    const url = `${this.baseUrl}/instaroof/proposal/list/?page=${pageId}&page_size=${pageSize}`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.get(url, { headers });
  }


  //get proposals list/data with pagination
  getProposalsDataPagination(pageId: any) {
    const url = `${this.baseUrl}/instaroof/past_project_proposal/list/?page=${pageId}`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.get(url, { headers });
  }


  // Create Proposal
  createProposal(epcObj: any) {

    const url = `${this.baseUrl}/instaroof/proposal/create/new/`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.post(url, epcObj, { headers});
  }

  // get Proposal data by particular id
  getProposalDataById(id: any) {
    const url = `${this.baseUrl}/instaroof/proposal/${id}/`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.get(url, { headers });
  }


  //update 
  updateProposalData(epcObj: any, id: any) {

    const url = `${this.baseUrl}/instaroof/proposal/update/${id}/`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.put(url, epcObj, { headers });
  }


  DeleteProposalData(id: any) {
    const url = `${this.baseUrl}/instaroof/proposal/delete/${id}/`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });
    return this.http.delete(url, { headers });
  }



  //download proposal data by proposal id

  downloadProposalDataById(id: any) {

    const url = `${this.baseUrl}/instaroof/past-project-proposal-download/${id}/`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.get(url, { headers, responseType: 'blob' });
  }


  //download proposal data by proposal id

  downloadProposalTemplate() {

    const url = `${this.baseUrl}/instaroof/proposal/download/`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.get(url, { headers, responseType: 'blob' });
  }


  //download proposal data by roof id
  downloadProposalDataByRoofId(id: any) {
    const url = `${this.baseUrl}/instaroof/proposal-download/${id}/`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.get(url, { headers, responseType: 'blob' });
  }

  //download proposal data by roof id
  getSavings(epcObj: any) {
    const url = `${this.baseUrl}/instaroof/lifetime-savings-calculation/`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });
    return this.http.post(url, epcObj, { headers });
  }

  saveDetails(epcObj: any) {
    const url = `${this.baseUrl}/instaroof/financing/createcalculation/`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });
    return this.http.post(url, epcObj, { headers });
  }

  removeDetails(id: string) {
    const url = `${this.baseUrl}/instaroof/financing/delete/${id}/`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });
    return this.http.delete(url, { headers });
  }
  updateDetails(id: string, epcObj: any) {
    const url = `${this.baseUrl}/instaroof/financing/update/${id}/`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });
    return this.http.put(url, epcObj, { headers });
  }

  calculateDetails(epcObj: any) {
    const url = `${this.baseUrl}/instaroof/financing/createcalculation/`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });
    return this.http.post(url, epcObj, { headers });
  }

  financedatabyId(id: any) {

    const url = `${this.baseUrl}/instaroof/financing/getbyid/${id}/`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.get(url, { headers });
  }

  financelist(epcObj: any) {
    const url = `${this.baseUrl}/instaroof/financing/list/`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });
    return this.http.post(url, epcObj, { headers });
  }



  //get - proposals - boq link to Data list  API
  getBoQLinkToData() {
    const url = `${this.baseUrl}/instaroof/boq/get/`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });
    return this.http.get(url, { headers });
  }


  //get - proposals - boq link to Data By id  API 
  getBoQLinkToDataById(id: any) {
    const url = `${this.baseUrl}/instaroof/boq/get/${id}/`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });
    return this.http.get(url, { headers });
  }


  // Create Proposal Template API 
  CreateProposalTemplate(epcObj: any) {

    const url = `${this.baseUrl}/instaroof/proposaltemplates/create/`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
    });

    return this.http.post(url, epcObj, { headers });
  }


  // List Of Proposal Template API
  getProposalTemplateList(pageId:any, pageSize:any) {
    const url = `${this.baseUrl}/instaroof/proposaltemplates/list/?page=${pageId}&page_size=${pageSize}`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.get(url, { headers });
  }

  getProposalTemplateListPagination(pageId: any) {
    const url = `${this.baseUrl}/instaroofproposaltemplates/list/?page=${pageId}`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.get(url, { headers });
  }


  // Get Proposal Template data by particular id
  getProposalTemplateDataById(id: any) {
    const url = `${this.baseUrl}/instaroof/proposaltemplates/getbyid/${id}/`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });
    return this.http.get(url, { headers });
  }

  // Delete Proposal Template
  DeleteProposalTemplate(id: any) {
    const url = `${this.baseUrl}/instaroof/proposaltemplates/delete/${id}/`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });
    return this.http.delete(url, { headers });
  }


  // Update Proposal Template data
  UpdateProposalTemplate(epcObj: any, id: any) {
    const url = `${this.baseUrl}/instaroof/proposaltemplates/update/${id}/`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
    });
    return this.http.put(url, epcObj, { headers });
  }





}
