import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PastProjectsService } from 'src/app/shared/services/past-projects.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NewRoofDataService } from 'src/app/shared/services/new-roof-data.service';
import Swal from 'sweetalert2';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { ProfileTabService } from 'src/app/shared/services/profile-tab.service';
import { WeatherService } from 'src/app/shared/services/weather.service';

interface Meter {
  consumer_number: string;
  consumer_name: string;
  sanctioned_load: string;
  avg_monthly_consumption: string;
  tariff: string;
  avg_monthly_bill: string;
  required_solar_system: string;
}

interface CommercialDetail {
  comm_description: string;
  comm_cost: string;
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

@Component({
  selector: 'app-add-edit-proposals',
  templateUrl: './add-edit-proposals.component.html',
  styleUrls: ['./add-edit-proposals.component.scss']
})
export class AddEditProposalsComponent {
  isEditMode: boolean = false;
  proposalData: any;
  id: any;
  areaNames: string[] = [];
  selectedLatitude: string | null = null;
  selectedLongitude: string | null = null;
  cityNames: string[] = [];
  cityOptions: CityOption[] = [];
  isLoader: boolean = false;
  templateData: any[] = [];
  titles: { id: string; title: string }[] = [];
  detailedData: any = null;
  meters: Meter[] = [];
  isEditMeter = false;
  isEditcomdetail = false;
  pageSize: number = 100;
  currentPage: number = 1;
  comdetail: CommercialDetail[] = [];
  currentMeterIndex: number | null = null;
  currentDetailIndex: number | null = null;
  modalRef: NgbModalRef | null = null;
  areaOptions: AreaOption[] = [];
  generation_data: number = 0;
  degradation_data: number = 0;
  existingMeters: Meter[] = [];
  maxMetersAllowed: number = 5; // Maximum meters allowed
  selectFinanceTypeArray: any = ['Capex', 'Opex'];
  // Form Groups
  proposalForm: FormGroup;
  meterForm: FormGroup;
  comdetailForm: FormGroup;

  constructor(
    private notificationService: NotificationService,
    private modalService: NgbModal,
    private pastProjectservice: PastProjectsService,
    private router: Router,
    private pastProjectService: PastProjectsService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private newRoodDataService: NewRoofDataService,
    private profile: ProfileTabService,
    private weatherService: WeatherService,
  ) {
    // Initialize Meter Form
    this.meterForm = this.fb.group({
      consumer_number: ['', Validators.required],
      consumer_name: ['', Validators.required],
      sanctioned_load: ['', Validators.required],
      avg_monthly_consumption: ['', Validators.required],
      tariff: ['', Validators.required],
      avg_monthly_bill: [{ value: '', disabled: true }],
      required_solar_system: [{ value: '', disabled: true }]
    });

    // Initialize Commercial Detail Form
    this.comdetailForm = this.fb.group({
      comm_description: ['', Validators.required],
      comm_cost: ['', [Validators.required, Validators.pattern(/^\d+\.?\d*$/)]]
    });

    // Initialize Proposal Form
    this.proposalForm = this.fb.group({
      // Company/Firm Details
      company_name: ['', Validators.required],
      company_address: ['', Validators.required],
      company_phone_number: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      company_email: ['', [Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)]],

      // Contact Person Details
      contact_person_name: ['', Validators.required],
      contact_person_phone_number: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      contact_person_email: ['', [Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)]],

      // Proposed System
      project_size: ['', Validators.required],
      generation_per_year: ['', Validators.required],
      degradation_per_year: ['', Validators.required],

      // Project Site Details
      template: ['', Validators.required],
      boQToLinkTo: ['', Validators.required],
      project_site_address: ['', Validators.required],
      pin_code: ['', Validators.required],
      area: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],

      // AMC Details
      amc_free_number_of_years: ['', Validators.required],
      amc_cost: ['', Validators.required],
      amc_yearly_escalation: ['', Validators.required],

