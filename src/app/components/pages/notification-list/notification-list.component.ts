/* eslint-disable camelcase */
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ReminderService } from 'src/app/shared/services/reminder.service';
import { MatCalendar, MatCalendarCellClassFunction, MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { DateAdapter } from '@angular/material/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { isPast } from 'date-fns';
@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss'],
  providers: [DatePipe]
  
})
export class NotificationListComponent {
  activeDayIsOpen: boolean = true;
  highlightDate: boolean = false;
  CalendarView = CalendarView;
  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();
  isEditMode: boolean = false;
  events: CalendarEvent[] = [];
  notifications1 = [
    { notes: 'Notification 1', reminder_date: new Date('2024-04-22') },
    { notes: 'Notification 2', reminder_date: new Date('2024-04-25') },
    { notes: 'Notification 3', reminder_date: new Date('2024-04-28') }
  ];
  reminderForm!: FormGroup;
  reminderTitles: { [key: string]: string } = {};
  @Output() refreshHeader: EventEmitter<void> = new EventEmitter<void>();

  constructor(private dialog: MatDialog,private dateAdapter: DateAdapter<Date>,private modalService: NgbModal,private datePipe: DatePipe,private reminderService: ReminderService,private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private http: HttpClient) {
 
      this.dateAdapter.setLocale('en-US'); // Set your locale here
  
  }
  hasReminder(date: Date): boolean {
    return this.notifications.some((notification: any) => notification.reminder_date.getDate() === date.getDate());
  }
  filterPastEvents(events: any[]): any[] {
    return events.filter(event => !isPast(event.start));
  }
  getReminderTitle(date: Date): string {

    const matchingReminders = this.notifications.filter(
      (reminder: any) =>
        new Date(reminder.reminder_date).getDate() === new Date(date).getDate() &&
        new Date(reminder.reminder_date).getMonth() === new Date(date).getMonth() &&
        new Date(reminder.reminder_date).getFullYear() === new Date(date).getFullYear()
    );

    const titles = matchingReminders.map((reminder: Reminder) => reminder.notes);
    return titles.length > 0 ? titles.join(', ') : '';
  }

