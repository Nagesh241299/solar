import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { ProfileTabService } from 'src/app/shared/services/profile-tab.service';
import { NewRoofDataService } from 'src/app/shared/services/new-roof-data.service';
import { distinct } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PastProjectsComponent } from '../past-projects/past-projects.component';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-profile-tab',
  templateUrl: './profile-tab.component.html',
  styleUrls: ['./profile-tab.component.scss'],
  providers: [DatePipe],
})
export class ProfileTabComponent implements OnInit {

  profileBasicInfoForm!: FormGroup;
  profileService!: FormGroup;
  TabStyle1: any;
  TabStyle3: any;
  maxDate: Date | undefined;
  areaNames: string[] = [];
  cityNames: string[] = [];
  areaOptions: AreaOption[] = [];
  cityOptions: CityOption[] = [];
  stateN: any;
  isEditMode: boolean = false;
  profileBasicInfoSubmit: any;
  profileBasicInfoUpdate: any;
  statename: any;
  formattedDate: any;
  profileId: any;
  isLoader: boolean = false;
  companyTypes: string[] = [
    'Proprietorship',
    'Partnership',
    'Limited Liability Partnership (LLP)',
    'Private Limited (Pvt Ltd)',
    'Public Limited (Ltd)'
  ];


  constructor(private notificationService: NotificationService, private toastr: ToastrService, private fb: FormBuilder, private Profile: ProfileTabService, private newRoodDataService: NewRoofDataService, private datePipe: DatePipe, private modalService: NgbModal, private router: Router) { }

  ngOnInit(): void {

    this.maxDate = new Date();
    // Initialize the form
    this.profileBasicInfoForm = this.fb.group({
      name: ['', Validators.required],
      company_type: ['', Validators.required],
      registration_number: ['', Validators.required],
      created_on: ['', Validators.required],
      address_line_1: ['', Validators.required],
      address_line_2: [''],
      pin_code: ['', Validators.required],
      area: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      email_address: ['', Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)],
      mobile_number: ['', Validators.pattern(/^[0-9]{10}$/)],
      linkedin: ['', [Validators.pattern(/^https?:\/\/(www\.)?linkedin\.com\/.*$/)]],
      instagram: ['', [Validators.pattern(/^https?:\/\/(www\.)?instagram\.com\/.*$/)]],
      facebook: ['', [Validators.pattern(/^https?:\/\/(www\.)?facebook\.com\/.*$/)]],
      // twitter: ['', [Validators.pattern(/^https?:\/\/(www\.)?(twitter\.com|x\.com)\/.*$/)]],
      twitter: ['', [Validators.pattern(/^https?:\/\/(www\.)?x\.com\/.*$/)]],
      pinterest: ['', [Validators.pattern(/^https?:\/\/(www\.)?pinterest\.com\/.*$/)]],
      youtube: ['', [Validators.pattern(/^https?:\/\/(www\.)?youtube\.com\/.*$/)]],
      short_description: [''],
      long_description: [''],
      salient_points: ['']

    });