      // Financing Details
      finance_type: ['', Validators.required],
      finance_total_cost: [''],
      finance_down_payment: ['', Validators.required],
      loan_amount: [{ value: '', disabled: true }],
      loan_rate: ['', Validators.required],
      loan_tenure: [{ value: '', disabled: true }, Validators.required]
    });
  }

  ngOnInit(): void {
    this.getBoQToLinkData();
    this.getTemplateDataList();
    this.fetchConfigurationData();

    // Set up value change subscriptions for calculations
    this.setupCalculationListeners();

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.id = params['id'];
        this.loadProposalData();
      }
    });
  }

  setupCalculationListeners(): void {
    // Meter form calculations
    this.meterForm.valueChanges.subscribe(() => {
      if (this.meterForm.valid) {
        this.calculateMeterFormValues();
      }
    });

    // Generation per year changes affect all meters
    this.proposalForm.get('generation_per_year')?.valueChanges.subscribe(() => {
      this.calculateMeterValues();
    });

    // Total cost and down payment affect loan amount
    this.proposalForm.get('finance_total_cost')?.valueChanges.subscribe(() => {
      this.calculateLoanAmount();
    });

    this.proposalForm.get('finance_down_payment')?.valueChanges.subscribe(() => {
      this.calculateLoanAmount();
    });
  }

  loadProposalData(): void {
    this.isLoader = true;
    this.pastProjectService.getProposalDataById(this.id).subscribe(
      (response: any) => {
        this.isLoader = false;
        this.proposalData = response.data;

        // Load meters and commercial details
        if (response.data.meters) this.meters = response.data.meters;
        if (response.data.commercial_details) this.comdetail = response.data.commercial_details;

        // Then load BoQ data if available
        if (response.data.boQ_id) {
          this.loadBoQData(response.data.boQ_id).then(() => {
            this.patchFormValues(response.data);
          });
        } else {
          this.patchFormValues(response.data);
        }
      },
      (error: any) => {
        this.isLoader = false;
        console.error(error);
        this.showError('Failed to load proposal data');
      }
    );
  }

  private loadBoQData(boQId: string): Promise<void> {
    return new Promise((resolve) => {
      this.pastProjectService.getBoQLinkToDataById(boQId).subscribe(
        (response: any) => {
          this.detailedData = response;
          resolve();
        },
        (error: any) => {
          console.error(error);
          resolve(); // Even if error, continue with patching
        }
      );
    });
  }

  private patchFormValues(data: any): void {
    // Patch form values
    this.proposalForm.patchValue({
      company_name: data.company_name,
      company_address: data.company_address,
      company_phone_number: data.company_phone_number,
      company_email: data.company_email,
      contact_person_name: data.contact_person_name,
      contact_person_phone_number: data.contact_person_phone_number,
      contact_person_email: data.contact_person_email,
      project_size: data.project_size,
      generation_per_year: data.generation_per_year,
      degradation_per_year: data.degradation_per_year,
      template: data.template_id,
      boQToLinkTo: data.boQ_id,
      project_site_address: data.project_site_address,
      pin_code: data.pin_code,
      area: data.area,
      city: data.city,
      state: data.state,
      amc_free_number_of_years: data.amc_free_number_of_years,
      amc_cost: data.amc_cost,
      amc_yearly_escalation: data.amc_yearly_escalation,
      finance_type: data.finance_type, 
      finance_total_cost: data.finance_total_cost,
      finance_down_payment: data.finance_down_payment,
      loan_amount: data.loan_amount,
      loan_rate: data.loan_rate,
      loan_tenure: data.loan_tenure
    });

    this.selectedLatitude = data.latitude;
    this.selectedLongitude = data.longitude;

    // Calculate initial values
    this.calculateMeterValues();
    this.onFinanceTypeChange();

    setTimeout(() => {
      this.getAreaByPinCode();
    }, 500);
  }

  calculateTotalCost(): void {
    let baseCost = this.detailedData?.totalCost ? parseFloat(this.detailedData.totalCost) : 0;

    let commercialTotal = 0;
    if (this.comdetail && this.comdetail.length > 0) {
      commercialTotal = this.comdetail.reduce((sum, item) => {
        const cost = parseFloat(item.comm_cost) || 0;
        return sum + cost;
      }, 0);
    }

    const total = baseCost + commercialTotal;

    const totalCostControl = this.proposalForm.get('finance_total_cost');
    if (totalCostControl) {
      const wasDisabled = totalCostControl.disabled;
      if (wasDisabled) {
        totalCostControl.enable();
      }
      totalCostControl.setValue(total.toFixed(2));
      if (wasDisabled) {
        totalCostControl.disable();
      }
    }

    this.calculateLoanAmount();
  }

  calculateMeterValues(): void {
    const generationPerYear = parseFloat(this.proposalForm.get('generation_per_year')?.value) || 1;

    this.meters.forEach(meter => {
      // Calculate Average Monthly Bill
      const avgConsumption = parseFloat(meter.avg_monthly_consumption) || 0;
      const tariff = parseFloat(meter.tariff) || 0;
      meter.avg_monthly_bill = (avgConsumption * tariff).toFixed(2);

      // Calculate Required Solar PV System
      const yearlyConsumption = avgConsumption * 12;
      meter.required_solar_system = (yearlyConsumption / generationPerYear).toFixed(2);
    });
  }

  calculateMeterFormValues(): void {
    const form = this.meterForm;
    const avgConsumption = parseFloat(form.get('avg_monthly_consumption')?.value) || 0;
    const tariff = parseFloat(form.get('tariff')?.value) || 0;
    const generationPerYear = parseFloat(this.proposalForm.get('generation_per_year')?.value) || 1;

    // Calculate Average Monthly Bill
    form.patchValue({
      avg_monthly_bill: (avgConsumption * tariff).toFixed(2)
    }, { emitEvent: false });

    // Calculate Required Solar PV System
    const yearlyConsumption = avgConsumption * 12;
    form.patchValue({
      required_solar_system: (yearlyConsumption / generationPerYear).toFixed(2)
    }, { emitEvent: false });
  }

  calculateLoanAmount(): void {
  const financeType = this.proposalForm.get('finance_type')?.value;
  
  if (financeType !== 'Capex') return;

  const totalCost = parseFloat(this.proposalForm.get('finance_total_cost')?.value) || 0;
  const downPaymentPercent = parseFloat(this.proposalForm.get('finance_down_payment')?.value) || 0;

  const downPaymentAmount = totalCost * (downPaymentPercent / 100);
  const loanAmount = totalCost - downPaymentAmount;

  this.proposalForm.patchValue({
    loan_amount: loanAmount.toFixed(2)
  });
}

  // Meter Management Methods
  openAddMeterModal(largesizemodal: any): void {
    if (this.meters.length >= this.maxMetersAllowed) {
      this.showError(`Maximum limit of ${this.maxMetersAllowed} meters reached.`);
      return;
    }

    this.isEditMeter = false;
    this.currentMeterIndex = null;
    this.meterForm.reset();
    this.modalRef = this.modalService.open(largesizemodal, { size: 'lg' });
  }

  openEditMeterModal(largesizemodal: any, index: number): void {
    this.isEditMeter = true;
    this.currentMeterIndex = index;
    this.meterForm.patchValue(this.meters[index]);
    this.modalRef = this.modalService.open(largesizemodal, { size: 'lg' });
  }

  saveMeter(): void {
    if (this.meterForm.invalid) {
      this.meterForm.markAllAsTouched();
      return;
    }

    // Check if we're adding a new meter (not editing) and if we've reached the limit
    if (!this.isEditMeter && this.meters.length >= this.maxMetersAllowed) {
      this.showError(`Maximum limit of ${this.maxMetersAllowed} meters reached.`);
      return;
    }

    const meterData = this.meterForm.value;

    if (this.isEditMeter && this.currentMeterIndex !== null) {
      this.meters[this.currentMeterIndex] = meterData;
      this.showSuccess('Meter updated successfully!');
    } else {
      this.meters.push(meterData);
      this.showSuccess('Meter added successfully!');
    }

    this.closeModal();
    this.calculateMeterValues();
  }
  deleteMeter(index: number): void {
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
        this.meters.splice(index, 1);
        this.showSuccess('Meter deleted successfully!');
        this.calculateMeterValues();
      }
    });
  }

  // Commercial Detail Management Methods
  openAddcomdetailModal(smallsizemodal: any): void {
    this.isEditcomdetail = false;
    this.currentDetailIndex = null;
    this.comdetailForm.reset();
    this.modalRef = this.modalService.open(smallsizemodal, { size: 'lg' });
  }

  openEditcomdetailModal(smallsizemodal: any, index: number): void {
    this.isEditcomdetail = true;
    this.currentDetailIndex = index;
    this.comdetailForm.patchValue(this.comdetail[index]);
    this.modalRef = this.modalService.open(smallsizemodal, { size: 'lg' });
  }



  fetchConfigurationData() {
    this.isLoader = true;
    this.profile.getConfigurationById().subscribe({
      next: (data: any) => {
        this.isLoader = false;

        this.generation_data = data.data.generation_per_year ? data.data.generation_per_year : 1250;
        this.degradation_data = data.data.degradation_per_year ? data.data.degradation_per_year : 0.8;

        // Patch values into the form
        this.proposalForm.patchValue({
          generation_per_year: this.generation_data,
          degradation_per_year: this.degradation_data
        });
      },
      error: () => {
        this.isLoader = false;
        this.showError('Failed to fetch configuration.');
      }
    });
  }

  saveCommercialDetail(): void {
    if (this.comdetailForm.invalid) {
      this.comdetailForm.markAllAsTouched();
      return;
    }

    const detailData = this.comdetailForm.value;

    if (this.isEditcomdetail && this.currentDetailIndex !== null) {
      this.comdetail[this.currentDetailIndex] = detailData;
      this.showSuccess('Commercial detail updated successfully!');
    } else {
      this.comdetail.push(detailData);
      this.showSuccess('Commercial detail added successfully!');
    }

    // Recalculate total cost - now works in both edit and add modes
    this.calculateTotalCost();
    this.closeModal();
  }

  deleteCommercialDetail(index: number): void {
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
        this.comdetail.splice(index, 1);
        this.showSuccess('Commercial detail deleted successfully!');
        // Recalculate total cost - now works in both edit and add modes
        this.calculateTotalCost();
      }
    });
  }

  closeModal(): void {
    if (this.modalRef) {
      this.modalRef.close();
      this.meterForm.reset();
      this.comdetailForm.reset();
    }
  }

  // Data Fetching Methods
  getTemplateDataList(): void {
    this.isLoader = true;
    this.pastProjectService.getProposalTemplateList(this.currentPage, this.pageSize).subscribe(
      (response: any) => {
        this.isLoader = false;
        this.templateData = response.data;
      },
      (error: any) => {
        this.isLoader = false;
        console.error(error);
      }
    );
  }

  getBoQToLinkData(): void {
    this.isLoader = true;
    this.pastProjectService.getBoQLinkToData().subscribe(
      (response: any) => {
        this.isLoader = false;
        this.titles = response.results.map((item: any) => ({
          id: item.id,
          title: item.title
        }));
      },
      (error: any) => {
        this.isLoader = false;
        console.error(error);
      }
    );
  }

  onTitleSelected(event: Event): void {
    const selectedId = (event.target as HTMLSelectElement).value;
    if (!selectedId) return;

    this.isLoader = true;
    this.pastProjectService.getBoQLinkToDataById(selectedId).subscribe(
      (response: any) => {
        this.isLoader = false;
        this.detailedData = response;
        this.proposalForm.patchValue({
          project_size: response.projectSize
        });
        // Trigger total cost calculation after getting BoQ data
        this.calculateTotalCost();
      },
      (error: any) => {
        this.isLoader = false;
        console.error(error);
        this.showError('Failed to load BoQ details');
      }
    );
  }

  getAreaByPinCode(): void {
    const pinCode = this.proposalForm.get('pin_code')?.value;
    if (!pinCode) return;

    this.isLoader = true;
    this.newRoodDataService.getAreaByPincode(pinCode).subscribe(
      (response: any) => {
        this.isLoader = false;
        this.areaOptions = response.results.map((item: any) => ({
          area: item.area,
          latitude: item.latitude,
          longitude: item.longitude,
          state: item.state
        }));

        this.areaNames = this.areaOptions.map(item => item.area);
        this.areaSelected();
      },
      (error: any) => {
        this.isLoader = false;
        if (error.status === 400 || error.status === 404) {
          this.showError('Invalid pincode!');
        } else {
          this.showError('Failed to load area data');
        }
      }
    );
  }

