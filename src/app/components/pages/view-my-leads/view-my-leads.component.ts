/* eslint-disable camelcase */

import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import Swal from 'sweetalert2';
import { SearchService } from 'src/app/shared/services/search.service';
import { ChartConfiguration, ChartType } from "chart.js";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from 'src/app/shared/services/admin.service';
import { ReminderService } from 'src/app/shared/services/reminder.service';
import { WhatsAppService } from 'src/app/shared/services/whats-app.service';
import { GoogleMap } from '@angular/google-maps';
import { DatePipe } from '@angular/common';
import { PastProjectsService } from 'src/app/shared/services/past-projects.service';
import { number } from 'echarts';


@Component({
  selector: 'app-view-my-leads',
  templateUrl: './view-my-leads.component.html',
  styleUrls: ['./view-my-leads.component.scss'],
  providers: [DatePipe]
})
export class ViewMyLeadsComponent {
  @ViewChild('audioModal') audioModal!: TemplateRef<any>;
  companyId: any;
  type: any;
  isLoader:boolean=false;
  location!: string;
  lat!: number;
  lng!: number;
  roof_owner!: string;
  solar_power_generation_potential!: number;
  shortDescription!: string;
  roofType!: string;
  consumerNumber!: string;
  commissioningDate!: string;
  installationStatus!: string;
  inverterBrand!: string;
  pvBrandPreference!: string;
  batteryUsage!: string;
  batteryCapacity!: number;
  capacity!: number;
  capacityLookingFor!: string;
  inverterBrandPreference!: string;
  batteryCapacityRequired!: string;
  customer_first_name!: string;
  customer_last_name!: string;
  contact_person!:string;
  module_preference!:string;
  inverter_preference!:string;
  companyname: any;
  contact_number: any;
  lead_type!: string;
  surface_area!: string;
  roofowner!: string;
  saveButtonText: string = 'Save';
  TabStyle3: any;
  TabStyle1: any;
  monthlyData: any;
  futureData: any;
  supplier_name: any;
  public solidColorLegend: any;
  public solidColorChartType: ChartType = 'bar';
  public solidColorChartData: any;
  public solidColorChartDataYear: any;
  public solidColorChartDataYearSaving: any;
  public solidColorChartDataYearSavingOne: any;
  public solidColorChartDataYearSavingThree: any;
  public solidColorChartDataYearSavingFive: any;
  @ViewChild('Canvas') Canvas: ElementRef | any;
  @ViewChild('myCanvas') myCanvas: ElementRef | any;
  interactionData: any;
  interactionIdToDelete: any;
  totalItems: number = 0;
  pageSizeOptions: number[] = [5, 10, 50, 100];
  pageSize: number = 5;
  currentPage: number = 1;
  maxPage: number = 0;
  paginatedData: any[] = [];
  companyData: any;
  directorData: any;
  companyDataFlag: boolean = true;
  directorDataFlag: boolean = true;
  company_name: any;
  registered_office_address: any;
  email_addr: any;
  corporate_identification_number: any;
  company_class: any;
  authorized_cap: any;
  paidup_capital: any;
  industrial_class: any;
  date_of_registration: any;
  registrar_of_companies: any;
  responseData: any;
  @ViewChild(GoogleMap, { static: false }) googleMap!: GoogleMap;
  map!: google.maps.Map;
  address_line_1: any;
  address_line_2: any;
  area_name: any;
  city: any;
  state: any;
  country: any;
  leadTypes: string[] = ['Cold', 'Warm', 'Hot', 'Not Reachable', 'Not Interested', 'Solar Already Doing/Done', 'On Hold'];
  leadStatus: string='';
  formattedNumberCapacity: any;
  SolarPotentialformattedNumber: any;
  formattedNumberSolarPotential: any;
  interactionId: any;
  interactionDataform: any;
  interactionDataUpdate: any;
  isEditMode: boolean = false;
  graphHide: boolean = false;
  InteractionId: any;
  interactionTypes: string[] = ['WhatsApp Message', 'Call', 'Email'];
  formattedNumberYearCapacity: any;
  promotionalData: any;
  consumer_number: any;
  sanctioned_load: number = 0;
  current_tariff: number =0; // Default value
  escalation_rate: number =0;
  totalProjectCost: number =0;
  finance_id:any;
  module_wattage: any;
  module_type: any;
  module_brand: any;
  inverter_wattage: any;
  description:any;
  inverter_type: any;
  inverter_brand: any;
  mapElement: any;
  monthTotal: any;
  yearTotal: any;
  project_size: number = 0;
  tariffIncreaseRate: any;
  totalYearlySavingUI: any;
  totalYearlySavingUIOne: any;
  totalYearlySavingUIThree: any;
  totalYearlySavingUIFive: any;
  funded_by: any;
  pin_code: any;
  yearSavingData: any;
  yearSavingDataOne: any;
  yearSavingDataThree: any;
  yearSavingDataFive: any;
  escalationRate: number= 0;
  escalationRate1: number = 1;  // Default value of 1% for escalation rate 1
  escalationRate2: number = 2;  // Default value of 2% for escalation rate 2
  escalationRate3: number = 4;
  lat1: number = 0; // Default latitude
  lng2: number = 0; // Default longitude
  audioURL: string | null = null; 
  datetime: string = '';
  
  



