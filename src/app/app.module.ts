import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { ColorPickerService, ColorPickerModule } from 'ngx-color-picker';
import { MaterialModuleModule } from 'src/app/material-module/material-module.module';
import { StoreModule } from '@ngrx/store';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { LoginPageComponent } from './authentication/login-page/login-page.component';
import { RegisterComponent } from './authentication/register/register.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { dataReaducer } from './shared/ngrx/e-commerce/shop.reducers';
import { BarRatingModule } from 'ngx-bar-rating';
import { OverlayModule } from "@angular/cdk/overlay";
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { GoogleMapsModule } from '@angular/google-maps';
import { UserLoginComponent } from './authentication/user-login/user-login.component';
import { LoginOtpComponent } from './authentication/login-otp/login-otp.component';
import { SignupOtpComponent } from './authentication/signup-otp/signup-otp.component';
import { TokenInterceptor } from './shared/services/token-interceptor.interceptor';
import { QRCodeComponent } from 'angularx-qrcode';


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegisterComponent,
    UserLoginComponent,
    LoginOtpComponent,
    SignupOtpComponent,

  ],
  imports: [
    BrowserModule,
    GoogleMapsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRadioModule,
    MatInputModule,
    MatTableModule,
    NgbModule,
    SharedModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    ColorPickerModule,
    FormsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    MaterialModuleModule,
    StoreModule.forRoot({ data: dataReaducer }),
    BarRatingModule,
    OverlayModule,
    GoogleMapsModule,
    QRCodeComponent,

  ],
  providers: [ColorPickerService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true // Allows chaining of multiple interceptors
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }