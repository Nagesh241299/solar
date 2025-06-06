import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { ProfileTabService } from 'src/app/shared/services/profile-tab.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-profile-tab-services',
  templateUrl: './profile-tab-services.component.html',
  styleUrls: ['./profile-tab-services.component.scss'],
  providers: [DatePipe],
})

export class ProfileTabServicesComponent implements OnInit {


  solarForm!: FormGroup;
  isEdit: boolean = false;
  solarDataSubmit: any;
  solarDataUpdate: any;
  isEditMode: boolean = false;
  profileId: any;
  serviceData: any;
  isLoader: boolean = false;
  maxDate: Date | undefined;


  constructor(private notificationService: NotificationService, private toastr: ToastrService, private fb: FormBuilder, private Profile: ProfileTabService, private datePipe: DatePipe, private modalService: NgbModal, private router: Router) { }

  ngOnInit(): void {



    this.maxDate = new Date();
    this.solarForm = this.fb.group({
      // Installations
      streetLightSince: [''],
      streetLightProjects: [''],
      waterHeaterSince: [''],
      waterHeaterProjects: [''],
      pumpSince: [''],
      pumpProjects: [''],
      rooftopSince: [''],
      rooftopProjects: [''],
      rooftopCapacity: [''],
      groundMountedInstallationSince: [''],
      groundMountedInstallationProjects: [''],
      groundMountedInstallationCapacity: [''],

      // Maintenance
      rooftopMaintenanceSince: [''],
      rooftopMaintenanceProjects: [''],
      rooftopMaintenanceCapacity: [''],
      groundMountedSince: [''],
      groundMountedProjects: [''],
      groundMountedCapacity: [''],
    });
    this.getServiceData();

  }


  getServiceData() {
    this.isLoader = true;
    this.Profile.GetProfileServiceData().subscribe(
      async (response: any) => {
        this.isLoader = false;
        if (Object.keys(response.data).length === 0) {
          this.isEditMode = false;
        } else {
          this.isEditMode = true;
        }

        this.profileId = response.id;
        this.serviceData = response.data;

        // console.log(this.serviceData, 'service');

        // Initialize an object to hold the extracted values
        const formValues: any = {};

        // Map over the service data to extract values
        this.serviceData.forEach((service: any) => {
          switch (service.service_type) {
            case 'solar_street_light_installation':
              formValues.streetLightSince = service.doing_since || '';
              formValues.streetLightProjects = service.num_projects_done || '';
              break;

            case 'solar_water_heater_installation':
              formValues.waterHeaterSince = service.doing_since || '';
              formValues.waterHeaterProjects = service.num_projects_done || '';
              break;

            case 'solar_pump_installation':
              formValues.pumpSince = service.doing_since || '';
              formValues.pumpProjects = service.num_projects_done || '';
              break;

            case 'rooftop_solar_pv_installation':
              formValues.rooftopSince = service.doing_since || '';
              formValues.rooftopProjects = service.num_projects_done || '';
              formValues.rooftopCapacity = service.total_installed_capacity || '';
              break;

            case 'ground_mounted_solar_pv_installation':
              formValues.groundMountedInstallationSince = service.doing_since || '';
              formValues.groundMountedInstallationProjects = service.num_projects_done || '';
              formValues.groundMountedInstallationCapacity = service.total_installed_capacity || '';
              break;

            case 'rooftop_solar_pv_maintenance':
              formValues.rooftopMaintenanceSince = service.doing_since || '';
              formValues.rooftopMaintenanceProjects = service.num_projects_done || '';
              formValues.rooftopMaintenanceCapacity = service.total_maintained_capacity || '';
              break;

            case 'ground_mounted_solar_pv_maintenance':
              formValues.groundMountedSince = service.doing_since || '';
              formValues.groundMountedProjects = service.num_projects_done || '';
              formValues.groundMountedCapacity = service.total_maintained_capacity || '';
              break;

            default:
              console.warn(`Unknown service type: ${service.service_type}`);
          }
        });

        // Patch the form with the extracted values
        console.log(this.solarForm.patchValue(formValues), 'patchvalue')
      },
      (error: any) => {
        this.isLoader = false;
        console.error('Error fetching service data:', error);
      }
    );
  }

  getValueOrNull(value: any): any {
    return value === null || value === undefined || value === '' ? null : value;
  }



