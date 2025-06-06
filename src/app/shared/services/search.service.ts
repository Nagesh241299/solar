/* eslint-disable camelcase */
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { envDetails } from "../../../config/env.utils";
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private baseUrl = envDetails.apiUrl;
  private token: any = ''
  constructor(private http: HttpClient, private router: Router) { }

  mapMultipleAddresses(companyName: string) {
    const url = `${this.baseUrl}/mapAddresses/multiple_company_details/`;
    //   const url = `${this.baseUrl}/api/check_status/`;
    const params = new HttpParams().set('company_name', companyName);
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      // Add other headers if needed
    });

    return this.http.get(url, { headers, params });

  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  saveCompanyAddresses(company: any) {
    const url = `${this.baseUrl}/mapAddresses/save_company_details/`;

    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.post(url, company, { headers });
  }

  emailVerification(company: any) {
    const url = `${this.baseUrl}/auth_api/signup_with_email_verification/`;

    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.post(url, company, { headers });
  }

  // completeSignup(company: any) {
  //   // const url = `${this.baseUrl}/auth_api/complete_signup/`;
  //  const url = `${this.baseUrl}/djoser_custom/api/user/signup/`;

  //   const headers = new HttpHeaders({
  //     'ngrok-skip-browser-warning': 'true',
  //     'Content-Type': 'application/json', 
  //   }); 

  //   return this.http.post(url, company, { headers });
  // }

  saveEpcData(epcObj: any) {
    const url = `${this.baseUrl}/instaroof/epc-data/`;
    // const url = `${this.baseUrl}/djoser_custom/solar-epc/`;

    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.post(url, epcObj, { headers });
  }
  EpcData() {
    const url = `${this.baseUrl}/instaroof/epc-data/data-with-mappings/`;
    // const url = `${this.baseUrl}/djoser_custom/solar-epc-detail/`;

    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.get(url, { headers });
  }
  EpcDataWithId(id: any) {
    const url = `${this.baseUrl}/instaroof/epc-data/data-with-mappings/${id}/`;
    // const url = `${this.baseUrl}/djoser_custom/solar-epc-detail/`;

    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.get(url, { headers });
  }
  allEpcData() {
    const url = `${this.baseUrl}/djoser_custom/solar-epc/`;

    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.get(url, { headers });
  }
  editEpcData(epcObj: any, id: any) {
    const url = `${this.baseUrl}/instaroof/epc-data/update/${id}/`;
    // const url = `${this.baseUrl}/djoser_custom/solar-epc/${id}/`;

    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.put(url, epcObj, { headers });
  }
  // let i = ${id}/`;
  editEpcDataByCompanyId(id: any) {
    // const url = `${this.baseUrl}/djoser_custom/solar-epc-detail/`;
    const url = `${this.baseUrl}/instaroof/epc-data/data-with-mappings/`;

    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.get(url, { headers });
  }

  saveUserData(epcObj: any) {
    // const url = `${this.baseUrl}/djoser_custom/roof_top_data/`;
    const url = `${this.baseUrl}/instaroof/roof-top-data/create/`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.post(url, epcObj, { headers });
  }
  allUserData() {

    const url = `${this.baseUrl}/instaroof/rooftopBasicDetails/`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.get(url, { headers });
  }
  allUserDataPagination(pageId: any) {

    const url = `${this.baseUrl}/instaroof/rooftopBasicDetails/?page=${pageId}`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.get(url, { headers });
  }
  allUserDataMap() {

    const url = `${this.baseUrl}/instaroof/roof-top-map-data/`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.get(url, { headers });
  }
  allUserDataMapWithFilter(location: string, roofType: string, installationStatus: boolean, minValue1: number, maxValue1: number) {
    const url = `${this.baseUrl}/instaroof/roof-top-map-data/`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });
    console.log('status:', installationStatus)
    // Construct parameters
    let params = new HttpParams();
    if (location) params = params.set('address', location);
    if (roofType) params = params.set('roof_type', roofType);
    if (typeof installationStatus === 'string' && installationStatus == '<empty string>') {

    }
    else if (typeof installationStatus === 'boolean') {
      if (installationStatus == true) params = params.set('solar_installation_status', installationStatus);
      if (installationStatus == false) params = params.set('solar_installation_status', installationStatus);
    }
    if (minValue1) params = params.set('solar_power_generation_potential_min', minValue1.toString());
    if (maxValue1) params = params.set('solar_power_generation_potential_max', maxValue1.toString());

    return this.http.get(url, { headers, params });
  }
  allSearchData(search: string | number | boolean) {

    const url = `${this.baseUrl}/instaroof/roof-top-data/search/`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    // Construct parameters
    let params = new HttpParams();
    if (search) params = params.set('search_query', search);
    return this.http.get(url, { headers, params });
  }
  allSearchDataFilter(search: string | number | boolean, page: number) {
    const url = `${this.baseUrl}/instaroof/roof-top-data/search/`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    // Construct parameters
    let params = new HttpParams();
    if (page) params = params.set('page', page)
    if (search) params = params.set('search', search);
    return this.http.get(url, { headers, params });
  }
  editUserData(epcObj: any, id: any) {
    // const url = `${this.baseUrl}/djoser_custom/roof_top_data/${id}/`;
    const url = `${this.baseUrl}/instaroof/roof-top-data/update/${id}/`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.put(url, epcObj, { headers });
  }
  editUserDataByUserId(id: any) {
    // const url = `${this.baseUrl}/djoser_custom/roof_top_data/${id}/`;
    // const url = `${this.baseUrl}/instaroof/roof-top-data/${id}/`;
    const url = `${this.baseUrl}/instaroof/rooftopBasicDetails/get/${id}/`
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.get(url, { headers });
  }
  deleteUserData(id: any) {

    const url = `${this.baseUrl}/instaroof/rooftopBasicDetails/delete/${id}/`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.delete(url, { headers });
  }
  userotp(otp: any) {
    // const url = `${this.baseUrl}/djoser_custom/api/user/check-otp/`;
    const url = `${this.baseUrl}/instaroof/user/check-otp/`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });
    return this.http.post(url, otp, { headers }).pipe(
      map((response: any) => {
        // Assuming the token is in a property named 'token' in the response
        this.token = response.token;

        if (response.token) {
          localStorage.setItem('token', this.token);
        }

        if (response.UserID) {
          localStorage.setItem('boQAutherity', btoa(response.UserID));
        }
        // localStorage.setItem('user', response.user_type);

        return response;
      })
    )
    // return response.token;
    // return this.http.post(url, otp, { headers });
  }

  epclogin(email: any) {
    const url = `${this.baseUrl}/djoser_custom/api/solarepc-users/login/`;

    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.post(url, email, { headers });
  }

  RoofTopRequest() {
    const url = `${this.baseUrl}/instaroof/roof-top-data/requests`;

    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.get(url, { headers });
  }
  RoofTopRequestPagination(pageId: any) {
    // const url = `${this.baseUrl}/djoser_custom/roof_top_data/`;
    const url = `${this.baseUrl}/instaroof/roof-top-data/requests?page=${pageId}`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.get(url, { headers });
  }
  leadSearchFilter(
    // eslint-disable-next-line camelcase
    solar_installation_status?: string,
    // eslint-disable-next-line camelcase
    lead_type?: string,
    roof_type?: string,
    solar_installation_capacity_less_than?: number,
    solar_installation_capacity_greater_than?: number,
    solar_power_generation_potential_less_than?: number,
    solar_power_generation_potential_greater_than?: number,


    company_type?: string,
    info_available?: string,
    // search_query?: string,
    sort_by_solar_potential?: string
  ): Observable<any> {

    const url = `${this.baseUrl}/instaroof/search-lead/list/`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    console.log(roof_type)
    let params = new HttpParams();

    if (solar_installation_status) {


      params = params.set('solar_installation_status', solar_installation_status.replace(/%20|%25/g, ' '));
    }
    if (lead_type) {
      params = params.set('lead_type', lead_type.replace(/%20|%25/g, ' '));

    }
    if (roof_type) {

      params = params.set('roof_type', roof_type.replace(/%20|%25/g, ' '));
    }
    // if (solar_installation_capacity_less_than != 0) {
    if (solar_installation_capacity_less_than != undefined) {
      params = params.set('solar_installation_capacity_less_than', solar_installation_capacity_less_than);
    }
    // }
    // if (solar_installation_capacity_less_than != 0) {
    if (solar_installation_capacity_greater_than != undefined) {
      params = params.set('solar_installation_capacity_greater_than', solar_installation_capacity_greater_than);
    }
    // }





    // if(solar_power_generation_potential_less_than !== 0)
    // {

    if (solar_power_generation_potential_less_than !== undefined) {

      params = params.set('solar_power_generation_potential_less_than', solar_power_generation_potential_less_than);
    }
    // }




    // if (solar_power_generation_potential_less_than !== 0) {
    //   console.log('values1')
    if (solar_power_generation_potential_greater_than !== undefined) {
      console.log('values3')
      params = params.set('solar_power_generation_potential_greater_than', solar_power_generation_potential_greater_than);

    }


    // }

    console.log(params)

    if (sort_by_solar_potential) {
      params = params.set('sort_by_solar_potential', sort_by_solar_potential);
    }
    if (company_type) {

      params = params.set('company_type', company_type.replace(/%20|%25/g, ' '));
    }
    if (info_available) {
      params = params.set('info_available_query', info_available.replace(/%20|%25/g, ' '));
    }

    return this.http.get(url, { headers, params });
  }
  leadSearchFilterPagination(
    // eslint-disable-next-line camelcase
    page: number,
    solar_installation_status?: string,
    // eslint-disable-next-line camelcase
    lead_type?: string,
    roof_type?: string,
    solar_installation_capacity_less_than?: number,
    solar_installation_capacity_greater_than?: number,
    solar_power_generation_potential_less_than?: number,
    solar_power_generation_potential_greater_than?: number,


    company_type?: string,
    info_available?: string,
    // search_query?: string,
    sort_by_solar_potential?: string
  ): Observable<any> {

    const url = `${this.baseUrl}/instaroof/search-lead/list/`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    console.log(roof_type)
    let params = new HttpParams();

    params = params.set('page', page)
    if (solar_installation_status) {


      params = params.set('solar_installation_status', solar_installation_status.replace(/%20|%25/g, ' '));
    }
    if (lead_type) {
      params = params.set('lead_type', lead_type.replace(/%20|%25/g, ' '));

    }
    if (roof_type) {

      params = params.set('roof_type', roof_type.replace(/%20|%25/g, ' '));
    }
    // if (solar_installation_capacity_less_than != 0) {
    if (solar_installation_capacity_less_than != undefined) {
      params = params.set('solar_installation_capacity_less_than', solar_installation_capacity_less_than);
    }
    // }
    // if (solar_installation_capacity_less_than != 0) {
    if (solar_installation_capacity_greater_than != undefined) {
      params = params.set('solar_installation_capacity_greater_than', solar_installation_capacity_greater_than);
    }
    // }





    // if(solar_power_generation_potential_less_than !== 0)
    // {

    if (solar_power_generation_potential_less_than !== undefined) {

      params = params.set('solar_power_generation_potential_less_than', solar_power_generation_potential_less_than);
    }
    // }




    // if (solar_power_generation_potential_less_than !== 0) {
    //   console.log('values1')
    if (solar_power_generation_potential_greater_than !== undefined) {
      console.log('values3')
      params = params.set('solar_power_generation_potential_greater_than', solar_power_generation_potential_greater_than);

    }


    // }

    console.log(params)

    if (sort_by_solar_potential) {
      params = params.set('sort_by_solar_potential', sort_by_solar_potential);
    }
    if (company_type) {

      params = params.set('company_type', company_type.replace(/%20|%25/g, ' '));
    }
    if (info_available) {
      params = params.set('info_available_query', info_available.replace(/%20|%25/g, ' '));
    }

    return this.http.get(url, { headers, params });
  }
  leadSearchWithoutFilter(

  ): Observable<any> {

    const url = `${this.baseUrl}/instaroof/search-lead/list/`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    // console.log(roof_type)

    return this.http.get(url, { headers });
  }
  leadSearchWithoutFilterPagination(pageId: any) {

    const url = `${this.baseUrl}/instaroof/search-lead/list/?page=${pageId}`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    // console.log(roof_type)

    return this.http.get(url, { headers });
  }
  homeSearchFilter(
    // eslint-disable-next-line camelcase
    solar_installation_status?: string,
    // eslint-disable-next-line camelcase
    lead_type?: string,
    roof_type?: string,
    solar_installation_capacity_less_than?: number,
    solar_installation_capacity_greater_than?: number,
    solar_power_generation_potential_less_than?: number,
    solar_power_generation_potential_greater_than?: number,


    company_type?: string,
    search_query?: string,
    sort_by_solar_potential?: string
  ): Observable<any> {

    const url = `${this.baseUrl}/instaroof/roof-top-data/search/`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    console.log(roof_type)
    let params = new HttpParams();

    if (solar_installation_status) {


      params = params.set('solar_installation_status', solar_installation_status.replace(/%20|%25/g, ' '));
    }
    if (lead_type) {
      params = params.set('lead_type', lead_type.replace(/%20|%25/g, ' '));

    }
    if (roof_type) {

      params = params.set('roof_type', roof_type.replace(/%20|%25/g, ' '));
    }
    // if (solar_installation_capacity_less_than != 0) {
    if (solar_installation_capacity_less_than != undefined) {
      params = params.set('solar_installation_capacity_less_than', solar_installation_capacity_less_than);
    }
    // }
    // if (solar_installation_capacity_less_than != 0) {
    if (solar_installation_capacity_greater_than != undefined) {
      params = params.set('solar_installation_capacity_greater_than', solar_installation_capacity_greater_than);
    }
    // }





    // if(solar_power_generation_potential_less_than !== 0)
    // {

    if (solar_power_generation_potential_less_than !== undefined) {

      params = params.set('solar_power_generation_potential_less_than', solar_power_generation_potential_less_than);
    }
    // }




    // if (solar_power_generation_potential_less_than !== 0) {
    //   console.log('values1')
    if (solar_power_generation_potential_greater_than !== undefined) {
      console.log('values3')
      params = params.set('solar_power_generation_potential_greater_than', solar_power_generation_potential_greater_than);

    }


    // }

    console.log(params)

    if (sort_by_solar_potential) {
      params = params.set('sort_by_solar_potential', sort_by_solar_potential);
    }
    if (company_type) {

      params = params.set('company_type', company_type.replace(/%20|%25/g, ' '));
    }
    if (search_query) {
      params = params.set('search_query', search_query);
    }

    return this.http.get(url, { headers, params });
  }
  homeSearchFilterPagination(
    // eslint-disable-next-line camelcase
    page: number,
    solar_installation_status?: string,
    // eslint-disable-next-line camelcase
    lead_type?: string,
    roof_type?: string,
    solar_installation_capacity_less_than?: number,
    solar_installation_capacity_greater_than?: number,
    solar_power_generation_potential_less_than?: number,
    solar_power_generation_potential_greater_than?: number,


    company_type?: string,
    search_query?: string,
    sort_by_solar_potential?: string
  ): Observable<any> {

    const url = `${this.baseUrl}/instaroof/roof-top-data/search/`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    console.log(roof_type)
    let params = new HttpParams();
    params = params.set('page', page);
    if (solar_installation_status) {


      params = params.set('solar_installation_status', solar_installation_status.replace(/%20|%25/g, ' '));
    }
    if (lead_type) {
      params = params.set('lead_type', lead_type.replace(/%20|%25/g, ' '));

    }
    if (roof_type) {

      params = params.set('roof_type', roof_type.replace(/%20|%25/g, ' '));
    }
    // if (solar_installation_capacity_less_than != 0) {
    if (solar_installation_capacity_less_than != undefined) {
      params = params.set('solar_installation_capacity_less_than', solar_installation_capacity_less_than);
    }
    // }
    // if (solar_installation_capacity_less_than != 0) {
    if (solar_installation_capacity_greater_than != undefined) {
      params = params.set('solar_installation_capacity_greater_than', solar_installation_capacity_greater_than);
    }
    // }





    // if(solar_power_generation_potential_less_than !== 0)
    // {

    if (solar_power_generation_potential_less_than !== undefined) {

      params = params.set('solar_power_generation_potential_less_than', solar_power_generation_potential_less_than);
    }
    // }




    // if (solar_power_generation_potential_less_than !== 0) {
    //   console.log('values1')
    if (solar_power_generation_potential_greater_than !== undefined) {
      console.log('values3')
      params = params.set('solar_power_generation_potential_greater_than', solar_power_generation_potential_greater_than);

    }


    // }

    console.log(params)

    if (sort_by_solar_potential) {
      params = params.set('sort_by_solar_potential', sort_by_solar_potential);
    }
    if (company_type) {

      params = params.set('company_type', company_type.replace(/%20|%25/g, ' '));
    }
    if (search_query) {
      params = params.set('search_query', search_query);
    }

    return this.http.get(url, { headers, params });
  }

  //For graph
  MonthlySolarPowerGenerationData(id: any) {

    const url = `${this.baseUrl}/instaroof/roof-top-data/monthly-solar-power-generation/${id}/0`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.get(url, { headers });
  }

  //FutureData for graph
  FutureSolarPowerGenerationData(id: any) {

    const url = `${this.baseUrl}/instaroof/roof-top-data/future-solar-power-generation/${id}/`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.get(url, { headers });
  }

  //interaction list data
  InteractionsRoofListData(id: any) {

    const url = `${this.baseUrl}/instaroof/interactions/roof_list/${id}/`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.get(url, { headers });
  }

  //interaction list data with pagination
  InteractionsRoofListDataPagination(id: any, pageId: any) {

    const url = `${this.baseUrl}/instaroof/interactions/roof_list/${id}/?page=${pageId}`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.get(url, { headers });
  }

  //  Create Interactions
  saveInteractionData(epcObj: any) {

    const url = `${this.baseUrl}/instaroof/interactions/create/`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.post(url, epcObj, { headers });
  }


  InteractionDatabyId(id: any) {

    const url = `${this.baseUrl}/instaroof/interactions/${id}/`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.get(url, { headers });
  }

  // update interaction data
  updateInteractionData(epcObj: any, id: any) {

    const url = `${this.baseUrl}/instaroof/interactions/edit/${id}/`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.put(url, epcObj, { headers });
  }

  // Delete Interaction data
  DeleteInteractionbyId(ineractionId: any) {

    const url = `${this.baseUrl}/instaroof/interactions/delete/${ineractionId}/`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.delete(url, { headers });
  }


  logout() {
    // const url = `${this.baseUrl}/djoser_custom/api/user/logout/`;
    const url = `${this.baseUrl}/instaroof/user/logout/`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });
    console.log(headers)
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('searchTerm');
    return this.http.post(url, {}, { headers });

  }



}
