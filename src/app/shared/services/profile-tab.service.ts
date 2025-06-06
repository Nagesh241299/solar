import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { envDetails } from "../../../config/env.utils";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class ProfileTabService {
  private baseUrl = envDetails.apiUrl;

  constructor(private http: HttpClient, private router: Router) {

  }

  // Create Profile
  CreateProfileBasicData(epcObj: any) {
    const url = `${this.baseUrl}/instaroof/company-profiles/create/`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',

    });

    return this.http.post(url, epcObj, { headers });
  }

  //get Profile data
  GetProfileBasicData() {
    const url = `${this.baseUrl}/instaroof/company-profiles/getbyid/`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',

    });

    return this.http.get(url, { headers });

  }


  // Update Profile Basic data
  UpdateProfileBasicData(epcObj: any, id: any) {

    const url = `${this.baseUrl}/instaroof/company-profiles/update/${id}/`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',

    });

    return this.http.put(url, epcObj, { headers });
  }


  // Create Profile service
  CreateProfileServiceData(epcObj: any) {
    const url = `${this.baseUrl}/instaroof/services/create/`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',

    });

    return this.http.post(url, epcObj, { headers });
  }

  //get Profile service data
  GetProfileServiceData() {
    const url = `${this.baseUrl}/instaroof/services/getbyserviceid/`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',

    });

    return this.http.get(url, { headers });

  }


  // Update Profile Service data
  UpdateProfileServiceData(epcObj: any) {

    const url = `${this.baseUrl}/instaroof/services/update/`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.put(url, epcObj, { headers });
  }





  // Create Team Member APi
  CreateProfileTeamMembers(epcObj: any) {

    const url = `${this.baseUrl}/instaroof/team-members/create/`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
    });

    return this.http.post(url, epcObj, { headers });
  }


  // List Of Team Member API
  getTeamMemberList() {
    const url = `${this.baseUrl}/instaroof/team-members/list/`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.get(url, { headers });
  }

  getTeamMemberListPagination(pageId: any) {
    const url = `${this.baseUrl}/instaroof/team-members/list/?page=${pageId}`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.get(url, { headers });
  }


  // team Member data by particular id
  getTeamMemberDataById(id: any) {
    const url = `${this.baseUrl}/instaroof/team-members/getbyid/${id}/`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });
    return this.http.get(url, { headers });
  }

  // Delete Team Member
  DeleteTeamMember(id: any) {
    const url = `${this.baseUrl}/instaroof/team-members/delete/${id}/`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });
    return this.http.delete(url, { headers });
  }


  // Update Team Member data
  UpdateTeamMember(epcObj: any, id: any) {
    const url = `${this.baseUrl}/instaroof/team-members/update/${id}/`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
    });
    return this.http.put(url, epcObj, { headers });
  }



  // Create Testimonial
  CreateProfileTestimonial(epcObj: any) {
    const url = `${this.baseUrl}/instaroof/testimonials/create/`;

    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
    });

    return this.http.post(url, epcObj, { headers });
  }



  // Listing of Testimonials
  getTestimonialList() {

    const url = `${this.baseUrl}/instaroof/testimonials/list/`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });
    return this.http.get(url, { headers });
  }

  getTestimonialListPagination(pageId: any) {
    const url = `${this.baseUrl}/instaroof/testimonials/list/?page=${pageId}`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });
    return this.http.get(url, { headers });
  }



  // getTestimonial data by particular id
  getTestimonialDataById(id: any) {
    const url = `${this.baseUrl}/instaroof/testimonials/getbyid/${id}/`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });
    return this.http.get(url, { headers });
  }

  // Delete Testimonials
  DeleteTestimonial(id: any) {
    const url = `${this.baseUrl}/instaroof/testimonials/delete/${id}/`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });
    return this.http.delete(url, { headers });
  }



  // Update Profile Basic data
  UpdateProfileTestimonial(epcObj: any, id: any) {
    const url = `${this.baseUrl}/instaroof/testimonials/update/${id}/`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',

    });
    return this.http.put(url, epcObj, { headers });
  }

  SaveConfiguration(epcObj: any) {
    const url = `${this.baseUrl}/instaroof/configuration/`;

    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
    });

    return this.http.post(url, epcObj, { headers });
  }



  getConfigurationById() {
    const url = `${this.baseUrl}/instaroof/configuration/get/`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });
    return this.http.get(url, { headers });
  }

  checkUsernameAvailability(epcObj: any) {
    const url = `${this.baseUrl}/instaroof/verify-user/`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',  // Ensure JSON format
      'ngrok-skip-browser-warning': 'true',
    });

    return this.http.post(url, epcObj, { headers });
  }


  // List of Inverter and Modules
  getListPreferredModuleInverter() {
    const url = `${this.baseUrl}/instaroof/manufacturers/list/`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',  // Ensure JSON format
      'ngrok-skip-browser-warning': 'true',
    });

    return this.http.get(url, { headers });
  }


  // Update Profile configuration
  // updateProfileConfiguration(epcObj: any, id: any) {
  //   const url = `${this.baseUrl}/instaroof/configuration/update/${id}/`;

  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',  // Ensure JSON format

  //   });

  //   return this.http.patch(url, epcObj, { headers });

  // }



  // Update Profile Basic data
  updateProfileConfiguration(epcObj: any, id: any) {
    const url = `${this.baseUrl}/instaroof/configuration/update/${id}/`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',  // Ensure JSON format
    });
    return this.http.put(url, epcObj, { headers });
  }



}


