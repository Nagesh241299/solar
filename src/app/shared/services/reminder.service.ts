// reminder.service.ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { envDetails } from 'src/config/env.utils';
import { AdminService } from './admin.service';
@Injectable({
  providedIn: 'root'
})
export class ReminderService {
  private reminderSubject = new Subject<void>();
  interactionOccurred = new EventEmitter<void>();
  private baseUrl = envDetails.apiUrl;
  private token: any = ''
  constructor(private http: HttpClient, private router: Router, private adminService: AdminService) { }

  private refreshHeaderSubject = new Subject<void>();

  refreshHeader$ = this.refreshHeaderSubject.asObservable();
  getNotifications() {
    const url = `${this.baseUrl}/instaroof/reminders/list/`;
    // const url = `${this.baseUrl}/djoser_custom/solar-epc-detail/`;

    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.get(url, { headers });
  }

  emitRefreshHeader(): void {
    this.refreshHeaderSubject.next();
  }

  emitInteractionOccurred(): void {
    this.interactionOccurred.emit();
  }


  fetchCreditData() {
    return this.adminService.AllCreditpointsData();
  }
  saveNotifications(details: any) {
    const url = `${this.baseUrl}/instaroof/reminders/create/`;

    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.post(url, details, { headers });
  }
  editNotifications(details: any, id: any) {
    const url = `${this.baseUrl}/instaroof/reminders/edit/${id}/`;


    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.put(url, details, { headers });
  }
  editNotificationsWithStatus(details: any, id: any) {
    const url = `${this.baseUrl}/instaroof/reminders/edit/${id}/`;


    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.put(url, details, { headers });
  }
  // let i = ${id}/`;
  editNotificationsById(id: any) {

    const url = `${this.baseUrl}/instaroof/reminders/${id}/`;

    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.get(url, { headers });
  }

  deleteNotificationsById(id: any) {
    const url = `${this.baseUrl}/instaroof/reminders/delete/${id}/`;

    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.delete(url, { headers });
  }
  checkReminder() {
    const reminderTime = new Date("2024-04-03T12:00:00");
    const now = new Date();
    const timeDiff = reminderTime.getTime() - now.getTime();
    const minutesDiff = Math.round(timeDiff / (1000 * 60));

    if (minutesDiff <= 30 && minutesDiff >= 0) {
      this.getPendingNotifications();
      this.reminderSubject.next();
    }
    console.log('reminderssss');
  }

  private getPendingNotifications() {
    const url = `${this.baseUrl}/instaroof/reminders/get-pending-notifications/`;
    this.http.get(url).subscribe(
      (response: any) => {
        this.reminderSubject.next(response);
      },
      (error: any) => {
        console.error('Error fetching pending notifications:', error);
      }
    );
  }
  getPendingNotificationsList() {
    const url = `${this.baseUrl}/instaroof/reminders/get-pending-notifications/`;
    // const url = `${this.baseUrl}/djoser_custom/solar-epc-detail/`;

    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.get(url, { headers });
  }
  getReminderSubject() {
    return this.reminderSubject.asObservable();
  }


  readRemainder(details: any, id: any) {
    const url = `${this.baseUrl}/instaroof/reminders/mark_read/${id}/`;


    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.patch(url, details, { headers });
  }




}
