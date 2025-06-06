import { Component, AfterViewInit, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { SearchService } from 'src/app/shared/services/search.service';
import { AdminService } from 'src/app/shared/services/admin.service';
import { ReminderService } from 'src/app/shared/services/reminder.service';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { ChartConfiguration, ChartType } from "chart.js";
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { MasterService } from 'src/app/shared/services/master.service';
import { MAT_DATEPICKER_SCROLL_STRATEGY_FACTORY_PROVIDER } from '@angular/material/datepicker';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { GoogleMap, MapInfoWindow } from '@angular/google-maps';
import { NewRoofDataService } from 'src/app/shared/services/new-roof-data.service';
import { PastProjectsService } from 'src/app/shared/services/past-projects.service';
import { ChangeDetectorRef } from '@angular/core';
import { WeatherService } from 'src/app/shared/services/weather.service';
@Component({
  selector: 'app-add-edit-my-roof',
  templateUrl: './add-edit-my-roof.component.html',
  styleUrls: ['./add-edit-my-roof.component.scss'],
  providers: [DatePipe]
})
export class AddEditMyRoofComponent {
  @ViewChild('audioModal') audioModal!: TemplateRef<any>;
  isEditMode: boolean = false;
  confirmGetAddress: boolean = false;
  interactionDateTime: string = ''; // ✅ Declare this property
  isEditModeDirector: boolean = false;
  isEditModeCompany: boolean = false;
  isLoader:boolean=false;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  area: any = [];
  companyId: string = '';
  userLoginError: any = '';
  address: any;
  @ViewChild(GoogleMap, { static: false }) googleMap!: GoogleMap;
  lat: any;
  lng: any;
  google: any;
  autocomplete: any;
  placeflag = false;
  placeId: any;
  addressData: any;
  counter: any;
  placesService: any;
  TabStyle1: any;
  monthlyData: any;
  futureData: any;
  interactionData: any;
  hideInteraction: any;
  hideIntr: boolean = true;
  interactionIdToDelete: any;
  public solidColorLegend: any;
  public solidColorChartType: ChartType = 'bar';
  public solidColorChartData: any;
  public solidColorChartDataYear: any;
  TabStyle2: any;
  totalItems: number = 0;
  pageSizeOptions: number[] = [5, 10, 50, 100];
  pageSize: number = 5;
  currentPage: number = 1;
  // maxPage: number = 0;
  maxPage = 4; // This should match the maxSize property in the template
  paginatedData: any[] = [];
  companyDetails: boolean = true;
  directorList: any;
  roof_id: any;
  company_id: any;
  directorId: any;
  directorIdToDelete: any;
  companyData: any;
  showCompany: boolean = false;
  maxDate: Date;
  data: any;
  leadStatus: any;
  map!: google.maps.Map;
  json: GeoJSONData[] | null = null;
  getAddress: boolean = false;
  stateN: any;
  monthTotal: any;
  yearTotal: any;
  belowLimit: boolean = false;
  mapZoom = 14;
  mapCenter!: google.maps.LatLng;
  BasicOldForm: boolean = false;
  interactionId: any;
  interactionDataform: any;
  interactionDataUpdate: any;
  isEditModeInt: boolean = false;
  InteractionId: any;
  interactionTypes: string[] = ['Call','Text Message','WhatsApp Message','Email','Text Note To Self','Voice Note To Self','Task For Self'];
  interactionTime: string[] = ['Minutes', 'Hours', 'Days'];
  interactionNote: string[] = ['Notification'];
  formattedNumberYearCapacity: any;
  formattedNumberSolarPotential: any;
  formattedNumberCapacity: any;
  escalation_rate: number =0;
  SolarPotentialformattedNumber: any;
  solarPowerGenerationPotential: any;
  projectCapacity: any;
  statename: any;
  tariffIncreaseRate: any;
  totalYearlySavingUI: any;
  totalYearlySavingUIOne: any;
  totalYearlySavingUIThree: any;
  totalYearlySavingUIFive: any;
  yearSavingData: any;
  yearSavingDataOne: any;
  yearSavingDataThree: any;
  yearSavingDataFive: any;
  escalationRate1: number = 1;  // Default value of 1% for escalation rate 1
  escalationRate2: number = 2;  // Default value of 2% for escalation rate 2
  escalationRate3: number = 4;
  areaOptions: AreaOption[] = [];
  latlngOptions: AreaOption[] = [];
  project_capacity: number = 0;
  current_tariff: number =0;
  sanctioned_load: number = 0;
  graphHide: boolean = false;
  areaedit: any;
  saveButtonText: string = 'Save';
  finance_id:any;
  roofData: any;
  UpdateroofData: any;
  id: any;
  state: string[] = [];
  cityNames: string[] = [];
  cityName: string="";
  cityOptions: CityOption[] = [];
  areaData: any[] = []; // Store the entire results array for lookup
  selectedLatitude: string | null = null;
  selectedLongitude: string | null = null;
  totalProjectCost: number =0;
  area_name: any;
  long: any;
  areaPatch: any;
  areaNames: string[] = [];
  isEditModeShow: boolean = false;
  selectedInteractionType: string = '';
  public solidColorChartDataYearSaving: any;
  public solidColorChartDataYearSavingOne: any;
  public solidColorChartDataYearSavingThree: any;
  public solidColorChartDataYearSavingFive: any;
  filteredInteractionDays: number[][] = [];
  mediaRecorder: MediaRecorder | null = null;
  audioChunks: Blob[] = [];
  audioURL: string | null = null; 
  recordingTimeout: any;          
  isRecording: boolean = false;
  audioBlob: Blob | null = null; // Allow null values
  audioBase64!: string; 
  showValidationMessage = false;
  isFormSubmitted: boolean = false;
  isDeleteMode: boolean = false;
  minDateTime: string = '';
  maxDateTime: string = '';
  datetime: string = '';


  fundsArray: string[] =
    ['Customer', 'Bank', 'NBFC', ' Private Investor ', 'Me/Us'];

  inverterTypeArray: string[] =
    ['Single Phase String Inverter', ' Three Phase String Inverter'];

  moduleTypeArray: string[] =
    ['Polycrystalline ', 'Polycrystalline Bifacia', 'Monocrystalline', 'Monocrystalline Bifacial', 'Mono PERC', 'Mono PERC Bifacial'];

    options: any[] = [
      { downPayment: 0, rateOfInterest: 0, tenure: 0, emi: 0, totalPayment: 0, savings: []},
      
    ];

   


  @ViewChild(HeaderComponent) homeComponent!: HeaderComponent;
  // Declare NgbModalRef variable to store reference to the opened modal
  modalRef: NgbModalRef | undefined




  constructor(private cdRef: ChangeDetectorRef,private sharedService: ReminderService, private masterService: MasterService,private weatherService: WeatherService, private datePipe: DatePipe, private toastr: ToastrService, private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private mapService: SearchService, private http: HttpClient, private modalService: NgbModal, private adminService: AdminService, private elementRef: ElementRef, private newRoodDataService: NewRoofDataService, private pastProjectservice: PastProjectsService
  ) {

    this.setDateLimits();
    this.maxDate = new Date()
    // this.placesService = new google.maps.places.AutocompleteService();
  
    this.roofForm = this.fb.group({


      company_name: ['', Validators.required],
      // customer_first_name: [''],
      // customer_last_name: [''],
      contact_person: ['', Validators.required],
      contact_number: ['', Validators.pattern(/^[0-9]{10}$/)],
      contact_email: ['', Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)], // Gmail format validation
      supplier: [''],
      consumer_number: [''],
      sanctioned_load: [''],
      // current_tariff: ['', Validators.required, [Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      current_tariff: ['', Validators.required],
      address: [''],
      area: ['',Validators.required],
      pin_code: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      project_capacity: ['',
        Validators.required],  // Synchronous validators only
          // Pass an empty array for async validators if none are used
      
      // module_wattage: ['', Validators.required],
      // module_type: ['', Validators.required], //module_preference
      // module_brand: ['', Validators.required],
      // inverter_wattage: ['', Validators.required],
      // inverter_type: ['', Validators.required], //inverter_preference
      // inverter_brand: ['', Validators.required],
      funded_by: [''],
      lead_type: [''],
      lead_status:['', Validators.required],
      description:[''],
      addressline2:[''],
      module_preference:['', Validators.required],
      inverter_preference:['', Validators.required]


    });

    // console.log(this.roofForm);



  }

  zeroResultsMessage: any = ''

  @ViewChild('Canvas') Canvas: ElementRef | any;
  @ViewChild('myCanvas') myCanvas: ElementRef | any;

  @ViewChild('addressInput', { static: false }) addressInput: ElementRef<any> | undefined;
  @ViewChild('addressList', { static: false }) addressList: ElementRef<any> | undefined;

  debounceTimer: any;
  delayTime: number = 1000; // Adjust delay time as needed
  @ViewChild('auto') matAutocomplete!: MatAutocomplete;

  filteredAddressList: string[] = [];

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
  
  


  getLatLng(address: string) {
    const geocoder = new google.maps.Geocoder();
    this.zeroResultsMessage = '';
    geocoder.geocode({ address }, (results, status) => {
      if (status === 'OK') {
        if (results && results.length > 0) { // Check if results is not null and contains elements
          const location = results[0].geometry.location;
          // console.log(location.lat(), "lat");
          // console.log(location.lng(), "lng");
          this.lat = location.lat();
          this.lng = location.lng();

          this.updateMap(location.lat(), location.lng());
        } else {
          console.error('No results found for the provided address.');
        }
      } else {
        if (status === 'ZERO_RESULTS') {
          this.zeroResultsMessage = 'No results found for the provided address.'
        }
        else {
          this.zeroResultsMessage = status
        }
        console.error('Geocode was not successful for the following reason:', status);
      }
    });
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


        // console.log('Zoom level after settingss:', this.map.getZoom());
      });
    } else {
      console.error('Map element not found.');
    }
  }





  myInteractionsForm!: FormGroup;
  // myRoofForm!: FormGroup;
  roofForm!: FormGroup;
  myCompanyForm!: FormGroup;
  DirectorForm !: FormGroup;



  public searchElementRef: any;
  roofTypes: string[] =
    ['Individual Bungalow', 'Individual Rowhouse', 'Housing Society', 'Industrial', 'Auto Dealership', 'College', 'Commercial Building', 'Hospital', 'Mall', 'Office Building', 'School'];

  leadTypes: string[] = ['Cold', 'Warm', 'Hot', 'Not Reachable', 'Not Interested', 'Solar Already Doing/Done', 'On Hold'];

  CompanyClass: string[] =
    ['Proprietorship',
      'Partnership',
      'LLP',
      'Private Limited',
      'Public Limited'];


  addreessList: any



  ngOnInit(): void {

    this.myInteractionsForm = this.fb.group({
      interactionType: ['', Validators.required],
      dateTime: [this.getCurrentDateTime(), Validators.required],
    });

    // Listen for changes to interactionType
    this.myInteractionsForm.get('interactionType')?.valueChanges.subscribe((value) => {
      this.adjustFormControls(value);
    });

    const initialInteractionType = this.myInteractionsForm.get('interactionType')?.value;
    if (initialInteractionType === 'Call' || initialInteractionType === 'Task For Self') {
      this.addDefaultNotification();
    }

    this.myInteractionsForm.get('interactionType')?.valueChanges.subscribe(value => {
      if (value !== 'Voice Note To Self') {
        this.clearVoiceRecording();
      }
    });
    // console.log(this.options,"qwer");

    this.DirectorForm = this.fb.group({
      director_name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      director_contact: ['', [Validators.pattern(/^\d{10}$/)]],
      director_email: ['', Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)], // Gmail format validation

    })

    this.route.params.subscribe(params => {
      // console.log('adds:', params['companyId'])
      if (params['type']) {
        this.hideIntr = false;
        // console.log(params['type'])
        // console.log("paramtype")

      }
      if (params['id']) {
        // Edit mode
        this.confirmGetAddress = true;
        this.isEditMode = true;
        this.isEditModeShow = true;
        this.companyId = params['id'];
        localStorage.setItem('companyId', this.companyId);
        this.showCompany = true;
        this.isLoader=true;
         this.getFinancingDataByCompanyId();


        //to get monthly graph data
        this.mapService.MonthlySolarPowerGenerationData(this.companyId).subscribe(
          async (response: any) => {
            this.isLoader=false;
            this.monthTotal = Math.round(response.yearly_total_generation);
            this.monthlyData = response.monthly_generation;
           
            if (this.monthlyData.length > 0) {
              this.MonthlyDataFunction();
            }
          },
          (error: any) => {
            this.isLoader=false;
            console.error(error);
            this.userLoginError = error.error.Message
          }
        );

        //to get yearly graph data
        this.mapService.FutureSolarPowerGenerationData(this.companyId).subscribe(
          async (response: any) => {
            // console.log(response, '25 data');
            this.isLoader=false;
            this.futureData = response.yearly_generation;
            this.yearTotal = Math.round(response.lifetime_total_generation);
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
            this.userLoginError = error.error.Message
          }
        );

        this.InteractionList();

        //get basic data by roofid
        this.newRoodDataService.getRoofDataById(this.companyId).subscribe(
          async (response: any) => {
            // console.log(response.batteries_usage, 'battery');
            this.isLoader=false;

            let response1 = response;
            // console.log(response1, 'arename')
            // this.areaPatch = response1.area_name;
            this.lat = response1.latitude;
            this.long = response1.longitude;
            this.areaedit = response1.area_name;
            this.current_tariff= response1.current_tariff;
            this.project_capacity= response1.solar_installation_capacity;
            this.roofForm.patchValue({
              area: this.areaedit
            })

            // this.leadStatus = response1.lead_type;

            this.roofForm.patchValue({

              description:response1.description,
              company_name: response1.company_name,
              customer_first_name: response1.customer_first_name,
              customer_last_name: response1.customer_last_name,
              contact_person: response1.contact_person,
              contact_number: response1.contact_no,
              contact_email: response1.email_addr,
              supplier: response1.electricity_distributor,
              consumer_number: response1.electricity_consumer_number,
              sanctioned_load: response1.sanctioned_load,
              current_tariff: response1.current_tariff,
              address: response1.address_line_1,
              addressline2: response1.address_line_2,
              area: response1.area_name,
              pin_code: response1.pin_code,
              city: response1.city,
              state: response1.state,
              project_capacity: response1.solar_installation_capacity,
              module_wattage: response1.module_wattage,
              module_type: response1.module_type,
              module_brand: response1.module_brand,
              inverter_wattage: response1.inverter_wattage,
              inverter_type: response1.inverter_type,
              inverter_brand: response1.inverter_brand,
              funded_by: response1.funded_by,
              lead_type: response1.lead_type,
              lead_status:response1.lead_status,
              module_preference: response1.module_preference,
              inverter_preference:response1.inverter_preference,


            });

            setTimeout(() => {
              this.getAreaByPinCode();
              this.areaSelected();

            }, 500);

          },
          (error: any) => {
            this.isLoader=false;
            console.error(error);

          }
        );
      } else {
        // Add mode
        this.isEditMode = false;
        this.isLoader= false;
        this.isEditModeShow = false;
        this.confirmGetAddress = false;
        this.roofForm.get('commissioningDate')?.setValue(null);
        this.roofForm.get('installationStatus')?.setValue('done');
      }

    });

    this.addNotification();

  }

  adjustFormControls(interactionType: string): void {
    // Remove all dynamic controls first
    this.removeDynamicControls();

    // Add controls based on the interaction type
    switch (interactionType) {
      case 'Call':
      case 'Task For Self':
        this.addNotificationsControl();
        this.addNotesControl();
        this.addDefaultNotification();
        break;

      case 'WhatsApp Message':
      case 'Text Message':
      case 'Email':
      case 'Text Note To Self':
        this.addNotesControl();
        break;

      case 'Voice Note To Self':
        this.addVoiceRecordingControl();
        break;

      default:
        console.error('Invalid interaction type');
        break;
    }
  }

  removeDynamicControls(): void {
    if (this.myInteractionsForm.contains('notes')) {
      this.myInteractionsForm.removeControl('notes');
    }
    if (this.myInteractionsForm.contains('notifications')) {
      this.myInteractionsForm.removeControl('notifications');
    }
    if (this.myInteractionsForm.contains('voiceRecording')) {
      this.myInteractionsForm.removeControl('voiceRecording');
    }
  }

  // Add notes control
  addNotesControl(): void {
    if (!this.myInteractionsForm.contains('notes')) {
      this.myInteractionsForm.addControl('notes', this.fb.control('', Validators.required));
    }
  }

  // Add notifications control
  addNotificationsControl(): void {
    if (!this.myInteractionsForm.contains('notifications')) {
      this.myInteractionsForm.addControl('notifications', this.fb.array([]));
    }
  }

  // Add voice recording control
  addVoiceRecordingControl(): void {
    if (!this.myInteractionsForm.get('voiceRecording')) {
      this.myInteractionsForm.addControl('voiceRecording', this.fb.control('')); // No Validators.required yet
    }
  }

  get notifications(): FormArray {
    return this.myInteractionsForm.get('notifications') as FormArray;
  }

  getNotificationFormGroup(index: number): FormGroup {
    return this.notifications.at(index) as FormGroup;
  }

  getCurrentDateTime(): string {
    const now = new Date();
    return this.formatDateTime(now);
  }
  
  setDateLimits(): void {
    const now = new Date();
    
    // Min Date: 2 days before
    const minDate = new Date(now);
    minDate.setDate(now.getDate() - 2);
  
    // Max Date: Current Date
    const maxDate = new Date(now);
  
    this.minDateTime = this.formatDateTime(minDate);
    this.maxDateTime = this.formatDateTime(maxDate);
  }
  
  formatDateTime(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  preventManualEdit(event: KeyboardEvent) {
    event.preventDefault();
  }

  // Method to check if submit button should be disabled
  isSubmitButtonDisabled(): boolean {
    const formControls = ['pin_code', 'city', 'state', 'project_capacity', 'current_tariff'];
    return formControls.some(control => !this.roofForm.get(control)?.value);
  }

  getAreaByPinCode() {
    this.isLoader = true;
    this.newRoodDataService.getAreaByPincode(this.roofForm.value.pin_code).subscribe(
      async (response: any) => {
        this.isLoader = false;
        // console.log(response.results, 'area');

        // Map results to include area, latitude, and longitude in each option
        this.areaOptions = response.results.map((item: any) => ({
          area: item.area,
          latitude: item.latitude,
          longitude: item.longitude,
          state: item.state
        }));

        // this.roofForm.get('city')?.reset();
        // this.roofForm.get('state')?.reset();

        // console.log(this.areaOptions);

        // Create a new array with only the area names
        this.areaNames = this.areaOptions.map(item => item.area);

        // console.log(this.areaNames, 'areaArray'); // This will contain only the area names
        this.statename = this.areaOptions.map(item => item.state);
        // console.log(this.statename);

        // const selectedArea = this.areaOptions[0]; // You can replace this with a selected area
        // this.selectedLatitude = selectedArea.latitude;
        // this.selectedLongitude = selectedArea.longitude;

        //console.log(this.selectedLatitude, this.selectedLongitude);



        // const states = ["MAHARASHTRA", "MAHARASHTRA", "MAHARASHTRA", "MAHARASHTRA", "MAHARASHTRA"];
        const uniqueStates = Array.from(new Set(this.statename));
        // this.stateN = uniqueStates[0]; // "MAHARASHTRA"

        // Now `uniqueStates` will contain only one value: ["MAHARASHTRA"]


      },
      (error: any) => {
        // console.log(error.status);
        this.isLoader = false;
        if (error.status == 400 || 404) {
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
  
  



  areaSelected(): void {
  const selectedArea = this.roofForm.get('area')?.value;
  const pinCode = this.roofForm.get('pin_code')?.value;
  if (!selectedArea || !pinCode) return;

  this.isLoader = true;

  this.newRoodDataService.getlatlongByArea(selectedArea).subscribe(
    (response: any) => {
      // Sanitize 'NA' values to null
      const latitude = response.results[0]?.latitude;
      const longitude = response.results[0]?.longitude;

      this.selectedLatitude = latitude === 'NA' ? null : latitude;
      this.selectedLongitude = longitude === 'NA' ? null : longitude;

     

      const continueWithDistrict = () => {
        this.newRoodDataService.getDistrictByPincodeArea(pinCode, selectedArea).subscribe(
          (districtResponse: any) => {
            this.cityOptions = districtResponse.results.map((item: any) => ({
              district: item.district,
              state: item.state,
            }));

            this.cityNames = this.cityOptions.map(item => item.district);

            this.roofForm.patchValue({
              city: districtResponse.results[0]?.district,
              state: districtResponse.results[0]?.state
            });

            this.isLoader = false;
          },
          (error: any) => {
            this.isLoader = false;
            console.error('Error fetching district data:', error);
          }
        );
      };

      // Check if coordinates are missing after sanitization
      if (!this.selectedLatitude || !this.selectedLongitude) {
        this.weatherService.getLocationByZip(pinCode).subscribe(
          (weatherRes: any) => {
            this.selectedLatitude = weatherRes.lat;
            this.selectedLongitude = weatherRes.lon;
            continueWithDistrict(); // Now continue
          },
          (weatherErr) => {
            console.error('Fallback WeatherService failed:', weatherErr);
            this.isLoader = false;
          }
        );
      } else {
        continueWithDistrict(); // Lat/lon already valid
      }
    },
    (error: any) => {
      this.isLoader = false;
      console.error('Error fetching lat/long data:', error);
    }
  );
}
  

  // to get Interaction List
  InteractionList() {
    this.isLoader = true;
    this.mapService.InteractionsRoofListData(this.companyId).subscribe(
      (response: any) => {

        // console.log(response);
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
        this.userLoginError = error.error?.Message || "An error occurred.";
      }
    );
  }
  
  
  
  

  // Convenience getter for easy access to form fields
  get f() { return this.DirectorForm.controls; }

  // Method to check if the field is empty or not
  isEmptyField(): boolean {
    const fieldValue = this.DirectorForm.get('director_contact')?.value || '';

    return fieldValue === '' || fieldValue === null;
  }

  formatEditCurrency(value: any): string {
    // Convert value to string
    value = String(value);

    // Remove non-digit characters
    value = value.replace(/\D/g, '');

    // Format the number with commas
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    return value;
  }


  formatCurrency(event: any) {
    const input = event.target as HTMLInputElement;
    let value = input.value;

    // Remove non-digit characters
    value = value.replace(/\D/g, '');

    // Format the number with commas
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    // Update the form control value
    this.myCompanyForm.get('authorised_cap')?.setValue(value, { emitEvent: false });
  }
  formatCurrency1(event: any) {
    const input = event.target as HTMLInputElement;
    let value = input.value;

    // Remove non-digit characters
    value = value.replace(/\D/g, '');

    // Format the number with commas
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    // Update the form control value
    this.myCompanyForm.get('paidup_capital')?.setValue(value, { emitEvent: false });
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


  validateDate(event: any) {
    const input = event.target as HTMLInputElement;
    let value = input.value;

    value = value.replace(/\D/g, '');


    if (value.length !== 8) {
      return;
    }


    const day = value.substr(0, 2);
    const month = value.substr(2, 2);
    const year = value.substr(4);


    value = `${day}/${month}/${year}`;


    input.value = value;


    this.roofForm.get('commissioningDate')?.setValue(new Date(value), { emitEvent: false });
  }

  validateDateOfRegistration(event: any) {
    // const inputValue1: string = event.target.value;
    // const datePattern: RegExp = /^(0?[1-9]|1[012])\/(0?[1-9]|[12][0-9]|3[01])\/(19|20)?\d{2}$/;
    // if (!datePattern.test(inputValue1)) {
    //   event.target.setCustomValidity('Invalid date format');
    // } else {
    //   event.target.setCustomValidity('');
    // }
    const input = event.target as HTMLInputElement;
    let value = input.value;

    value = value.replace(/\D/g, '');


    if (value.length !== 8) {
      return;
    }


    const day = value.substr(0, 2);
    const month = value.substr(2, 2);
    const year = value.substr(4);


    value = `${day}/${month}/${year}`;


    input.value = value;


    this.myCompanyForm.get('date_of_registration')?.setValue(new Date(value), { emitEvent: false });
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

  onStatusSelectionChange(event: any) {

    this.leadStatus = event.value;
    this.isLoader=true;

    const formattedData = {
      lead_type: this.leadStatus,

    }
    this.mapService.editUserData(formattedData, this.companyId).subscribe(
      async (response: any) => {
        this.isLoader=false;

        Swal.fire({
          icon: 'success',
          title: "Success",
          html: 'Status Updated Successfully',
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
    });

        this.mapService.editUserDataByUserId(this.companyId).subscribe(
          async (response: any) => {
            // console.log(response);
            this.isLoader=false;
            this.data = response;
            this.leadStatus = this.data.lead_type;
            this.roof_id = this.companyId;

            this.roofForm.patchValue({

              leadType: response.lead_type || '',

            });
          }

        );
      })
  }

 

  resetLeadType() {

    // console.log(this.roofForm.get('leadType')?.value, 'installationstatus')
    this.roofForm.get('leadType')?.setValue('');

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

  cancel() {
    this.router.navigate(['/pages/leads']);
  }

  addInteraction() {
    // console.log('add')
    this.router.navigate(['/pages/leads/addinteractions', this.companyId, 'edit']);
  }

  editInteraction(interactionId: number) {
    this.isEditModeInt = true;
    this.InteractionId = interactionId;
    this.isLoader = true;

    this.mapService.InteractionDatabyId(interactionId).subscribe(
      async (response: any) => {
        // Assuming 'data' is your JSON object
      // console.log(response.notifications[0].notes);

        this.isLoader = false;

        const formattedDateTime = this.datePipe.transform(response.interaction_datetime, 'yyyy-MM-ddTHH:mm');

        this.myInteractionsForm.patchValue({
          interactionType: response.interaction_type,
          notes: (response.interaction_type === 'Call' || response.interaction_type === 'Task For Self') 
            ? (response.notifications && response.notifications.length > 0 
                ? response.notifications[0].notes 
                : '') // ✅ Fallback to empty string if notifications is missing or empty
            : response.notes,
          dateTime: formattedDateTime,
        });
        
        
        

        if (response.interaction_type === 'Voice Note To Self' && response.voice_recording_path) {
          this.audioURL = response.voice_recording_path;
          this.isDeleteMode = false;
          this.myInteractionsForm.get('voiceRecording')?.setValue(response.voice_recording_path);
        }

        if (response.interaction_type === 'Call' || response.interaction_type === 'Task For Self') {
          const notificationsFormArray = this.myInteractionsForm.get('notifications') as FormArray;
          notificationsFormArray.clear();
          
          // Clear filtered days array
          this.filteredInteractionDays = [];
          
          response.notifications.forEach((notification: any) => {
            const notificationGroup = this.createNotificationFormGroup(notification);
            notificationsFormArray.push(notificationGroup);
            
            // Initialize filtered days based on interactionTime
            const timeIndex = notificationsFormArray.length - 1;
            this.updateFilteredDays(notification.interactionTime, timeIndex);
          });
        }
      },
      (error: any) => {
        this.isLoader = false;
        console.error('Error fetching interaction data:', error);
      }
    );
}

// Helper method to update filtered days
private updateFilteredDays(interactionTime: string, index: number) {
  setTimeout(() => {
    if (interactionTime === 'Minutes') {
      this.filteredInteractionDays[index] = this.generateRange(1, 60);
    } else if (interactionTime === 'Hours') {
      this.filteredInteractionDays[index] = this.generateRange(1, 24);
    } else if (interactionTime === 'Days') {
      this.filteredInteractionDays[index] = this.generateRange(1, 31);
    } 
  });
}

  
  // Helper method to create a FormGroup for a notification
  createNotificationFormGroup(notification: any): FormGroup {
    return this.fb.group({
      id: [notification.id],
      reminder_date: [this.datePipe.transform(notification.reminder_date, 'yyyy-MM-ddTHH:mm')],
      notes: [notification.notes],
      is_email_sent: [notification.is_email_sent],
      is_notification_sent: [notification.is_notification_sent],
      is_read: [notification.is_read],
      interactionNote: [notification.interactionNote || 'Notification'], // Default to 'Notification'
      interactionTime: [notification.interactionTime || ''], // Ensure fallback
      interactionDays: [notification.interactionDays || ''] // Ensure fallback
    });
  }

 
  

  openConfirmationModal(interactionId: number, confirmationModal1: any) {

    this.modalService.open(confirmationModal1, { centered: true });


    this.interactionIdToDelete = interactionId;

  }


  deleteInteraction(interactionId: number) {
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
  
        this.mapService.DeleteInteractionbyId(interactionId).subscribe(
          async (response: any) => {
            this.isLoader = false;
            this.modalService.dismissAll('confirm');
            Swal.fire({
              icon: 'success',
              title: "Success",
              html: 'Activities Deleted Successfully',
              timer: 2000,
              timerProgressBar: true,
              showConfirmButton: false,
            });
  
            // ✅ Remove the deleted item from interactionData
            this.interactionData = this.interactionData.filter((item: any) => item.id !== interactionId);

  
            // ✅ Update totalItems count
            this.totalItems = this.totalItems - 1;
  
            // ✅ If last item on the page is deleted, go to the previous page
            if (this.interactionData.length === 0 && this.currentPage > 1) {
              this.currentPage--;
            }
  
            // ✅ Fetch updated data for the current page
            this.onPageChange(this.currentPage);
  
            // ✅ If the deleted record was being edited, reset the form
            if (this.InteractionId === interactionId) {
              this.resetForm(this.myInteractionsForm);
  
              // ✅ Set current date & time in the form
              const currentDate = new Date();
              const formattedDate = this.datePipe.transform(currentDate, 'yyyy-MM-ddTHH:mm');
              this.myInteractionsForm.patchValue({ dateTime: formattedDate });
  
              this.isEditModeInt = false;
              this.InteractionId = null;
            }
          },
          (error: any) => {
            this.isLoader = false;
            console.error('Error deleting interaction:', error);
          }
        );
      }
    });
  }
  
  
  openDirectorModal(confirmationModal1: any) {

    this.modalRef = this.modalService.open(confirmationModal1, { centered: true });
    // console.log(this.modalRef, "Open modal")
  }


  // Function to close the  director modal
  closeModal() {
    if (this.modalRef) {
      this.modalRef.dismiss();
      this.modalRef.close();
      this.DirectorForm.reset();
    };
  }


  openModal() {
    const modalContent = 0 // pass your modal content component or template here
    //this.openDirectorModal();
  }


  // get director list
  // fetchDirectorData() {
  //   this.adminService.RooftopCompanyDirectorssDataListbyRoofid(this.companyId).subscribe(
  //     async (response: any) => {
  //       console.log(response);
  //       this.directorList = response.results;
  //       console.log(this.directorList, "directorlistby roofid and companyid");
  //       setTimeout(() => {

  //       }, 2000);

  //       this.closeModal();
  //     },
  //     (error: any) => {
  //       console.error(error);
  //       this.userLoginError = error.error.Message
  //     }
  //   );

  // }


  submitDirectorForm(DirectorForm: any) {
    this.isLoader=true;
    // console.log(this.isEditModeDirector, "add director");
    if (this.isEditModeDirector == false) {
      // console.log('Add director')

      const directorData = {

        rooftop_id: this.roof_id,

        director_name: DirectorForm.value.director_name,
        director_contact: DirectorForm.value.director_contact,
        director_email: DirectorForm.value.director_email,

      };

      this.adminService.CreateRooftopCompanyDataDirector(directorData).subscribe(
        async (response: any) => {
          // console.log(response);
          this.isLoader=false;
          Swal.fire({
            icon: 'success',
            title: "Success",
            html: 'Rooftop Company Director Data Saved Successfully',
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
      });
          setTimeout(() => {

          }, 2000);

          this.closeModal();
          this.adminService.RooftopCompanyDirectorssDataListbyRoofid(this.roof_id).subscribe(
            async (response: any) => {
              // console.log(response);
              this.isLoader=false;
              this.directorList = response.results;
              // console.log(this.directorList, "directorlistby roofid and companyid");
              setTimeout(() => {
                // toast.remove()

              }, 2000);

              this.closeModal();
            },
            (error: any) => {
              this.isLoader=false;
              console.error(error);
              this.userLoginError = error.error.Message
            }
          );
          // console.log("submit Director  Form")
        },
        (error: any) => {
          this.isLoader=false;
          console.error(error);
          this.userLoginError = error.error.Message
        }
      );
    }
    else {
      //update Director data API call
      const updatedirectorData = {
        rooftop_id: this.roof_id,
        director_name: DirectorForm.value.director_name,
        director_contact: DirectorForm.value.director_contact,
        director_email: DirectorForm.value.director_email,

      };

      this.adminService.updateDirectorData(updatedirectorData, this.directorId).subscribe(
        async (response: any) => {
          // console.log(response);
          this.isLoader=false;
          this.isEditModeDirector = false;
          Swal.fire({
            icon: 'success',
            title: "Success",
            html: 'Director Data Updated Successfully',
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
      });
          setTimeout(() => {
            // toast.remove()
            // this.router.navigate(['/pages/addmyroof', 'flag']);//company tab should be active
          }, 2000);
          //this.fetchDirectorData();
          this.closeModal();
        },
        (error: any) => {
          this.isLoader=false;
          console.error(error);
          this.userLoginError = error.error.Message
        }
      );
    }

    // console.log("update Director  Form")
  }
  tab() {
    this.updateMap(this.lat, this.lng)
  }
  editDirector(director_id: any, confirmationModal1: any) {
    this.isEditModeDirector = true;
    this.isLoader=true;
    this.directorId = director_id;

    this.modalRef = this.modalService.open(confirmationModal1, { centered: true });

    this.adminService.DirectoreDatabyId(director_id).subscribe(
      async (response: any) => {
        this.isLoader=false;

        this.DirectorForm.patchValue({
          rooftop_id: response.rooftop_id,
          director_name: response.director_name,
          director_contact: response.director_contact,
          director_email: response.director_email,

        });
      })

  }

  deleteDirector() {
    this.isLoader=true;


    this.adminService.DeleteDirectorbyId(this.directorIdToDelete).subscribe(
      async (response: any) => {
        // console.log(response, 'deletdata');
        this.isLoader=false;
        this.modalService.dismissAll('confirm');
        Swal.fire({
          icon: 'success',
          title: "Success",
          html: 'Director Data Deleted',
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
    });
        this.closeModal();
        // this.fetchDirectorData();

      },
      (error: any) => {
        this.isLoader=false;
        console.error(error);

      }
    );

  }


  openDirectorConfirmationModal(directorId: number, confirmationModal1: any) {

    // console.log(directorId, 'directorId to dlete')
    this.modalService.open(confirmationModal1, { centered: true });


    this.directorIdToDelete = directorId;

  }

  cancelInteraction() {
    this.isEditModeInt = false; // Reset to Save mode
    this.InteractionId = null; // Clear the InteractionId
    this.myInteractionsForm.reset(); // Reset the form
  }
  

submitInteractionsForm(myInteractionsForm1: FormGroup) {
  this.isFormSubmitted = true;
  // console.log("Form Value:", myInteractionsForm1.value);
  // console.log("Interaction Type:", myInteractionsForm1.value.interactionType);
  // console.log("Form Valid:", myInteractionsForm1.valid);

  // ✅ Ensure voice recording validation is applied only when required
  const voiceRecordingControl = myInteractionsForm1.get('voiceRecording');
  if (myInteractionsForm1.value.interactionType === 'Voice Note To Self') {
    if (voiceRecordingControl) {
      voiceRecordingControl.setValidators([Validators.required]);
      voiceRecordingControl.updateValueAndValidity();
    }
  } else {
    // ✅ Clear voice recording data if interaction type is changed
    this.clearVoiceRecording();
  }

  if (myInteractionsForm1.invalid) {
    // console.log("Form is invalid, marking fields as touched.");
    Object.keys(myInteractionsForm1.controls).forEach((controlName) => {
      myInteractionsForm1.get(controlName)?.markAsTouched();
    });
    return;
  }

  // Convert the date to the correct format for submission
  const temp = this.datePipe.transform(
    myInteractionsForm1.value.dateTime,
    'yyyy-MM-dd HH:mm:ss'
  );

  // Prepare notifications data
  let notifications: any[] = [];
  const notificationsArray = this.myInteractionsForm.get('notifications') as FormArray;
  if (notificationsArray && notificationsArray.value) {
    notifications = notificationsArray.value.map((notif: any) => ({
      interactionNote: notif.interactionNote || '',
      interactionTime: notif.interactionTime || '',
      interactionDays: notif.interactionDays || ''
    }));
  }

  // ✅ Ensure voice recording is empty if interaction type is NOT "Voice Note To Self"
  const voiceRecordingData =
    myInteractionsForm1.value.interactionType === 'Voice Note To Self' ? this.audioBase64: '';

  // Prepare the interaction data
  const interactionData = {
    roof_id: this.companyId,
    interaction_type: myInteractionsForm1.value.interactionType,
    notes: myInteractionsForm1.value.notes || '',
    interaction_datetime: temp,
    notifications: notifications,
    voice_recording: voiceRecordingData // ✅ Only include if relevant
  };

  if (!this.isEditModeInt) {
    // Save new interaction
    this.mapService.saveInteractionData(interactionData).subscribe(
      async (response: any) => {
        this.handleInteractionSuccess(myInteractionsForm1, 'Activities Added Successfully');

        // Reset the date field
        this.resetDateField(myInteractionsForm1);
        this.resetForm(this.myInteractionsForm);

        this.sharedService.emitRefreshHeader();
        this.sharedService.emitInteractionOccurred();
      },
      (error: any) => {
        this.handleInteractionError(error);
      }
    );
  } else {
    // Update existing interaction
    this.mapService.updateInteractionData(interactionData, this.InteractionId).subscribe(
      async (response: any) => {
        this.handleInteractionSuccess(myInteractionsForm1, 'Activities Updated Successfully');

        // Reset the date field
        this.resetDateField(myInteractionsForm1);
        this.isEditModeInt = false;
        this.InteractionId = null;

        this.resetForm(this.myInteractionsForm);
      },
      (error: any) => {
        this.handleInteractionError(error);
      }
    );
  }

}

resetDateField(myInteractionsForm1: FormGroup) {
  const currentDate = new Date();
  const formattedDate = this.datePipe.transform(currentDate, 'yyyy-MM-ddTHH:mm');
  myInteractionsForm1.patchValue({ dateTime: formattedDate });
}
  
  
  
  
  
handleInteractionSuccess(form: FormGroup, successMessage: string) {
  Swal.fire({
    icon: 'success',
    title: 'Success',
    text: successMessage,
    timer: 2000,
    timerProgressBar: true,
    showConfirmButton: false,
  });

  // Refresh the interaction list (if needed)
  this.InteractionList();
}
handleInteractionError(error: any) {
  let errorMessage = 'An error occurred. Please try again later.';
  if (error.status === 400) {
    errorMessage = 'Please fill all required fields.';
  } else if (error.status === 404) {
    errorMessage = 'Interaction not found.';
  }

  Swal.fire({
    icon: 'error',
    title: 'Error',
    text: errorMessage,
    timer: 2000,
    timerProgressBar: true,
    showConfirmButton: false,
  });
}
  
  private resetForm(form: FormGroup) {
    this.myInteractionsForm.reset({
      interactionType: '',
      dateTime: this.getCurrentDateTime(),
    });
    this.removeDynamicControls();
    this.isEditModeInt = false;
    this.InteractionId = null;
    this.audioURL = null;
    this.audioChunks = [];
  }
  


  roofSubmit() {
    
    
    // if (this.roofForm.valid) {
    
      // const formValues = this.roofForm.value;

    // Check if the required fields are empty, blank, or null
    // const requiredFields = ['current_tariff', 'pin_code', 'city', 'state', 'area', 'project_capacity','module_preference','inverter_preference','company_name','contact_person','lead_status' ];
    // const hasEmptyFields = requiredFields.some(field => {
      // const value = formValues[field];
      // return !value || value.trim() === ''; // Check for null, undefined, or blank
    // });

    // if (hasEmptyFields) {
      // this.roofForm.markAllAsTouched();
      
      // return; // Stop form submission
    // }
    // console.log(this.roofForm.valid,'abcd');
    if(this.roofForm.invalid){
      this.roofForm.markAllAsTouched();
      return
    }

    
  

    this.isLoader=true;
      if (this.isEditMode == false) {
        // Submit RoofData
        this.roofData =
        {
          description:this.roofForm.value.description,
          company_name: this.roofForm.value.company_name,
          customer_first_name: this.roofForm.value.customer_first_name,
          customer_last_name: this.roofForm.value.customer_last_name,
          contact_person:this.roofForm.value.contact_person,
          contact_no: this.roofForm.value.contact_number,
          email_addr: this.roofForm.value.contact_email,
          electricity_distributor: this.roofForm.value.supplier,
          electricity_consumer_number: this.roofForm.value.consumer_number,
          sanctioned_load: this.roofForm.value.sanctioned_load,
          current_tariff: this.roofForm.value.current_tariff,
          address_line_1: this.roofForm.value.address,
          address_line_2: this.roofForm.value.addressline2,
          area_name: this.roofForm.value.area,
          pin_code: this.roofForm.value.pin_code,
          city: this.roofForm.value.city,
          state: this.roofForm.value.state,
          solar_installation_capacity: this.roofForm.value.project_capacity,
          
          module_wattage: this.roofForm.value.module_wattage,
          module_type: this.roofForm.value.module_type,
          module_brand: this.roofForm.value.module_brand,
          inverter_wattage: this.roofForm.value.inverter_wattage,
          inverter_type: this.roofForm.value.inverter_type,
          inverter_brand: this.roofForm.value.inverter_brand,
          funded_by: this.roofForm.value.funded_by,
          latitude: this.selectedLatitude === 'NA' ? 0 : this.selectedLatitude,
          longitude: this.selectedLongitude === 'NA' ? 0 : this.selectedLongitude,
          lead_type: this.roofForm.value.lead_type,
          lead_status: this.roofForm.value.lead_status,
          module_preference: this.roofForm.value.module_preference,
          inverter_preference:this.roofForm.value.inverter_preference
        }

        this.newRoodDataService.createRoofData(this.roofData).subscribe(
          async (response: any) => {

            this.isLoader=false;
            Swal.fire({
              icon: 'success',
              title: "Success",
              html: 'Lead Data added Successfully',
              timer: 2000,
              timerProgressBar: true,
              showConfirmButton: false,
        });
            this.router.navigate(['/pages/leads']);

          },
          (error: any) => {
            this.isLoader=false;
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
      // UpdateRoofForm
      if (this.isEditMode == true) {
        this.isLoader=true;
        this.UpdateroofData =
        {
          description:this.roofForm.value.description,
          company_name: this.roofForm.value.company_name,
          customer_first_name: this.roofForm.value.customer_first_name,
          customer_last_name: this.roofForm.value.customer_last_name,
          contact_person: this.roofForm.value.contact_person,
          contact_no: this.roofForm.value.contact_number,
          email_addr: this.roofForm.value.contact_email,
          electricity_distributor: this.roofForm.value.supplier,
          electricity_consumer_number: this.roofForm.value.consumer_number,
          sanctioned_load: this.roofForm.value.sanctioned_load,
          current_tariff: this.roofForm.value.current_tariff,
          address_line_1: this.roofForm.value.address,
          address_line_2: this.roofForm.value.addressline2,
          area_name: this.roofForm.value.area,
          pin_code: this.roofForm.value.pin_code,
          city: this.roofForm.value.city,
          state: this.roofForm.value.state,
          solar_installation_capacity: this.roofForm.value.project_capacity,
          module_wattage: this.roofForm.value.module_wattage,
          module_type: this.roofForm.value.module_type,
          module_brand: this.roofForm.value.module_brand,
          inverter_wattage: this.roofForm.value.inverter_wattage,
          inverter_type: this.roofForm.value.inverter_type,
          inverter_brand: this.roofForm.value.inverter_brand,
          funded_by: this.roofForm.value.funded_by,
          latitude: this.selectedLatitude === 'NA' ? 0 : this.selectedLatitude,
          longitude: this.selectedLongitude === 'NA' ? 0 : this.selectedLongitude,
          lead_type: this.roofForm.value.lead_type,
          lead_status: this.roofForm.value.lead_status,
          module_preference: this.roofForm.value.module_preference,
          inverter_preference:this.roofForm.value.inverter_preference

        }

        this.newRoodDataService.updateRoofData(this.UpdateroofData, this.companyId).subscribe(
          async (response: any) => {
            this.isLoader=false;
            Swal.fire({
              icon: 'success',
              title: "Success",
              html: 'Lead Data Updated Successfully',
              timer: 2000,
              timerProgressBar: true,
              showConfirmButton: false,
        });

            this.router.navigate(['/pages/leads']);
          },
          (error: any) => {
            this.isLoader=false;
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

    // }
  
}

  cancelRoofForm() {
    this.router.navigate(['/pages/leads']);
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
      initial_project_size: this.project_capacity,
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
        roof_id: null,
        total_project_cost: 0,
        project_capacity: this.project_capacity,
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
      roof_id: null,
      total_project_cost: 0,
      project_capacity: this.project_capacity,
      unit_price: this.current_tariff,  
      inflation_rate: escalationRate,
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
      project_capacity: this.project_capacity,
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
            html: 'Financing details calculated successfully.',
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
        isModified: false,
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
  
    // Ensure at least one financing option remains
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
  
    // Confirm removal
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
        // If the option is saved (has an ID), call the API to remove it
        if (selectedOption.isSaved && selectedOption.id) {
          this.pastProjectservice.removeDetails(selectedOption.id).subscribe(
            (response: any) => {
              // console.log('Response from remove API:', response);
              this.options.splice(index, 1); // Remove the option from the array
  
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
          // If the option is not saved (no ID), remove it directly
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

  onTotalProjectCostChange() {
    // Mark all options as needing recalculation if the total project cost is changed
    this.options.forEach((option) => {
      option.isModified = true;
      option.isRecalculated = false; // Reset recalculated flag
    });
  }
  
  saveFinancingOption(index: number) {
    const selectedOption = this.options[index];
  
    // Validate recalculation for the selected option
    if (!selectedOption.isRecalculated) {
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
  
    // Proceed with saving if recalculation is valid
    const payload = {
      roof_id: this.companyId,
      save: true,
      total_project_cost: this.totalProjectCost,
      project_capacity: this.project_capacity,
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
        if (response?.financing_details?.length > 0) {
          const savedId = response.financing_details[0]?.id;
          this.options[index].isSaved = true;
          this.options[index].id = savedId;
          this.finance_id = savedId; // Assign the saved ID to finance_id
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
  
    // Validate recalculation for the selected option
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
  
    // Ensure the ID exists before updating
    const optionId = selectedOption.id || this.finance_id;
  
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
  
    const payload = {
      roof_id: this.companyId,
      save: true,
      total_project_cost: this.totalProjectCost,
      project_capacity: this.project_capacity,
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
      if (!option.isRecalculated) {
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
  

  showNotificationSection(): boolean {
    const selectedType = this.myInteractionsForm.get('interactionType')?.value;
    return selectedType === 'Call' || selectedType === 'Task For Self';
}

addNotification() {

  if (this.notifications.length < 2) { // Max 2 notifications
    const notificationForm = this.fb.group({
      interactionNote: ['Notification', Validators.required],
      interactionTime: ['', Validators.required],
      interactionDays: ['', Validators.required]
    });

    this.notifications.push(notificationForm);
    this.filteredInteractionDays.push([]); // Add placeholder for filtered days
  }
}

deleteNotification(index: number) {
  if (this.notifications.length > 1) { // Prevent deleting last notification
    this.notifications.removeAt(index);
    this.filteredInteractionDays.splice(index, 1); // Keep arrays in sync
  }
}

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



// Helper function to generate an array of numbers from start to end
generateRange(start: number, end: number): number[] {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

addDefaultNotification(): void {
  if (this.notifications.length === 0) { // Ensure only one default notification is added
    const notificationForm = this.fb.group({
      interactionNote: ['Notification', Validators.required],
      interactionTime: ['', Validators.required], // Default to 'Minutes'
      interactionDays: ['', Validators.required] // Default to 5 minutes
    });

    this.notifications.push(notificationForm);
    this.filteredInteractionDays.push(this.generateRange(1, 60)); // Add filtered days for 'Minutes'
  }
}



// Delete Recording (Allow user to re-record)
deleteRecording() {
  this.audioBase64 = ''; 
  this.audioChunks = []; 
  this.audioBlob = null; 
  this.audioURL = ''; 
  this.isRecording = false;
  this.isDeleteMode = true; // Show Start Recording button after deletion

  const voiceRecordingControl = this.myInteractionsForm.get('voiceRecording');
  if (voiceRecordingControl) {
    voiceRecordingControl.setValue('');
    voiceRecordingControl.clearValidators();
    voiceRecordingControl.updateValueAndValidity();
  }

  clearTimeout(this.recordingTimeout);
}


// Start Recording
startRecording() {
  this.showValidationMessage = false;
  this.isDeleteMode = false; // Hide start recording button when a new recording begins

  navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
    this.mediaRecorder = new MediaRecorder(stream);
    this.audioChunks = [];
    this.audioBase64 = ''; 
    this.audioURL = ''; 

    this.mediaRecorder.ondataavailable = (event) => {
      this.audioChunks.push(event.data);
    };

    this.mediaRecorder.onstop = () => {
      this.audioBlob = new Blob(this.audioChunks, { type: 'audio/mp3' });
      this.audioURL = URL.createObjectURL(this.audioBlob);

      const reader = new FileReader();
      reader.readAsDataURL(this.audioBlob);
      reader.onloadend = () => {
        let fullBase64 = reader.result as string;
        this.audioBase64 = fullBase64.replace(/^data:audio\/mp3;base64,/, "");

        const voiceRecordingControl = this.myInteractionsForm.get('voiceRecording');
        if (voiceRecordingControl) {
          voiceRecordingControl.setValue(this.audioBase64);
          voiceRecordingControl.setValidators([Validators.required]);
          voiceRecordingControl.updateValueAndValidity();
        }
      };
    };

    this.mediaRecorder.start();
    this.isRecording = true;

    this.recordingTimeout = setTimeout(() => {
      this.stopRecording();
    }, 300000);
  }).catch(error => console.error('Error accessing microphone:', error));
}


// Stop Recording
stopRecording() {
  if (this.mediaRecorder) {
    this.mediaRecorder.stop();
    this.isRecording = false;
    clearTimeout(this.recordingTimeout);

    this.mediaRecorder.onstop = () => {
      this.audioBlob = new Blob(this.audioChunks, { type: 'audio/mp3' });
      this.audioURL = URL.createObjectURL(this.audioBlob);

      setTimeout(() => {
        this.cdRef.detectChanges();
      });

      const reader = new FileReader();
      reader.readAsDataURL(this.audioBlob);
      reader.onloadend = () => {
        let fullBase64 = reader.result as string;
        this.audioBase64 = fullBase64.replace(/^data:audio\/mp3;base64,/, "");

        this.isDeleteMode = false; // Show delete & re-record button after stopping recording

        // ✅ Update the form control and force validation
        const voiceRecordingControl = this.myInteractionsForm.get('voiceRecording');
        if (voiceRecordingControl) {
          voiceRecordingControl.setValue(this.audioBase64);
          voiceRecordingControl.markAsTouched(); // Ensure UI updates
          voiceRecordingControl.markAsDirty(); // Mark field as changed
          voiceRecordingControl.setErrors(null); // Clear any errors
          voiceRecordingControl.updateValueAndValidity({ onlySelf: false, emitEvent: true });
        }

        // ✅ Manually trigger change detection to reflect updates in UI
        this.cdRef.detectChanges();
      };
    };
  }
}





clearVoiceRecording() {
  this.audioBase64 = '';
  this.audioChunks = [];
  this.audioBlob = null;
  this.audioURL = '';
  this.isRecording = false;

  const voiceRecordingControl = this.myInteractionsForm.get('voiceRecording');
  if (voiceRecordingControl) {
    voiceRecordingControl.setValue('');
    voiceRecordingControl.clearValidators();
    voiceRecordingControl.updateValueAndValidity();
  }
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


interface ResponseData {

  results: [
    {
      geometry: {

        location: {

          lat: number;

          lng: number;

        };

      }
    }
  ];

}
interface GeoJSONData {
  // Define the properties of your GeoJSON data here
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

