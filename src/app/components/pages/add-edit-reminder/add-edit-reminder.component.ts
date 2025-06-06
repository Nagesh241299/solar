import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReminderService } from 'src/app/shared/services/reminder.service';

@Component({
  selector: 'app-add-edit-reminder',
  templateUrl: './add-edit-reminder.component.html',
  styleUrls: ['./add-edit-reminder.component.scss'],
  providers: [DatePipe]
})
export class AddEditReminderComponent implements OnInit {
  isEditMode: boolean = false;
  reminderForm!: FormGroup;
  filteredInteractionDays: number[][] = [];
  interactionTime: string[] = ['Minutes', 'Hours', 'Days'];
  interactionNote: string[] = ['Notification'];
  interactionTypes: string[] = ['Call', 'Task For Self'];
  minDate: Date;
  reminderId: string = '';
  isFormSubmitted:boolean =false;

  constructor(
    private reminderService: ReminderService,
    private datePipe: DatePipe,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.minDate = new Date();
    this.reminderForm = this.fb.group({
      interactionType: ['', Validators.required],
      reminder_date: [new Date(), Validators.required],
      notes: [''],
      notifications: this.fb.array([]) // Initialize notifications as a FormArray
    });

    // Add a default notification when the form is initialized
    this.addNotification();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.reminderId = params['id'];
      if (this.reminderId) {
        // Fetch reminder by id
        this.reminderService.editNotificationsById(this.reminderId).subscribe(
          (response: any) => {
            // Patch the retrieved data to the form
            this.reminderForm.patchValue({
              interactionType: response.interactionType || '', // Default to empty if not provided
              reminder_date: this.formatDateTimeForInput(response.reminder_date), // Format date for input
              notes: response.notes || '' // Default to empty if not provided
            });
  
            // Patch notifications if they exist
            if (response.interactionNote && response.interactionTime && response.interactionDays) {
              this.notifications.clear(); // Clear existing notifications
              this.notifications.push(this.fb.group({
                interactionNote: [response.interactionNote, Validators.required],
                interactionTime: [response.interactionTime, Validators.required],
                interactionDays: [response.interactionDays, Validators.required]
              }));
            }
  
            this.isEditMode = true;
          },
          (error: any) => {
            console.error(error);
          }
        );
      }
    });
  }
  
  // Helper function to format date for datetime-local input
  formatDateTimeForInput(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Add leading zero
    const day = ('0' + date.getDate()).slice(-2); // Add leading zero
    const hours = ('0' + date.getHours()).slice(-2); // Add leading zero
    const minutes = ('0' + date.getMinutes()).slice(-2); // Add leading zero
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  // Getter for notifications FormArray
  get notifications(): FormArray {
    return this.reminderForm.get('notifications') as FormArray;
  }

  // Getter for individual notification FormGroup
  getNotificationFormGroup(index: number): FormGroup {
    return this.notifications.at(index) as FormGroup;
  }

  // Add a new notification
  addNotification() {
    if (this.notifications.length < 2) { // Max 2 notifications
      const notificationForm = this.fb.group({
        interactionNote: ['Notification', Validators.required],
        interactionTime: ['', Validators.required],
        interactionDays: ['', Validators.required]
      });

      this.notifications.push(notificationForm);
      this.filteredInteractionDays.push(this.generateRange(1, 60)); // Default to Minutes
    }
  }

  // Delete a notification
  deleteNotification(index: number) {
    if (this.notifications.length > 1) { // Prevent deleting the last notification
      this.notifications.removeAt(index);
      this.filteredInteractionDays.splice(index, 1);
    }
  }

  // Handle interaction time change
  onInteractionTimeChange(event: Event, index: number) {
    const selectedTime = (event.target as HTMLSelectElement).value;
  
    // ✅ Reset interactionDays field to null to ensure no preselection
    this.notifications.at(index).get('interactionDays')?.setValue(null);
  
    // ✅ Clear existing options before updating
    this.filteredInteractionDays[index] = [];
  
    // ✅ Use setTimeout to delay setting options (prevents auto-selection)
    setTimeout(() => {
      if (selectedTime === 'Minutes') {
        this.filteredInteractionDays[index] = this.generateRange(1, 60);
      } else if (selectedTime === 'Hours') {
        this.filteredInteractionDays[index] = this.generateRange(1, 24);
      } else if (selectedTime === 'Days') {
        this.filteredInteractionDays[index] = this.generateRange(1, 31);
      } 
    });
  }

  // Generate a range of numbers
  generateRange(start: number, end: number): number[] {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }

  // Check if the notification section should be shown
  showNotificationSection(): boolean {
    const selectedType = this.reminderForm.get('interactionType')?.value;
    return selectedType === 'Call' || selectedType === 'Task For Self';
  }

  // Submit the form
  submit(form: FormGroup) {
    this.isFormSubmitted = true;
  
    // Check if the form is invalid
    if (form.invalid) {
      // console.log("Form is invalid, marking fields as touched.");
      Object.keys(form.controls).forEach((controlName) => {
        form.get(controlName)?.markAsTouched();
      });
      return;
    }
  
    // Get the selected reminder date and time from the form
    const selectedDateTime = new Date(form.value.reminder_date);
    const currentDateTime = new Date();
  
    // Check if the selected reminder date and time are in the past
    if (selectedDateTime < currentDateTime) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Date & Time',
        text: 'The selected reminder date and time are in the past. Please select a future date and time.',
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      return;
    }
  
    // Validate notifications
    const notificationsArray = form.get('notifications') as FormArray;
    if (notificationsArray && notificationsArray.value) {
      for (let i = 0; i < notificationsArray.length; i++) {
        const notification = notificationsArray.at(i).value;
  
        // Calculate the notification date based on interactionTime and interactionDays
        let notificationDate = new Date(selectedDateTime);
  
        switch (notification.interactionTime) {
          case 'Minutes':
            notificationDate.setMinutes(notificationDate.getMinutes() + notification.interactionDays);
            break;
          case 'Hours':
            notificationDate.setHours(notificationDate.getHours() + notification.interactionDays);
            break;
          case 'Days':
            notificationDate.setDate(notificationDate.getDate() + notification.interactionDays);
            break;
          default:
            break;
        }
  
        // Check if the notification date is in the past
        if (notificationDate < currentDateTime) {
          Swal.fire({
            icon: 'error',
            title: 'Invalid Notification Time',
            text: `The notification time for notification ${i + 1} is in the past. Please adjust the interaction time or days.`,
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
          });
          return;
        }
      }
    }
  
    // If all validations pass, proceed with form submission
    const temp = this.datePipe.transform(form.value.reminder_date, 'yyyy-MM-dd HH:mm:ss');
  
    const payload = {
      interactionType: form.value.interactionType,
      reminder_date: temp,
      notes: form.value.notes,
      notifications: form.value.notifications
    };
  
    if (this.isEditMode) {
      // Update existing reminder
      this.reminderService.editNotifications(payload, this.reminderId).subscribe(
        async (response: any) => {
          Swal.fire({
            icon: 'success',
            title: "Success",
            html: 'Reminder Updated Successfully',
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
          });
          setTimeout(() => {
            this.router.navigate(['/pages/notification-list']);
          }, 2000);
        },
        (error: any) => {
          console.error(error);
        }
      );
    } else {
      // Save new reminder
      this.reminderService.saveNotifications(payload).subscribe(
        async (response: any) => {
          Swal.fire({
            icon: 'success',
            title: "Success",
            html: 'Reminder Saved Successfully',
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
          });
          setTimeout(() => {
            this.router.navigate(['/pages/notification-list']);
          }, 2000);
        },
        (error: any) => {
          console.error(error);
        }
      );
    }
  }
  
  // Cancel and navigate back
  cancel() {
    this.router.navigate(['/pages/notification-list']);
  }
}