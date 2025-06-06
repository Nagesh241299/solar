import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileTabService } from 'src/app/shared/services/profile-tab.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss'],
})
export class ConfigurationComponent implements OnInit {
  configurationForm: FormGroup;
  photoPreview: string | ArrayBuffer | null = null;
  selectedColor: { primary: string, secondary: string } | null = null; // Updated type
  selectedColor1: string = '#333';
  isEditMode: boolean = false;
  isLoader: boolean = false;
  editingConfigId: string | null = null;
  selectTemplateArray: any = ['Dark Theme', 'Light Theme'];
  originalUsername: string = '';
  url: string = '';
  inverterArray: any = [];
  moduleArray: any = [];
  inverterArrays: any = [];
  moduleArrays: any = [];
  lightningArrays: any = [];
  unidirectionArrays: any =[];
  bidirectionArrays: any = [];
  accableArrays:any = [];
  dccableArrays: any =[];
  acdbArrays : any = [];
  dcdbArrays : any =[];
  mc4Arrays : any =[];
  SignageArrays: any =[];

  selectionOneOnly: boolean = false;
  configId: any;
  selectionErrorMessage: string ='';
  moduleErrorMessage: string ='';
  moduleOneOnly: boolean =false;
  selectionLimitReached = false;
  
  moduleSelectionLimitReached = false;

  // Color options for different themes
  lightThemeColors = [
    { primary: '#32C36C', secondary: '#1A2A36' }, // Green & Black
    { primary: '#3D72FC', secondary: '#180E3C' }  // Blue & Black
  ];

  darkThemeColors = [
    { primary: '#FF5531', secondary: '#161616' }, // Orange & Black
    { primary: '#3D72FC', secondary: '#161616' }, // Blue & Black
    { primary: '#1DF791', secondary: '#161616' }  // Neon Green & Black
  ];

  availableColors: any[] = [];