  public solidColorChartOptions: ChartConfiguration['options'] = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hide legend
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            let value = context.raw; // The raw data value
            return  value.toLocaleString('en-IN') + ' kWh';  // Format as Indian currency and append 'kWh'
          },
        },
      },
    },
    scales: {
      y: {
        ticks: {
          color: "#5B5B5B", // Set Y-axis tick color
          callback: function (tickValue: string | number) {
            // Ensure the value is treated as a number before formatting
            const value = typeof tickValue === 'number' ? tickValue : parseFloat(tickValue);
            return   value.toLocaleString('en-IN'); // Format Y-axis values as Indian currency
          }
        },
        grid: {
          display: true, // Display gridlines
          color: 'rgba(171, 167, 167,0.2)', // Set Y-axis gridline color
        },
      },
      x: {
        ticks: {
          color: "#5B5B5B", // Set X-axis tick color
        },
        grid: {
          display: true, // Display gridlines
          color: 'rgba(171, 167, 167,0.2)', // Set X-axis gridline color
        },
      },
    },
  };

  options: any[] = [
    { downPayment: 0, rateOfInterest: 0, tenure: 0, emi: 0, totalPayment: 0, savings: [], lifetimeSavings: 0,
      isSaved: false,
    },
    
  ];

  myInteractionsForm!: FormGroup;
  constructor(private sharedService: ReminderService, private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private mapService: SearchService, private http: HttpClient, private modalService: NgbModal, private adminService: AdminService, private elementRef: ElementRef, private datePipe: DatePipe, private whatsAppservice: WhatsAppService, private pastProjectservice: PastProjectsService) {

  }

  ngOnInit(): void {

    
    
    this.getleadStatus();
    // this.getFinancingDataById();

    this.myInteractionsForm = this.fb.group({
      interactionType: ['', Validators.required],
      notes: ['', Validators.required],
      dateTime: [this.getCurrentDateTime(), Validators.required]
    });

    

    this.route.params.subscribe(params => {
      // console.log('adds:', params['type'])
      this.companyId = params['id'];



      if (params['id']) {

        this.companyId = params['id'];
        this.getleadStatus();
        this.companyBasicData();
        // this.companyDataList();
        this.InteractionList();
        // this.DirectorList();
        this.MonthlySolarPower();
        this.FutureSolarPower();
        this.getFinancingDataByCompanyId();
        // this.getPromotionalMessage();

      }
    });

  }

  getCurrentDateTime(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  formatIndianNumber(num: any) {
    let numStr = num.toString();
    let lastThree = numStr.slice(-3);
    let otherNumbers = numStr.slice(0, -3);
    if (otherNumbers !== '') {
      lastThree = ',' + lastThree;
    }
    this.formattedNumberSolarPotential = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;
    return this.formattedNumberSolarPotential;
  }

  formatIndianNumberCapacity(num: any) {
    // Validate the input: if it's null, undefined, or not a valid number
    // if (num === null || num === undefined || isNaN(Number(num))) {
    //   return '0'; // Default value for invalid or empty input
    // }
  
    // let numStr = num.toString();
  
    // // Handle negative numbers
    // const isNegative = numStr.startsWith('-');
    // if (isNegative) {
    //   numStr = numStr.substring(1); // Remove the negative sign for formatting
    // }
  
    // // Ensure the number is a valid integer
    // numStr = numStr.replace(/\D/g, ''); // Remove any non-digit characters
  
    // // Split the number into two parts: the last three digits and the rest
    // let lastThree = numStr.slice(-3);
    // let otherNumbers = numStr.slice(0, -3);
  
    // // Format the remaining part (otherNumbers) with commas every two digits
    // otherNumbers = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',');
  
    // // Combine the formatted parts
    // let formattedNumber = otherNumbers ? otherNumbers + ',' + lastThree : lastThree;
  
    // // Add the negative sign back if the number was negative
    // if (isNegative) {
    //   formattedNumber = '-' + formattedNumber;
    // }
  
    // return formattedNumber;
    return num.toLocaleString('en-IN');
  }
  
  
  
  
  
  
  
  
  
  

  formatIndianNumberYearCapacity(num: any) {
    let numStr = num.toString();
    let lastThree = numStr.slice(-3);
    let otherNumbers = numStr.slice(0, -3);
    if (otherNumbers !== '') {
      lastThree = ',' + lastThree;
    }
    this.formattedNumberYearCapacity = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;
    // console.log(this.formattedNumberYearCapacity, "yearsum");
    return this.formattedNumberYearCapacity;

  }


  paginateData(): void {

    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.totalItems);
    this.paginatedData = this.interactionData.slice(startIndex, endIndex);
  }

  updatePagination(): void {
    this.maxPage = Math.ceil(this.totalItems / this.pageSize);
    if (this.maxPage > 10) {
      this.maxPage = 0; // Set to 0 to display all pages
    }
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.mapService.InteractionsRoofListDataPagination(this.companyId, this.currentPage).subscribe(
      async (response: any) => {
        const newData = response.results
        this.interactionData = []
        this.interactionData = response.results

        this.updatePagination();
        this.paginateData();
      },
      (error: any) => {
        console.error(error);
      }
    );
  }



  MonthlyDataFunction() {

    this.solidColorLegend = true;
    this.solidColorChartType = 'bar';
    this.solidColorChartData = {
      datasets: [{
        label: '',

        data: this.monthlyData,
        barPercentage: 0.6,
        backgroundColor: "#69BBED",
        borderRadius: 10,
      }],
      labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
    }
    //console.log(this.solidColorChartData, "function")
  }

  FutureDataFunction() {
    this.solidColorLegend = true;
    this.solidColorChartType = 'bar';
    this.solidColorChartDataYear = {
      datasets: [{
        label: '',

        data: this.futureData,
        barPercentage: 0.6,
        backgroundColor: "#69BBED",
        borderRadius: 10,
      }],
      labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]
    }
    // console.log(this.solidColorChartDataYear, "function")

  }
  resetInstallationStatus() {

  }


  cancel() {

    this.router.navigate(['/pages/leads']);

  }

  cancelInteraction() {
    this.myInteractionsForm.reset();

  }


  addInteraction() {

    this.router.navigate(['/pages/addinteractions', this.companyId, 'view']);

  }

  addInteractionHome() {
    this.router.navigate(['/pages/addinteractions', this.companyId, 'home']);

  }


  editInteraction(interactionId: number, modal: any) {
    this.isLoader=true;

    this.isEditMode = true;
    this.InteractionId = interactionId;
    this.mapService.InteractionDatabyId(interactionId).subscribe(
      async (response: any) => {
        // console.log(response, 'editdata');
        this.isLoader=false;

        this.myInteractionsForm.patchValue({


          interactionType: response.interaction_type,
          notes: response.notes,
          dateTime: response.interaction_datetime

        });
      })

      this.modalService.open(modal, { size: 'lg' });


  }


  editInteractionHome(interactionId: number) {
    this.router.navigate(['/pages/editinteractions', this.companyId, interactionId, 'home']);
  }


  // openConfirmationModal(interactionId: number, confirmationModal1: any) {

  //   this.modalService.open(confirmationModal1, { centered: true });
  //   this.interactionIdToDelete = interactionId;

  // }

  deleteInteraction(interactionId:number) {
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
        this.isLoader=true;

    this.mapService.DeleteInteractionbyId(interactionId).subscribe(
      async (response: any) => {
        // console.log(response, 'deletdata');
        this.isLoader=false;
        this.modalService.dismissAll('confirm');
        Swal.fire({
          icon: 'success',
          title: "Success",
          html: 'Interaction Note Deleted',
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
    });

        // to get Interaction List
        this.mapService.InteractionsRoofListData(this.companyId).subscribe(
          async (response: any) => {
            this.isLoader=false;
            this.interactionData = response.results;
          },
          (error: any) => {

          }
        );

      },
      (error: any) => {
        this.isLoader=false;
        console.error(error);

      }
    );

  }
});
  }


  tab() {
    this.updateMap(this.lat, this.lng)
  }


  // get lead status data for Mylead
  getleadStatus(): void {
    this.isLoader = true;
    this.adminService.RooftopDataStatusRoofId(this.companyId).subscribe(
      (response: any) => {
        this.isLoader = false;
        // console.log('API Response:', response); // Debug log
        if (response && response.lead_status) {
          this.leadStatus = response.lead_status; // Use lead_status here
          // this.cdr.detectChanges(); // Ensure UI updates if needed
        } else {
          console.warn('Lead status not found in response:', response);
          this.leadStatus = 'Cold'; // Default value
        }
      },
      (error: any) => {
        this.isLoader = false;
        console.error('Error fetching lead status:', error);
      }
    );
  }

  


  //get Company Data by roofid

  companyBasicData() {
    this.isLoader=true;
    // console.log(this.companyId, 'ejejjeje');
    this.mapService.editUserDataByUserId(this.companyId).subscribe(
      async (response: any) => {
        this.isLoader=false;
        const commissioningDate = response.solar_installation_status ? response.solar_installation_commissioning_date || '' : '';
        const batteryCapacity = response.batteries_usage && response.battery_capacity ? response.battery_capacity : null;
        this.location = response.city || '';
        this.lat = response.latitude || 0;
        this.lng = response.longitude || 0;
        this.roofowner = response.roof_owner || '',
          this.address_line_1 = response.address_line_1 || '',
          this.address_line_2 = response.address_line_2 || ' ',
          this.area_name = response.area_name || ' ',
          this.city = response.city || '',
          this.state = response.state || '',
          this.country = response.country || '',
          this.solar_power_generation_potential = response.solar_power_generation_potential || 0;
        this.formatIndianNumber(this.solar_power_generation_potential);
        this.shortDescription = response.description || '';
        this.roofType = response.roof_type || '';
        this.consumerNumber = response.electricity_consumer_number || '';
        this.commissioningDate = commissioningDate;
        this.installationStatus = response.solar_installation_status ? 'done' : 'notDone';
        this.inverterBrand = response.inverter_brand_name || '';
        this.pvBrandPreference = response.pv_module_brand_name || '';
        this.batteryUsage = response.batteries_usage ? 'yes' : 'no';
        this.batteryCapacity = batteryCapacity;
        this.customer_first_name = response.customer_first_name,
          this.customer_last_name = response.customer_last_name,
          this.contact_person=response.contact_person,
          this.lead_type = response.lead_type,
          this.companyname = response.company_name,
          this.contact_number = response.contact_no,
          this.email_addr = response.email_addr,
          this.consumer_number = response.electricity_consumer_number,
          this.sanctioned_load = response.sanctioned_load
        this.current_tariff = response.current_tariff,
          this.module_type = response.module_type,
          this.module_brand = response.module_brand,
          this.module_wattage = response.module_wattage,
          this.inverter_brand = response.inverter_brand,
          this.inverter_type = response.inverter_type,
          this.inverter_wattage = response.inverter_wattage,
          this.project_size = response.solar_installation_capacity,
          this.leadStatus = response.lead_status,
          this.module_preference= response.module_preference,
          this.inverter_preference=response.inverter_preference,
          this.supplier_name = response.electricity_distributor,
          this.funded_by = response.funded_by,
          this.pin_code = response.pin_code,
          this.description = response.description,
          this.mapElement = document.getElementById('map');
          // console.log("abcd", this.leadStatus);
        if (this.mapElement) {
          const mapOptions = {
            center: { lat: response.latitude, lng: response.longitude },
            zoom: 18,
            mapTypeId: google.maps.MapTypeId.SATELLITE
          };
          this.map = new google.maps.Map(this.mapElement, mapOptions);
          new google.maps.Marker({
            position: { lat: response.latitude, lng: response.longitude },
            map: this.map
          });
          google.maps.event.addListenerOnce(this.map, 'idle', () => {
            // Set the zoom level to 16 after the tiles have finished loading
            this.map.setZoom(18);


            // console.log('Zoom level after settingss:', this.map.getZoom());
          });
          this.updateMap(response.latitude, response.longitude);
        }


        //this.leadStatus = response.lead_type;
        this.surface_area = response.surface_area.toLocaleString();
        this.companyData = response;
        if (response.solar_installation_status) {
          this.capacity = response.solar_installation_capacity;
          this.formatIndianNumberCapacity(this.capacity);
        } else {
          this.capacityLookingFor = response.solar_installation_capacity || '';
          this.inverterBrandPreference = response.inverter_brand_name || '';
          this.batteryCapacityRequired = response.battery_capacity || '';
        }

      },
      (error: any) => {
        this.isLoader=false;
        console.error(error);
        // this.userLoginError = error.error.Message
      }
    );
  }

  updateMap(latitude: number, longitude: number) {
    const mapElement = document.getElementById('map');
  
    if (!mapElement) {
      console.error('Map element not found.');
      return;
    }
  
    // Validate latitude and longitude
    if (
      latitude < -90 || latitude > 90 ||
      longitude < -180 || longitude > 180
    ) {
      console.error('Invalid latitude or longitude values.');
      return;
    }
  
    // Define map options
    const mapOptions: google.maps.MapOptions = {
      center: { lat: latitude, lng: longitude },
      zoom: 18,
      mapTypeId: google.maps.MapTypeId.SATELLITE,
    };
  
    // Initialize the map
    this.map = new google.maps.Map(mapElement, mapOptions);
  
    // Add a marker to the map
    const marker = new google.maps.Marker({
      position: { lat: latitude, lng: longitude },
      map: this.map,
      title: 'Exact Location',
    });

    // console.log('map data:',marker);
  
    // Adjust zoom after tiles load
    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      this.map.setZoom(18);
    });
  
    // Optional: Log the map center for debugging
    // console.log('Map initialized at:', this.map.getCenter()?.toJSON());
  }
  

  onStatusSelectionChange(event: Event): void {
    this.leadStatus = (event.target as HTMLSelectElement).value;

    const formattedData = {
      lead_status: this.leadStatus,
      roof_type: this.roofType,
      address: this.location || '',
    };

    this.isLoader = true;

    this.mapService.editUserData(formattedData, this.companyId).subscribe(
      async (response: any) => {
        this.isLoader = false;
        Swal.fire({
          icon: 'success',
          title: 'Success',
          html: 'Status Updated Successfully',
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        });

        this.getleadStatus(); // Call method to refresh lead status
      },
      (error: any) => {
        this.isLoader = false;
        console.error(error);
      }
    );
  }






  //get company Data
  companyDataList() {
    this.isLoader=true;
    this.adminService.CompanyDatabyRoofId(this.companyId).subscribe(
      async (response: any) => {
        this.isLoader=false;
        // console.log(response);
        this.companyData = response;

        // console.log(this.companyData, 'latest company');
        // console.log(this.companyData.company_name);
        this.company_name = this.companyData.company_name;
        this.registered_office_address = this.companyData.registered_office_address;
        this.email_addr = this.companyData.email_addr;
        this.corporate_identification_number = this.companyData.corporate_identification_number;
        this.company_class = this.companyData.company_class;
        this.authorized_cap = this.companyData.authorized_cap;
        this.paidup_capital = this.companyData.paidup_capital;
        this.industrial_class = this.companyData.industrial_class;
        this.date_of_registration = this.companyData.date_of_registration;
        this.registrar_of_companies = this.companyData.registrar_of_companies;


      },
      (error: any) => {
        // console.log(error.status);
        // console.log(this.companyDataFlag)
        // console.log(this.companyData)
        this.isLoader=false;
        this.companyDataFlag = false;
      },

    );
  }

  



  //get Monthly Future graph
  MonthlySolarPower() {
    this.isLoader=true;
    this.mapService.MonthlySolarPowerGenerationData(this.companyId).subscribe(
      async (response: any) => {
        this.isLoader=false;
        // console.log(response, 'monthly data');
        this.monthTotal = this.formatIndianNumberCapacity(Math.round(response.yearly_total_generation));
        this.monthlyData = response.monthly_generation;
        // console.log(this.monthlyData, 'monthdata')
        if (this.monthlyData.length > 0) {
          this.MonthlyDataFunction();
        }
      },
      (error: any) => {
        this.isLoader=false;
        console.error(error);

      }
    );
  }

  //get Year Future graph
  FutureSolarPower() {
    this.isLoader=true;
    this.mapService.FutureSolarPowerGenerationData(this.companyId).subscribe(
      async (response: any) => {
        this.isLoader=false;
        // console.log(response, '25 data');
        this.futureData = response.yearly_generation;
        this.yearTotal = this.formatIndianNumberCapacity(Math.round(response.lifetime_total_generation));
        // console.log('yearlygen', this.futureData)
        if (this.futureData.length > 0) {
          this.FutureDataFunction();
        }
        // Initialize sum variable to accumulate the sum of numbers
        let sum = 0;

        // Iterate through the futureData array and add each element to the sum
        for (let i = 0; i < this.futureData.length; i++) {
          // Assuming each element is a number, use parseInt to convert to integer
          sum += parseInt(this.futureData[i], 10); // Specify base 10 for parseInt
        }

        // console.log(sum, "sum"); // Output the sum of numbers
        // Format sum to Indian number format using custom function
        this.formatIndianNumberYearCapacity(sum);
      },
      (error: any) => {
        this.isLoader=false;
        console.error(error);

      }
    );
  }

  // get directorlist
  DirectorList() {
    this.isLoader=true;
    this.adminService.RooftopCompanyDirectorssDataListbyRoofid(this.companyId).subscribe(
      async (response: any) => {
        this.isLoader=false;
        // console.log(response, 'director data by roof id');
        this.directorData = response.results;
        this.responseData = response;
        if (response.count > 0) {
          this.companyDataFlag = true;
        }
        // if (response.count == 0) {
        //   this.companyDataFlag = false;
        // }

        (error: any) => {
          this.isLoader=false;
          console.error(error);

        }
      })
  }

  // to get Interaction List
  InteractionList() {
    this.isLoader = true;
    this.mapService.InteractionsRoofListData(this.companyId).subscribe(
      (response: any) => {
        this.isLoader = false;
        this.interactionData = response.results || [];
  
        this.interactionData.forEach((interaction: { interaction_type: string; voice_recording_path?: string }) => {
          if (interaction.interaction_type === "Voice Note To Self") {
            if (interaction.voice_recording_path) {
              // console.log("Voice Recording URL:", interaction.voice_recording_path);
            } else {
              // console.warn("Missing voice recording path for interaction:", interaction);
            }
          }
        });
        
  
        this.totalItems = response.count || 0;
        this.pageSize = this.interactionData.length;
        this.updatePagination();
        this.paginateData();
      },
      (error: any) => {
        this.isLoader = false;
        console.error("Error fetching interactions:", error);
        
      }
    );
  }
  submitInteractionsForm(myInteractionsForm: any) {
    if (this.isEditMode == false) {
      // For saving the interaction
      const temp = this.datePipe.transform(this.myInteractionsForm.value.dateTime, 'yyyy-MM-dd HH:mm:ss');
      // console.log("submit");
  
      this.interactionDataform = {
        roof_id: this.companyId,
        interaction_type: myInteractionsForm.value.interactionType,
        notes: myInteractionsForm.value.notes,
        interaction_datetime: temp,
      };
  
      this.isLoader = true;
      this.mapService.saveInteractionData(this.interactionDataform).subscribe(
        async (response: any) => {
          this.isLoader = false;
          this.InteractionList();
          Swal.fire({
            icon: 'success',
            title: "Success",
            html: 'Interaction Note Added Successfully',
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
          });
  
          // Reset form and close modal
          myInteractionsForm.reset();
          myInteractionsForm.markAsPristine();
          myInteractionsForm.markAsUntouched();
          Object.keys(myInteractionsForm.controls).forEach(key => {
            myInteractionsForm.get(key)?.setErrors(null);
          });
  
          // Close the modal
          this.modalService.dismissAll();
        },
        (error: any) => {
          this.isLoader = false;
          // console.log(error.status);
          if (error.status == 400) {
            Swal.fire({
              icon: 'error',
              title: "Error",
              html: 'Please fill all details',
              timer: 2000,
              timerProgressBar: true,
              showConfirmButton: false,
            });
          }
        }
      );
    } else {
      // For updating the interaction
      // console.log("update");
  
      const temp = this.datePipe.transform(this.myInteractionsForm.value.dateTime, 'yyyy-MM-dd HH:mm:ss');
  
      this.interactionDataUpdate = {
        roof_id: this.companyId,
        interaction_type: myInteractionsForm.value.interactionType,
        notes: myInteractionsForm.value.notes,
        interaction_datetime: temp,
      };
  
      this.isLoader = true;
      this.mapService.updateInteractionData(this.interactionDataUpdate, this.InteractionId).subscribe(
        async (response: any) => {
          this.isLoader = false;
          // console.log(response, 'updated data');
          this.InteractionList();
          Swal.fire({
            icon: 'success',
            title: "Success",
            html: 'Interaction Note Updated Successfully',
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
          });
  
          this.isEditMode = false;
  
          // Reset form and close modal
          myInteractionsForm.reset();
          myInteractionsForm.markAsPristine();
          myInteractionsForm.markAsUntouched();
          Object.keys(myInteractionsForm.controls).forEach(key => {
            myInteractionsForm.get(key)?.setErrors(null);
          });
  
          // Close the modal
          this.modalService.dismissAll();
        },
        (error: any) => {
          this.isLoader = false;
          // console.log(error.status);
          if (error.status == 400) {
            Swal.fire({
              icon: 'error',
              title: "Error",
              html: 'Please fill all details',
              timer: 2000,
              timerProgressBar: true,
              showConfirmButton: false,
            });
          }
        }
      );
    }
  }
  


  getPromotionalMessage() {
    this.isLoader=true;
    this.whatsAppservice.whataAppMessagesReplyList(this.companyId).subscribe(
      async (response: any) => {
        this.isLoader=false;
        this.promotionalData = response.results
        this.sharedService.interactionOccurred.emit();
        // console.log(this.promotionalData, 'promotinalData')
        this.totalItems = response.count;
        this.pageSize = response.results.length;
        this.updatePaginationPromotionalMessage();
        this.paginateDataPromotionalMessage();


      },
      (error: any) => {
        this.isLoader=false;
        console.error(error);

      }
    );

  }

  onPageChangePromotionalMessage(page: number): void {
    this.currentPage = page;
    this.whatsAppservice.whataAppMessagesReplyListPagination(this.companyId, this.currentPage).subscribe(
      async (response: any) => {
        const newData = response.results
        this.promotionalData = []
        this.promotionalData = response.results

        this.updatePaginationPromotionalMessage();
        this.paginateDataPromotionalMessage();
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
  paginateDataPromotionalMessage(): void {

    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.totalItems);
    this.paginatedData = this.promotionalData.slice(startIndex, endIndex);
  }

  updatePaginationPromotionalMessage(): void {
    this.maxPage = Math.ceil(this.totalItems / this.pageSize);
    if (this.maxPage > 10) {
      this.maxPage = 0; // Set to 0 to display all pages
    }
  }

  // download proposal by id
  downloadProposal(id: any) {

    const savedOptions = this.options.filter(option => option.isSaved);

  if (savedOptions.length === 0) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      html: 'Please add financial details option.',
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false,
    });
    return;
  }
    
    // console.log("getproposal");
    this.isLoader=true;
    this.pastProjectservice.downloadProposalDataByRoofId(id).subscribe(
      (response: Blob) => {
        // console.log('Proposal received', response);
        this.isLoader=false;
        // Create a URL for the Blob
        const downloadUrl = window.URL.createObjectURL(response);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = 'Proposal.docx';  // Name of the downloaded file
        link.click();

        Swal.fire({
          icon: 'success',
          title: "Success",
          html: 'Proposal Download Successfully',
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
    });

        // setTimeout(() => {
        //   this.router.navigate(['/pages/myroof']);
        // }, 2000);
      },
      (error: any) => {
        this.isLoader=false;
        console.error(error);

      }
    );
  }


  calculateTotals() {
    const savings = {
      initial_project_size: this.project_size,
      initial_tariff: this.current_tariff, 
       sanctioned_load: this.sanctioned_load,
      escalation_rates: parseInt(this.tariffIncreaseRate, 10),
    };
    this.isLoader = true;
    this.pastProjectservice.getSavings(savings).subscribe(
      (response: any) => {
        this.isLoader = false;
        // console.log(response, 'savingdata');
        this.totalYearlySavingUI = Math.round(response.total_yearly_savings).toLocaleString();
        this.yearSavingData = response.net_savings;
        this.savingGraph(); // Call the consolidated graph method
  
        Swal.fire({
          icon: 'success',
          title: "Success",
          html: 'Lifetime Savings Calculated Successfully',
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        });
      },
      (error: any) => {
        this.isLoader = false;
        console.error(error);
      }
    );
  }
  

  tabSaving() {
    const escalationRates = [
      { rate: this.escalationRate1 || 1, option: 1 },
      { rate: this.escalationRate2 || 2, option: 2 },
      { rate: this.escalationRate3 || 4, option: 3 },
    ];
  
    escalationRates.forEach(({ rate, option }) => {
      const savingsRequest = {
        roof_id: this.companyId,
        total_project_cost: 0,
        project_capacity: this.project_size,
        unit_price: this.current_tariff, 
        inflation_rate: rate,
        options: this.options.map(option => ({
          down_payment: 0,
          rate_of_interest: 6,
          tenure: 5,
        
        }))
      };
      this.isLoader = true;
      this.pastProjectservice.getSavings(savingsRequest).subscribe(
        (response: any) => {
          this.isLoader = false;
          // console.log(response, `Savings Data for Rate ${rate}%`);
          const savingsDetails = response.savings_details.find(
            (detail: any) => parseFloat(detail.escalation_rate) === rate
          );
  
          if (response.savings_details&& response.savings_details.length>0) {
            const savingsDetails= response.savings_details[0];
            const lifetimeSavings = Math.round(savingsDetails.lifetime_savings);
            const yearlySavings =savingsDetails.yearly_savings
            if (option === 1) {
              this.totalYearlySavingUIOne = this.formatIndianNumberCapacity(lifetimeSavings);
              this.yearSavingDataOne = yearlySavings;
              this.savingGraph(1);
            } else if (option === 2) {
              this.totalYearlySavingUIThree = this.formatIndianNumberCapacity(lifetimeSavings);
              this.yearSavingDataThree = yearlySavings;
              this.savingGraph(2);
            } else if (option === 3) {
              this.totalYearlySavingUIFive = this.formatIndianNumberCapacity(lifetimeSavings);
              this.yearSavingDataFive = yearlySavings;
              this.savingGraph(3);
            }
          }
        },
        (error: any) => {
          this.isLoader = false;
          console.error(`Error fetching savings for Rate ${rate}%:`, error);
        }
      );
    });
  }
  

  calculateSavings(escalationRate: number, option: number) {
    const savingsRequest = {
      roof_id: this.companyId,
      total_project_cost: 0,
      project_capacity: this.project_size,
      unit_price: this.current_tariff,  
      inflation_rate: parseInt(escalationRate.toString(), 10),
      options: this.options.map(option => ({
        down_payment: 0,
        rate_of_interest:6,
        tenure: 5,
      
      }))
    };
    this.isLoader = true;
    this.pastProjectservice.getSavings(savingsRequest).subscribe(
      (response: any) => {
        this.isLoader = false;
        const savingsDetails = response.savings_details.find(
          (detail: any) => parseFloat(detail.escalation_rate) === escalationRate
        );
  
        if (response.savings_details&& response.savings_details.length>0) {
          const savingsDetails= response.savings_details[0];
          const lifetimeSavings = Math.round(savingsDetails.lifetime_savings).toLocaleString();
          const yearlySavings =savingsDetails.yearly_savings
          if (option === 1) {
            this.totalYearlySavingUIOne = this.formatIndianNumberCapacity(lifetimeSavings);
            this.yearSavingDataOne = yearlySavings;
            this.savingGraph(1);
          } else if (option === 2) {
            this.totalYearlySavingUIThree = this.formatIndianNumberCapacity(lifetimeSavings);
            this.yearSavingDataThree = yearlySavings;
            this.savingGraph(2);
          } else if (option === 3) {
            this.totalYearlySavingUIFive = this.formatIndianNumberCapacity(lifetimeSavings);
            this.yearSavingDataFive = yearlySavings;
            this.savingGraph(3);
          }
        }
      },
      (error: any) => {
        this.isLoader = false;
      }
    );
  }
  

  

  // Consolidated graph method to handle all cases
  savingGraph(option?: number) {
    this.graphHide = true;
    this.solidColorLegend = true;
    this.solidColorChartType = 'bar';

    // Define common chart properties
    const chartData = {
      datasets: [{
        label: '# of Votes',
        data: option === 1 ? this.yearSavingDataOne : option === 2 ? this.yearSavingDataThree : option === 3 ? this.yearSavingDataFive : this.yearSavingData,
        barPercentage: 0.6,
        backgroundColor: "#69BBED",
        borderRadius: 10
      
      }],
      labels: Array.from({ length: 25 }, (_, i) => i + 1), // Generates labels 1 to 25
    };

    if (option === 1) {
      this.solidColorChartDataYearSavingOne = chartData;
      // console.log(this.solidColorChartDataYearSavingOne, "Graph One");
    } else if (option === 2) {
      this.solidColorChartDataYearSavingThree = chartData;
      // console.log(this.solidColorChartDataYearSavingThree, "Graph Three");
    } else if (option === 3) {
      this.solidColorChartDataYearSavingFive = chartData;
      // console.log(this.solidColorChartDataYearSavingFive, "Graph Five");
    } else {
      this.solidColorChartDataYearSaving = chartData;
      // console.log(this.solidColorChartDataYearSaving, "Main Graph");
    }
  }


  calculateFinancingForOption(index: number) {
    const selectedOption = this.options[index];
  
    // Validate the selected option
    if (
      selectedOption.downPayment < 0 ||
      selectedOption.rateOfInterest < 0 ||
      selectedOption.tenure < 0
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        html: 'Please fill in valid data for this financing option.',
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      return;
    }
  
    // Prepare the payload for the selected option
    const requestData = {
      roof_id: this.companyId,
      save: false,
      total_project_cost: this.totalProjectCost,
      project_capacity: this.project_size,
      unit_price: this.current_tariff,
      inflation_rate: selectedOption.escalation_rate,
      options: [
        {
          down_payment: selectedOption.downPayment,
          rate_of_interest: selectedOption.rateOfInterest,
          tenure: selectedOption.tenure,
        },
      ],
    };

    // console.log(requestData, "calculate");
  
    this.isLoader = true;
  
    // Call the calculate API
    this.pastProjectservice.calculateDetails(requestData).subscribe(
      (response: any) => {
        // console.log('Response from calculate API:', response);
        this.isLoader = false;
  
        // Check if the response contains valid financing details
        if (response && response.financing_details && response.financing_details.length > 0) {
          const detail = response.financing_details[0];
  
          // Update the selected option with the response data
          this.options[index].emi = detail.emi;
          this.options[index].totalPayment = detail.total_payment;
          this.options[index].saving = detail.yearly_savings;
          this.options[index].lifetimeSavings = detail.lifetime_savings;
  
          // Mark as recalculated
          this.options[index].isRecalculated = true;
  
          Swal.fire({
            icon: 'success',
            title: 'Success',
            html: 'Financing details calculated successfully for this option.',
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
          });
        } else {
          // If the API response is invalid or doesn't contain financing details
          Swal.fire({
            icon: 'error',
            title: 'Error',
            html: 'Invalid response from the server. Please try again later.',
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
          });
        }
      },
      (error: any) => {
        console.error('Error calculating financing:', error);
        this.isLoader = false;
  
        Swal.fire({
          icon: 'error',
          title: 'Error',
          html: 'Error calculating financing for this option. Please try again.',
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        });
      }
    );
  }
  
  

  saveFinancingOption(index: number) {
    const selectedOption = this.options[index];
  
    if (
      !selectedOption.emi ||
      !selectedOption.totalPayment ||
      !selectedOption.savings ||
      !selectedOption.lifetimeSavings
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        html: 'Please calculate the financing details before saving.',
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      return;
    }
  
    const payload = {
      roof_id: this.companyId,
      save: true,
      total_project_cost: this.totalProjectCost,
      project_capacity: this.project_size,
      unit_price: this.current_tariff,
      inflation_rate: selectedOption.escalation_rate,
      options: [
        {
          down_payment: selectedOption.downPayment,
          rate_of_interest: selectedOption.rateOfInterest,
          tenure: selectedOption.tenure,
        },
      ],
    };
  
    this.pastProjectservice.saveDetails(payload).subscribe(
      (response: any) => {
        // console.log('Response from save API:', response);
  
        if (response?.financing_details?.length > 0) {
          const savedId = response.financing_details[0]?.id;
          this.options[index].isSaved = true;
          this.options[index].id = savedId;
          this.finance_id = savedId; // Assign the saved ID to finance_id
          // console.log('Saved finance_id:', this.finance_id);
        }
  
        Swal.fire({
          icon: 'success',
          title: 'Saved',
          html: 'Financing option saved successfully.',
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        });
      },
      (error: any) => {
        console.error('Error saving financing option:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          html: 'Error saving financing option. Please try again.',
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        });
      }
    );
  }
  
  
  updateFinancingOption(index: number) {
    const selectedOption = this.options[index];
  
    // Ensure the ID exists before updating
    const optionId = selectedOption.id || this.finance_id;
    // console.log('Updating with ID:', optionId);
  
    if (!optionId) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        html: 'Cannot update financing option without a valid ID.',
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      return;
    }
  
    // Ensure the financing option has been recalculated
    if (!selectedOption.isRecalculated) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        html: 'Please recalculate the financing details before updating.',
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      return;
    }
  
    const payload = {
      roof_id: this.companyId,
      save: true,
      total_project_cost: this.totalProjectCost,
      project_capacity: this.project_size,
      unit_price: Number(this.current_tariff),
      inflation_rate: selectedOption.escalation_rate,
      options: [
        {
          down_payment: selectedOption.downPayment,
          rate_of_interest: selectedOption.rateOfInterest,
          tenure: selectedOption.tenure,
        },
      ],
    };
  
    this.pastProjectservice.updateDetails(optionId, payload).subscribe(
      (response: any) => {
        // console.log('Response from update API:', response);
        Swal.fire({
          icon: 'success',
          title: 'Updated',
          html: 'Financing option updated successfully.',
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        });
      },
      (error: any) => {
        console.error('Error updating financing option:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          html: 'Error updating financing option. Please try again.',
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        });
      }
    );
  }
  

  saveOrUpdateAllOptions() {
    let allOptionsValid = true;
  
    // Validate all options
    this.options.forEach((option, index) => {
      if (!option.emi || !option.totalPayment || !option.saving || !option.lifetimeSavings) {
        allOptionsValid = false;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          html: `Please calculate financing details for option ${index + 1} before saving or updating.`,
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        });
      }
    });
  
    if (!allOptionsValid) {
      return; // Stop if any option is invalid
    }
  
    // Save or update options
    this.options.forEach((option, index) => {
      if (option.isSaved) {
        this.updateFinancingOption(index);
      } else {
        this.saveFinancingOption(index);
      }
    });
  
    // Update button text based on the options' state
    this.saveButtonText = this.options.some(option => option.isSaved) ? 'Update' : 'Save';
  }
  
  addFinancingOption() {
    if (this.options.length < 3) {
      this.options.push({
        downPayment: 0,
        rateOfInterest: 0,
        tenure: 0,
        emi: 0,
        totalPayment: 0,
        savings: [],
        lifetimeSavings: 0,
        isSaved: false,
        isRecalculated: false,
        id: null,
      });
  
      // Update button text to "Save" if a new option is added
      this.saveButtonText = 'Save';
    } else {
      Swal.fire({
        icon: 'info',
        title: 'Information',
        html: 'Only three financing options can be entered.',
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    }
  }
  
  removeFinancingOption(index: number) {
    const selectedOption = this.options[index];

    const optionId = selectedOption.id || this.finance_id;
    // console.log('Updating with ID:', optionId);
  
    if (!optionId) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        html: 'Cannot delete financing option without a valid ID.',
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      return;
    }
  
  
    if (this.options.length === 1) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        html: 'At least one financing option must be present.',
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      return;
    }
  
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to remove this financing option?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it!',
    }).then((result) => {
      if (result.isConfirmed) {
        if (selectedOption.isSaved && selectedOption.id) {
          this.pastProjectservice.removeDetails(optionId).subscribe(
            (response: any) => {
              // console.log('Response from remove API:', response);
              this.options.splice(index, 1);
  
              // Update button text dynamically
              this.saveButtonText = this.options.some(option => option.isSaved) ? 'Update' : 'Save';
  
              Swal.fire({
                icon: 'success',
                title: 'Removed',
                html: 'Financing option removed successfully.',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
              });
            },
            (error: any) => {
              console.error('Error removing financing option:', error);
              Swal.fire({
                icon: 'error',
                title: 'Error',
                html: 'Error removing financing option. Please try again.',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
              });
            }
          );
        } else {
          this.options.splice(index, 1);
  
          // Update button text dynamically
          this.saveButtonText = this.options.some(option => option.isSaved) ? 'Update' : 'Save';
  
          Swal.fire({
            icon: 'success',
            title: 'Removed',
            html: 'Financing option removed successfully.',
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
          });
        }
      }
    });
  }
  
  getFinancingDataByCompanyId() {
    if (!this.companyId) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        html: 'Invalid company ID.',
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      return;
    }
  
    this.isLoader = true;
  
    this.pastProjectservice.financedatabyId(this.companyId).subscribe(
      (response: any) => {
        this.isLoader = false;
        // console.log(response, 'sooraj');
  
        if (response && response.results && Array.isArray(response.results)) {
          const financingDetails = response.results;
  
          // Populate existing options
          this.options = financingDetails.map((detail: any) => ({
            id: detail.id,
            downPayment: detail.down_payment,
            rateOfInterest: detail.rate_of_interest,
            tenure: detail.tenure,
            totalProjectCost: Math.floor(detail.total_project_cost),
            escalation_rate: Math.floor(detail.inflation_rate),
            emi: detail.emi,
            totalPayment: detail.total_payment,
            saving: detail.yearly_savings || [],
            lifetimeSavings: detail.lifetime_savings,
            isSaved: true,
            isRecalculated: false,
          }));
  
          // Update button text dynamically
          this.saveButtonText = 'Update';
  
          // Log total project costs for debugging
          // this.options.forEach(option =>
          //   console.log('Total Project Cost:', option.totalProjectCost)
          // );
  
          // Assign the total project cost from the first option, if available
          if (this.options.length > 0) {
            this.totalProjectCost = this.options[0].totalProjectCost;
            // console.log('Assigned Total Project Cost:', this.totalProjectCost);
          }
        }
  
        // If no existing options found, add one default option
        if (!this.options || this.options.length === 0) {
          
  
          // Initialize with one new default option
          this.addFinancingOption();
  
          // Update button text dynamically
          this.saveButtonText = 'Save';
        }
      },
      (error: any) => {
        this.isLoader = false;
        console.error('Error fetching financing data:', error);
  
        // In case of error, ensure at least one default option is added
        if (!this.options || this.options.length === 0) {
          this.addFinancingOption();
          this.saveButtonText = 'Save';
        }
      }
    );
  }

  playRecording(audioUrl: string) {
    // console.log("Audio URL:", audioUrl); // Check if the URL is correct
  
    if (!audioUrl) {
      console.error("No voice recording URL available.");
      return;
    }
  
    const audio = new Audio(audioUrl);
    audio.play()
      .then(() => console.log("Playing voice recording..."))
      .catch(error => console.error("Error playing audio:", error));
  }


  openAudioModal(data: any) {
    // console.log("Full Data Object:", data); // Log the entire object
  
    this.audioURL = data.voice_recording_path;
    this.datetime =data.interaction_datetime;  // Set the audio URL
  
    this.modalService.open(this.audioModal, { size: '', backdrop: 'static', centered: true }); // Open the modal
  }
  
  
  
  
  






  


}
