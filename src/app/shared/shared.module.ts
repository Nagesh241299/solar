import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoaderComponent } from './components/loader/loader.component';
import { NotificationSidemenuComponent } from './components/notification-sidemenu/notification-sidemenu.component';
import { HeaderBreadcrumbComponent } from './components/header-breadcrumb/header-breadcrumb.component';
import { SidemenuComponent } from './components/sidemenu/sidemenu.component';
import { FullContentComponent } from './components/layouts/full-content/full-content.component';
import { ErrorStyleComponent } from './components/layouts/error-style/error-style.component';
import { ContentStyleComponent } from './components/layouts/content-style/content-style.component';
import { RouterModule } from '@angular/router';
import { SwitcherComponent } from './components/switcher/switcher.component';
import { SwitcherLayoutComponent } from './components/layouts/switcher-layout/switcher-layout.component';
import { ToggleThemeDirective } from './directives/toggle-theme.directive';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FullscreenDirective } from './directives/fullscreen-toggle.directive';
import { TabToTopComponent } from './components/tab-to-top/tab-to-top.component';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidemenuToggleDirective } from './directives/sidemenuToggle';
import { HeaderSwitcherComponent } from './components/header-switcher/header-switcher.component';
import { NgxColorsModule } from 'ngx-colors';
import { ElementCardHeaderComponent } from './components/element-card-header/element-card-header.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LoaderComponent,
    NotificationSidemenuComponent,
    HeaderBreadcrumbComponent,
    SidemenuComponent,
    FullContentComponent, ErrorStyleComponent, ContentStyleComponent,
    FullscreenDirective,
    TabToTopComponent,
    SwitcherComponent,
    HeaderSwitcherComponent,
    SwitcherLayoutComponent,
    ToggleThemeDirective,
    SidemenuToggleDirective,
    ElementCardHeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    NgScrollbarModule,
    NgxColorsModule,
    FormsModule,
    ReactiveFormsModule,
  ],

  exports: [
    FullContentComponent, ErrorStyleComponent, ContentStyleComponent,
    HeaderBreadcrumbComponent,
    TabToTopComponent,
    LoaderComponent,
    SwitcherLayoutComponent]
})
export class SharedModule { }