  constructor(private fb: FormBuilder, private profile: ProfileTabService, private router: Router) {
    this.configurationForm = this.fb.group({
      username: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9-_]+$/)]],
      select_template: ['', Validators.required],
      primary_color: [this.selectedColor?.primary || '#ff5531', Validators.required], // Updated default value
      secondary_color: [this.selectedColor?.secondary || '#333', Validators.required],// Updated default value
      preferred_modules: ['', Validators.required],
      preferred_inverter: ['', Validators.required],
      preferred_ac_cable:['', Validators.required],
      preferred_dc_cable: ['', Validators.required],
      preferred_acdb: ['', Validators.required],
      preferred_dcdb: ['', Validators.required],
      preferred_mc4: ['', Validators.required],
      preferred_signage: ['', Validators.required],
      preferred_uni_meter: ['', Validators.required],
      preferred_bi_meter: ['', Validators.required],
      preferred_lightning_arrestors: ['', Validators.required],
      shadow_free_area: ['80', Validators.required],
      generation_per_year: ['1250', Validators.required],
      degradation_per_year: ['0.8', Validators.required]
    });
  }

  ngOnInit(): void {
    this.fetchConfigurationData();
    this.preferredModuleInverterList();

    this.configurationForm.get('preferred_inverter')?.valueChanges.subscribe((selectedOptions) => {
      this.limitSelection(selectedOptions);
    });

    this.configurationForm.get('preferred_modules')?.valueChanges.subscribe((selectedModules) => {
      this.limitModuleSelection(selectedModules);
    });
  }

  fetchConfigurationData() {
    this.isLoader = true;
    this.profile.getConfigurationById().subscribe({
      next: (data: any) => {
        this.isLoader = false;

        if (data?.data) {
          const config = data.data;
          this.isEditMode = true;
          this.configId = config.id;

          // Patch form values
          this.configurationForm.patchValue({
            username: data.data.username,
            primary_color: data.data.primary_color,
            secondary_color: data.data.secondary_color,
            select_template: data.data.select_template, // Default to 'Dark Theme' if empty
            preferred_modules: data.data.preferred_modules ? data.data.preferred_modules.split(",") : [],
            preferred_inverter: data.data.preferred_inverter ? data.data.preferred_inverter.split(",") : [],
            preferred_ac_cable: data.data.preferred_ac_cable ? data.data.preferred_ac_cable.split(",") : [],
            preferred_dc_cable: data.data.preferred_dc_cable ? data.data.preferred_dc_cable.split(",") : [],
            preferred_acdb: data.data.preferred_acdb ? data.data.preferred_acdb.split(",") : [],
            preferred_dcdb: data.data.preferred_dcdb ? data.data.preferred_dcdb.split(",") : [],
            preferred_mc4: data.data.preferred_mc4 ? data.data.preferred_mc4.split(",") : [],
            preferred_signage: data.data.preferred_signage? data.data.preferred_signage.split(",") :[],
            preferred_uni_meter: data.data.preferred_uni_meter ? data.data.preferred_uni_meter.split(",") : [],
            preferred_bi_meter : data.data.preferred_bi_meter ? data.data.preferred_bi_meter.split(",") : [],
            preferred_lightning_arrestors : data.data.preferred_lightning_arrestors ? data.data.preferred_lightning_arrestors.split(",") : [],
            shadow_free_area: data.data.shadow_free_area,
            generation_per_year: data.data.generation_per_year,
            degradation_per_year: data.data.degradation_per_year


  
          });

          // Set the username and URL
          if (config.username) {
            this.originalUsername = config.username;
            this.generateURL(config.username);
          }

          // Set the selected theme and colors
          const selectedTheme = config.select_template || 'Dark Theme'; // Default to 'Dark Theme' if empty
          this.configurationForm.patchValue({ select_template: selectedTheme });

          // Update available colors based on the selected theme
          this.updateColors(selectedTheme);

          // Set the selected colors from the API response
          if (config.primary_color && config.secondary_color) {
            this.selectedColor = { primary: config.primary_color, secondary: config.secondary_color };
            this.configurationForm.patchValue({
              primary_color: config.primary_color,
              secondary_color: config.secondary_color
            });
          }

          // Set the photo preview if available
          this.photoPreview = config.logo || null;
        } else {
          // If API returns empty data, set default values
          this.isEditMode = false;
          this.configurationForm.reset({
            select_template: 'Dark Theme', // Default to 'Dark Theme'
            primary_color: '#ff5531', // Default primary color
            secondary_color: '#333',
            generation_per_year: 1250,    // Preserve default
            degradation_per_year: 0.8,
            shadow_free_area: 80,
              
          });

          // Update available colors for Dark Theme
          this.updateColors('Dark Theme');

          // Clear URL if no username
          this.generateURL(null);
        }
      },
      error: () => {
        this.isLoader = false;
        this.showError('Failed to fetch configuration.');
      }
    });
  }


  preferredModuleInverterList() {
    this.profile.getListPreferredModuleInverter().subscribe(
      (response: any) => {
        this.inverterArrays = response.preferred_inverter;
        this.moduleArrays = response.preferred_modules;
        this.accableArrays = response.preferred_ac_cable;
        this.dccableArrays = response.preferred_dc_cable;
        this.acdbArrays = response.preferred_acdb;
        this.dcdbArrays = response.preferred_dcdb;
        this.mc4Arrays = response.preferred_mc4;
        this.SignageArrays = response.preferred_signage;
        this.unidirectionArrays = response.preferred_uni_direction;
        this.bidirectionArrays = response.preferred_bi_direction;
        this.lightningArrays = response.preferred_lightning_arestors;

      },
      (error: any) => this.showError(error.error.message || 'Something went wrong. Please try again.')
    );

  }

  
  // Update your limitSelection method
limitSelection(selectedOptions: any[]) {
  this.selectionLimitReached = false;
  this.selectionOneOnly = false;

  if (selectedOptions.length === 1) {
    this.selectionOneOnly = true;
    this.selectionErrorMessage = 'Please select two inverters';
    // Don't auto-hide this message - keep it until user action
  } 
  else if (selectedOptions.length > 2) {
    this.selectionLimitReached = true;
    this.selectionErrorMessage = 'You can only select up to two inverters';
    const limitedSelection = selectedOptions.slice(0, 2);
    this.configurationForm.get('preferred_inverter')?.setValue(limitedSelection, { emitEvent: false });
    
    // Auto-hide after 3 seconds since it's a temporary state
    setTimeout(() => {
      this.selectionLimitReached = false;
    }, 3000);
  }
  else {
    // When exactly 2 are selected, clear any errors
    this.selectionOneOnly = false;
    this.selectionLimitReached = false;
  }
}

