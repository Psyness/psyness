import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from '../pages/login/login.component';
import {HomeComponent} from '../pages/home/home.component';
import {AuthorizedLayoutComponent} from "../components/authorized-layout/authorized-layout.component";
import {ClientsComponent} from "../pages/clients/clients.component";
import {TasksComponent} from "../pages/tasks/tasks.component";
import {InvitationComponent} from "../pages/invitation/invitation.component";
import {PsychologistsComponent} from "../pages/psychologists/psychologists.component";
import {OneTimeLinkComponent} from "../pages/one-time-link/one-time-link.component";
import { ProfileComponent } from "../pages/profile/profile.component";

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'invitations/:invitationId',
    component: InvitationComponent
  },
  {
    path: 'calendars/one-time-link/:oneTimeLinkId',
    component: OneTimeLinkComponent
  },
  {
    path: '',
    component: AuthorizedLayoutComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'profiles',
        component: ProfileComponent
      },
      {
        path: 'clients',
        component: ClientsComponent
      },
      {
        path: 'psychologists',
        component: PsychologistsComponent
      },
      {
        path: 'tasks',
        component: TasksComponent
      },
    ]
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
