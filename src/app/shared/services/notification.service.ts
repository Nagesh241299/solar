import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  fetchTriggered$ = new Subject<void>(); // Ensure this exists

  triggerFetchData() {
    this.fetchTriggered$.next(); // Emit event
  }
}
