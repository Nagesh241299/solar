import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProfileTabService } from 'src/app/shared/services/profile-tab.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { envDetails } from 'src/config/env.utils'; // Adjust path based on location of env.utils.ts
import Swal from 'sweetalert2';
import { NotificationService } from 'src/app/shared/services/notification.service';

//console.log('API URL:', envDetails.apiUrl);


@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss']
})
export class TestimonialsComponent implements OnInit {

  baseUrl = envDetails.apiUrl;
  isEdit: boolean = false;
  testimonialsSubmit: any;
  testimonialsUpdate: any;
  Data: any = [];
  totalItems: number = 0;
  pageSizeOptions: number[] = [5, 10, 50, 100];
  pageSize: number = 5;
  currentPage: number = 1;
  maxPage = 4; // This should match the maxSize property in the template
  paginatedData: any[] = [];
  testimonialIdToDelete: any;
  testimonialData: any;
  id: any;
  photoPreview: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;
  modalRef: any;
  testimonialsForm!: FormGroup;
  isLoader: boolean = false;
  flag: boolean = false;



  constructor(private notificationService: NotificationService, private profile: ProfileTabService, private toastr: ToastrService, private router: Router, private modalService: NgbModal, private fb: FormBuilder,) {
    this.testimonialsForm = this.fb.group({
      photo: [null, Validators.required],
      name: ['', Validators.required],
      title: ['', Validators.required],
      testimonial: ['', Validators.required],
    });
  }




  ngOnInit(): void {

    this.getTestimonialsData();

  }


  getTestimonialsData() {
    this.isLoader = true;
    this.profile.getTestimonialList().subscribe(
      async (response: any) => {
        this.isLoader = false;

        this.Data = response.results; // Fallback to an empty array
        this.totalItems = response.count;


        this.pageSize = response.results.length;
        // console.log(this.Data, 'photodata')

        this.updatePagination();
        this.paginateData();
      },
      (error: any) => {
        this.isLoader = false;
        console.log(error.status);

      }
    );

  }


