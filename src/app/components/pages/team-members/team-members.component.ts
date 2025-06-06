import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProfileTabService } from 'src/app/shared/services/profile-tab.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { NewRoofDataService } from 'src/app/shared/services/new-roof-data.service';
import { envDetails } from 'src/config/env.utils'; // Adjust path based on location of env.utils.ts
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-team-members',
  templateUrl: './team-members.component.html',
  styleUrls: ['./team-members.component.scss']
})
export class TeamMembersComponent implements OnInit {


  constructor(private notificationService: NotificationService, private profile: ProfileTabService, private router: Router, private modalService: NgbModal, private fb: FormBuilder,) { }

  teamMembersForm!: FormGroup;
  Data: any[] = [];
  totalItems: number = 0;
  pageSizeOptions: number[] = [5, 10, 50, 100];
  pageSize: number = 5;
  currentPage: number = 1;
  // maxPage: number = 0;
  maxPage = 4; // This should match the maxSize property in the template
  paginatedData: any[] = [];
  pastProjectIdToDelete: any;
  salutationChoice: any[] = ['Mr', 'Mrs', 'Ms', 'Dr', 'Prof'];
  modalRef: any;
  isEdit: boolean = false;
  teamMemberSubmit: any;
  teamMemberUpdate: any;
  photoPreview: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;
  teamMemberIdToDelete: any;
  teamMemberData: any;
  id: any;
  isLoader: boolean = false;
  photoRemoved: boolean = false;





  ngOnInit(): void {

    this.getTeamMembersData();
    //console.log('API URL:', envDetails.apiUrl);

    // Initialize the form
    this.teamMembersForm = this.fb.group({
      salutation: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)]],

