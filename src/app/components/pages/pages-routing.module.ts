import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyRoofComponent } from './my-roof/my-roof.component';
import { NotificationListComponent } from './notification-list/notification-list.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AuthGuard } from 'src/app/auth.guard';
import { AddEditMyRoofComponent } from './add-edit-my-roof/add-edit-my-roof.component';
import { AddEditReminderComponent } from './add-edit-reminder/add-edit-reminder.component';
import { CreditPointsHistoryComponent } from './credit-points-history/credit-points-history.component';
import { ViewMyLeadsComponent } from './view-my-leads/view-my-leads.component';
import { PastProjectsComponent } from './past-projects/past-projects.component';
import { ProposalsComponent } from './proposals/proposals.component';
import { AddEditProposalsComponent } from './add-edit-proposals/add-edit-proposals.component';
import { ProfileTabComponent } from './profile-tab/profile-tab.component';
import { BuilderComponent } from './boq-builder/builder/builder.component';
import { ListingComponent } from './boq-builder/listing/listing.component';
import { TeamMembersComponent } from './team-members/team-members.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { BuilderEditComponent } from './boq-builder/builder-edit/builder-edit.component';
import { ProposalTemplateComponent } from './proposal-template/proposal-template.component';

const routes: Routes = [
  {
    path: '',
    children: [
    ]
  },


  { path: 'homepage', canActivate: [AuthGuard], component: HomePageComponent },

  { path: "notification-list", canActivate: [AuthGuard], component: NotificationListComponent },

  { path: "add-reminder", canActivate: [AuthGuard], component: AddEditReminderComponent },
  { path: "edit-reminder/:id", canActivate: [AuthGuard], component: AddEditReminderComponent },

  { path: 'creditPointsHistory', canActivate: [AuthGuard], component: CreditPointsHistoryComponent },

  { path: 'teamMembers', canActivate: [AuthGuard], component: TeamMembersComponent },
  { path: 'profile/testimonials', canActivate: [AuthGuard], component: TestimonialsComponent },
  { path: 'pastProjects', canActivate: [AuthGuard], component: PastProjectsComponent },

  {
    path: 'profile',
    component: ProfileTabComponent
  },
  {
    path: 'leads',
    children: [
      { path: '', canActivate: [AuthGuard], component: MyRoofComponent },
      { path: 'list', canActivate: [AuthGuard], component: MyRoofComponent },
      { path: 'add', canActivate: [AuthGuard], component: AddEditMyRoofComponent },
      { path: 'edit/:id', canActivate: [AuthGuard], component: AddEditMyRoofComponent },
      { path: 'view/:id', canActivate: [AuthGuard], component: ViewMyLeadsComponent },
    ]
  },
  {
    path: 'proposals',
    children: [
      { path: '', canActivate: [AuthGuard], component: ProposalsComponent },
      { path: 'proposals', canActivate: [AuthGuard], component: ProposalsComponent },
      { path: 'addProposals', canActivate: [AuthGuard], component: AddEditProposalsComponent },
      { path: 'editProposals/:id', canActivate: [AuthGuard], component: AddEditProposalsComponent },
      { path: 'template', canActivate: [AuthGuard], component: ProposalTemplateComponent },
    ]
  },
  {
    path: 'boq',
    children: [
      { path: '', canActivate: [AuthGuard], component: ListingComponent },
      { path: 'listing', canActivate: [AuthGuard], component: ListingComponent },
      { path: 'builder', canActivate: [AuthGuard], component: BuilderComponent },
      { path: 'edit-builder/:id', canActivate: [AuthGuard], component: BuilderEditComponent },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
