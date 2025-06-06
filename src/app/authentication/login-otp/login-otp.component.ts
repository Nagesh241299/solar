import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Inject, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SearchService } from 'src/app/shared/services/search.service';
@Component({
  selector: 'app-login-otp',
  templateUrl: './login-otp.component.html',
  styleUrls: ['./login-otp.component.scss']
})
export class LoginOtpComponent implements AfterViewInit, OnDestroy {
  @ViewChild('emailOtpInput') emailOtpInput!: ElementRef;
  @ViewChild('mobileOtpInput') mobileOtpInput!: ElementRef;

  active: any;
  myData: any;
  email: string = '';
  method: string = '';
  errorMessage: string = '';
  otp: string = '';

  isLoader: boolean = false;
  public otpForm!: FormGroup;
  public error: any = '';

  constructor(
    private route: ActivatedRoute,
    private mapService: SearchService,
    private authservice: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.otpForm = this.formBuilder.group({
      Otp: ['', [Validators.required]]
    });

    this.email = history.state.myData;
    this.method = history.state.method;

    // Apply body classes
    this.renderer.addClass(this.document.body, "login-img");
    this.renderer.removeClass(this.document.body, "app");
    this.renderer.removeClass(this.document.body, "ltr");
    this.renderer.removeClass(this.document.body, "sidebar-mini");
    this.renderer.removeClass(this.document.body, "light-mode");
    this.renderer.removeClass(this.document.body, "default-menu");
  }

  ngAfterViewInit(): void {
    this.setFocus();
  }

  setFocus(): void {
    setTimeout(() => {
      if (this.method == 'email' && this.emailOtpInput) {
        this.emailOtpInput.nativeElement.focus();
      } else if (this.method != 'email' && this.mobileOtpInput) {
        this.mobileOtpInput.nativeElement.focus();
      }
    }, 100); // Small delay to ensure element is rendered
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(this.document.body, "login-img");
    this.renderer.addClass(this.document.body, "app");
    this.renderer.addClass(this.document.body, "ltr");
    this.renderer.addClass(this.document.body, "sidebar-mini");
    this.renderer.addClass(this.document.body, "light-mode");
    this.renderer.addClass(this.document.body, "default-menu");
  }

  get form() {
    return this.otpForm.controls;
  }
  Submit() {
    if (this.method == 'email') {
      this.isLoader = true;
      const data = {
        "otp": this.otp,
        "email": this.email
      }

      // console.log(data)
      this.mapService.userotp(data).subscribe(
        (response: any) => {
          this.isLoader = false;
          // console.log(response)
          // console.log('sucessful' + response['user_type']);
          localStorage.setItem('Volghhorizontal', 'true');
          if (response['user_type'] == "Solar EPC User") {
            this.router.navigate(['/pages/homepage']);
          }
          else if (response['user_type'] == "User") {
            this.router.navigate(['/pages/myroof']);
          }
          else if (response['user_type'] == "Admin") {
            this.router.navigate(['/pages/homepage']);
          }
        },
        (error: any) => {
          console.error('Error response:', error.error.Message); // Log the error message
          this.isLoader = false;
          this.errorMessage = error.error.Message; // Set the error message for display
        }
      );
    }
    else {
      this.isLoader = true;
      const data = {
        "otp": this.otp,
        "mob_number": this.email
      }
      // console.log(data)
      this.mapService.userotp(data).subscribe(
        (response: any) => {
          this.isLoader = false;
          // console.log('sucessful' + response['user_type']);
          localStorage.setItem('Volghhorizontal', 'true');// Log the successful response, if any
          if (response['user_type'] == "Solar EPC User") {
            this.router.navigate(['/pages/homepage']);
          }
          else if (response['user_type'] == "User") {
            this.router.navigate(['/pages/myroof']);
          }
          else if (response['user_type'] == "Admin") {
            this.router.navigate(['/pages/homepage']);
          }
        },
        (error: any) => {
          console.error('Error response:', error.error.Message); // Log the error message
          this.isLoader = false;
          this.errorMessage = error.error.Message; // Set the error message for display
        }
      );
    }
  }
}