// Update your limitModuleSelection method
limitModuleSelection(selectedModules: any[]) {
  this.moduleSelectionLimitReached = false;
  this.moduleOneOnly = false; // Add this property to your class

  if (selectedModules.length === 1) {
    this.moduleOneOnly = true;
    this.moduleErrorMessage = 'Please select two modules';
    // Don't auto-hide this message
  } 
  else if (selectedModules.length > 2) {
    this.moduleSelectionLimitReached = true;
    this.moduleErrorMessage = 'You can only select up to two modules';
    const limitedSelection = selectedModules.slice(0, 2);
    this.configurationForm.get('preferred_modules')?.setValue(limitedSelection, { emitEvent: false });
    
    // Auto-hide after 3 seconds
    setTimeout(() => {
      this.moduleSelectionLimitReached = false;
    }, 3000);
  }
  else {
    // When exactly 2 are selected, clear any errors
    this.moduleOneOnly = false;
    this.moduleSelectionLimitReached = false;
  }
}
  

  generateURL(username: string | null) {
    if (username) {
      const domainName = window.location.origin;
      this.url = `${domainName}/${username}`;
    } else {
      this.url = ''; // Clear the URL if username is not available
    }
  }

  onPhotoUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const file = input.files[0];
      this.configurationForm.patchValue({ logo: file });

      const reader = new FileReader();
      reader.onload = (e) => (this.photoPreview = e.target?.result || null);
      reader.readAsDataURL(file);
    }
  }

  configFormSubmit() {
    // First check form validity
    if (this.configurationForm.invalid) {
      this.configurationForm.markAllAsTouched();
      return;
    }
  
    // Validate inverter and module selections
    const inverterSelection = this.configurationForm.get('preferred_inverter')?.value || [];
    const moduleSelection = this.configurationForm.get('preferred_modules')?.value || [];
  
    // Check for inverters
    if (inverterSelection.length !== 2) {
      this.selectionOneOnly = inverterSelection.length === 1;
      this.selectionLimitReached = inverterSelection.length > 2;
      this.selectionErrorMessage = inverterSelection.length === 1 
        ? 'Please select two inverters' 
        : 'You must select exactly two inverters';
      return;
    }
  
    // Check for modules
    if (moduleSelection.length !== 2) {
      this.moduleOneOnly = moduleSelection.length === 1;
      this.moduleSelectionLimitReached = moduleSelection.length > 2;
      this.moduleErrorMessage = moduleSelection.length === 1 
        ? 'Please select two modules' 
        : 'You must select exactly two modules';
      return;
    }
  
    // If all validations pass, proceed with submission
    this.isLoader = true;
    const username = this.configurationForm.value.username.toLowerCase();
  
    const requestBody = {
      username: username,
      primary_color: this.configurationForm.value.primary_color || this.selectedColor?.primary || '#ff5531',
      secondary_color: this.configurationForm.value.secondary_color || this.selectedColor?.secondary || '#333',
      select_template: this.configurationForm.value.select_template,
      preferred_modules: this.arrayToString(this.configurationForm.value.preferred_modules),
      preferred_inverter: this.arrayToString(this.configurationForm.value.preferred_inverter),
      preferred_ac_cable: this.arrayToString(this.configurationForm.value.preferred_ac_cable),
      preferred_dc_cable: this.arrayToString(this.configurationForm.value.preferred_dc_cable),
      preferred_acdb: this.arrayToString(this.configurationForm.value.preferred_acdb),
      preferred_dcdb: this.arrayToString(this.configurationForm.value.preferred_dcdb),
      preferred_mc4: this.arrayToString(this.configurationForm.value.preferred_mc4),
      preferred_signage: this.arrayToString(this.configurationForm.value.preferred_signage),
      preferred_uni_meter: this.arrayToString(this.configurationForm.value.preferred_uni_meter),
      preferred_bi_meter: this.arrayToString(this.configurationForm.value.preferred_bi_meter),
      preferred_lightning_arrestors: this.arrayToString(this.configurationForm.value.preferred_lightning_arrestors),
      shadow_free_area: this.configurationForm.value.shadow_free_area,
      generation_per_year: this.configurationForm.value.generation_per_year,
      degradation_per_year: this.configurationForm.value.degradation_per_year
    
    };
  
    if (this.isEditMode && this.originalUsername !== username) {
      this.checkUsernameAndProceed(username, requestBody);
    } else if (!this.isEditMode) {
      this.checkUsernameAndProceed(username, requestBody);
    } else {
      this.submitConfiguration(requestBody);
    }
  }
  
  // Helper method to convert arrays to comma-separated strings
  private arrayToString(value: any): string {
    return Array.isArray(value) ? value.join(',') : (value || '');
  }

  checkUsernameAndProceed(username: string, requestBody: any) {
    this.profile.checkUsernameAvailability({ username }).subscribe(
      (response: any) => {
        if (response.flag) {
          this.showError('Username already exists. Please choose another.');
        } else {
          this.submitConfiguration(requestBody);
        }
      },
      () => this.showError('Error checking username availability.')
    );
  }

  submitConfiguration(requestBody: any) {

    if (this.isEditMode == false) {
      this.profile.SaveConfiguration(requestBody).subscribe(
        (response: any) => {
          this.isLoader = false;
          if (response.status === 'success') {
            this.handleSuccessResponse(response);
            this.fetchConfigurationData();
          }
        },
        (error: any) => this.showError(error.error.message || 'Something went wrong. Please try again.')
      );
    }


    else if (this.isEditMode == true) {

      if (this.configurationForm.invalid) {
        this.configurationForm.markAllAsTouched();
        return
      }
      this.profile.updateProfileConfiguration(requestBody, this.configId).subscribe(
        (response: any) => {
          this.isLoader = false;
          if (response.status === 'success') {
            this.handleSuccessResponse(response);
          }
        },
        (error: any) => this.showError(error.error.message || 'Something went wrong. Please try again.')
      );
    }
  }



  handleSuccessResponse(response: any) {

    this.selectionLimitReached = false;
    this.moduleSelectionLimitReached = false;
    const successMessage = this.isEditMode ? 'Configuration updated successfully' : 'Configuration added successfully';

    if (response.data?.id) {
      this.isEditMode = true;
    }

    Swal.fire({
      icon: 'success',
      title: 'Success',
      html: successMessage,
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false,
    });

    if (response.data?.username) {
      this.originalUsername = response.data.username;
      this.generateURL(response.data.username); // Update URL
    }

    this.configurationForm.patchValue({
      username: response.data.username,
      primary_color: response.data.primary_color,
      secondary_color: response.data.secondary_color,
      select_template: response.data.select_template,
      preferred_modules: response.data.preferred_modules ? response.data.preferred_modules.split(",") : [],
      preferred_inverter: response.data.preferred_inverter ? response.data.preferred_inverter.split(",") : [],
      preferred_ac_cable: response.data.preferred_ac_cable ? response.data.preferred_ac_cable.split(",") : [],
      preferred_dc_cable: response.data.preferred_dc_cable ? response.data.preferred_dc_cable.split(",") : [],
      preferred_acdb: response.data.preferred_acdb ? response.data.preferred_acdb.split(",") : [],
      preferred_dcdb: response.data.preferred_dcdb ? response.data.preferred_dcdb.split(",") : [],
      preferred_mc4: response.data.preferred_mc4 ? response.data.preferred_mc4.split(",") : [],
      preferred_signage: response.data.preferred_signage ? response.data.preferred_signage.split(",") : [],
      preferred_uni_meter: response.data.preferred_uni_meter ? response.data.preferred_uni_meter.split(",") : [],
      preferred_bi_meter: response.data.preferred_bi_meter ? response.data.preferred_bi_meter.split(",") : [],
      preferred_lightning_arrestors: response.data.preferred_lightning_arrestors ? response.data.preferred_lightning_arrestors.split(",") : [],
      shadow_free_area: response.data.shadow_free_area,
      generation_per_year: response.data.generation_per_year,
      degradation_per_year: response.data.degradation_per_year
    });

    this.photoPreview = response.data.logo || null;
  }

  showError(message: string) {
    this.isLoader = false;
    Swal.fire({
      icon: 'error',
      title: 'Error',
      html: message,
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false,
    });
  }

  cancelBasicForm() {
    this.router.navigate(['/pages/homepage']);
    this.generateURL(null); // Clear URL
  }

  copyToClipboard(event: Event, text: string) {
    event.preventDefault(); // Prevent the default form submission behavior

    navigator.clipboard.writeText(text).then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Copied!',
        text: 'Configuration URL copied successfully.',
        timer: 1500,
        timerProgressBar: true,
        showConfirmButton: false
      });
    }).catch(err => {
      console.error('Failed to copy:', err);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to copy the URL. Please try again.',
        timer: 1500,
        timerProgressBar: true,
        showConfirmButton: false
      });
    });
  }

  updateColors(eventOrTheme: Event | string) {
    let selectedTheme: string;

    if (typeof eventOrTheme === 'string') {
      // If the argument is a string, use it directly
      selectedTheme = eventOrTheme;
    } else {
      // If the argument is an Event, extract the value from the target
      selectedTheme = (eventOrTheme.target as HTMLSelectElement).value;
    }

    // Update available colors based on the selected theme
    this.availableColors = selectedTheme === 'Dark Theme' ? this.darkThemeColors : this.lightThemeColors;

    // Select the first color by default
    if (this.availableColors.length > 0) {
      const firstColor = this.availableColors[0];
      this.selectColor(firstColor);
    }

    // Update the form value for the selected theme
    this.configurationForm.patchValue({ select_template: selectedTheme });
  }

  // Method to select a color
  selectColor(color: { primary: string, secondary: string }) {
    this.selectedColor = color;
    this.configurationForm.patchValue({
      primary_color: color.primary,
      secondary_color: color.secondary
    });
  }

  
}