/* eslint-disable camelcase */
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { envDetails } from "../../../../config/env.utils";
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class BoqBuilderService {
  private baseUrl = envDetails.boqBuilderUrl;
  private apiUrl = envDetails.apiUrl;
  constructor(private http: HttpClient, private router: Router) { }

  getAllBrands()
  {
    return this.http.get(`${this.baseUrl}boq/api/brand`);
  }

  getPeakPower(brand:string,cellType:string)
  {
    return this.http.get(`${this.baseUrl}modules/pmacell?brand=${brand}&cellType=${cellType}`);
  }

  getRateVolatageAndCurrent()
  {
    return this.http.get(`${this.baseUrl}modules/rated_voltage_current`);
  }

  getAllModuleCellType(query_params:string)
  {
    return this.http.get(`${this.baseUrl}modules/celltype?make=${query_params}`);
  }

  getRatedACPowerInverter(brand:string,type:string)
  {
    return this.http.get(`${this.baseUrl}modules/rated_ac_power?brand=${brand}&type_=${type}`);
  }

  getDCConductMaterial(brand:string)
  {
    return this.http.get(`${this.baseUrl}modules/dc_conduct?make=${brand}`);
  }
  
  getDCCrossSectionalArea(brand:string,conductor:string)
  {
    return this.http.get(`${this.baseUrl}modules/cross_sectional_area?brand=${brand}&conductor=${conductor}`);
  }

  //Ac Cables API
  getACCablesNoOfCors()
  {
    return this.http.get(`${this.baseUrl}modules/get-number-of-cores`);
  }

  getACConductMaterial(brand:string)
  {
    return this.http.get(`${this.baseUrl}modules/ac_conduct?make=${brand}`);
  }

  getACCrossSectionalArea(brand:string,conductor:string)
  {
    return this.http.get(`${this.baseUrl}modules/cross_sectional_area_ac?brand=${brand}&conductor=${conductor}`);
  }

  //Earthing Type
  getEarthingType(brand:string)
  {
    return this.http.get(`${this.baseUrl}modules/earthing_type?make=${brand}`);
  }

  getEarthingElectrodeLength(brand:string,type:string)
  {
    return this.http.get(`${this.baseUrl}modules/electrode_length?brand=${brand}&type=${type}`);
  }

  getEarthingTerminalSize(brand:string,type:string,length:string)
  {
    return this.http.get(`${this.baseUrl}modules/terminal_size?brand=${brand}&type=${type}&electrode_length=${length}`);
  }

  generateBoQ(query:any)
  {
    let ctxt:any = localStorage.getItem("context");
    let userID:any = localStorage.getItem("boQKey") || null;
    let payload = {
      "query": query,
      "uid": userID ? atob(userID) : null,//"161d13d9-9689-4bdc-b1e2-211fad566318",//atob(userID),
      //"context": ctxt ? JSON.parse(atob(ctxt)) : [],
    };
    return this.http.post(`${this.baseUrl}boq/extract-project-details/`,payload);
  }

  calculateBoq(payload:any)
  {
    return this.http.post(`${this.baseUrl}boq/process-project`,payload);
  }

  saveBoQ(payload:any)
  {
    return this.http.post(`${this.apiUrl}/instaroof/boq/create/`,payload);
  }

  sendRFQOnEmail(payload:any)
  {
    return this.http.post(`${this.apiUrl}/instaroof/boq/send_boq_email/`,payload);
  }

  getBoQListing(pageNumber:any)
  {
      return this.http.get(`${this.apiUrl}/instaroof/boq/list/?page=${pageNumber}`);
  }

  deleteBoQ(id:any)
  {
    return this.http.delete(`${this.apiUrl}/instaroof/boq/delete/${id}/`);
  }

  getByIDBoQ(id:any)
  {
    return this.http.get(`${this.apiUrl}/instaroof/boq/get/${id}/`);
  }

  updateBoQ(id:any,payload:any)
  {
    return this.http.put(`${this.apiUrl}/instaroof/boq/update/${id}/`,payload);
  }

  getpincodeareabydistrict(pincode:any,area:any)
  {
    return this.http.get(`${this.apiUrl}/instaroof/getpincodeareabydistrict/${pincode}/${area}/`);
  }
}




