import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, Renderer2, AfterViewInit, ElementRef, ViewChild, Directive } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SearchService } from 'src/app/shared/services/search.service';

@Component({
  selector: 'app-signup-otp',
  templateUrl: './signup-otp.component.html',
  styleUrls: ['./signup-otp.component.scss']
})
export class SignupOtpComponent implements OnDestroy, AfterViewInit {
  @Directive({
    selector: '[autoFocus]'
  })

  @ViewChild('emailOtpInput') emailOtpInput!: ElementRef;
  @ViewChild('mobileOtpInput') mobileOtpInput!: ElementRef;
  private subscription: Subscription = new Subscription();
  active: any;
  myData: any;
  email: string = '';
  otp: string = '';
  nextStep = "email";
  isLoader: boolean = false;
  errorMessage: string = '';
  otpForm!: FormGroup;
  method: string = '';



  constructor(
    private route: ActivatedRoute,
    private mapService: SearchService,
    private authservice: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2, private el: ElementRef
  ) { }


  ngOnInit(): void {

    localStorage.setItem('Volghhorizontal', 'true');// Log the successful -horizontal menu bar
    this.otpForm = this.formBuilder.group({
      Otp: ['', [Validators.required]],
    });

    this.email = history.state.myData;
    this.method = history.state.method;

    this.renderer.addClass(this.document.body, "login-img");
    this.renderer.removeClass(this.document.body, "app");
    this.renderer.removeClass(this.document.body, "ltr");
    this.renderer.removeClass(this.document.body, "sidebar-mini");
    this.renderer.removeClass(this.document.body, "light-mode");
    this.renderer.removeClass(this.document.body, "default-menu");
  }



  // ngAfterViewInit(): void {
  //   setTimeout(() => {
  //     if (this.method === 'email' && this.emailOtpInput) {
  //       this.emailOtpInput.nativeElement.focus();
  //     } else if (this.method !== 'email' && this.mobileOtpInput) {
  //       this.mobileOtpInput.nativeElement.focus();
  //     }
  //   }, 100); // A small delay ensures the element is rendered
  // }

  ngAfterViewInit() {
    setTimeout(() => this.el.nativeElement.focus(), 100); // Small delay ensures focus works
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.renderer.removeClass(this.document.body, "login-img");
    this.renderer.addClass(this.document.body, "app");
    this.renderer.addClass(this.document.body, "ltr");
    this.renderer.addClass(this.document.body, "sidebar-mini");
    this.renderer.addClass(this.document.body, "light-mode");
    this.renderer.addClass(this.document.body, "default-menu");
  }

  clearErrorMessage() {
    this.errorMessage = '';
  }

  Submit() {
    const data = {
      "otp": this.otpForm.controls['Otp'].value,
      "email": this.email
    }
    this.isLoader = true;
    this.mapService.userotp(data).subscribe(
      async (response: any) => {
        this.isLoader = false;

        // Check the response to determine the next step
        if (response && response.next_step === 'Mobile verification') {
          this.nextStep = 'mobile';

          this.otpForm.controls['Otp'].setValue('');
        }
        if (response.next_step == 'Profile completion') {
          if (response.user_type == "Solar EPC User") {


            this.router.navigate(['/pages/homepage']);
          } else {


            this.router.navigate(['/pages/homepage']);
          }
        }
      },
      (error: any) => {
        this.isLoader = false;
        console.error('Error response:', error);
        this.errorMessage = error.error.Message; // Set the error message
      }
    );
  }

  goBack(): void {
    this.router.navigate(['/auth/login']);
  }
}
