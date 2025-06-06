import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Retrieve the token from localStorage
    const token = localStorage.getItem('token');

    // ✅ Skip Authorization header for public APIs like OpenWeatherMap
    const isPublicApi = req.url.includes('openweathermap.org');


    // Clone the request to add the Authorization header if the token exists
    let authReq = req;
    if (token && !isPublicApi) {
      authReq = req.clone({
        setHeaders: {
          Authorization: `Token ${token}`
        }
      });
    }

    // Pass the cloned request to the next handler and handle errors
    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Redirect to the login page when the token is invalid
          localStorage.removeItem('token'); // Optionally clear the token
          this.router.navigate(['auth/login']);
        }
        // Re-throw the error so it can be handled elsewhere if needed
        return throwError(error);
      })
    );
  }
}

