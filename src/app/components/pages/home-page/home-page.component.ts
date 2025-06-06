import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from 'src/app/shared/services/auth.service';
import { Options } from 'ngx-slider-v2';
import { SearchService } from 'src/app/shared/services/search.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { MatRadioChange } from '@angular/material/radio';

import Swal from 'sweetalert2';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],

})
export class HomePageComponent implements OnInit {
  searchTerm: string = '';
  searchResults: string[] = [];
  categories = [
    {
      id: 'residential',
      value: 'Residential',
      label: 'Residential',
      formGroupName: 'residential',
      subcategories: [
        { id: 'individualBungalow', value: 'Individual Bungalow', label: 'Individual Bungalow', formControlName: 'IndividualBungalow' },
        { id: 'individualRowhouse', value: 'Individual Rowhouse', label: 'Individual Rowhouse', formControlName: 'IndividualRowhouse' },
        { id: 'housingSociety', value: 'Housing Society', label: 'Housing Society', formControlName: 'HousingSociety' }
      ]
    },
    {
      id: 'commercial',
      value: 'Commercial',
      label: 'Commercial',
      formGroupName: 'commercial',
      subcategories: [
        { id: 'autoDealership', value: 'Auto Dealership', label: 'Auto Dealership', formControlName: 'AutoDealership' },
        { id: 'college', value: 'College', label: 'College', formControlName: 'College' },
        { id: 'commercialBuilding', value: 'Commercial Building', label: 'Commercial Building', formControlName: 'CommercialBuilding' },
        { id: 'hospital', value: 'Hospital', label: 'Hospital', formControlName: 'Hospital' },
        { id: 'mall', value: 'Mall', label: 'Mall', formControlName: 'Mall' },
        { id: 'officeBuilding', value: 'Office Building', label: 'Office Building', formControlName: 'OfficeBuilding' },
        { id: 'school', value: 'School', label: 'School', formControlName: 'School' }
      ]
    },
    {
      id: 'industrial',
      value: 'Industrial',
      label: 'Industrial',
      formGroupName: 'industrial',
      subcategories: []
    }
  ];
  totalItems: number = 0;
  pageSizeOptions: number[] = [5, 10, 50, 100];
  pageSize: number = 5;
  maxPage = 4; // This should match the maxSize property in the template
  options1: Options = {
    floor: 0,
    ceil: 4000
  };
  options2: Options = {
    floor: 0,
    ceil: 4000
  };

  filterForm!: FormGroup;
  leadStatus!: FormGroup;
  rooftopOwnerForm!: FormGroup;
  companyTypeForm!: FormGroup;
  roofData: any[] = [];
  data: any;
  currentPage: number = 1;
  // maxPage: number = 0;
  highest: number = 0;
  highest1: number = 0;
  mapZoom = 12;
  searchFilterPagination: boolean = false;
  parId: any = '0';
  isLoader:boolean=false;
  paginatedData: any[] = [];
  solarInstallationStatus: string = 'Both';
  profile: any = '';



