import { Component, OnInit, OnDestroy, AfterViewInit, Inject, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('firstNameInput') firstNameInput!: ElementRef;

  registerForm: FormGroup;
  isLoader: boolean = false;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authservice: AuthService,
    private router: Router,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2
  ) {
    this.registerForm = this.fb.group({
      first_name: ['', [Validators.required, Validators.minLength(2)]],
      last_name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[1-9][0-9]{9}$/)]],
    });
  }

  ngOnInit(): void {
    this.renderer.addClass(this.document.body, "login-img");
    this.renderer.removeClass(this.document.body, "app");
    this.renderer.removeClass(this.document.body, "ltr");
    this.renderer.removeClass(this.document.body, "sidebar-mini");
    this.renderer.removeClass(this.document.body, "light-mode");
    this.renderer.removeClass(this.document.body, "default-menu");
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.firstNameInput?.nativeElement.focus();
    }, 0);
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(this.document.body, "login-img");
    this.renderer.addClass(this.document.body, "app");
    this.renderer.addClass(this.document.body, "ltr");
    this.renderer.addClass(this.document.body, "sidebar-mini");
    this.renderer.addClass(this.document.body, "light-mode");
    this.renderer.addClass(this.document.body, "default-menu");
  }

  register() {
    if (this.registerForm.valid) {
      this.isLoader = true;
      const formData = this.registerForm.value;

      const data = {
        email: formData.email,
        first_name: formData.first_name,
        last_name: formData.last_name,
        user_type: 'Solar EPC User',
        mob_number: formData.phone,
      };

      this.authservice.completeSignup(data).subscribe(
        () => {
          this.isLoader = false;
          this.router.navigate(['auth/otp'], { state: { myData: formData.email } });
        },
        (error) => {
          this.isLoader = false;
          this.errorMessage = error;
          console.error(this.errorMessage);
        }
      );
    } else {
      this.errorMessage = 'Please fill all required Fields.';
    }
  }
}