      // ✅ Fixed mobile_number validators
      mobile_number: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],

      title: ['', Validators.required],
      linkedin: ['', [Validators.pattern(/^https?:\/\/(www\.)?linkedin\.com\/.*$/)]],
      instagram: ['', [Validators.pattern(/^https?:\/\/(www\.)?instagram\.com\/.*$/)]],
      facebook: ['', [Validators.pattern(/^https?:\/\/(www\.)?facebook\.com\/.*$/)]],
      // twitter: ['', [Validators.pattern(/^https?:\/\/(www\.)?twitter\.com\/.*$/)]],
      twitter: ['', [Validators.pattern(/^https?:\/\/(www\.)?x\.com\/.*$/)]],
      pinterest: ['', [Validators.pattern(/^https?:\/\/(www\.)?pinterest\.com\/.*$/)]],
      youtube: ['', [Validators.pattern(/^https?:\/\/(www\.)?youtube\.com\/.*$/)]],
      photo: [''],
    });



  }

  removePhoto() {
    this.photoPreview = null;
    this.selectedFile = null;
    this.photoRemoved = true; // Mark photo as removed
    this.teamMembersForm.patchValue({ photo: '' }); // Clear the form control value
    // Reset the file input field
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = ''; // Reset the file input field
    }
  }

  onPhotoUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {

      // ✅ Check file size (5MB = 5 * 1024 * 1024 bytes)
      if (file.size > 5 * 1024 * 1024) {
        // alert("File size must be less than 5MB!");
        // this.flag = true;
        // ✅ Reset file input to clear selected names
        input.value = '';
        Swal.fire({
          icon: 'error',
          title: "Error",
          html: ['File size must be less than 5MB!'],
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        });

        return; // Stop execution
      }

      // Optionally update the form control with metadata like the file name
      this.teamMembersForm.patchValue({ photo: file.name });
      this.teamMembersForm.get('photo')?.markAsTouched();

      // Store the file for upload or processing
      this.selectedFile = file;

      // Generate a preview
      const reader = new FileReader();
      reader.onload = () => {
        this.photoPreview = reader.result; // Base64 string for preview
      };
      reader.readAsDataURL(file);
    }
  }

  resetFileInput(input: HTMLInputElement): void {
    input.value = ''; // Clear the file input
    this.photoPreview = null;
    this.selectedFile = null;
    this.teamMembersForm.patchValue({ photo: '' }); // Clear the form control value
  }






  LargeSizeOpen(largesizemodal: any) {

    this.teamMembersForm.reset();
    this.photoPreview = null; // Clear the photo preview
    this.teamMembersForm.patchValue({ photo: '' }); // Clear the form control value
    this.isEdit = false;
    this.modalRef = this.modalService.open(largesizemodal, { size: 'lg', backdrop: 'static', centered: true });

  }

  closeModal() {
    if (this.modalRef) {
      // console.log(this.modalRef, "Close modal")
      this.modalRef.dismiss();
      this.modalRef.close();
      this.teamMembersForm.reset();
      this.photoPreview = null; // Clear the photo preview
      this.selectedFile = null;
      this.teamMembersForm.patchValue({ photo: '' }); // Clear the form control value

      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      if (fileInput) {
        fileInput.value = ''; // Reset the file input field
      }
    };
  }

  createaMember() {


    if (this.teamMembersForm.invalid) {
      this.teamMembersForm.markAllAsTouched();
      return
    }


    if (this.isEdit == false) {
      // Create a FormData object to send both file and other form fields
      const formData = new FormData();

      // Append other form fields from the teamMembersForm
      formData.append('salutation', this.teamMembersForm.value.salutation || '');
      formData.append('first_name', this.teamMembersForm.value.first_name || '');
      formData.append('last_name', this.teamMembersForm.value.last_name || '');
      formData.append('title', this.teamMembersForm.value.title || '');
      formData.append('email', this.teamMembersForm.value.email || '');
      formData.append('mobile_number', this.teamMembersForm.value.mobile_number || '');
      formData.append('linkedin', this.teamMembersForm.value.linkedin || '');
      formData.append('instagram', this.teamMembersForm.value.instagram || '');
      formData.append('facebook', this.teamMembersForm.value.facebook || '');
      formData.append('twitter', this.teamMembersForm.value.twitter || '');
      formData.append('pinterest', this.teamMembersForm.value.pinterest || '');
      formData.append('youtube', this.teamMembersForm.value.youtube || '');

      // Add the photo to the FormData only if it exists
      if (this.selectedFile) {
        formData.append('photo', this.selectedFile, this.selectedFile.name);
      } else {
        // Handle the case where no photo is provided (optional)
        // console.log('No photo selected');
        formData.append(`photo`, '')

      }

      // Log the FormData to verify it's being populated correctly
      //console.log(formData, 'formdata');

      this.isLoader = true;
      this.profile.CreateProfileTeamMembers(formData).subscribe(
        async (response: any) => {
          this.isLoader = false;
          Swal.fire({
            icon: 'success',
            title: "Success",
            html: 'Team Member Data Added Successfully',
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
          });
          this.closeModal();
          this.getTeamMembersData();
          this.notificationService.triggerFetchData();

        },
        (error: any) => {
          this.isLoader = false;

          Swal.fire({
            icon: 'error',
            title: "Error",
            html: error.error?.message || 'An error occurred!',
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
          });

        }
      );

    }

    else if (this.isEdit == true) {

      const formData = new FormData();

      // Append other form fields from the teamMembersForm
      formData.append('salutation', this.teamMembersForm.value.salutation || '');
      formData.append('first_name', this.teamMembersForm.value.first_name || '');
      formData.append('last_name', this.teamMembersForm.value.last_name || '');
      formData.append('title', this.teamMembersForm.value.title || '');
      formData.append('email', this.teamMembersForm.value.email || '');
      formData.append('mobile_number', this.teamMembersForm.value.mobile_number || '');
      formData.append('linkedin', this.teamMembersForm.value.linkedin || '');
      formData.append('instagram', this.teamMembersForm.value.instagram || '');
      formData.append('facebook', this.teamMembersForm.value.facebook || '');
      formData.append('twitter', this.teamMembersForm.value.twitter || '');
      formData.append('pinterest', this.teamMembersForm.value.pinterest || '');
      formData.append('youtube', this.teamMembersForm.value.youtube || '');

      // Add the photo to the FormData only if it exists
      if (this.selectedFile) {
        // console.log('selectedfile')
        formData.append('photo', this.selectedFile, this.selectedFile.name);

      }
      // Flag to track photo removal
      if (!this.selectedFile && this.photoRemoved) {
        // console.log('Photo removed');
        formData.append('photo', ''); // Send empty string or 'null' if backend expects it
      }
      else {
        // Handle the case where no photo is provided (optional)
        // console.log('No photo selected');

        // formData.append(`photo`, this.teamMemberData.photo)

      }
      this.isLoader = true;
      this.profile.UpdateTeamMember(formData, this.id).subscribe(
        async (response: any) => {
          this.isLoader = false;
          Swal.fire({
            icon: 'success',
            title: "Success",
            html: 'Team Member Data Updated Successfully',
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
          });
          this.closeModal();
          this.getTeamMembersData();
          this.photoRemoved = false;

        },
        (error: any) => {
          this.isLoader = false;
          console.log(error.status);

          Swal.fire({
            icon: 'error',
            title: "Error",
            html: error.error?.message.email ? error.error?.message.email : error.error?.message.mobile_number || 'An error occurred!',
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
          });

        }
      );

    }
  }


  getTeamMembersData() {

    this.isLoader = true;
    this.profile.getTeamMemberList().subscribe(
      async (response: any) => {
        this.isLoader = false;
        this.Data = []
        this.Data = response.results;
        this.totalItems = response.count;
        this.pageSize = response.results.length;

        this.updatePagination();
        this.paginateData();
      },
      (error: any) => {
        this.isLoader = false;
        console.log(error.status);

      }
    );
  }





  paginateData(): void {

    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.totalItems);
    this.paginatedData = this.Data.slice(startIndex, endIndex);
  }

  updatePagination(): void {
    this.maxPage = Math.ceil(this.totalItems / this.pageSize);
    if (this.maxPage > 10) {
      this.maxPage = 0; // Set to 0 to display all pages
    }
  }


  onPageChange(page: number): void {
    this.currentPage = page;
    this.isLoader = true;
    this.profile.getTeamMemberListPagination(this.currentPage).subscribe(
      async (response: any) => {
        this.isLoader = false;
        const newData = response.results
        this.Data = []
        this.Data = response.results

        this.updatePagination();
        this.paginateData();
      },
      (error: any) => {
        this.isLoader = false;
        console.error(error);
      }
    );
  }


  openConfirmationModal(id: number, confirmationModal1: any) {

    this.modalService.open(confirmationModal1, { centered: true });
    this.teamMemberIdToDelete = id;
  }

  // get team member databy id

  editTeamMember(id: any, largesizemodal: any) {
    this.modalRef = this.modalService.open(largesizemodal, { size: 'lg', backdrop: 'static', centered: true });
    this.isEdit = true;
    this.id = id;
    this.isLoader = true;

    this.profile.getTeamMemberDataById(id).subscribe({
      next: (response: any) => {
        this.isLoader = false;
        this.teamMemberData = response.data;

        // Ensure form is initialized
        if (this.teamMembersForm) {
          this.teamMembersForm.patchValue({
            salutation: this.teamMemberData.salutation || '',
            first_name: this.teamMemberData.first_name || '',
            last_name: this.teamMemberData.last_name || '',
            title: this.teamMemberData.title || '',
            email: this.teamMemberData.email || '',
            mobile_number: this.teamMemberData.mobile_number || '',
            linkedin: this.teamMemberData.linkedin || '',
            instagram: this.teamMemberData.instagram || '',
            facebook: this.teamMemberData.facebook || '',
            twitter: this.teamMemberData.twitter || '',
            pinterest: this.teamMemberData.pinterest || '',
            youtube: this.teamMemberData.youtube || ''
          });
        }

        // Set photo preview if available
        if (this.teamMemberData.photo) {
          this.photoPreview = `${envDetails.apiUrl}/${this.teamMemberData.photo}`;
        }
      },
      error: (err) => {
        this.isLoader = false;
        console.error('Error fetching team member data:', err);
        // Optional: Display an error message to the user
      }
    });
  }


  deleteTeamMember(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.isLoader = true;
        this.profile.DeleteTeamMember(id).subscribe(
          async (response: any) => {
            this.isLoader = false;
            Swal.fire({
              icon: 'success',
              title: "Success",
              html: 'Team Member Data Deleted Successfully',
              timer: 2000,
              timerProgressBar: true,
              showConfirmButton: false,
            });
            this.modalService.dismissAll('confirm');
            this.getTeamMembersData();
          },
          (error: any) => {
            this.isLoader = false;
            console.log(error.status);

          }
        );
      }
    });
  }

  close() {

    this.teamMembersForm.reset();
    this.photoPreview = null; // Clear the photo preview
    this.teamMembersForm.patchValue({ photo: '' }); // Clear the form control value
    this.closeModal();

  }


}