  dateToKey(dateString: string): string {
    const date = new Date(dateString); // Parse the date string into a Date object
    return date.toISOString().split('T')[0]; // Convert to ISO string and extract the date part
  }
  dateClass(): MatCalendarCellClassFunction<Date> {
    return (date: Date): MatCalendarCellCssClasses => {
      // Call a separate method to handle logic dependent on this.notifications
      return this.getDateClass(date);
    };
  }
  

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
  getDateClass(date: Date): MatCalendarCellCssClasses {
    const reminderTitle = this.getReminderTitle(date);
    let vs = reminderTitle != '' ? { 'highlight-date': true, 'reminder-title': reminderTitle } : {}

    if (reminderTitle !== '') {
      // console.log('title', vs);
      this.highlightDate = true;
      return { 'highlight-date': true, 'reminder-title': reminderTitle };
    }
    return {};
  }
  remindersList:any=[]
  onDateSelected(event: any, viewModal: any) {
    this.remindersList = event.day.events;
  
    // Check if remindersList is not empty before opening the modal
    if (this.remindersList && this.remindersList.length > 0) {
      this.modalService.open(viewModal, {size: 'lg', centered: true });
    } 
  }
  companyIdToDelete: number = 0;
  showCalendar: boolean = false;
  notifications:any = [];
  ngOnInit(): void {

    this.reminderService.emitRefreshHeader();
    this.reminderService.getNotifications().subscribe(
      async (response: any) => {
      // console.log(response)
      this.showCalendar = true;
      response.forEach((notification:any) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const event: CalendarEvent = {
          id: notification.id,
          start: new Date(notification.reminder_date),
          title: notification.notes, // Use notes as the title
          color: { primary: '#ad2121', secondary: '#FAE3E3' }
        };
        this.events.push(event);
      });
      // console.log('final',this.events)
      this.notifications = response.sort((a: { reminder_date: string | number | Date; }, b: { reminder_date: string | number | Date; }) => {
    
        return new Date(b.reminder_date).getTime() - new Date(a.reminder_date).getTime();
      });

    
      // this.notifications.forEach((notification:any) => {
      //   const dateKey = this.dateToKey(notification.reminder_date);
      //   this.reminderTitles[dateKey] = notification.notes;
      // });

      // console.log('call')
      // this.mapNotificationsToDates()
      // this.dateClassPredicate(this.notifications);
      },
      (error: any) => {
        console.error(error);
   
      })
  }
  prevMonth(): void {
    this.viewDate = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth() - 1, 1);
  }

  

  // Function to navigate to the next month
  nextMonth(): void {
    this.viewDate = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth() + 1, 1);
  }
  setView(view: CalendarView) {
    this.view = view;
  }
  mappedDates: { [key: string]: string[] } = {};
  mapNotificationsToDates() {
    this.notifications.forEach((notification: { reminder_date: any; notes: any; }) => {
      if (notification.reminder_date instanceof Date) {
        const dateKey = notification.reminder_date.toDateString();
        if (!this.mappedDates[dateKey]) {
          this.mappedDates[dateKey] = [];
        }
  
        const noteWithDate = `${notification.reminder_date.toDateString()}: ${notification.notes}`;
        this.mappedDates[dateKey].push(noteWithDate);
      }
    });
  }

  getFormattedViewTitle(): string {
    if (this.view === CalendarView.Month) {
      // For month view, display full month and year
      return moment(this.viewDate).format('MMMM YYYY');
    } else if (this.view === CalendarView.Week) {
      // For week view, display full month name and week range
      const startOfWeek = moment(this.viewDate).startOf('week').format('D');
      const endOfWeek = moment(this.viewDate).endOf('week').format('D');
      const month = moment(this.viewDate).format('MMMM');
      return `${month}, ${startOfWeek}-${endOfWeek}`;
    }
    return moment(this.viewDate).format('MMMM YYYY'); // Default fallback
  }
  

  dateClassPredicate = (dates: { reminder_date: string, notes: string }[]): string | string[] => {
    const highlightedDates: string[] = [];

    dates.forEach(dateInfo => {
        const date = new Date(dateInfo.reminder_date);
        const dateKey = date.toDateString();
        const notificationsForDate = this.notifications.filter((notification: { reminder_date: string | number | Date; }) => {
            return new Date(notification.reminder_date).toDateString() === dateKey;
        });

        if (notificationsForDate.length > 0) {
            highlightedDates.push('has-notifications'); // Add CSS class for dates with notes

            // Add title attribute with notes information
            // const notes = notificationsForDate.map((notification: { notes: any; }) => notification.notes).join('\n');
            // dateInfo.notes = notes; // Add notes to dateInfo object
        }
    });

    return highlightedDates;
};


 
  getNotesForDate(date: Date): string {
    const dateKey = date.toDateString();
    return this.mappedDates[dateKey] ? this.mappedDates[dateKey].join('\n') : '';
  }
  getTooltip = (date: Date): string | undefined => {
    if (date instanceof Date) {
    const dateKey = date.toDateString();
    const notificationsForDate = this.mappedDates[dateKey];
  
    if (notificationsForDate && notificationsForDate.length > 0) {
      const tooltipContent = notificationsForDate.join('<br>');
      return tooltipContent;
    }
    }
      return undefined;
    
  
  };
  openConfirmationModal(companyId: number, confirmationModal1: any) {

    this.modalService.open(confirmationModal1, { centered: true });


    this.companyIdToDelete = companyId;
  }
  isDateTimeTodayOrFuture(eventDateTime: string): boolean {
    const now = moment();
    const eventDateTimeMoment = moment(eventDateTime);

    return eventDateTimeMoment.isSameOrAfter(now);
}
  addEditPage()
  {
    this.router.navigate(['/pages/add-edit-my-roof']);
  }
  addEditPage1(companyId: number) {
    this.modalService.dismissAll()
    this.router.navigate(['/pages/edit-reminder', companyId]);
  }
  addEditPage2(event: any) {
    // console.log(event)
    this.modalService.dismissAll()
     this.router.navigate(['/pages/edit-reminder', event.id]);
  }
  private emitRefreshHeader() {
    this.refreshHeader.emit();
  }
  isAnyEventPast(events: CalendarEvent<any>[]): boolean {
    return events.some(event => this.isEventPast(event));
  }
  isEventPast(event: CalendarEvent): boolean {
    const currentDateTime = new Date();
    const eventDateTime = new Date(event.start);

    // Compare the years, months, days, hours, and minutes
    if (eventDateTime.getFullYear() < currentDateTime.getFullYear()) {
        return true;
    } else if (eventDateTime.getFullYear() === currentDateTime.getFullYear() && 
               eventDateTime.getMonth() < currentDateTime.getMonth()) {
        return true;
    } else if (eventDateTime.getMonth() === currentDateTime.getMonth() && 
               eventDateTime.getDate() < currentDateTime.getDate()) {
        return true;
    } else if (eventDateTime.getDate() === currentDateTime.getDate() && 
               eventDateTime.getHours() < currentDateTime.getHours()) {
        return true;
    } else if (eventDateTime.getHours() === currentDateTime.getHours() && 
               eventDateTime.getMinutes() < currentDateTime.getMinutes()) {
        return true;
    }

    // If none of the above conditions are met, the event is in the future
    return false;
}
  deleteNotification()
  {
    this.reminderService.deleteNotificationsById(this.companyIdToDelete).subscribe(
      async (response: any) => {

        Swal.fire({
          icon: 'success',
          title: "Success",
          html: 'Reminder Deleted Successfully',
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
    });
        this.modalService.dismissAll('confirm');
        this.reminderService.emitRefreshHeader();
        this.showCalendar = false
        this.events = [];
     
        this.reminderService.getNotifications().subscribe(
          async (response: any) => {
          // console.log(response)
          this.showCalendar = true;
          response.forEach((notification:any) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const event: CalendarEvent = {
              id: notification.id,
              start: new Date(notification.reminder_date),
              title: notification.notes, // Use notes as the title
              color: { primary: '#ad2121', secondary: '#FAE3E3' }
            };
            this.events.push(event);
          });
          this.viewDate = new Date();
          this.notifications = response.sort((a: { reminder_date: string | number | Date; }, b: { reminder_date: string | number | Date; }) => {
         
            return new Date(b.reminder_date).getTime() - new Date(a.reminder_date).getTime();
          }); 
          },
          (error: any) => {
            console.error(error);
       
          })

       })

  }
  formatDateTime(dateTime: string): string {

    const formattedDate = this.datePipe.transform(dateTime, 'MMM d, y');
    const formattedTime = this.datePipe.transform(dateTime, 'hh:mm a');
    return `${formattedDate} ${formattedTime}`;
  }
}
interface Reminder {
  reminder_date: Date;
  notes: string;
}
