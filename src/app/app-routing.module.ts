import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './authentication/login-page/login-page.component';
import { RegisterComponent } from './authentication/register/register.component';
import { ContentStyleComponent } from './shared/components/layouts/content-style/content-style.component';
import { ErrorStyleComponent } from './shared/components/layouts/error-style/error-style.component';
import { FullContentComponent } from './shared/components/layouts/full-content/full-content.component';
import { customcontent } from './shared/routes/custom-content-router';
import { errorcontent } from './shared/routes/error-content-router';
import { fullcontent } from './shared/routes/full-content-router';
import { SwitcherLayoutComponent } from './shared/components/layouts/switcher-layout/switcher-layout.component';
import { SwitcherOneRoute } from './shared/routes/switchers';
import { SignupOtpComponent } from './authentication/signup-otp/signup-otp.component';
import { LoginOtpComponent } from './authentication/login-otp/login-otp.component';
import { UserLoginComponent } from './authentication/user-login/user-login.component';
import { PagesModule } from './components/pages/pages.module';
import { SiteBuilderComponent } from './components/pages/site-builder/site-builder.component';
import { SiteBuilderTwoComponent } from './components/pages/site-builder-two/site-builder-two.component';
import { SiteBuilderMainComponent } from './components/pages/site-builder-main/site-builder-main.component';
const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  
  { path: 'auth/register', component: RegisterComponent },
  { path: 'auth/otp', component: SignupOtpComponent },
  { path: 'auth/loginotp', component: LoginOtpComponent },
  { path: 'auth/login', component: UserLoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  { path: ':companyId', component: SiteBuilderMainComponent },
  { path: '', component: FullContentComponent, children: fullcontent },
  { path: '', component: ErrorStyleComponent, children: errorcontent },
  { path: '', component: ContentStyleComponent, children: customcontent },
  {
    path: '',
    component: SwitcherLayoutComponent,
    children: SwitcherOneRoute
  },
  { path: '**', redirectTo: 'error/error404' },
];

@NgModule({
  imports: [[RouterModule.forRoot(routes, {
    anchorScrolling: 'enabled',
    scrollPositionRestoration: 'enabled'
  })],
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