  onPageChange(page: number): void {
    this.currentPage = page;
    this.profile.getTestimonialListPagination(this.currentPage).subscribe(
      async (response: any) => {
        const newData = response.results
        // this.Data = []
        this.Data = response.results
        this.updatePagination();
        this.paginateData();
      },
      (error: any) => {
        console.error(error);
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
      this.testimonialsForm.patchValue({ photo: file.name });
      this.testimonialsForm.get('photo')?.markAsTouched();

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



  LargeSizeOpen(largesizemodal: any) {
    this.isEdit = false;
    // this.modalService.open(largesizemodal, { size: 'lg' });
    this.modalRef = this.modalService.open(largesizemodal, { size: 'lg', backdrop: 'static', centered: true });
    this.testimonialsForm.reset();
    this.photoPreview = null; // Clear the photo preview
    this.testimonialsForm.patchValue({ photo: '' }); // Clear the form control value

  }
  toggleZoom(uidata: any) {
    // Toggles the zoom effect for the clicked image
    uidata.isZoomed = !uidata.isZoomed;
  }

  closeModal() {
    if (this.modalRef) {
      // console.log(this.modalRef, "Close modal")
      this.modalRef.dismiss();
      this.modalRef.close();
      this.testimonialsForm.reset();
      this.photoPreview = null; // Clear the photo preview
      this.testimonialsForm.patchValue({ photo: '' }); // Clear the form control value
    };
  }

  openConfirmationModal(id: number, confirmationModal1: any) {
    this.modalService.open(confirmationModal1, { centered: true });
    this.testimonialIdToDelete = id;
  }

  creaTestimonial() {


    if (this.isEdit == false) {

      if (this.testimonialsForm.invalid) {
        this.testimonialsForm.markAllAsTouched();
        return
      }
      // Create a FormData object to send both file and other form fields
      const formData = new FormData();

      // Append other form fields
      formData.append('name', this.testimonialsForm.value.name);
      formData.append('title', this.testimonialsForm.value.title);
      formData.append('testimonial', this.testimonialsForm.value.testimonial);

      // Ensure the photo is added to the formData only if it exists
      if (this.selectedFile) {
        formData.append('photo', this.selectedFile, this.selectedFile.name);
      } else {
        // Optionally handle a case where the photo is not selected
        // console.log('No photo selected');
      }

      // Log the FormData to verify it's being populated correctly
      // console.log(formData, 'formdata');

      // Make the service call with the FormData object
      this.isLoader = true;
      this.profile.CreateProfileTestimonial(formData).subscribe(
        async (response: any) => {
          this.isLoader = false;

          Swal.fire({
            icon: 'success',
            title: "Success",
            html: 'Testimonial Data Added Successfully',
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
          });

          // Reset form and close modal
          this.testimonialsForm.reset();
          this.closeModal();

          // Reload testimonials data
          this.getTestimonialsData();
          this.notificationService.triggerFetchData();
        },
        (error: any) => {
          // Error handling
          this.isLoader = false;
          console.log(error.status);
          if (error.status === 400) {
            Swal.fire({
              icon: 'error',
              title: "Error",
              html: ['error'],
              timer: 2000,
              timerProgressBar: true,
              showConfirmButton: false,
            });
          } else {
            // Generic error message for other statuses
            Swal.fire({
              icon: 'error',
              title: "Error",
              html: 'An error occurred. Please try again later!',
              timer: 2000,
              timerProgressBar: true,
              showConfirmButton: false,
            });
          }
        }
      );
    }

    else if (this.isEdit == true) {


      // Create a FormData object to send both file and other form fields
      const formData = new FormData();

      // Append other form fields
      formData.append('name', this.testimonialsForm.value.name);
      formData.append('title', this.testimonialsForm.value.title);
      formData.append('testimonial', this.testimonialsForm.value.testimonial);

      // Ensure the photo is added to the formData only if it exists
      if (this.selectedFile) {
        formData.append('photo', this.selectedFile, this.selectedFile.name);
      } else {
        // Optionally handle a case where the photo is not selected
        console.log('No photo selected');
      }

      this.isLoader = true;
      this.profile.UpdateProfileTestimonial(formData, this.id).subscribe(
        async (response: any) => {
          Swal.fire({
            icon: 'success',
            title: "Success",
            html: 'Testimonial Data Updated Successfully',
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
          });
          // Reset form and close modal
          this.isEdit = false;
          this.testimonialsForm.reset();
          this.closeModal();

          // Reload testimonials data
          this.getTestimonialsData();

        },
        (error: any) => {
          this.isLoader = false;
          console.log(error.status);
          Swal.fire({
            icon: 'error',
            title: "Error",
            html: [error.error.Message],
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
          });
        }

      );
    }
  }

  //getbyid
  editTestimonial(id: any, largesizemodal: any) {
    this.modalRef = this.modalService.open(largesizemodal, { size: 'lg', backdrop: 'static', centered: true });
    this.isEdit = true;
    this.isLoader = true;
    this.profile.getTestimonialDataById(id).subscribe(
      async (response: any) => {
        this.isLoader = false;
        this.testimonialData = response.data;
        this.id = this.testimonialData.id;

        //console.log(this.testimonialData, 'testa')
        // Set the form values (excluding file input)
        this.testimonialsForm.patchValue({
          name: this.testimonialData.name,
          title: this.testimonialData.title,
          testimonial: this.testimonialData.testimonial
        });

        // Set existing image for preview
        this.photoPreview = envDetails.apiUrl + '/' + this.testimonialData.photo || null;

      },
      (error: any) => {
        this.isLoader = false;
        console.log(error.status);
      }
    );


  }

  deleteTestimonial(id: any) {
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
        this.profile.DeleteTestimonial(id).subscribe(
          async (response: any) => {
            this.isLoader = false;
            // this.toastr.success('Testimonial Data Deleted', 'Delete', {
            //   timeOut: 2000,
            //   positionClass: 'toast-bottom-center',

            // });
            Swal.fire({
              icon: 'success',
              title: "Success",
              html: 'Testimonial Data Deleted Successfully',
              timer: 2000,
              timerProgressBar: true,
              showConfirmButton: false,
            });
            this.modalService.dismissAll('confirm');
            this.getTestimonialsData();
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

    this.testimonialsForm.reset();
    this.closeModal();
    this.photoPreview = null; // Clear the photo preview
    this.selectedFile = null;
    this.testimonialsForm.patchValue({ photo: '' }); // Clear the form control value
  }

}



