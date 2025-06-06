import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgbModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { GalleryModule } from '@ks89/angular-modal-gallery';
import { NgSelectModule } from '@ng-select/ng-select';
import { ColorPickerModule } from 'ngx-color-picker';
import { SwitcherComponent } from './switcher/switcher.component';
import { NgxEditorModule } from 'ngx-editor';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CountUpModule } from "ngx-countup";
import { NotificationListComponent } from './notification-list/notification-list.component';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { CustomPagesModule } from './custom-pages/custom-pages.module';
import { ErrorPagesModule } from './error-pages/error-pages.module';
import { BlogPagesModule } from './blog-pages/blog-pages.module';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgxColorsModule } from 'ngx-colors';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NgxSliderModule } from 'ngx-slider-v2';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

// import { UserLoginComponent } from './authentication/user-login/user-login.component';
// import { LoginOtpComponent } from './authentication/login-otp/login-otp.component';
import { MatTooltipModule } from '@angular/material/tooltip'; // Import MatTooltipModule
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { HomePageComponent } from './home-page/home-page.component';
import { MyRoofComponent } from './my-roof/my-roof.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { ToastrModule } from 'ngx-toastr';
import { AddEditMyRoofComponent } from './add-edit-my-roof/add-edit-my-roof.component';
import { AddEditReminderComponent } from './add-edit-reminder/add-edit-reminder.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgChartsModule } from 'ng2-charts';
import { NgxEchartsModule } from 'ngx-echarts';
import { ChartistModule } from 'ng-chartist';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMomentDatetimeModule } from '@mat-datetimepicker/moment';
import { MatCalendar } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatDatetimepickerModule, MatNativeDatetimeModule } from "@mat-datetimepicker/core";
import { CreditPointsHistoryComponent } from './credit-points-history/credit-points-history.component';
import { ViewMyLeadsComponent } from './view-my-leads/view-my-leads.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { PastProjectsComponent } from './past-projects/past-projects.component';
import { ProposalsComponent } from './proposals/proposals.component';
import { AddEditProposalsComponent } from './add-edit-proposals/add-edit-proposals.component';
import { ProfileTabComponent } from './profile-tab/profile-tab.component';
import { BuilderComponent } from './boq-builder/builder/builder.component';
import { ListingComponent } from './boq-builder/listing/listing.component';
import { ProfileTabServicesComponent } from './profile-tab-services/profile-tab-services.component';
import { TeamMembersComponent } from './team-members/team-members.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { BuilderEditComponent } from './boq-builder/builder-edit/builder-edit.component';
import { ProposalTemplateComponent } from './proposal-template/proposal-template.component';
import { SiteBuilderComponent } from './site-builder/site-builder.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { QRCodeComponent } from 'angularx-qrcode';
import { SiteBuilderTwoComponent } from './site-builder-two/site-builder-two.component';
import { SiteBuilderMainComponent } from './site-builder-main/site-builder-main.component';

@NgModule({
  declarations: [
    AddEditMyRoofComponent,
    HomePageComponent,
    MyRoofComponent,
    SwitcherComponent,
    NotificationListComponent,
    AddEditReminderComponent,
    CreditPointsHistoryComponent,
    ViewMyLeadsComponent,
    PastProjectsComponent,
    ProposalsComponent,
    AddEditProposalsComponent,
    ProfileTabComponent,
    BuilderComponent,
    ListingComponent,
    ProfileTabServicesComponent,
    TeamMembersComponent,
    TestimonialsComponent,
    BuilderEditComponent,
    ProposalTemplateComponent,
    SiteBuilderComponent,
    ConfigurationComponent,
    SiteBuilderTwoComponent,
    SiteBuilderMainComponent
  ],
  imports: [
    CommonModule,
    NgxSliderModule,
    MatTooltipModule,
    MatSelectModule,
    GoogleMapsModule,
    MatCardModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    LeafletModule,
    MatDatepickerModule,
    MatDatetimepickerModule,
    MatNativeDatetimeModule,
    MatMomentDateModule,
    MatMomentDatetimeModule,
    MatNativeDateModule,
    ToastrModule.forRoot(),
    MatFormFieldModule,
    MatRadioModule,
    MatInputModule,
    MatSelectModule,
    PagesRoutingModule,
    SharedModule,
    ECommerceModule,
    CustomPagesModule,
    ErrorPagesModule,
    MatAutocompleteModule,
    BlogPagesModule,
    NgbModule,
    GalleryModule,
    NgSelectModule,
    ColorPickerModule,
    NgxEditorModule,
    NgxDropzoneModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDropdownModule,
    CountUpModule,
    AngularEditorModule,
    NgxColorsModule,
    NgApexchartsModule,
    NgChartsModule,
    QRCodeComponent,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
    ChartistModule
  ],
  providers: [

  ]
})
export class PagesModule { }