    this.isLoader = true;
    // profile basic data get byID
    this.Profile.GetProfileBasicData().subscribe(
      async (response: any) => {

        this.isLoader = false;
        if (Object.keys(response).length === 0) {
          this.isEditMode = false;
        }

        else {
          this.isEditMode = true;
          // console.log(this.isEditMode, 'Date');
          this.profileId = response.id;


          this.profileBasicInfoForm.patchValue({

            name: response.name || '',
            company_type: response.company_type || '',
            registration_number: response.registration_number || '',
            created_on: response.created_on || '',
            address_line_1: response.address_line_1 || '',
            address_line_2: response.address_line_2 || '',
            pin_code: response.pin_code || '',
            area: response.area || '',
            city: response.city || '',
            state: response.state || '',
            email_address: response.email_address || '',
            mobile_number: response.mobile_number || '',
            linkedin: response.linkedin || '',
            instagram: response.instagram || '',
            facebook: response.facebook || '',
            twitter: response.twitter || '',
            pinterest: response.pinterest || '',
            youtube: response.youtube || '',
            short_description: response.short_description || '',
            long_description: response.long_description || '',
            salient_points: response.salient_points || '',


          });

          // Check if pin_code exists before calling setTimeout
          if (response.pin_code) {
            setTimeout(() => {
              this.getAreaByPinCode();
              this.areaSelected();
            }, 500);
          }
        }
      },
      (error: any) => {
        this.isLoader = false;
        console.log(error, 'errr');

      }
    );
  }

  getAreaByPinCode() {
    this.isLoader = true;
    this.newRoodDataService.getAreaByPincode(this.profileBasicInfoForm.value.pin_code).subscribe(
      async (response: any) => {

        this.isLoader = false;
        // Map results to include area, latitude, and longitude in each option
        this.areaOptions = response.results.map((item: any) => ({
          area: item.area,
          latitude: item.latitude,
          longitude: item.longitude,
          state: item.state
        }));

        // this.profileBasicInfoForm.get('city')?.reset();
        // this.profileBasicInfoForm.get('state')?.reset();



        // Create a new array with only the area names
        this.areaNames = this.areaOptions.map(item => item.area);

        // console.log(this.areaNames); // This will contain only the area names
        // this.statename = this.areaOptions.map(item => item.state);
        // console.log(this.statename)

        // const uniqueStates = Array.from(new Set(this.statename));
        // this.stateN = uniqueStates[0]; // "MAHARASHTRA"

      },
      (error: any) => {
        this.isLoader = false;
        console.log(error.status);
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

    //   async (response: any) => {
    //     console.log(response.results[0].district);

    //     this.isLoader = false;
    //     this.profileBasicInfoForm.patchValue({
    //       city: response.results[0].district,
    //       state: response.results[0].state,

    //     });
    //     this.profileBasicInfoForm.value.city = response.results[0].district;
    //     this.profileBasicInfoForm.value.state = response.results[0].state;

    //   },
    //   (error: any) => {
    //     this.isLoader = false;
    //     console.error('Error fetching data:', error);
    //   }
    // );
  }
  areaSelected() {
    //const selectedOption = (event.target as HTMLSelectElement)?.value;
    // console.log('Selected Option:', selectedOption);
    this.isLoader = true;
    this.newRoodDataService.getlatlongByArea(this.profileBasicInfoForm.value.area).subscribe(
      async (response: any) => {
        // console.log(response.results);
        this.isLoader = false;
        this.cityOptions = response.results.map((item: any) => ({
          district: item.district,
        }));
        this.cityNames = this.cityOptions.map(item => item.district);
        //console.log(this.cityNames, "city");
      },
      (error: any) => {
        this.isLoader = false;
        console.error('Error fetching data:', error);
      }
    );

    this.newRoodDataService.getDistrictByPincodeArea(this.profileBasicInfoForm.value.pin_code, this.profileBasicInfoForm.value.area).subscribe(
      async (response: any) => {
        // console.log(response.results[0].district);

        this.isLoader = false;
        this.profileBasicInfoForm.patchValue({
          city: response.results[0].district,
          state: response.results[0].state,

        });
        this.profileBasicInfoForm.value.city = response.results[0].district;
        this.profileBasicInfoForm.value.state = response.results[0].state;
        //console.log(response, "city");

      },
      (error: any) => {
        this.isLoader = false;
        console.error('Error fetching data:', error);
      }
    );
  }


  // Handle form submission

  basicFormSubmit() {

    if (this.profileBasicInfoForm.invalid) {
      this.profileBasicInfoForm.markAllAsTouched();
      return
    }

    if (this.isEditMode == false) {
      // console.log(this.profileBasicInfoForm.value.created_on, 'create Date')
      this.profileBasicInfoSubmit = {
        name: this.profileBasicInfoForm.value.name,
        company_type: this.profileBasicInfoForm.value.company_type,
        registration_number: this.profileBasicInfoForm.value.registration_number,
        created_on: this.profileBasicInfoForm.value.created_on,
        address_line_1: this.profileBasicInfoForm.value.address_line_1,
        address_line_2: this.profileBasicInfoForm.value.address_line_2,
        pin_code: this.profileBasicInfoForm.value.pin_code,
        area: this.profileBasicInfoForm.value.area,
        city: this.profileBasicInfoForm.value.city,
        state: this.profileBasicInfoForm.value.state,
        email_address: this.profileBasicInfoForm.value.email_address,
        mobile_number: this.profileBasicInfoForm.value.mobile_number,
        linkedin: this.profileBasicInfoForm.value.linkedin,
        instagram: this.profileBasicInfoForm.value.instagram,
        facebook: this.profileBasicInfoForm.value.facebook,
        twitter: this.profileBasicInfoForm.value.twitter,
        pinterest: this.profileBasicInfoForm.value.pinterest,
        youtube: this.profileBasicInfoForm.value.youtube,
        short_description: this.profileBasicInfoForm.value.short_description,
        long_description: this.profileBasicInfoForm.value.long_description,
        salient_points: this.profileBasicInfoForm.value.salient_points
      };
      // this.profileBasicInfoSubmit = {
      //   "name": "John Doe",
      //   "company_type": "IT",
      //   "registration_number": "123455",
      //   "created_on": "2024-12-01",
      //   "address_line_1": "123 Tech Lane",
      //   "address_line_2": "Building 5",
      //   "pin_code": "123456",
      //   "area": "TechPark",
      //   "city": "TechCity",      //   "state": "TechState",
      //   "email_address": "john.doe@example.com",
      //   "mobile_number": "1234577890",
      //   "linkedin": "https://linkedin.com/company/johndoe",
      //   "instagram": "https://instagram.com/johndoe",
      //   "facebook": "https://facebook.com/johndoe",
      //   "twitter": "https://twitter.com/johndoe",
      //   "pinterest": "https://pinterest.com/johndoe",
      //   "youtube": "https://youtube.com/johndoe",
      //   "short_description": "A sample description.",
      //   "long_description": "This is a longer description for the profile.",
      //   "salient_points": "Efficient, Reliable, Scalable"
      // }

      // console.log(this.profileBasicInfoSubmit, "adddata")
      this.isLoader = true;
      this.Profile.CreateProfileBasicData(this.profileBasicInfoSubmit).subscribe(
        async (response: any) => {
          this.isLoader = false;

          Swal.fire({
            icon: 'success',
            title: "Success",
            html: 'Company Basic Information Added Successfully',
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
          });
          this.notificationService.triggerFetchData();
          this.router.navigate(['/pages/homepage'])


        },
        (error: any) => {
          this.isLoader = false;
          console.log(error.status);
          if (error.status == 400) {
            Swal.fire({
              icon: 'error',
              title: "Error",
              html: [error.error.Message],
              timer: 2000,
              timerProgressBar: true,
              showConfirmButton: false,
            });
          }
        }
      );

    }

    else if (this.isEditMode == true) {

      console.log('updatename', this.profileBasicInfoForm.value.name);

      this.profileBasicInfoUpdate = {
        name: this.profileBasicInfoForm.value.name,
        company_type: this.profileBasicInfoForm.value.company_type,
        registration_number: this.profileBasicInfoForm.value.registration_number,
        created_on: this.profileBasicInfoForm.value.created_on,
        address_line_1: this.profileBasicInfoForm.value.address_line_1,
        address_line_2: this.profileBasicInfoForm.value.address_line_2,
        pin_code: this.profileBasicInfoForm.value.pin_code,
        area: this.profileBasicInfoForm.value.area,
        city: this.profileBasicInfoForm.value.city,
        state: this.profileBasicInfoForm.value.state,
        email_address: this.profileBasicInfoForm.value.email_address,
        mobile_number: this.profileBasicInfoForm.value.mobile_number,
        linkedin: this.profileBasicInfoForm.value.linkedin,
        instagram: this.profileBasicInfoForm.value.instagram,
        facebook: this.profileBasicInfoForm.value.facebook,
        twitter: this.profileBasicInfoForm.value.twitter,
        pinterest: this.profileBasicInfoForm.value.pinterest,
        youtube: this.profileBasicInfoForm.value.youtube,
        short_description: this.profileBasicInfoForm.value.short_description,
        long_description: this.profileBasicInfoForm.value.long_description,
        salient_points: this.profileBasicInfoForm.value.salient_points
      };
      console.log('updatetype', this.profileBasicInfoUpdate);
      //console.log(this.profileBasicInfoUpdate)
      this.isLoader = true;
      this.Profile.UpdateProfileBasicData(this.profileBasicInfoUpdate, this.profileId).subscribe(
        async (response: any) => {
          this.isLoader = false;
          this.notificationService.triggerFetchData();
          Swal.fire({
            icon: 'success',
            title: "Success",
            html: 'Company Basic Information Updated Successfully',
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
          });
          this.router.navigate(['/pages/homepage'])

        },
        (error: any) => {
          this.isLoader = false;
          console.log(error.status);
          if (error.status == 400) {

            Swal.fire({
              icon: 'error',
              title: "Error",
              html: [error.error.Message],
              timer: 2000,
              timerProgressBar: true,
              showConfirmButton: false,
            });
          }
        }
      );


    }


  }

  cancelBasicForm() {
    this, this.profileBasicInfoForm.reset();
    this.router.navigate(['/pages/homepage']);

  }

  openPastProjectsModal(event: Event): void {
    event.preventDefault(); // Prevent the default tab behavior
    this.modalService.open(PastProjectsComponent, {
      size: 'xl', // 'sm', 'lg', or 'xl' for different modal sizes
      centered: true, // Optional: Center the modal
      backdrop: 'static' // Optional: Prevent modal close on backdrop click
    });
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
