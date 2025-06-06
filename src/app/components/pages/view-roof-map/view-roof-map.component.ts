
import { HttpClient } from '@angular/common/http';
import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SearchService } from 'src/app/shared/services/search.service';
import { ChartConfiguration, ChartType } from "chart.js";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from 'src/app/shared/services/admin.service';
import { WhatsAppService } from 'src/app/shared/services/whats-app.service';
import { ReminderService } from 'src/app/shared/services/reminder.service';
import { GoogleMap, MapInfoWindow } from '@angular/google-maps';
import { DatePipe } from '@angular/common';
import { ProductDetailsComponent } from '../e-commerce/product-details/product-details.component';

@Component({
  selector: 'app-view-roof-map',
  templateUrl: './view-roof-map.component.html',
  styleUrls: ['./view-roof-map.component.scss'],
  providers: [DatePipe]

})
export class ViewRoofMapComponent {
  companyId: any;
  profie = localStorage.getItem('user')
  @ViewChild(GoogleMap, { static: false }) googleMap!: GoogleMap;
  type: any;
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
  lead_type!: string;
  surface_area!: string;
  roofowner!: string;
  TabStyle3: any;
  TabStyle1: any;
  monthlyData: any;
  futureData: any;
  public solidColorLegend: any;
  public solidColorChartType: ChartType = 'bar';
  public solidColorChartData: any;
  public solidColorChartDataYear: any;
  @ViewChild('Canvas') Canvas: ElementRef | any;
  @ViewChild('myCanvas') myCanvas: ElementRef | any;
  map!: google.maps.Map;
  interactionData: any;
  interactionIdToDelete: any;
  totalItems: number = 0;
  pageSizeOptions: number[] = [5, 10, 50, 100];
  pageSize: number = 5;
  currentPage: number = 1;
  // maxPage: number = 0;
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
  leadTypes: string[] = ['Cold', 'Warm', 'Hot', 'Not Reachable', 'Not Interested', 'Solar Already Doing/Done', 'On Hold'];
  leadStatus: any;
  address_line_1: any;
  address_line_2: any;
  area_name: any;
  city: any;
  state: any;
  country: any;
  maxPage = 4; // This should match the maxSize property in the template
  interactionId: any;
  interactionDataform: any;
  interactionDataUpdate: any;
  isEditMode: boolean = false;
  InteractionId: any;
  interactionTypes: string[] = ['WhatsApp Message', 'Call', 'Email'];
  formattedNumberYearCapacity: any;
  formattedNumberSolarPotential: any;
  formattedNumberCapacity: any;
  SolarPotentialformattedNumber: any;
  promotionalData: any;