  submitSolrForm() {

    if (this.isEditMode === false) {
      // Utility function to return null for empty or undefined fields
      const getValueOrNull = (value: any) => (value ? value : null);

      this.solarDataSubmit = [
        {
          "service_type": "solar_water_heater_installation",
          "doing_since": getValueOrNull(this.solarForm.value.waterHeaterSince),
          "num_projects_done": getValueOrNull(this.solarForm.value.waterHeaterProjects),
        },
        {
          "service_type": "solar_pump_installation",
          "doing_since": getValueOrNull(this.solarForm.value.pumpSince),
          "num_projects_done": getValueOrNull(this.solarForm.value.pumpProjects),
        },
        {
          "service_type": "solar_street_light_installation",
          "doing_since": getValueOrNull(this.solarForm.value.streetLightSince),
          "num_projects_done": getValueOrNull(this.solarForm.value.streetLightProjects),
        },
        {
          "service_type": "rooftop_solar_pv_installation",
          "doing_since": getValueOrNull(this.solarForm.value.rooftopSince),
          "total_installed_capacity": getValueOrNull(this.solarForm.value.rooftopCapacity),
          "num_projects_done": getValueOrNull(this.solarForm.value.rooftopProjects),
        },
        {
          "service_type": "rooftop_solar_pv_maintenance",
          "doing_since": getValueOrNull(this.solarForm.value.rooftopMaintenanceSince),
          "num_projects_done": getValueOrNull(this.solarForm.value.rooftopMaintenanceProjects),
          "total_maintained_capacity": getValueOrNull(this.solarForm.value.rooftopMaintenanceCapacity),
        },
        {
          "service_type": "ground_mounted_solar_pv_installation",
          "doing_since": getValueOrNull(this.solarForm.value.groundMountedInstallationSince),
          "num_projects_done": getValueOrNull(this.solarForm.value.groundMountedInstallationProjects),
          "total_installed_capacity": getValueOrNull(this.solarForm.value.groundMountedInstallationCapacity),
        },
        {
          "service_type": "ground_mounted_solar_pv_maintenance",
          "doing_since": getValueOrNull(this.solarForm.value.groundMountedSince),
          "num_projects_done": getValueOrNull(this.solarForm.value.groundMountedProjects),
          "total_maintained_capacity": getValueOrNull(this.solarForm.value.groundMountedCapacity),
        }
      ];


      this.isLoader = true;
      this.Profile.CreateProfileServiceData(this.solarDataSubmit).subscribe(
        (response: any) => {
          this.isLoader = false;
          this.isEditMode = true,
            Swal.fire({
              icon: 'success',
              title: "Success",
              html: 'Company Service Information Added Successfully',
              timer: 2000,
              timerProgressBar: true,
              showConfirmButton: false,
            });
          this.notificationService.triggerFetchData();
        },

        (error: any) => {
          this.isLoader = false;
          Swal.fire({
            icon: 'error',
            title: "Error",
            html: error.error?.Message || 'An unexpected error occurred',
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
          });
        }
      );
    }


    if (this.isEditMode === true) {
      const getValueOrNull = (value: any) => (value ? value : null);

      // Create the `solarDataUpdate` array dynamically
      this.solarDataUpdate = this.serviceData
        .map((service: any) => {
          switch (service.service_type) {
            case 'solar_water_heater_installation':
              return {
                service_type: service.service_type,
                id: service.id,
                doing_since: getValueOrNull(this.solarForm.value.waterHeaterSince),
                num_projects_done: getValueOrNull(this.solarForm.value.waterHeaterProjects),
              };

            case 'solar_pump_installation':
              return {
                service_type: service.service_type,
                id: service.id,
                doing_since: getValueOrNull(this.solarForm.value.pumpSince),
                num_projects_done: getValueOrNull(this.solarForm.value.pumpProjects),
              };

            case 'solar_street_light_installation':
              return {
                service_type: service.service_type,
                id: service.id,
                doing_since: getValueOrNull(this.solarForm.value.streetLightSince),
                num_projects_done: getValueOrNull(this.solarForm.value.streetLightProjects),
              };

            case 'rooftop_solar_pv_installation':
              return {
                service_type: service.service_type,
                id: service.id,
                doing_since: getValueOrNull(this.solarForm.value.rooftopSince),
                num_projects_done: getValueOrNull(this.solarForm.value.rooftopProjects),
                total_installed_capacity: getValueOrNull(this.solarForm.value.rooftopCapacity),
              };

            case 'rooftop_solar_pv_maintenance':
              return {
                service_type: service.service_type,
                id: service.id,
                doing_since: getValueOrNull(this.solarForm.value.rooftopMaintenanceSince),
                num_projects_done: getValueOrNull(this.solarForm.value.rooftopMaintenanceProjects),
                total_maintained_capacity: getValueOrNull(this.solarForm.value.rooftopMaintenanceCapacity),
              };

            case 'ground_mounted_solar_pv_installation':
              return {
                service_type: service.service_type,
                id: service.id,
                doing_since: getValueOrNull(this.solarForm.value.groundMountedInstallationSince),
                num_projects_done: getValueOrNull(this.solarForm.value.groundMountedInstallationProjects),
                total_installed_capacity: getValueOrNull(this.solarForm.value.groundMountedInstallationCapacity),
              };



            case 'ground_mounted_solar_pv_maintenance':
              return {
                service_type: service.service_type,
                id: service.id,
                doing_since: getValueOrNull(this.solarForm.value.groundMountedSince),
                num_projects_done: getValueOrNull(this.solarForm.value.groundMountedProjects),
                total_maintained_capacity: getValueOrNull(this.solarForm.value.groundMountedCapacity),
              };

            default:
              return null; // Handle unknown service types, if any
          }
        })
        .filter((entry: any) => entry !== null); // Remove any null entries

      // console.log(this.solarDataUpdate, 'update');

      // Call the update API
      this.isLoader = true;
      this.Profile.UpdateProfileServiceData(this.solarDataUpdate).subscribe(
        async (response: any) => {
          this.isLoader = false;

          Swal.fire({
            icon: 'success',
            title: "Success",
            html: 'Company Service Information Updated Successfully',
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
          });
        },
        (error: any) => {
          this.isLoader = false;
          console.error(error.status);

          Swal.fire({
            icon: 'error',
            title: "Error",
            html: error.error?.Message || 'An unexpected error occurred',
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
          });
        }
      );

    }



  }




  cancelSolarForm() {
    this, this.solarForm.reset();
    this.router.navigate(['/pages/homepage']);
  }





}
