import { Component, OnInit, Renderer2 } from '@angular/core';
import { ReminderService } from './shared/services/reminder.service';
import { EnvService } from './shared/services/env.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  public isSpinner = true;
  showBellNotification = false;
  constructor(private reminderService: ReminderService, private renderer: Renderer2, private envService: EnvService) { }
  ngOnInit(): void {
    setTimeout(() => {
      this.isSpinner = false;
    },1000);

    const mapKey = this.envService.getMapKey();
    const script = this.renderer.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${mapKey}`;
    script.async = true;
    script.defer = true;
    this.renderer.appendChild(document.body, script)

 
      // setInterval(() => {
      //   this.showBellNotification = true;
      //   getPendingNotificationsList
      //   this.reminderService.checkReminder();
      // }, 15 * 60 * 1000); 

  }
}
