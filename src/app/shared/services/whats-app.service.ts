import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { envDetails } from "../../../config/env.utils";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})


export class WhatsAppService {

  constructor(private http: HttpClient, private router: Router) { }

  private baseUrl = envDetails.apiUrl;
  private token: any = ''


  GetWhatsAppMessages() {

    const url = `${this.baseUrl}/instaroof/template-messages/list`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    // Requesting the file as a Blob

    return this.http.get(url, { headers });
  }

  GetWhatsAppMessagesPagination(pageId: any) {

    const url = `${this.baseUrl}/instaroof/template-messages/list/?page=${pageId}`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    // Requesting the file as a Blob

    return this.http.get(url, { headers });
  }





  // Create WhatsApp message
  CreateWhatsAppMessage(epcObj: any) {

    const url = `${this.baseUrl}/instaroof/template-messages/create/`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.post(url, epcObj, { headers });
  }

  // get whatsApp message by particular id, or update
  whataAppMessagebyTemplateid(template_id: any) {
    const url = `${this.baseUrl}/instaroof/template-messages/${template_id}/`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.get(url, { headers });
  }


  //update WhatsApp Message
  updateWhatsAppMessage(epcObj: any, id: any) {

    const url = `${this.baseUrl}/instaroof/template-messages/update/${id}/`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.put(url, epcObj, { headers });
  }

  DeleteWhatsAppMessage(id: any) {

    const url = `${this.baseUrl}/instaroof/template-messages/delete/${id}/`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.delete(url, { headers });
  }


  // Send WhatsApp message
  SendWhatsAppMessage(epcObj: any) {

    const url = `${this.baseUrl}/instaroof/send-whatsapp-message/create/`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.post(url, epcObj, { headers });
  }


  // Get Contact List
  GetContacts() {

    const url = `${this.baseUrl}/instaroof/whatsapp-message/list/`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.get(url, { headers });
  }

  GetContactsPage(pageId: any) {

    const url = `${this.baseUrl}/instaroof/whatsapp-message/list/?page=${pageId}`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.get(url, { headers });
  }


  //Get whatsApp messages by particuar roof_id
  whataAppMessagesbyroofId(roof_id: any) {
    const url = `${this.baseUrl}/instaroof/whatsapp-message/roof/${roof_id}/`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.get(url, { headers });
  }

  // Get WhatsAppmessage replylist for particular roof_id

  // https://instaroof-dev-be.corecotechnologies.com/instaroof/webhook/00a7c73a-98ac-4927-91d4-9a88ee023802
  whataAppMessagesReplyList(roof_id: any) {
    const url = `${this.baseUrl}/instaroof/webhook/${roof_id}/`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.get(url, { headers });
  }

  whataAppMessagesReplyListPagination(roof_id: any, pageId: any) {
    const url = `${this.baseUrl}/instaroof/webhook/${roof_id}/?page=${pageId}`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.get(url, { headers });
  }

}
