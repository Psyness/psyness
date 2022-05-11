import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../pages/login/login.component';
import { HomeComponent } from '../pages/home/home.component';
import { AuthorizedLayoutComponent } from "../components/authorized-layout/authorized-layout.component";
import { ContactsComponent } from "../pages/contacts/contacts.component";
import { CalendarComponent } from "../pages/calendar/calendar.component";
import { TasksComponent } from "../pages/tasks/tasks.component";
import { InvitationComponent } from "../pages/invitation/invitation.component";

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
    path: '',
    component: AuthorizedLayoutComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'contacts',
        component: ContactsComponent
      },
      {
        path: 'calendar',
        component: CalendarComponent
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
