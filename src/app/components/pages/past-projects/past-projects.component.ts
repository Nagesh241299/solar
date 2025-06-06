import { Component } from '@angular/core';
import { PastProjectsService } from 'src/app/shared/services/past-projects.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewRoofDataService } from 'src/app/shared/services/new-roof-data.service';
import Swal from 'sweetalert2';
import { envDetails } from 'src/config/env.utils'; // Adjust path based on location of env.utils.ts
import { NotificationService } from 'src/app/shared/services/notification.service';


@Component({
  selector: 'app-past-projects',
  templateUrl: './past-projects.component.html',
  styleUrls: ['./past-projects.component.scss']
})

export class PastProjectsComponent {
  modalRef: any;
  pastProjectEditData: any;
  isLoader: boolean = false;

  photoRemoved: boolean = false;


  constructor(private notificationService: NotificationService, private pastProjectservice: PastProjectsService, private toastr: ToastrService, private router: Router, private modalService: NgbModal, private fb: FormBuilder, private newRoodDataService: NewRoofDataService) {
    this.pastProjectForm = this.fb.group({
      roof_type: [''],
      sub_type: [''],
      electricity_supplier: [''],
      address_line_1: ['', Validators.required],
      address_line_2: [''],
      description: [''],
      company_name: ['', Validators.required],
      customer_first_name: ['', Validators.required],
      customer_last_name: ['', Validators.required],
      electricity_consumer_number: [''],
      contact_number: ['', Validators.pattern(/^[0-9]{10}$/)],
      email_addr: ['', Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)],
      //address: ['', Validators.required],
      pin_code: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      project_type: [''],
      project_capacity: ['', Validators.required], //project Capacity
      solar_installation_commissioning_date: [null],
      pv_module_brand_name: [''],
      inverter_brand_name: [''],
      batteries_usage: [''],
      grid_connectivity: [''],
      modules_used: [''],
      inverter_used: [''],
      area_name: ['', Validators.required],
      title: ['', Validators.required],
      photo: ['']
    });
  }

  pastProjectForm!: FormGroup;
  Data: any[] = [];
  totalItems: number = 0;
  pageSizeOptions: number[] = [5, 10, 50, 100];
  pageSize: number = 5;
  currentPage: number = 1;
  // maxPage: number = 0;
  maxPage = 4; // This should match the maxSize property in the template
  paginatedData: any[] = [];
  pastProjectIdToDelete: any;
  isEdit: boolean = false;
  updatepastProjectData: any;
  pastProjectData: any;
  project_typeArray: any[] = ['Residential', 'Industrial', 'Commercial'];
  sub_typeArray: { [key: string]: string[] } = {
    Residential: ['Individual Bungalow', 'Individual Rowhouse', 'Housing Society'],
    Industrial: [], // Add specific subtypes for Industrial if needed
    Commercial: ['Auto Dealership', 'College', 'Hospital', 'Mall', 'Office Building', 'School'],
  };
  batteries_usageArray: any = ['Yes', 'No']
  filteredSubTypes: string[] = [];
  grid_connectivityArray: any[] = ['On-Grid', 'Off-Grid', 'Hybrid'];
  areaNames: string[] = [];
  cityNames: string[] = [];
  areaOptions: AreaOption[] = [];
  cityOptions: CityOption[] = [];
  stateN: any;
  statename: any;
  maxDate: Date | undefined;
  // photoPreview: string | ArrayBuffer | null = null;
  // selectedFile: File | null = null;
  photoPreviews: string[] = []; // Array to store preview images
  photoPreviewsRemoved: string[] = []; // Array to store preview images
  selectedFiles: File[] = [];   // Array to store selected files
  id: any;
  photoerror: boolean = true;
  error: boolean = false;
  nochange: boolean = false;
  previousPhotoPresent: boolean = false;
  photoPreviewsRemovedOne: string[] = []; // Array to store preview images



  ngOnInit(): void {
    this.getPastProjectData();
    this.maxDate = new Date();
  }

  // onPhotoUpload(event: Event): void {
  //   const input = event.target as HTMLInputElement;
  //   if (input.files && input.files[0]) {
  //     this.selectedFile = input.files[0];

  //     // Create a preview of the selected photo
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       this.photoPreview = reader.result;
  //     };
  //     reader.readAsDataURL(this.selectedFile);
  //   }
  // }

  onPhotoUpload(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files) {
      const newFiles = Array.from(input.files);
      const maxFileSize = 8 * 1024 * 1024; // ✅ Set max file size to 2MB
      const validFiles: File[] = []; // ✅ Store valid files only

      // ✅ Check if total files exceed 4
      const remainingSlots = 4 - this.selectedFiles.length;

      newFiles.forEach((file) => {
        if (file.size > maxFileSize) {
          input.value = ''; // ✅ Reset file input
          Swal.fire({
            icon: 'error',
            title: "Error",
            html: ['File size must be less than 8MB!'], // ✅ Updated error message
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
          });
        } else {
          validFiles.push(file); // ✅ Add only valid files
        }
      });

      if (newFiles.length > remainingSlots) {
        Swal.fire({
          icon: 'error',
          title: "Error",
          html: [`You can only upload a maximum of 4 photos!`],
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        });
        // Reset the file input field
        const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
        if (fileInput) {
          fileInput.value = ''; // Reset the file input field
        }
        return; // ✅ Stop execution if too many files are selected
      }

      // ✅ Add valid files to selectedFiles
      if (validFiles.length > 0) {
        this.selectedFiles.push(...validFiles);
        this.photoerror = false; // ✅ Remove error when valid files are uploaded
      }

      // ✅ Generate previews for valid files only
      validFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          this.photoPreviews.push(reader.result as string);
        };
        reader.readAsDataURL(file);
      });
    }
  }




  removePhoto(index: number): void {
    this.photoRemoved = true; // Mark photo as removed
    this.selectedFiles.splice(index, 1);
    this.photoPreviews.splice(index, 1);
    this.photoPreviewsRemoved = this.photoPreviews;
    if (this.nochange === true) {
      this.previousPhotoPresent = true;
      this.photoPreviewsRemovedOne = this.photoPreviews;

    }
    // console.log(this.selectedFiles, 'selectedfiles')
    // console.log(this.photoPreviews, 'photopreview')

    // console.log(this.photoPreviewsRemoved, 'photopreviewremoveinRemovphoto')

    // Update the form control with the remaining photos, if any
    if (this.photoPreviews.length > 0) {
      this.pastProjectForm.patchValue({ photo: this.photoPreviewsRemoved });


    } else {
      this.pastProjectForm.patchValue({ photo: '' }); // If no photos remain, clear the field
    }

    // ✅ Prevent resetting file input if other images still exist
    if (this.selectedFiles.length === 0) {
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      if (fileInput) {
        fileInput.value = ''; // Only reset if all images are removed
      }
    }

    if (this.selectedFiles.length === 0) {
      this.photoerror = true; // Set photoerror to true if no photos are selected
    }
  }


  typeSelect() {
    // Update sub-types dynamically when "type" changes
    // console.log('project_type', this.pastProjectForm.get('project_type'))
    this.pastProjectForm.get('project_type')?.valueChanges.subscribe((selectedType) => {

      this.filteredSubTypes = this.sub_typeArray[selectedType] || [];
      // console.log(this.filteredSubTypes, 'subtypeaarry')
      this.pastProjectForm.get('sub_type')?.setValue(''); // Reset subType when type changes
    });

  }


  getAreaByPinCode() {
    this.isLoader = true;
    this.newRoodDataService.getAreaByPincode(this.pastProjectForm.value.pin_code).subscribe(
      async (response: any) => {
        this.isLoader = false;
        // Map results to include area, latitude, and longitude in each option
        this.areaOptions = response.results.map((item: any) => ({
          area: item.area,
          latitude: item.latitude,
          longitude: item.longitude,
          state: item.state
        }));

        // Create a new array with only the area names
        this.areaNames = this.areaOptions.map(item => item.area);

        //  console.log(this.areaNames); // This will contain only the area names
        this.statename = this.areaOptions.map(item => item.state);


        // const uniqueStates = Array.from(new Set(this.statename));
        // this.stateN = uniqueStates[0]; // "MAHARASHTRA"

      },
      (error: any) => {
        console.log(error.status);
        this.isLoader = false;
        if (error.status == 404) {
          Swal.fire({
            icon: 'error',
            title: "Error",
            html: 'Pincode wrong!',
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
          });
        }
      }
    );
  }


  validateDate(event: any) {
    // console.log(event, 'event')
    const input = event.target as HTMLInputElement;
    let value = input.value;

    value = value.replace(/\D/g, '');


    if (value.length !== 8) {
      return;
    }
  }
  areaSelected() {
    //const selectedOption = (event.target as HTMLSelectElement)?.value;
    //console.log('Selected Option:', selectedOption);
    this.isLoader = true;
    this.newRoodDataService.getlatlongByArea(this.pastProjectForm.value.area).subscribe(
      async (response: any) => {
        this.isLoader = false;
        this.cityOptions = response.results.map((item: any) => ({
          district: item.district,
        }));
        this.cityNames = this.cityOptions.map(item => item.district);

      },
      (error: any) => {
        this.isLoader = false;
        console.error('Error fetching data:', error);
      }
    );

    this.newRoodDataService.getDistrictByPincodeArea(this.pastProjectForm.value.pin_code, this.pastProjectForm.value.area_name).subscribe(
      async (response: any) => {
        // console.log(response.results[0].district);

        this.isLoader = false;
        this.pastProjectForm.patchValue({
          city: response.results[0].district,
          state: response.results[0].state,

        });
        this.pastProjectForm.value.city = response.results[0].district;
        this.pastProjectForm.value.state = response.results[0].state;
        //console.log(response, "city");

      },
      (error: any) => {
        this.isLoader = false;
        console.error('Error fetching data:', error);
      }
    );
  }


  // Get past project List
  getPastProjectData() {
    this.isLoader = true;
    this.pastProjectservice.getPastProjectData().subscribe(
      async (response: any) => {
        // console.log('projectdata')
        this.isLoader = false;
        const newData = response.results
        this.Data = []
        this.Data = response.results;

        this.totalItems = response.count;
        this.pageSize = response.results.length;

        this.updatePagination();
        this.paginateData();
      },
      (error: any) => {
        this.isLoader = false;
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


  onPageChange(page: number): void {
    this.currentPage = page;
    this.pastProjectservice.getPastProjectDataPagination(this.currentPage).subscribe(
      async (response: any) => {
        const newData = response.results
        this.Data = []
        this.Data = response.results

        this.updatePagination();
        this.paginateData();
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  editPastProject(roofId: number, largesizemodal: any) {
    this.modalRef = this.modalService.open(largesizemodal, { size: 'xl', backdrop: 'static' });
    this.isEdit = true;
    this.id = roofId;
    //get pastProject data by roofid
    this.isLoader = true;
    this.pastProjectservice.getPastProjectDataById(roofId).subscribe(
      async (response: any) => {
        this.pastProjectEditData = response.data;
        this.isLoader = false;
        this.pastProjectForm.patchValue({
          project_type: this.pastProjectEditData.project_type,
          sub_type: this.pastProjectEditData.sub_type,
          electricity_supplier: this.pastProjectEditData.electricity_supplier,
          address_line_1: this.pastProjectEditData.address_line_1,
          address_line_2: this.pastProjectEditData.address_line_2,
          description: this.pastProjectEditData.description,
          company_name: this.pastProjectEditData.company_name,
          customer_first_name: this.pastProjectEditData.customer_first_name,
          customer_last_name: this.pastProjectEditData.customer_last_name,
          electricity_consumer_number: this.pastProjectEditData.electricity_consumer_number,
          contact_number: this.pastProjectEditData.contact_no,
          email_addr: this.pastProjectEditData.email_addr,
          address: this.pastProjectEditData.address,
          pin_code: this.pastProjectEditData.pin_code,
          city: this.pastProjectEditData.city,
          state: this.pastProjectEditData.state,
          roofType: this.pastProjectEditData.roofType,
          project_capacity: Math.trunc(Number(this.pastProjectEditData.project_capacity)), // Converts to number, then truncates ,
          solar_installation_commissioning_date: this.pastProjectEditData.solar_installation_commissioning_date,
          pv_module_brand_name: this.pastProjectEditData.pv_module_brand_name,
          inverter_brand_name: this.pastProjectEditData.inverter_brand_name,
          batteries_usage: this.pastProjectEditData.batteries_usage,
          grid_connectivity: this.pastProjectEditData.grid_connectivity,
          modules_used: this.pastProjectEditData.modules_used,
          inverter_used: this.pastProjectEditData.inverter_used,
          area_name: this.pastProjectEditData.area_name,
          title: this.pastProjectEditData.title,
        });
        // Set photo preview if available

        if (this.pastProjectEditData.photos.length === 0) {
          // console.log('error');
          this.error = true;
        }

        if (this.pastProjectEditData.photos.length > 0) {
          // this.photoPreview = `${envDetails.apiUrl}/${this.pastProjectEditData.photo}`;

          // Convert existing photo URLs into an array
          this.nochange = true;
          // console.log(this.nochange, 'nochange')

          this.photoPreviews = this.pastProjectEditData.photos.map((photoObj: any) =>
            `${envDetails.apiUrl}/${photoObj.photo}`
          );


        }

        setTimeout(() => {
          this.typeSelect();
          this.getAreaByPinCode();
          this.areaSelected();

        }, 500);


      },
      (error: any) => {
        this.isLoader = false;
        console.error(error);
        // this.userLoginError = error.error.Message
      }
    );
  }


  LargeSizeOpen(largesizemodal: any) {
    this.pastProjectForm.reset();
    this.pastProjectForm.patchValue({ photo: '' });
    this.photoPreviews = []; // Clear the form control value
    // this.modalService.open(largesizemodal, { size: 'xl', scrollable: true });
    this.isEdit = false;
    this.modalRef = this.modalService.open(largesizemodal, { size: 'xl', backdrop: 'static' });
  }


  pastProjectSubmit() {

    if (this.pastProjectForm.invalid) {
      this.pastProjectForm.markAllAsTouched();
      return
    }


    if (this.isEdit == false) {

      const formValue = this.pastProjectForm.value;
      const formData = new FormData();

      // Append form fields
      formData.append('customer_first_name', formValue.customer_first_name || '');
      formData.append('customer_last_name', formValue.customer_last_name || '');
      formData.append('electricity_consumer_number', formValue.electricity_consumer_number || '');
      formData.append('contact_no', formValue.contact_number || '');
      formData.append('email_addr', formValue.email_addr || '');
      formData.append('pin_code', formValue.pin_code || '');
      formData.append('city', formValue.city || '');
      formData.append('address', formValue.address || '');
      formData.append('state', formValue.state || '');
      formData.append('project_type', formValue.project_type || '');
      formData.append('project_capacity', formValue.project_capacity || '');
      formData.append('inverter_used', formValue.inverter_used || '');
      formData.append('modules_used', formValue.modules_used || '');
      formData.append('area_name', formValue.area_name || '');
      formData.append('title', formValue.title || '');
      formData.append('sub_type', formValue.sub_type || '');
      formData.append('description', formValue.description || '');
      formData.append('address_line_1', formValue.address_line_1 || '');
      formData.append('address_line_2', formValue.address_line_2 || '');
      formData.append('batteries_usage', formValue.batteries_usage || '');
      formData.append('solar_installation_commissioning_date', formValue.solar_installation_commissioning_date || '');
      formData.append('grid_connectivity', formValue.grid_connectivity || '');
      formData.append('company_name', formValue.company_name || '');
      formData.append('is_past_project', 'true'); // Ensure boolean is sent as a string


      // ✅ Append multiple photos in array of objects format
      let photos: { photo: File; }[] = [];

      if (this.selectedFiles && this.selectedFiles.length > 0) {
        this.selectedFiles.forEach((file) => {
          photos.push({ photo: file });
        });

        photos.forEach((item, index) => {
          formData.append(`photos`, item.photo, item.photo.name);
        });

      } else {
        formData.append(`photos`, '')
        //console.log('photos')
        // console.log('No new photos selected');


      }

      // Log to verify
      // console.log(photos);

      //console.log(formData);
      this.isLoader = true;
      this.pastProjectservice.CreatePastProjectData(formData).subscribe(
        async (response: any) => {
          this.isLoader = false;

          Swal.fire({
            icon: 'success',
            title: "Success",
            html: 'Past Project Added Successfully!',
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
          });

          this.closeModal();
          this.getPastProjectData();
          this.notificationService.triggerFetchData();
        },
        (error: any) => {
          console.log(error.status);
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

    // else if (this.isEdit == true) {

    //   const formValue = this.pastProjectForm.value;
    //   const formData = new FormData();

    //   // Append form fields
    //   formData.append('customer_first_name', formValue.customer_first_name || '');
    //   formData.append('customer_last_name', formValue.customer_last_name || '');
    //   formData.append('electricity_consumer_number', formValue.electricity_consumer_number || '');
    //   formData.append('contact_no', formValue.contact_number || '');
    //   formData.append('email_addr', formValue.email_addr || '');
    //   formData.append('pin_code', formValue.pin_code || '');
    //   formData.append('city', formValue.city || '');
    //   formData.append('address', formValue.address || '');
    //   formData.append('state', formValue.state || '');
    //   formData.append('project_type', formValue.project_type || '');
    //   formData.append('project_capacity', formValue.project_capacity || '');
    //   formData.append('inverter_used', formValue.inverter_used || '');
    //   formData.append('modules_used', formValue.modules_used || '');
    //   formData.append('area_name', formValue.area_name || '');
    //   formData.append('title', formValue.title || '');
    //   formData.append('sub_type', formValue.sub_type || '');
    //   formData.append('description', formValue.description || '');
    //   formData.append('address_line_1', formValue.address_line_1 || '');
    //   formData.append('address_line_2', formValue.address_line_2 || '');
    //   formData.append('batteries_usage', formValue.batteries_usage || '');
    //   formData.append('solar_installation_commissioning_date', formValue.solar_installation_commissioning_date || '');
    //   formData.append('grid_connectivity', formValue.grid_connectivity || '');
    //   formData.append('company_name', formValue.company_name || '');
    //   formData.append('is_past_project', 'true'); // Ensure boolean is sent as a string

    //   // ✅ Ensure `this.selectedFiles` is correctly updated
    //   console.log('Remaining photos:', this.selectedFiles);
    //   // ✅ Append multiple photos correctly
    //   if (this.selectedFiles.length > 0) {
    //     this.selectedFiles.forEach((file, index) => {
    //       formData.append(`photos`, file, file.name);
    //     });
    //   }

    //   // ✅ Handle case when photos are removed
    //   if (this.photoRemoved && this.selectedFiles.length === 0) {
    //     formData.append('photos', '[]'); // Inform backend that all photos are removed
    //   }

    //   // // ✅ Append multiple photos in array of objects format
    //   // let photos: { photo: File; }[] = [];



    //   // // Add the photo to the FormData only if it exists
    //   // if (this.selectedFiles) {
    //   //   // console.log('selectedfile')
    //   //   this.selectedFiles.forEach((file) => {
    //   //     photos.push({ photo: file });
    //   //   });

    //   //   photos.forEach((item, index) => {
    //   //     formData.append(`photos`, item.photo, item.photo.name);

    //   //   });

    //   // }
    //   // // Flag to track photo removal
    //   // if (!this.selectedFiles && this.photoRemoved) {
    //   //   // console.log('Photo removed');
    //   //   formData.append('photos', '[]'); // Send empty string or 'null' if backend expects it
    //   // }
    //   // else {
    //   //   // Handle the case where no photo is provided (optional)
    //   //   console.log('No photo selected');

    //   //   formData.append(`photos`, '[]')

    //   // }




    //   this.isLoader = true;
    //   this.pastProjectservice.updatePastProjectData(formData, this.id).subscribe(
    //     async (response: any) => {
    //       this.isLoader = false;
    //       this.closeModal();
    //       this.getPastProjectData();
    //       this.photoRemoved = false;
    //       Swal.fire({
    //         icon: 'success',
    //         title: "Success",
    //         html: 'Past Project Updated Successfully!',
    //         timer: 2000,
    //         timerProgressBar: true,
    //         showConfirmButton: false,
    //       });
    //     },
    //     (error: any) => {
    //       this.isLoader = false;

    //       Swal.fire({
    //         icon: 'error',
    //         title: "Error",
    //         html: error.error?.message || 'An error occurred!',
    //         timer: 2000,
    //         timerProgressBar: true,
    //         showConfirmButton: false,
    //       });
    //     }
    //   );

    // }

    else if (this.isEdit == true) {
      const formValue = this.pastProjectForm.value;
      const formData = new FormData();


      // Append form fields
      const fields = [
        'customer_first_name', 'customer_last_name', 'electricity_consumer_number', 'contact_no',
        'email_addr', 'pin_code', 'city', 'address', 'state', 'project_type', 'project_capacity',
        'inverter_used', 'modules_used', 'area_name', 'title', 'sub_type', 'description',
        'address_line_1', 'address_line_2', 'batteries_usage', 'solar_installation_commissioning_date',
        'grid_connectivity', 'company_name'
      ];

      fields.forEach(field => formData.append(field, formValue[field] || ''));

      formData.append('is_past_project', 'true'); // Ensure boolean is sent as a string

      // ✅ Append selected files
      // console.log('before conditions:', this.selectedFiles);
      // console.log(this.photoPreviews, 'photopreviews')

      // if (this.selectedFiles.length > 0 && this.photoRemoved === false) {
      //   console.log("at starting no photo,,then add photos")
      //   console.log(this.photoPreviews, 'kkkk')

      //   this.selectedFiles.forEach((file, index) => {
      //     console.log('1')
      //     formData.append(`photos`, file, file.name);
      //   });

      // }



      if (this.photoPreviews.length > 0 && this.photoRemoved === false && this.error === true && this.nochange === false) {
        // console.log("starting no photo, then add photos")
        // console.log(this.selectedFiles, 'selectedfiles')
        this.selectedFiles.forEach((file, index) => {
          formData.append(`photos`, file, file.name);
        });

        formData.append('keep_photo_links', '[]')

      }

      else if (this.photoPreviews.length > 0 && this.photoRemoved === false && this.nochange === true && this.error === false) {
        // console.log("no change in photo")
        // console.log(this.selectedFiles, 'selectedfiles')
        this.selectedFiles.forEach((file, index) => {
          formData.append(`photos`, file, file.name);
        });

        // Extract relative URLs from pastProjectEditData.photos
        // this.photoPreviews = this.pastProjectEditData.photos.map((photoObj: any) =>
        //   photoObj.photo, // Keep only the relative path
        const validPhotoUrls = this.photoPreviews.filter(photo => photo.startsWith('http') || photo.startsWith('https'));
        // console.log(validPhotoUrls, 'validurl')
        // Append only the valid photo URLs
        formData.append('keep_photo_links', JSON.stringify(validPhotoUrls));


      }

      else if (this.photoPreviews.length > 0 && this.photoRemoved === true && this.nochange === true && this.error === false && this.previousPhotoPresent === false) {
        // console.log("add & removed photo")
        // console.log(this.selectedFiles, 'selectedfiles')
        this.selectedFiles.forEach((file, index) => {
          formData.append(`photos`, file, file.name);
        });
        // console.log(this.photoPreviewsRemovedOne, 'photoremovedone')
        // console.log(this.photoPreviewsRemoved, 'photoremoved')

        // Extract relative URLs from pastProjectEditData.photos
        // this.photoPreviewsRemoved = this.pastProjectEditData.photos.map((photoObj: any) =>
        //   photoObj.photo, // Keep only the relative path
        //   formData.append('keep_photo_links', JSON.stringify(this.photoPreviewsRemovedOne))
        // );
        // Filter out non-URL values (e.g., base64 data URLs)
        const validPhotoUrls = this.photoPreviews.filter(photo => photo.startsWith('http') || photo.startsWith('https'));

        // Append only the valid photo URLs
        formData.append('keep_photo_links', JSON.stringify(validPhotoUrls));

      }



      else if (this.photoPreviews.length > 0 && this.photoRemoved === false) {
        // console.log("when photo is not removed")

        this.selectedFiles.forEach((file, index) => {
          // console.log('1')
          formData.append(`photos`, file, file.name);
        });

        // Extract relative URLs from pastProjectEditData.photos
        // this.photoPreviews = this.pastProjectEditData.photos.map((photoObj: any) =>
        //   photoObj.photo, // Keep only the relative path
        //   formData.append('keep_photo_links', JSON.stringify(this.photoPreviews))
        // );

        const validPhotoUrls = this.photoPreviews.filter(photo => photo.startsWith('http') || photo.startsWith('https'));
        // console.log(validPhotoUrls, 'validurl')
        // Append only the valid photo URLs
        formData.append('keep_photo_links', JSON.stringify(validPhotoUrls));
      }


      else if (this.photoPreviews.length > 0 && this.photoRemoved === true && this.nochange === true && this.previousPhotoPresent === true) {
        // console.log("when photo is removed")
        this.selectedFiles.forEach((file, index) => {
          formData.append(`photos`, file, file.name);
        });

        // Extract relative URLs from pastProjectEditData.photos
        // this.photoPreviewsRemoved = this.pastProjectEditData.photos.map((photoObj: any) =>
        //   photoObj.photo, // Keep only the relative path

        //   formData.append('keep_photo_links', JSON.stringify(this.photoPreviewsRemoved))
        // );
        // Filter out non-URL values (e.g., base64 data URLs)
        const validPhotoUrls = this.photoPreviews.filter(photo => photo.startsWith('http') || photo.startsWith('https'));
        // console.log(validPhotoUrls, 'validurl')
        // Append only the valid photo URLs
        formData.append('keep_photo_links', JSON.stringify(validPhotoUrls));


      }






      // ✅ Handle case when all photos are removed
      else if (this.selectedFiles.length === 0 && this.photoPreviews.length === 0) {
        // console.log("no photo selected and no photo preview")
        formData.append('photos', '[]'); // Inform backend that all photos are removed
        formData.append('keep_photo_links', '[]');
      }

      this.isLoader = true;
      this.pastProjectservice.updatePastProjectData(formData, this.id).subscribe(
        async (response: any) => {
          this.isLoader = false;
          this.closeModal();
          this.getPastProjectData();
          this.photoRemoved = false;
          // this.selectedFiles.length = 0;
          this.photoPreviews.length = 0;
          this.photoPreviewsRemoved.length = 0;
          this.error = false;
          this.nochange = false;
          this.
            previousPhotoPresent = false;

          Swal.fire({
            icon: 'success',
            title: "Success",
            html: 'Past Project Updated Successfully!',
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
          });
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
  }

  closeModal() {
    if (this.modalRef) {
      //console.log(this.modalRef, "Close modal")
      this.modalRef.dismiss();
      this.modalRef.close();
      this.pastProjectForm.reset();
      this.pastProjectForm.patchValue({ photo: '' }); // Clear the form control value
      this.photoPreviews = [];
      // this.photoPreview = null;
      this.selectedFiles = [];
    };
  }

  deletePastProject(id: any) {

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
        this.pastProjectservice.DeletePastProjectData(id).subscribe(
          async (response: any) => {
            this.isLoader = false;
            Swal.fire({
              icon: 'success',
              title: "Success",
              html: 'Past Project Data Deleted Successfully',
              timer: 2000,
              timerProgressBar: true,
              showConfirmButton: false,
            });
            this.modalService.dismissAll('confirm');
            this.getPastProjectData();
          },
          (error: any) => {
            this.isLoader = false;
            console.log(error.status);

          }
        );
      }
    });


  }

  openConfirmationModal(id: number, confirmationModal1: any) {
    this.modalService.open(confirmationModal1, { centered: true, backdrop: 'static' });
    this.pastProjectIdToDelete = id;
  }


}
interface AreaOption {
  area: string;
  latitude: string;
  longitude: string;
  state: string;
}

interface CityOption {
  district: string;
  state: string;

}