  //New Params
  total_leads :number = 0;
  total_proposals :number = 0;
  total_boQs :number = 0;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private mapService: SearchService,
    private authService: AuthService,
    
  ) {
    this.filterForm = this.fb.group({
      installationStatus: [''],
      leadStatus: this.fb.group({
        Cold: [false],
        Warm: [false],
        Hot: [false]
      }),
      rooftopOwnerType: this.fb.group({
        residential: this.fb.group({
          IndividualBungalow: [false],
          IndividualRowhouse: [false],
          HousingSociety: [false]
        }),
        industrial: [false],
        commercial: this.fb.group({
          AutoDealership: [false],
          College: [false],
          CommercialBuilding: [false],
          Hospital: [false],
          Mall: [false],
          OfficeBuilding: [false],
          School: [false]
        })
      }),
      companyType: this.fb.group({
        Proprietorship: [false],
        Partnership: [false],
        llp: [false],
        PrivateLimited: [false],
        PublicLimited: [false]
      }),
      solarPowerGenerationMaxNotDone: 1000000,
      solarPowerGenerationMinNotDone: 0,
      solarPowerGenerationMaxDone: 1000000,
      solarPowerGenerationMinDone: 0
      // solarPowerGeneration: [0],
      // solarPowerGenerationDone: [[0, 4000]],
      // solarPowerGenerationNotDone: [[0, 4000]],
    });

  }
  showFilter: boolean = false;

  toggleFilter(): void {
    this.showFilter = !this.showFilter;
  }
  onInstallationStatusChange(event: MatRadioChange) {
    const newValue = event.value;

    // this.filterForm.get('installationStatus')?.setValue(newValue);
    this.solarInstallationStatus = newValue;


    // console.log(this.filterForm.value)
  }

  showNoRecordsTable: boolean = false;

  ngOnInit(): void {
    this.solarInstallationStatus = 'Both';
    this.showNoRecordsTable = false;
    this.profile = localStorage.getItem('user')
    // this.route.params.subscribe(params => {
    //   // console.log('adds:', params['id'])
    //   this.parId = params['id']
    //   if (params['id'] == '1') {
    //     // console.log('hey')
    //     const search: string | null = localStorage.getItem('searchTerm');


    //     if (search != null) {
    //       this.isLoader=true;
    //       this.authService.getHomePageData().subscribe(
    //         (response: any) => {

    //           this.isLoader=false;
    //           this.data = response;


    //         },
    //         (error: any) => {
    //           this.isLoader=false;
    //           console.error(error);
    //         }
    //       );
    //       this.searchTerm = search;
    //       this.showNoRecordsTable = false
    //       this.mapService.allSearchData(
    //         search
    //       ).subscribe(
    //         async (response: any) => {

    //           this.totalItems = response.count;
    //           this.showNoRecordsTable = false
              
    //           this.pageSize = response.results.roof_data.length;
    //           this.roofData = response.results.roof_data;
    //           this.data = response.results.stats;
    //           this.highest = response.results.stats.with_solar.highest_installed_capacity
    //           this.highest1 = response.results.stats.without_solar.highest_generation_potential
    //           // this.options1 = {
    //           //   floor: 0,
    //           //   ceil: this.highest
    //           // };
    //           // this.options2 = {
    //           //   floor: 0,
    //           //   ceil: this.highest1
    //           // };
    //           this.filterForm.get('solarPowerGenerationDone')?.setValue(0, 4000);
    //           this.filterForm.get('solarPowerGenerationNotDone')?.setValue(0, 4000);
    //           // this.filterForm.get('solarPowerGenerationDone')?.setValue(0,response.results.stats.with_solar.highest_installed_capacity);
    //           // this.filterForm.get('solarPowerGenerationNotDone')?.setValue(0,response.results.stats.without_solar.highest_generation_potential);
    //           if (this.roofData.length == 0) {
    //             this.showNoRecordsTable = true
    //           }

    //           this.updatePagination();
    //           this.paginateData();
    //         },
    //         (error: any) => {
    //           console.error(error);
    //         }
    //       )
    //     } else {
    //       this.isLoader=true;
    //       this.authService.getHomePageData().subscribe(
    //         (response: any) => {

    //           this.isLoader=false;
    //           this.data = response;


    //         },
    //         (error: any) => {
    //           this.isLoader=false;
    //           console.error(error);
    //         }
    //       );
    //       const search: string | null = '';
    //       this.showNoRecordsTable = false
    //       this.mapService.allSearchData(
    //         search
    //       ).subscribe(
    //         async (response: any) => {

    //           this.totalItems = response.count;
    //           this.showNoRecordsTable = false
    //           this.pageSize = response.results.roof_data.length;
    //           this.roofData = response.results.roof_data;
    //           this.data = response.results.stats;
    //           this.highest = response.results.stats.with_solar.highest_installed_capacity
    //           this.highest1 = response.results.stats.without_solar.highest_generation_potential
    //           //  this.options1 = {
    //           //    floor: 0,
    //           //    ceil: this.highest
    //           //  };
    //           //  this.options2 = {
    //           //    floor: 0,
    //           //    ceil: this.highest1
    //           //  };
    //           this.filterForm.get('solarPowerGenerationDone')?.setValue(0, 4000);
    //           this.filterForm.get('solarPowerGenerationNotDone')?.setValue(0, 4000);
    //           //  this.filterForm.get('solarPowerGenerationDone')?.setValue(0,response.results.stats.with_solar.highest_installed_capacity);
    //           //  this.filterForm.get('solarPowerGenerationNotDone')?.setValue(0,response.results.stats.without_solar.highest_generation_potential);
    //           if (this.roofData.length == 0) {
    //             this.showNoRecordsTable = true
    //           }

    //           this.updatePagination();
    //           this.paginateData();
    //         },
    //         (error: any) => {
    //           console.error(error);
    //         }
    //       )
    //     }
    //   }
    // })


    const search: string | null = '';

    this.showNoRecordsTable = false;
    this.getDashboardData();
    // if (this.parId != '1') {
    //   this.isLoader=true;
    //   this.authService.getHomePageData().subscribe(
    //     (response: any) => {

    //       this.isLoader=false;
    //       this.data = response;


    //     },
    //     (error: any) => {
    //       this.isLoader=false;
    //       console.error(error);
    //     }
    //   );
    //   this.mapService.allSearchData(
    //     // eslint-disable-next-line linebreak-style
    //     search
    //   ).subscribe(
    //     async (response: any) => {

    //       this.totalItems = response.count;
    //       this.showNoRecordsTable = false
    //       this.pageSize = response.results.roof_data.length;
    //       this.roofData = response.results.roof_data;

    //       this.highest = response.results.stats.with_solar.highest_installed_capacity
    //       this.highest1 = response.results.stats.without_solar.highest_generation_potential
    //       // this.options1 = {
    //       //   floor: 0,
    //       //   ceil: this.highest
    //       // };
    //       // this.options2 = {
    //       //   floor: 0,
    //       //   ceil: this.highest1
    //       // };
    //       this.filterForm.get('solarPowerGenerationDone')?.setValue(0, 4000);
    //       this.filterForm.get('solarPowerGenerationNotDone')?.setValue(0, 4000);
    //       // this.filterForm.get('solarPowerGenerationDone')?.setValue(0,response.results.stats.with_solar.highest_installed_capacity);
    //       // this.filterForm.get('solarPowerGenerationNotDone')?.setValue(0,response.results.stats.without_solar.highest_generation_potential);
    //       // console.log(this.filterForm)
    //       // this.data = response.results.stats;

    //       //   if(response.results.stats.with_solar.highest_installed_capacity != 0)
    //       //   {
    //       //     this.highest = response.results.stats.with_solar.highest_installed_capacity

    //       //   this.options1 = {
    //       //     floor: 0,
    //       //     ceil: this.highest
    //       //   };
    //       //   this.filterForm.get('solarPowerGenerationDone')?.setValue([0, this.highest]);
    //       // }
    //       // if(response.results.stats.without_solar.highest_generation_potential != 0)
    //       // {

    //       //   this.highest1 =  response.results.stats.without_solar.highest_generation_potential
    //       //   this.options2 = {
    //       //     floor: 0,
    //       //     ceil: this.highest1
    //       //   };

    //       //   this.filterForm.get('solarPowerGenerationNotDone')?.setValue([0,  this.highest1]);
    //       // }
    //       if (this.roofData.length == 0) {
    //         this.showNoRecordsTable = true
    //       }

    //       this.updatePagination();
    //       this.paginateData();
    //     },
    //     (error: any) => {
    //       console.error(error);
    //     }
    //   )
    // }
  }


  getDashboardData()
  {
    this.authService.getHomePageData().subscribe(
      (response: any) => {
        this.total_boQs = response.total_boQs;
        this.total_proposals = response.total_proposals;
        this.total_leads = response.total_leads;
        this.data = response;
      },
      (error: any) => {
            console.error(error);
      });
  }
  radioChanged(value: string): void {
    this.solarInstallationStatus = value;
    // console.log(this.solarInstallationStatus)
    if (value == 'Both') {
      this.filterForm.get('solarPowerGenerationDone')?.setValue([0, 4000]);
      this.filterForm.get('solarPowerGenerationNotDone')?.setValue([0, 4000]);
      // this.filterForm.get('solarPowerGenerationDone')?.setValue([0, this.highest]);
      // this.filterForm.get('solarPowerGenerationNotDone')?.setValue([0, this.highest1]);
    }
    if (value == 'Done') {
      this.filterForm.get('solarPowerGenerationDone')?.setValue([0, 4000]);
      this.filterForm.get('solarPowerGenerationNotDone')?.setValue([0, 0]);
      // this.filterForm.get('solarPowerGenerationDone')?.setValue([0, this.highest]);
      // this.filterForm.get('solarPowerGenerationNotDone')?.setValue([0, 0]);
    }
    if (value == 'Not Done') {
      this.filterForm.get('solarPowerGenerationDone')?.setValue([0, 0]);
      this.filterForm.get('solarPowerGenerationNotDone')?.setValue([0, 4000]);
      // this.filterForm.get('solarPowerGenerationDone')?.setValue([0, 0]);
      // this.filterForm.get('solarPowerGenerationNotDone')?.setValue([0, this.highest1]);
    }
    this.options1 = {
      floor: 0,
      ceil: 4000
    };
    this.options2 = {
      floor: 0,
      ceil: 4000
    };

    // console.log(this.filterForm)
    // this.cdRef.detectChanges();
  }
  resetForm() {
    this.filterForm.reset();
    // this.filterForm.get('installationStatus')?.setValue('Done');
    this.solarInstallationStatus = 'Both'
    this.options1 = {
      floor: 0,
      ceil: 4000
      // ceil: this.highest
    };
    this.options2 = {
      floor: 0,
      ceil: 4000
      // ceil: this.highest1
    };
    this.filterForm.get('solarPowerGenerationDone')?.setValue(0, 4000);
    this.filterForm.get('solarPowerGenerationNotDone')?.setValue(0, 4000);

  }
  onSubmit() {
    const formValue = this.filterForm.value;
    // console.log('Form Value:', formValue);
    this.searchFilterPagination = true
    const leadStatusLabels = {
      Cold: 'Cold',
      Warm: 'Warm',
      Hot: 'Hot'
    };
    const companyTypeLabels = {
      Proprietorship: 'Proprietorship',
      Partnership: 'Partnership',
      llp: 'LLP',
      PrivateLimited: 'Private Limited',
      PublicLimited: 'Public Limited'
    };

    const leadStatus: any[] = [];
    const leadStatusFormGroup = this.filterForm.get('leadStatus') as FormGroup;
    Object.keys(leadStatusFormGroup.controls).forEach(key => {
      if (leadStatusFormGroup.get(key)?.value) {
        leadStatus.push(leadStatusLabels[key as keyof typeof leadStatusLabels]);
      }
    });

    type RooftopOwnerTypeLabels = {
      residential: {
        IndividualBungalow: string;
        IndividualRowhouse: string;
        HousingSociety: string;
      };
      Industrial: string;
      commercial: {
        AutoDealership: string;
        College: string;
        CommercialBuilding: string;
        Hospital: string;
        Mall: string;
        OfficeBuilding: string;
        School: string;
      };
    };
    const rooftopOwnerTypeLabels: RooftopOwnerTypeLabels = {
      residential: {
        IndividualBungalow: 'Individual Bungalow',
        IndividualRowhouse: 'Individual Rowhouse',
        HousingSociety: 'Housing Society'
      },
      Industrial: 'Industrial',
      commercial: {
        AutoDealership: 'Auto Dealership',
        College: 'College',
        CommercialBuilding: 'Commercial Building',
        Hospital: 'Hospital',
        Mall: 'Mall',
        OfficeBuilding: 'Office Building',
        School: 'School'
      }
    };
    const rooftopOwnerTypeFormGroup = this.filterForm.get('rooftopOwnerType') as FormGroup;
    const rooftopOwnerType: string[] = [];

    const categories = Object.keys(rooftopOwnerTypeFormGroup.controls) as (keyof RooftopOwnerTypeLabels)[];
    categories.forEach(category => {
      const subcategory = rooftopOwnerTypeFormGroup.get(category);
      if (subcategory instanceof FormGroup) {
        Object.keys(subcategory.controls).forEach(key => {
          if (subcategory.get(key)?.value) {
            const categoryLabels = rooftopOwnerTypeLabels[category];
            if (typeof categoryLabels === 'object' && categoryLabels !== null) {
              const subcategoryLabels = categoryLabels as Record<string, string>;
              if (subcategoryLabels[key]) {
                rooftopOwnerType.push(subcategoryLabels[key]);
              }
            } else if (typeof categoryLabels === 'string') {
              rooftopOwnerType.push(categoryLabels);
            }
          }
        });
      } else if (subcategory?.value) {
        const categoryLabels = rooftopOwnerTypeLabels[category];
        if (typeof categoryLabels === 'string') {
          rooftopOwnerType.push(categoryLabels);
        }
      }
    });



    const companyType: any[] = [];
    const companyTypeFormGroup = this.filterForm.get('companyType') as FormGroup;
    Object.keys(companyTypeFormGroup.controls).forEach(key => {
      if (companyTypeFormGroup.get(key)?.value) {
        companyType.push(companyTypeLabels[key as keyof typeof companyTypeLabels]);
      }
    });
    // console.log(companyType)
    let company_type = companyType.join(', ').replace(/%20/g, ' ')
    // let owner_type = ''
    let owner_type = rooftopOwnerType.join(', ').replace(/%20/g, ' ');
    // console.log(owner_type)
    let lead_Status = leadStatus.join(', ').replace(/%20/g, ' ')
    //   homeSearchFilter
    let order = "desc"

    let min = formValue.solarPowerGenerationMaxDone
    let max = formValue.solarPowerGenerationMinDone
    let min1 = formValue.solarPowerGenerationMaxNotDone
    let max1 = formValue.solarPowerGenerationMinNotDone
    if (this.solarInstallationStatus == 'Done') {
      this.mapService.homeSearchFilter(
        this.solarInstallationStatus,
        lead_Status,
        owner_type,
        formValue.solarPowerGenerationMaxDone,
        formValue.solarPowerGenerationMinDone,


        undefined,
        undefined,
        company_type,
        this.searchTerm,
        order

      ).subscribe(
        async (response: any) => {

          // console.log(response.Message, "o credit message")
          if (response.Message)
            Swal.fire({
          icon: 'success',
          title: "Success",
          html: 'Status Updated Successfully',
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
    });

          this.totalItems = response.count;
          // console.log(this.totalItems)
          this.showNoRecordsTable = false
          this.pageSize = response.results.roof_data.length;
          this.roofData = response.results.roof_data;
          this.data = response.results.stats;

          //    if(response.results.stats.with_solar.highest_installed_capacity != 0)
          //    {
          //     this.highest = response.results.stats.with_solar.highest_installed_capacity

          //    this.options1 = {
          //      floor: 0,
          //      ceil: this.highest
          //    };
          //    this.filterForm.get('solarPowerGenerationDone')?.setValue([0, this.highest]);
          //  }
          //  if(response.results.stats.without_solar.highest_generation_potential != 0)
          //  {

          //   this.highest1 =  response.results.stats.without_solar.highest_generation_potential
          //    this.options2 = {
          //      floor: 0,
          //      ceil: this.highest1
          //    };

          //    this.filterForm.get('solarPowerGenerationNotDone')?.setValue([0,  this.highest1]);
          //  }

          if (this.roofData.length == 0) {
            this.showNoRecordsTable = true
          }

          this.updatePagination();
          this.paginateData();

        },
        (error: any) => {
          console.error(error);
        }
      )
    }
    else if (this.solarInstallationStatus == 'Not Done') {
      this.mapService.homeSearchFilter(
        this.solarInstallationStatus,
        lead_Status,
        owner_type,
        undefined,
        undefined,
        formValue.solarPowerGenerationMaxNotDone,
        formValue.solarPowerGenerationMinNotDone,


        company_type,
        this.searchTerm,
        order

      ).subscribe(
        async (response: any) => {

          this.totalItems = response.count;

          this.showNoRecordsTable = false
          this.pageSize = response.results.roof_data.length;
          // console.log(this.pageSize)
          this.roofData = response.results.roof_data;
          this.data = response.results.stats;
          //    if(response.results.stats.with_solar.highest_installed_capacity != 0)
          //    {
          //     this.highest = response.results.stats.with_solar.highest_installed_capacity

          //    this.options1 = {
          //      floor: 0,
          //      ceil: this.highest
          //    };
          //    this.filterForm.get('solarPowerGenerationDone')?.setValue([0, this.highest]);
          //  }
          //  if(response.results.stats.without_solar.highest_generation_potential != 0)
          //  {

          //   this.highest1 =  response.results.stats.without_solar.highest_generation_potential
          //    this.options2 = {
          //      floor: 0,
          //      ceil: this.highest1
          //    };

          //    this.filterForm.get('solarPowerGenerationNotDone')?.setValue([0,  this.highest1]);
          //  }

          if (this.roofData.length == 0) {
            this.showNoRecordsTable = true
          }

          this.updatePagination();
          this.paginateData();
        },
        (error: any) => {
          console.error(error);
        }
      )
    } else {
      this.mapService.homeSearchFilter(
        this.solarInstallationStatus,
        lead_Status,
        owner_type,
        formValue.solarPowerGenerationMaxDone,
        formValue.solarPowerGenerationMinDone,
        formValue.solarPowerGenerationMaxNotDone,
        formValue.solarPowerGenerationMinNotDone,


        company_type,
        this.searchTerm,
        order

      ).subscribe(
        async (response: any) => {

          this.totalItems = response.count;
          this.showNoRecordsTable = false
          this.pageSize = response.results.roof_data.length;
          this.roofData = response.results.roof_data;
          this.data = response.results.stats;

          //    if(response.results.stats.with_solar.highest_installed_capacity != 0)
          //    {
          //     this.highest = response.results.stats.with_solar.highest_installed_capacity

          //    this.options1 = {
          //      floor: 0,
          //      ceil: this.highest
          //    };
          //    this.filterForm.get('solarPowerGenerationDone')?.setValue([0, this.highest]);
          //  }
          //  if(response.results.stats.without_solar.highest_generation_potential != 0)
          //  {

          //   this.highest1 =  response.results.stats.without_solar.highest_generation_potential
          //    this.options2 = {
          //      floor: 0,
          //      ceil: this.highest1
          //    };

          //    this.filterForm.get('solarPowerGenerationNotDone')?.setValue([0,  this.highest1]);
          //  }

          if (this.roofData.length == 0) {
            this.showNoRecordsTable = true
          }

          this.updatePagination();
          this.paginateData();
        },
        (error: any) => {
          console.error(error);
        }
      )
    }
  }
  subcategoriesVisibility: { [key: string]: boolean } = {};
  // toggleSubcategories(category: string) {
  //   this.subcategoriesVisibility[category] = !this.subcategoriesVisibility[category];

  // }

  // isSubcategoriesVisible(categoryId: string): boolean {
  // const subcategoryDiv = document.getElementById(categoryId + 'Subcategories');
  //   return subcategoryDiv ? subcategoryDiv.style.display === 'block' : false;
  // }

  // toggleSubcategories(categoryId: string): void {
  //   const subcategoryDiv = document.getElementById(categoryId + 'Subcategories');
  //   if (subcategoryDiv) {
  //     subcategoryDiv.style.display = this.isSubcategoriesVisible(categoryId) ? 'none' : 'block';
  //   }
  // }
  //   toggleSubcategories(category: string, isCheckboxClicked: boolean = false) {
  //     const subcategories = this.filterForm.get(`rooftopOwnerType.${category}`);
  //     console.log(isCheckboxClicked)
  //     if (subcategories) {
  //         if (!isCheckboxClicked) {
  //             // Toggle visibility
  //             this.subcategoriesVisibility[category] = !this.subcategoriesVisibility[category];
  //             // Update form values based on visibility
  //             const isVisible = this.subcategoriesVisibility[category];
  //             const categoryControl = subcategories as FormGroup;
  //             this.categories.find(cat => cat.id === category)?.subcategories.forEach(subcategory => {
  //                 const controlName = subcategory.formControlName;
  //                 const controlValue = categoryControl.get(controlName);
  //                 if (controlValue) {
  //                     controlValue.setValue(isVisible);
  //                 }
  //             });
  //         }
  //     }
  // }
  toggleSubcategories(category: string) {
    // Toggle visibility
    this.subcategoriesVisibility[category] = !this.subcategoriesVisibility[category];
  }
  toggleParentCheckbox(category: any, event: any) {
    if (category && event && event.target) {
      const subcategoriesGroup = this.filterForm.get(`rooftopOwnerType.${category.formGroupName}`) as FormGroup;
      const categoryChecked = subcategoriesGroup.get(category.id)?.value;
      // console.log(categoryChecked)
      if (event.target.checked) {
        if (category.formGroupName == 'residential') {
          const rooftopOwnerTypeGroup = this.filterForm.get(`rooftopOwnerType.${category.formGroupName}`) as FormGroup;
          const residentialGroup = rooftopOwnerTypeGroup.get(`.${category.formGroupName}`) as FormGroup;
          // console.log(rooftopOwnerTypeGroup)
          if (rooftopOwnerTypeGroup) {
            rooftopOwnerTypeGroup.patchValue({
              IndividualBungalow: true,
              IndividualRowhouse: true,
              HousingSociety: true
            });
          }
        }
        else if (category.formGroupName == 'commercial') {
          const rooftopOwnerTypeGroup = this.filterForm.get(`rooftopOwnerType.${category.formGroupName}`) as FormGroup;
          const commercialGroup = rooftopOwnerTypeGroup.get(`.${category.formGroupName}`) as FormGroup;

          if (rooftopOwnerTypeGroup) {
            rooftopOwnerTypeGroup.patchValue({
              AutoDealership: true,
              College: true,
              CommercialBuilding: true,
              Hospital: true,
              Mall: true,
              OfficeBuilding: true,
              School: true
            });
          }
        }
        // If the parent checkbox is checked, select all child checkboxes
        // category.subcategories.forEach((subcategory: any) => {
        //     subcategoriesGroup.get(subcategory.formControlName)?.setValue(true);
        // });
      } else {
        // If the parent checkbox is unchecked, deselect all child checkboxes
        category.subcategories.forEach((subcategory: any) => {
          subcategoriesGroup.get(subcategory.formControlName)?.setValue(false);
        });
      }
    }
  }
  isSubcategoriesVisible(category: string): boolean {
    return this.subcategoriesVisibility[category];
  }

  search() {
    const companyName = this.searchTerm.replace(/%20/g, ' ');
    this.isLoader=true;
    if (companyName != '') {
      this.showNoRecordsTable = false
      this.mapService.allSearchData(
        companyName
      ).subscribe(
        async (response: any) => {
          this.isLoader=false;
          this.resetForm()
          this.totalItems = response.count;
          this.showNoRecordsTable = false
          this.pageSize = response.results.roof_data.length;
          this.roofData = response.results.roof_data;
          this.data = response.results.stats;


          //   if(response.results.stats.with_solar.highest_installed_capacity != 0)
          //   {
          //     this.highest = response.results.stats.with_solar.highest_installed_capacity
          //   this.options1 = {
          //     floor: 0,
          //     ceil: this.highest
          //   };
          //   this.filterForm.get('solarPowerGenerationDone')?.setValue([0, this.highest]);
          // }
          // if(response.results.stats.without_solar.highest_generation_potential != 0)
          // {
          //   this.highest1 =  response.results.stats.without_solar.highest_generation_potential
          //   this.options2 = {
          //     floor: 0,
          //     ceil: this.highest1
          //   };

          //   this.filterForm.get('solarPowerGenerationNotDone')?.setValue([0,  this.highest1]);
          // }

          if (this.roofData.length == 0) {
            this.showNoRecordsTable = true
          }

          this.updatePagination();
          this.paginateData();
        },
        (error: any) => {
          this.isLoader=false;
          console.error(error);
        }
      )
    }
  }
  onPageSizeChange(): void {
    this.currentPage = 1;
    this.updatePagination();
    this.paginateData();
  }

  paginateData(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.totalItems);
    this.paginatedData = this.roofData.slice(startIndex, endIndex);
  }

  updatePagination(): void {
    this.maxPage = Math.ceil(this.totalItems / this.pageSize);
    if (this.maxPage > 10) {
      this.maxPage = 0; // Set to 0 to display all pages
    }
  }
  onPageChange(page: number): void {
    const companyName = this.searchTerm;
    if (this.searchFilterPagination == false) {
      this.isLoader=true;
      this.mapService.allSearchDataFilter(
        companyName,
        page
      ).subscribe(
        async (response: any) => {
          this.isLoader=false;
          this.roofData = []
          // this.totalItems = response.count;
          // this.pageSize = response.results.length;
          this.roofData = response.results.roof_data;
          //  this.updatePagination();
          //  this.paginateData();
        },
        (error: any) => {
          this.isLoader=false;
          console.error(error);
        }
      )
    }
    else {
      const formValue = this.filterForm.value;
      // console.log('Form Value:', formValue);
      this.searchFilterPagination = true
      const leadStatusLabels = {
        Cold: 'Cold',
        Warm: 'Warm',
        Hot: 'Hot'
      };
      const companyTypeLabels = {
        Proprietorship: 'Proprietorship',
        Partnership: 'Partnership',
        llp: 'LLP',
        PrivateLimited: 'Private Limited',
        PublicLimited: 'Public Limited'
      };

      const leadStatus: any[] = [];
      const leadStatusFormGroup = this.filterForm.get('leadStatus') as FormGroup;
      Object.keys(leadStatusFormGroup.controls).forEach(key => {
        if (leadStatusFormGroup.get(key)?.value) {
          leadStatus.push(leadStatusLabels[key as keyof typeof leadStatusLabels]);
        }
      });

      type RooftopOwnerTypeLabels = {
        residential: {
          IndividualBungalow: string;
          IndividualRowhouse: string;
          HousingSociety: string;
        };
        Industrial: string;
        commercial: {
          AutoDealership: string;
          College: string;
          CommercialBuilding: string;
          Hospital: string;
          Mall: string;
          OfficeBuilding: string;
          School: string;
        };
      };
      const rooftopOwnerTypeLabels: RooftopOwnerTypeLabels = {
        residential: {
          IndividualBungalow: 'Individual Bungalow',
          IndividualRowhouse: 'Individual Rowhouse',
          HousingSociety: 'Housing Society'
        },
        Industrial: 'Industrial',
        commercial: {
          AutoDealership: 'Auto Dealership',
          College: 'College',
          CommercialBuilding: 'Commercial Building',
          Hospital: 'Hospital',
          Mall: 'Mall',
          OfficeBuilding: 'Office Building',
          School: 'School'
        }
      };
      const rooftopOwnerTypeFormGroup = this.filterForm.get('rooftopOwnerType') as FormGroup;
      const rooftopOwnerType: string[] = [];

      const categories = Object.keys(rooftopOwnerTypeFormGroup.controls) as (keyof RooftopOwnerTypeLabels)[];
      categories.forEach(category => {
        const subcategory = rooftopOwnerTypeFormGroup.get(category);
        if (subcategory instanceof FormGroup) {
          Object.keys(subcategory.controls).forEach(key => {
            if (subcategory.get(key)?.value) {
              const categoryLabels = rooftopOwnerTypeLabels[category];
              if (typeof categoryLabels === 'object' && categoryLabels !== null) {
                const subcategoryLabels = categoryLabels as Record<string, string>;
                if (subcategoryLabels[key]) {
                  rooftopOwnerType.push(subcategoryLabels[key]);
                }
              } else if (typeof categoryLabels === 'string') {
                rooftopOwnerType.push(categoryLabels);
              }
            }
          });
        } else if (subcategory?.value) {
          const categoryLabels = rooftopOwnerTypeLabels[category];
          if (typeof categoryLabels === 'string') {
            rooftopOwnerType.push(categoryLabels);
          }
        }
      });



      const companyType: any[] = [];
      const companyTypeFormGroup = this.filterForm.get('companyType') as FormGroup;
      Object.keys(companyTypeFormGroup.controls).forEach(key => {
        if (companyTypeFormGroup.get(key)?.value) {
          companyType.push(companyTypeLabels[key as keyof typeof companyTypeLabels]);
        }
      });
      // console.log(companyType)
      let company_type = companyType.join(', ').replace(/%20/g, ' ')
      // let owner_type = ''
      let owner_type = rooftopOwnerType.join(', ').replace(/%20/g, ' ');
      // console.log(owner_type)
      let lead_Status = leadStatus.join(', ').replace(/%20/g, ' ')
      //   homeSearchFilter
      let order = "desc"

      let min = formValue.solarPowerGenerationMaxDone
      let max = formValue.solarPowerGenerationMinDone
      let min1 = formValue.solarPowerGenerationMaxNotDone
      let max1 = formValue.solarPowerGenerationMinNotDone
      if (this.solarInstallationStatus == 'Done') {
        this.isLoader=true;
        this.mapService.homeSearchFilterPagination(
          page,
          this.solarInstallationStatus,
          lead_Status,
          owner_type,
          formValue.solarPowerGenerationMaxDone,
          formValue.solarPowerGenerationMinDone,


          undefined,
          undefined,
          company_type,
          this.searchTerm,
          order

        ).subscribe(
          async (response: any) => {
            this.isLoader=false;
            //  this.totalItems = response.count;
            this.showNoRecordsTable = false
            //  this.pageSize = response.results.roof_data.length;
            this.roofData = response.results.roof_data;
            this.data = response.results.stats;

            //    if(response.results.stats.with_solar.highest_installed_capacity != 0)
            //    {
            //     this.highest = response.results.stats.with_solar.highest_installed_capacity

            //    this.options1 = {
            //      floor: 0,
            //      ceil: this.highest
            //    };
            //    this.filterForm.get('solarPowerGenerationDone')?.setValue([0, this.highest]);
            //  }
            //  if(response.results.stats.without_solar.highest_generation_potential != 0)
            //  {

            //   this.highest1 =  response.results.stats.without_solar.highest_generation_potential
            //    this.options2 = {
            //      floor: 0,
            //      ceil: this.highest1
            //    };

            //    this.filterForm.get('solarPowerGenerationNotDone')?.setValue([0,  this.highest1]);
            //  }

            if (this.roofData.length == 0) {
              this.showNoRecordsTable = true
            }

            // this.updatePagination();
            // this.paginateData();

          },
          (error: any) => {
            this.isLoader=false;
            console.error(error);
          }
        )
      }
      else if (this.solarInstallationStatus == 'Not Done') {
        this.isLoader=true;
        this.mapService.homeSearchFilterPagination(
          page,
          this.solarInstallationStatus,
          lead_Status,
          owner_type,
          undefined,
          undefined,
          formValue.solarPowerGenerationMaxNotDone,
          formValue.solarPowerGenerationMinNotDone,


          company_type,
          this.searchTerm,
          order

        ).subscribe(
          async (response: any) => {
            this.isLoader=false;
            //  this.totalItems = response.count;
            this.showNoRecordsTable = false
            //  this.pageSize = response.results.roof_data.length;
            this.roofData = response.results.roof_data;
            this.data = response.results.stats;
            //    if(response.results.stats.with_solar.highest_installed_capacity != 0)
            //    {
            //     this.highest = response.results.stats.with_solar.highest_installed_capacity

            //    this.options1 = {
            //      floor: 0,
            //      ceil: this.highest
            //    };
            //    this.filterForm.get('solarPowerGenerationDone')?.setValue([0, this.highest]);
            //  }
            //  if(response.results.stats.without_solar.highest_generation_potential != 0)
            //  {

            //   this.highest1 =  response.results.stats.without_solar.highest_generation_potential
            //    this.options2 = {
            //      floor: 0,
            //      ceil: this.highest1
            //    };

            //    this.filterForm.get('solarPowerGenerationNotDone')?.setValue([0,  this.highest1]);
            //  }

            if (this.roofData.length == 0) {
              this.showNoRecordsTable = true
            }

            // this.updatePagination();
            // this.paginateData();
          },
          (error: any) => {
            this.isLoader=false;
            console.error(error);
          }
        )
      } else {
        this.isLoader=true;
        this.mapService.homeSearchFilterPagination(
          page,
          this.solarInstallationStatus,
          lead_Status,
          owner_type,
          formValue.solarPowerGenerationMaxDone,
          formValue.solarPowerGenerationMinDone,
          formValue.solarPowerGenerationMaxNotDone,
          formValue.solarPowerGenerationMinNotDone,


          company_type,
          this.searchTerm,
          order
          

        ).subscribe(
          async (response: any) => {
            this.isLoader=false;
            //  this.totalItems = response.count;
            this.showNoRecordsTable = false
            //  this.pageSize = response.results.roof_data.length;
            this.roofData = response.results.roof_data;
            this.data = response.results.stats;

            //    if(response.results.stats.with_solar.highest_installed_capacity != 0)
            //    {
            //     this.highest = response.results.stats.with_solar.highest_installed_capacity

            //    this.options1 = {
            //      floor: 0,
            //      ceil: this.highest
            //    };
            //    this.filterForm.get('solarPowerGenerationDone')?.setValue([0, this.highest]);
            //  }
            //  if(response.results.stats.without_solar.highest_generation_potential != 0)
            //  {

            //   this.highest1 =  response.results.stats.without_solar.highest_generation_potential
            //    this.options2 = {
            //      floor: 0,
            //      ceil: this.highest1
            //    };

            //    this.filterForm.get('solarPowerGenerationNotDone')?.setValue([0,  this.highest1]);
            //  }

            if (this.roofData.length == 0) {
              this.showNoRecordsTable = true
            }

            // this.updatePagination();
            // this.paginateData();
          },
          (error: any) => {
            this.isLoader=false;
            console.error(error);
          }
        )
      }
    }
  }
  viewMapRoof(id: any) {
    localStorage.removeItem('searchTerm');

    this.router.navigate(['/pages/roofmap-details', id, 'home']);

    localStorage.setItem('searchTerm', this.searchTerm)
  }
  viewRoofDetails(id: any) {
    localStorage.removeItem('searchTerm');
    this.router.navigate(['/pages/view-roofmap-details', id, 'homeFilter']);
    localStorage.setItem('searchTerm', this.searchTerm)
  }
}