  public solidColorChartOptions: ChartConfiguration['options'] = {

    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        ticks: {
          // beginAtZero: true,
          // fontSize: 10,
          // max: 80,
          color: "rgba(171, 167, 167,0.9)",
          //  color: "rgba(226, 128, 17,0.9)",
        },
        grid: {
          display: true,
          color: 'rgba(171, 167, 167,0.2)',
          //color: "rgba(226, 128, 17,0.2)",
        },
      },
      x: {
        ticks: {
          // beginAtZero: true,
          // fontSize: 11,
          color: "rgba(171, 167, 167,0.9)",
          //color: "rgba(226, 128, 17,0.9)",

        },
        grid: {
          display: true,
          color: 'rgba(171, 167, 167,0.2)',
          //color: "rgba(226, 128, 17,0.2)"

        },
      }
    }

  };

  myInteractionsForm!: FormGroup;
  myForm!: FormGroup;

  constructor(private elementRef: ElementRef, private sharedService: ReminderService, private toastr: ToastrService, private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private mapService: SearchService, private http: HttpClient, private modalService: NgbModal, private adminService: AdminService, private whatsAppservice: WhatsAppService, private datePipe: DatePipe,) {


  }

  ngOnInit(): void {

    this.myForm = this.fb.group({
      name: ['', Validators.required]
    });


    this.myInteractionsForm = this.fb.group({
      interactionType: ['', Validators.required],
      notes: ['', Validators.required],
      dateTime: [new Date(), Validators.required]
    });


    this.route.params.subscribe(params => {
      console.log('adds:', params['type'])
      this.companyId = params['id'];


      if (params['type'] == 'homeFilter') {

        this.type = 'homeFilter'
        console.log('hey')
        this.companyId = params['id'];
        this.companyBasicData();
        this.companyDataList();
        this.InteractionList();
        this.DirectorList();
        this.MonthlySolarPower();
        this.FutureSolarPower();

      }
      else if (params['type'] == 'home') {

        this.type = 'home'
        console.log('hey')
        this.companyId = params['id'];
        this.companyBasicData();
        this.companyDataList();
        this.InteractionList();
        this.DirectorList();
        this.MonthlySolarPower();
        this.FutureSolarPower();

      }


      else if (params['type'] == 'withFilter') {
        this.companyId = params['id'];
        this.type = 'withFilter'

        this.companyBasicData();
        this.companyDataList();
        this.InteractionList();
        this.DirectorList();
        this.MonthlySolarPower();
        this.FutureSolarPower();


      }



      else if (params['id']) {

        this.companyId = params['id'];
        this.companyBasicData();
        this.companyDataList();
        this.InteractionList();
        this.DirectorList();
        this.MonthlySolarPower();
        this.FutureSolarPower();
        this.getPromotionalMessage();


      }
    });

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
    let numStr = num.toString();
    let lastThree = numStr.slice(-3);
    let otherNumbers = numStr.slice(0, -3);
    if (otherNumbers !== '') {
      lastThree = ',' + lastThree;
    }
    this.formattedNumberCapacity = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;
    return this.formattedNumberCapacity;
  }


  formatIndianNumberYearCapacity(num: any) {
    let numStr = num.toString();
    let lastThree = numStr.slice(-3);
    let otherNumbers = numStr.slice(0, -3);
    if (otherNumbers !== '') {
      lastThree = ',' + lastThree;
    }
    this.formattedNumberYearCapacity = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;
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


  MonthlyDataFunction() {

    this.solidColorLegend = true;
    this.solidColorChartType = 'bar';
    this.solidColorChartData = {
      datasets: [{
        label: '# of Votes',

        data: this.monthlyData,
        barPercentage: 0.6,
        backgroundColor: "#C7ADFF"

      }],
      labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],

    }
    //console.log(this.solidColorChartData, "function")
  }

  FutureDataFunction() {
    this.solidColorLegend = true;
    this.solidColorChartType = 'bar';
    this.solidColorChartDataYear = {
      datasets: [{
        label: '# of Votes',

        data: this.futureData,
        barPercentage: 0.6,
        backgroundColor: "#C7ADFF"
      }],
      labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]
    }
    console.log(this.solidColorChartDataYear, "function")

  }
  resetInstallationStatus() {

  }

  // document.getElementById("location").innerText = data.location;
  // document.getElementById("shortDescription").innerText = data.shortDescription;
  // document.getElementById("roofType").innerText = data.roofType;
  // document.getElementById("consumerNumber").innerText = data.consumerNumber;
  // document.getElementById("roofowner").innerText = data.roofowner;
  // document.getElementById("spgp").innerText = data.spgp;
  // document.getElementById("installationStatus").innerText = data.installationStatus;
  // if (data.installationStatus === "done") {
  //     document.getElementById("doneSection").style.display = "block";
  //     document.getElementById("notDoneSection").style.display = "none";
  //     document.getElementById("capacity").innerText = data.capacity;
  //     document.getElementById("commissioningDate").innerText = data.commissioningDate;
  //     document.getElementById("inverterBrand").innerText = data.inverterBrand;
  // } else {
  //     document.getElementById("doneSection").style.display = "none";
  //     document.getElementById("notDoneSection").style.display = "block";
  //     document.getElementById("capacityLookingFor").innerText = data.capacityLookingFor;
  //     document.getElementById("batteryCapacityRequired").innerText = data.batteryCapacityRequired;
  //     document.getElementById("inverterBrandPreference").innerText = data.inverterBrandPreference;
  //     document.getElementById("pvBrandPreference").innerText = data.pvBrandPreference;
  //     document.getElementById("batteryUsage").innerText = data.batteryUsage === "yes" ? "Yes" : "No";
  //     if (data.batteryUsage === "yes") {
  //         document.getElementById("batteryCapacity").innerText = data.batteryCapacity;
  //     } else {
  //         document.getElementById("batteryCapacity").innerText = "N/A";
  //     }
  // }

  cancel() {
    if (this.type == 'homeFilter') {
      this.router.navigate(['/pages/homepage', 1])

    }
    else if (this.type == 'company') {
      this.router.navigate(['/pages/admin-rooftop-request'])

    }
    else {
      this.router.navigate(['/pages/myroof']);
    }
  }

  cancelInteraction() {
    this.myInteractionsForm.reset();

  }

  addInteraction() {

    this.router.navigate(['/pages/addinteractions', this.companyId, 'view']);

  }

  addInteractionHome() {
    console.log("add interaction from Home")
    this.router.navigate(['/pages/addinteractions', this.companyId, 'home']);

  }


  editInteraction(interactionId: number) {
    // this.router.navigate(['/pages/editinteractions', this.companyId, interactionId, 'view']);
    //to get  interaction data of particular id
    this.isEditMode = true;
    this.InteractionId = interactionId;
    this.mapService.InteractionDatabyId(interactionId).subscribe(
      async (response: any) => {
        console.log(response, 'editdata');

        this.myInteractionsForm.patchValue({


          interactionType: response.interaction_type,
          notes: response.notes,
          dateTime: response.interaction_datetime

        });
      })



  }


  editInteractionHome(interactionId: number) {
    this.router.navigate(['/pages/editinteractions', this.companyId, interactionId, 'home']);
  }





  openConfirmationModal(interactionId: number, confirmationModal1: any) {

    this.modalService.open(confirmationModal1, { centered: true });


    this.interactionIdToDelete = interactionId;

  }

  deleteInteraction() {

    this.mapService.DeleteInteractionbyId(this.interactionIdToDelete).subscribe(
      async (response: any) => {
        console.log(response, 'deletdata');
        this.modalService.dismissAll('confirm');
        this.toastr.success('Interaction Note Deleted', 'Success', {
          timeOut: 2000,
          positionClass: 'toast-bottom-center',
        })

        // to get Interaction List
        this.mapService.InteractionsRoofListData(this.companyId).subscribe(
          async (response: any) => {
            this.interactionData = response.results;
          },
          (error: any) => {

          }
        );


        //this.router.navigate(['/pages/editmyroof/', this.companyId]);


      },
      (error: any) => {
        console.error(error);

      }
    );

  }


  tab() {
    this.updateMap(this.lat, this.lng)
  }

  //get Company Data by roofid



  companyBasicData() {
    this.mapService.editUserDataByUserId(this.companyId).subscribe(
      async (response: any) => {
        console.log(response);
        const commissioningDate = response.solar_installation_status ? response.solar_installation_commissioning_date || '' : '';
        const batteryCapacity = response.batteries_usage && response.battery_capacity ? response.battery_capacity : null;
        this.location = response.city || '';
        this.lat = response.latitude || 0;
        this.lng = response.longitude || 0;
        this.address_line_1 = response.address_line_1 || '',
          this.address_line_2 = response.address_line_2 || ' ',
          this.area_name = response.area_name || ' ',
          this.city = response.city || '',
          this.state = response.state || '',
          this.country = response.country || '',
          this.roofowner = response.roof_owner || '',
          this.solar_power_generation_potential = response.solar_power_generation_potential || 0;
        this.formatIndianNumber(this.solar_power_generation_potential);
        this.shortDescription = response.short_description || '';
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
          this.lead_type = response.lead_type,
          this.surface_area = response.surface_area.toLocaleString(),
          this.companyData = response;

        this.leadStatus = response.lead_type;
        const mapElement = document.getElementById('map');
        if (mapElement) {
          const mapOptions = {
            center: { lat: response.latitude, lng: response.longitude },
            zoom: 18,
            mapTypeId: google.maps.MapTypeId.SATELLITE
          };
          this.map = new google.maps.Map(mapElement, mapOptions);
          new google.maps.Marker({
            position: { lat: response.latitude, lng: response.longitude },
            map: this.map
          });
          google.maps.event.addListenerOnce(this.map, 'idle', () => {
            // Set the zoom level to 16 after the tiles have finished loading
            this.map.setZoom(18);


            console.log('Zoom level after settingss:', this.map.getZoom());
          });
        }
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
        console.error(error);
        // this.userLoginError = error.error.Message
      }
    );
  }

  updateMap(latitude: number, longitude: number) {
    const mapElement = document.getElementById('map');
    if (mapElement) {
      const mapOptions = {
        center: { lat: latitude, lng: longitude },
        zoom: 18,
        mapTypeId: google.maps.MapTypeId.SATELLITE
      };
      this.map = new google.maps.Map(mapElement, mapOptions);
      new google.maps.Marker({
        position: { lat: latitude, lng: longitude },
        map: this.map
      });
      google.maps.event.addListenerOnce(this.map, 'idle', () => {
        // Set the zoom level to 16 after the tiles have finished loading
        this.map.setZoom(18);


        console.log('Zoom level after settingss:', this.map.getZoom());
      });
    } else {
      console.error('Map element not found.');
    }
  }

  onStatusSelectionChange(event: any) {
    console.log(event.value, "event")
    this.leadStatus = event.value

    const formattedData = {
      lead_type: this.leadStatus,
      roof_type: this.roofType,
      address: this.location,
    }

    this.mapService.editUserData(formattedData, this.companyId).subscribe(
      async (response: any) => {
        console.log(response, "updateStatus");



        this.mapService.editUserDataByUserId(this.companyId).subscribe(
          async (response: any) => {
            console.log(response);
            const commissioningDate = response.solar_installation_status ? response.solar_installation_commissioning_date || '' : '';
            const batteryCapacity = response.batteries_usage && response.battery_capacity ? response.battery_capacity : null;
            this.location = response.address || '';
            this.lat = response.latitude || 0;
            this.lng = response.longitude || 0;
            this.roofowner = response.roof_owner || '',
              this.solar_power_generation_potential = response.solar_power_generation_potential || 0;
            this.formatIndianNumber(this.solar_power_generation_potential);
            this.shortDescription = response.short_description || '';
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
              this.lead_type = response.lead_type,
              this.surface_area = response.surface_area.toLocaleString(),
              this.companyData = response;

            this.leadStatus = response.lead_type;


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
            console.error(error);
            // this.userLoginError = error.error.Message
          }
        );




        this.toastr.success('Status Updated Successfully', 'Success', {
          timeOut: 2000,
          positionClass: 'toast-bottom-center',
        });
        // setTimeout(() => {

        //   this.router.navigate(['/pages/myroof']);
        // }, 2000);

      }
      ,
      (error: any) => {
        console.error(error);

      }
    );


  }


  //get company Data
  companyDataList() {
    this.adminService.CompanyDatabyRoofId(this.companyId).subscribe(
      async (response: any) => {
        console.log(response);
        this.companyData = response;

        console.log(this.companyData, 'latest company');
        console.log(this.companyData.company_name);
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
        console.log(error.status);
        console.log(this.companyDataFlag)
        console.log(this.companyData)

        this.companyDataFlag = false;
      },

    );
  }



  //get Monthly Future graph
  MonthlySolarPower() {
    this.mapService.MonthlySolarPowerGenerationData(this.companyId).subscribe(
      async (response: any) => {
        console.log(response, 'monthly data');
        this.monthlyData = response;
        if (this.monthlyData.length > 0) {
          this.MonthlyDataFunction();
        }
      },
      (error: any) => {
        console.error(error);

      }
    );
  }

  //get Year Future graph
  FutureSolarPower() {
    this.mapService.FutureSolarPowerGenerationData(this.companyId).subscribe(
      async (response: any) => {
        console.log(response, '25 data');
        this.futureData = response;
        console.log(response[0], '0')
        console.log(response[1], '1')

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

        console.log(sum, "sum"); // Output the sum of numbers
        // Format sum to Indian number format using custom function
        this.formatIndianNumberYearCapacity(sum);

      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  // get directorlist
  DirectorList() {
    this.adminService.RooftopCompanyDirectorssDataListbyRoofid(this.companyId).subscribe(
      async (response: any) => {
        console.log(response, 'director data by roof id');
        this.directorData = response.results;
        this.responseData = response;
        if (response.count > 0) {
          this.companyDataFlag = true;
        }
        // if (response.count == 0) {
        //   this.companyDataFlag = false;
        // }

        (error: any) => {
          console.error(error);

        }
      })
  }

  // to get Interaction List
  InteractionList() {
    this.mapService.InteractionsRoofListData(this.companyId).subscribe(
      async (response: any) => {

        this.interactionData = response.results;
        this.sharedService.interactionOccurred.emit();
        console.log(this.interactionData, 'interactionData')
        this.totalItems = response.count;
        this.pageSize = response.results.length;
        this.updatePagination();
        this.paginateData();


      },
      (error: any) => {
        console.error(error);

      }
    );
  }

  submitInteractionsForm() {

    if (this.myInteractionsForm.valid) {

      // this.toastr.success(Fill all Details', 'Success', {
      //   timeOut: 2000,
      //   positionClass: 'toast-bottom-center',
      //   //this.myInteractionsForm.reset();
      // });


      if (this.isEditMode == false) {
        const temp = this.datePipe.transform(this.myInteractionsForm.value.dateTime, 'yyyy-MM-dd HH:mm:ss');
        console.log("submit")
        this.interactionDataform =
        {
          roof_id: this.companyId,
          interaction_type: this.myInteractionsForm.value.interactionType,
          notes: this.myInteractionsForm.value.notes,
          interaction_datetime: temp,
        }
        this.mapService.saveInteractionData(this.interactionDataform).subscribe(
          async (response: any) => {

            console.log(response.Message, 'er1');
            console.log(response.status, 'status')

            console.log(response, 'cretedata');

            this.InteractionList();
            this.toastr.success('Interaction Note Added Successfully', 'Success', {
              timeOut: 2000,
              positionClass: 'toast-bottom-center',
              //this.myInteractionsForm.reset();
            });
            // this.myInteractionsForm.reset();
            // this.myInteractionsForm.markAsPristine();
            // this.myInteractionsForm.markAsUntouched();
            // this.myInteractionsForm.controls["interactionType"].markAsUntouched();
            // this.myInteractionsForm.controls["dateTime"].markAsUntouched();
            // this.myInteractionsForm.controls["notes"].markAsUntouched();

            // this.myInteractionsForm.controls["interactionType"].setValue("");
            // this.myInteractionsForm.controls["dateTime"].setValue("");
            // this.myInteractionsForm.controls["notes"].setValue("");
            // this.myInteractionsForm.controls["interactionType"].markAsPristine();
            // this.myInteractionsForm.controls["dateTime"].markAsPristine();
            // this.myInteractionsForm.controls["notes"].markAsPristine();
            // Reset form values and clear validation status
            this.myInteractionsForm.reset();
            this.myInteractionsForm.markAsPristine();
            this.myInteractionsForm.markAsUntouched();
            Object.keys(this.myInteractionsForm.controls).forEach(key => {
              this.myInteractionsForm.get(key)?.setErrors(null);
            })
              ;
          },
          (error: any) => {
            console.log(error.status);
            if (error.status == 400) {
              this.toastr.error('Please fill all details', 'Error', {
                timeOut: 2000,
                positionClass: 'toast-bottom-center',
                //this.myInteractionsForm.reset();
              });
            }
          }
        );
      }

      else {
        console.log("update")

        const temp = this.datePipe.transform(this.myInteractionsForm.value.dateTime, 'yyyy-MM-dd HH:mm:ss');


        this.interactionDataUpdate =
        {
          roof_id: this.companyId,
          interaction_type: this.myInteractionsForm.value.interactionType,
          notes: this.myInteractionsForm.value.notes,
          interaction_datetime: temp,
        }



        this.mapService.updateInteractionData(this.interactionDataUpdate, this.InteractionId).subscribe(
          async (response: any) => {
            console.log(response, 'cretedata');
            this.InteractionList();
            this.toastr.success('Interaction Note Updated Successfully', 'Success', {
              timeOut: 2000,
              positionClass: 'toast-bottom-center',

            })
            this.isEditMode = false;
            this.myInteractionsForm.reset();
            this.myInteractionsForm.markAsPristine();
            this.myInteractionsForm.markAsUntouched();
            Object.keys(this.myInteractionsForm.controls).forEach(key => {
              this.myInteractionsForm.get(key)?.setErrors(null);
            })
              ;
          },
          (error: any) => {
            console.log(error.status);
            if (error.status == 400) {
              this.toastr.error('Please fill all details', 'Error', {
                timeOut: 2000,
                positionClass: 'toast-bottom-center',
                //this.myInteractionsForm.reset();
              });
            }
          }
        );
      }
    }

  }


  getPromotionalMessage() {
    this.whatsAppservice.whataAppMessagesReplyList(this.companyId).subscribe(
      async (response: any) => {

        this.promotionalData = response.results
        this.sharedService.interactionOccurred.emit();
        console.log(this.promotionalData, 'promotinalData')
        this.totalItems = response.count;
        this.pageSize = response.results.length;
        this.updatePaginationPromotionalMessage();
        this.paginateDataPromotionalMessage();


      },
      (error: any) => {
        console.error(error);

      }
    );

  }






}


