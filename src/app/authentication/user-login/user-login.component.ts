import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatError } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SearchService } from 'src/app/shared/services/search.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class UserLoginComponent implements OnInit {
  @ViewChild('errorElement', { static: false }) errorElementRef!: MatError;
  @ViewChild('emailInput')
  emailInput!: ElementRef;
  @ViewChild('mobileInput')
  mobileInput!: ElementRef;



  loginForm!: FormGroup;
  isLoader: boolean = false;
  userLoginError = { message: '' };
  errorMessage: string = '';
  version:string='';
  activeTab: string = 'email'; // Default active tab
  return: any;
  private focusSet = false; // Track if focus was already set



  constructor(
    private cdr: ChangeDetectorRef,
    private authservice: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^\d{10}$/)]],
    });
  }

  ngOnInit(): void {
    this.renderer.addClass(this.document.body, "login-img");
    this.renderer.removeClass(this.document.body, "app");
    this.versionData();
  }

  ngAfterViewInit(): void {
    this.setFocus();
  }

  ngAfterViewChecked(): void {
    if (!this.focusSet) {
      this.setFocus();
    }
  }

  setFocus(): void {
    setTimeout(() => {
      if (this.activeTab === 'email' && this.emailInput) {
        this.emailInput.nativeElement.focus();
      } else if (this.activeTab === 'mobile' && this.mobileInput) {
        this.mobileInput.nativeElement.focus();
      }
      this.focusSet = true; // Mark focus as set to prevent unnecessary re-execution
    }, 100); // Delay allows the DOM to fully update
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(this.document.body, "login-img");
    this.renderer.addClass(this.document.body, "app");
  }

  validateForm(): boolean {
    const email = this.loginForm.controls['email'].value;
    const mobile = this.loginForm.controls['mobile'].value;

    // Reset error message
    this.errorMessage = '';

    // Email validation
    if (this.activeTab === 'email') {
      if (!email) {
        this.errorMessage = 'Email is required';
        return false;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        this.errorMessage = 'Invalid Email format.';
        return false;
      }
    }

    // Mobile validation
    if (this.activeTab === 'mobile') {
      if (!mobile) {
        this.errorMessage = 'Mobile Number is required';
        return false;
      }
      const mobileRegex = /^\d{10}$/;
      if (!mobileRegex.test(mobile)) {
        this.errorMessage = 'Invalid Mobile Number';
        return false;
      }
      if (mobile === '0000000000') {
        this.errorMessage = "Mobile Number cannot be all 0's.";
        return false;
      }
      if (/^0{1,}/.test(mobile)) {
        this.errorMessage = "Mobile Number cannot start with 0's.";
        return false;
      }
    }

    return true;
  }

  onInput(): void {
    this.validateForm();
  }



  submit(): void {
    if (!this.validateForm()) {
      this.cdr.detectChanges();
      return;
    }

    const loginData =
      this.activeTab === 'email'
        ? { email: this.loginForm.controls['email'].value }
        : { mob_number: this.loginForm.controls['mobile'].value };

    this.isLoader = true;
    this.authservice.userlogin(loginData).subscribe(
      (response: any) => {
        this.isLoader = false;
        this.router.navigate(['auth/loginotp'], {
          state: {
            myData: this.loginForm.controls[this.activeTab].value,
            method: this.activeTab,
          },
        });
      },
      (error: any) => {
        this.userLoginError.message = error.error?.Message || 'Login failed.';
        this.isLoader = false;
        this.cdr.detectChanges();
      }
    );
  }

  radioChange(change: string): void {
    //this.activeTab = value;
    this.focusSet = false; // Allow focus to be reset
    this.activeTab = change;
    this.loginForm.reset(); // Clear the form inputs
    this.errorMessage = ''; // Clear error messages
    this.userLoginError.message = ''; // Clear login error message
  }

  versionData(): void {
    this.authservice.ViewversionData().subscribe({
      next: (data: any) => {
        this.version =data.version; 
      },
      error: (error) => {
        console.error('Error fetching version data:', error);
      }
    });
  }
}
