import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { envDetails } from 'src/config/env.utils';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = envDetails.apiUrl;
  authState: any = null;
  private loggedIn = false;
  constructor(private afu: AngularFireAuth, private router: Router, private http: HttpClient) {
    this.afu.authState.subscribe(((auth) => {
      this.authState = auth;
    }));
  }

  // all firebase getdata functions

  get isUserAnonymousLoggedIn(): boolean {
    return (this.authState !== null) ? this.authState.isAnonymous : false;
  }

  get currentUserId(): string {
    return (this.authState !== null) ? this.authState.uid : '';
  }

  get currentUserName(): string {
    return this.authState['email'];
  }

  get currentUser() {
    return (this.authState !== null) ? this.authState : null;
  }

  get isUserEmailLoggedIn(): boolean {
    if ((this.authState !== null) && (!this.isUserAnonymousLoggedIn)) {
      return true;
    } else {
      return false;
    }
  }

  registerWithEmail(email: string, password: string) {
    return this.afu.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user;
      })
      .catch((_error: string) => {
        console.log(_error);
        throw _error;
      });
  }
  isLoggedIn(): boolean {
    let val = localStorage.getItem('user')
    this.loggedIn = val == '' ? false : true;
    return this.loggedIn;
  }

  navigateToUserRoof() {
    this.router.navigate(['pages/auth/userroof']);
  }
  navigateToCompanyInfo() {
    this.router.navigate(['pages/auth/company-info']);
  }
  navigateToMyRoof() {
    this.router.navigate(['pages/auth/my-roof']);
  }

  userlogin(email: any) {
    const url = `${this.baseUrl}/instaroof/user/login/`;
    // const url = `${this.baseUrl}/djoser_custom/api/user/login/otp/`;
    console.log(email)
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });
    this.loggedIn = true;
    return this.http.post(url, email, { headers });
  }
  completeSignup(company: any) {
    const url = `${this.baseUrl}/instaroof/user/signup/`;
    // const url = `${this.baseUrl}/djoser_custom/api/user/signup/`;
    this.loggedIn = true;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.post(url, company, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An error occurred. Please try again later.';

        if (error.status === 400) {
          if (error.error && error.error.email && !error.error.mob_number) {
            errorMessage = 'User already exists with this email.';
          } else if (error.error && error.error.mob_number && !error.error.email) {
            errorMessage = 'User already exists with this phone number.';
          } else {
            errorMessage = 'User already exists with this email or phone number.';
          }
        }

        return throwError(errorMessage);
      })
    );
  }
  loginWithEmail(email: string, password: string) {
    return this.afu.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user;
      })
      .catch((_error: string) => {
        console.log(_error);
        throw _error;
      });
  }
  getHomePageData() {

    const url = `${this.baseUrl}/instaroof/roof-top-data/all-statistics/`;

    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.get(url, { headers });
  }

  ViewversionData() {

    const url = `${this.baseUrl}/instaroof/version/control/latest/`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    });

    return this.http.get(url, { headers });
  }


}