areaSelected(): void {
  const selectedArea = this.proposalForm.get('area')?.value;
  const pinCode = this.proposalForm.get('pin_code')?.value;
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

            this.proposalForm.patchValue({
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
            // console.log('Fallback response:', weatherRes);
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




  // Form Submission
  proposalSubmit(): void {

    
    if (this.proposalForm.invalid) {
      this.proposalForm.markAllAsTouched();
      return;
    }
    if (this.meters.length === 0) {
      this.showError('At least one meter is required to submit the proposal.');
      return;
    }

    this.calculateTotalCost();


    const financeType = this.proposalForm.get('finance_type')?.value;
    const proposalData = {
      company_name: this.proposalForm.value.company_name,
      company_address: this.proposalForm.value.company_address,
      company_phone_number: this.proposalForm.value.company_phone_number,
      company_email: this.proposalForm.value.company_email,
      contact_person_name: this.proposalForm.value.contact_person_name,
      contact_person_phone_number: this.proposalForm.value.contact_person_phone_number,
      contact_person_email: this.proposalForm.value.contact_person_email,
      project_size: this.proposalForm.value.project_size,
      template: this.proposalForm.value.template_id,
      boQToLinkTo: this.proposalForm.value.boQ_id,
      project_site_address: this.proposalForm.value.project_site_address,
      pin_code: this.proposalForm.value.pin_code,
      area: this.proposalForm.value.area,
      city: this.proposalForm.value.city,
      state: this.proposalForm.value.state,
      amc_cost: this.proposalForm.value.amc_cost,
      amc_yearly_escalation: this.proposalForm.value.amc_yearly_escalation,
      amc_free_number_of_years: this.proposalForm.value.amc_free_number_of_years,
      degradation_per_year: this.proposalForm.value.degradation_per_year,
      generation_per_year: this.proposalForm.value.generation_per_year,
      meters: this.meters,
      commercial_details: this.comdetail,
      latitude: this.selectedLatitude || 0,
      longitude: this.selectedLongitude || 0,
      template_id: this.proposalForm.value.template,
      boQ_id: this.proposalForm.value.boQToLinkTo,
      finance_type: financeType,
      finance_total_cost: this.proposalForm.get('finance_total_cost')?.value,
      finance_down_payment: this.proposalForm.get('finance_down_payment')?.value,
      loan_rate: this.proposalForm.get('loan_rate')?.value,
    // Only include these for Capex
      ...(financeType === 'Capex' && {
      loan_amount: this.proposalForm.get('loan_amount')?.value,
      loan_tenure: this.proposalForm.get('loan_tenure')?.value
    }),
      
    };

    this.isLoader = true;

    if (this.isEditMode) {
      this.pastProjectService.updateProposalData(proposalData, this.id).subscribe(
        (response: any) => {
          this.isLoader = false;
          this.showSuccess('Proposal updated successfully!');
          this.router.navigate(['/pages/proposals']);
        },
        (error: any) => {
          this.handleError(error);
        }
      );
    } else {
      this.pastProjectService.createProposal(proposalData).subscribe(
        (response:any) => {
           const proposalId = response?.data?.id;
          this.isLoader = false;
          this.downloadProposal(proposalId);
        },
        (error: any) => {
          this.handleError(error);
        }
      );
    }
  }

  downloadProposal(id: any) {
      this.isLoader = true;
      this.pastProjectservice.downloadProposalDataById(id).subscribe(
        //for download, we are taking response as a blob
        (response: Blob) => {
          this.isLoader = false;
          // Create a URL for the Blob
          const downloadUrl = window.URL.createObjectURL(response);
          const link = document.createElement('a');
          link.href = downloadUrl;
          link.download = 'Proposal.docx';  // Name of the downloaded file
          link.click();
           this.router.navigate(['/pages/proposals']);
           this.notificationService.triggerFetchData();
           this.showSuccess('Proposal generated successfully!');
        },
        (error: any) => {
          this.isLoader = false;
          console.error(error);
  
        }
      );
    }

  // private downloadProposal(blob: Blob): void {
  //   const downloadUrl = window.URL.createObjectURL(blob);
  //   const link = document.createElement('a');
  //   link.href = downloadUrl;
  //   link.download = 'Proposal.docx';
  //   link.click();
  //   window.URL.revokeObjectURL(downloadUrl);
  // }

  // Utility Methods
  private showSuccess(message: string): void {
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: message,
      timer: 2000,
      showConfirmButton: false
    });
  }

  private showError(message: string): void {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: message,
      timer: 2000,
      showConfirmButton: false
    });
  }

  private handleError(error: any): void {
    this.isLoader = false;
    let errorMessage = 'Something went wrong. Please try again later.';

    if (error.status === 500) {
      errorMessage = 'Server Error! Please try again later.';
    } else if (error.status === 400) {
      errorMessage = error.error?.message || 'Bad request. Please check your data.';
    } else if (error.status === 0) {
      errorMessage = 'Network Error! Please check your connection.';
    }

    this.showError(errorMessage);
  }

  cancelProposalForm(): void {
    this.router.navigate(['/pages/proposals']);
  }

  onFinanceTypeChange(): void {
  const financeType = this.proposalForm.get('finance_type')?.value;
  
  if (financeType === 'Capex') {
    // Enable Capex specific fields
    this.proposalForm.get('loan_amount')?.enable();
    this.proposalForm.get('loan_tenure')?.enable();
    this.proposalForm.get('loan_rate')?.enable();
    this.calculateLoanAmount(); // Recalculate loan amount if needed
  } else if (financeType === 'Opex') {
    // Disable Capex specific fields and reset them
    this.proposalForm.get('loan_amount')?.disable();
    this.proposalForm.get('loan_tenure')?.disable();
    this.proposalForm.patchValue({
      loan_amount: '',
      loan_tenure: ''
    });
  }
}
}