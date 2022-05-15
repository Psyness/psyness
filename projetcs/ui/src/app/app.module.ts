import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './core/app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from "@angular/material/card";
import { FlexLayoutModule } from "@angular/flex-layout";
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpLoaderFactory } from "./core/translation.factory";
import { AuthInterceptor } from "./interceptors/auth.interceptor";
import { MatButtonModule } from "@angular/material/button";
import { AuthorizedLayoutComponent } from './components/authorized-layout/authorized-layout.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from "@angular/material/menu";
import { ClientsComponent } from './pages/clients/clients.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { MatTableModule } from "@angular/material/table";
import { InvitationComponent } from './pages/invitation/invitation.component';
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { CalendarModule, DateAdapter } from "angular-calendar";
import { adapterFactory } from "angular-calendar/date-adapters/date-fns";
import { CreateEventDialogComponent } from './components/create-event-dialog/create-event-dialog.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { MatDialogModule } from "@angular/material/dialog";
import { MatInputModule } from "@angular/material/input";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { ClientsAutocompleteComponent } from './components/clients-autocomplete/clients-autocomplete.component';
import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule
} from '@angular-material-components/datetime-picker';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { ConfirmEventDialogComponent } from './components/confirm-event-dialog/confirm-event-dialog.component';
import { ViewEventDialogComponent } from './components/view-event-dialog/view-event-dialog.component';
import { PsychologistsComponent } from './pages/psychologists/psychologists.component';
import { PsychologistComponent } from './pages/psychologist/psychologist.component';
import { AllowedRolesDirective } from "./directives/allowed-roles.directive";

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        HomeComponent,
        AuthorizedLayoutComponent,
        ClientsComponent,
        TasksComponent,
        InvitationComponent,
        CreateEventDialogComponent,
        ClientsAutocompleteComponent,
        ConfirmEventDialogComponent,
        ViewEventDialogComponent,
        PsychologistsComponent,
        PsychologistComponent,
        CalendarComponent,
        AllowedRolesDirective,
        AllowedRolesDirective
    ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    TranslateModule.forRoot({
      defaultLanguage: 'ru',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    FlexLayoutModule,
    MatButtonModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatTableModule,
    MatSnackBarModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    MatDialogModule,
    MatInputModule,
    FormsModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    NgxMatTimepickerModule,
    MatDatepickerModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(translate: TranslateService) {
    registerLocaleData(localeRu)
    translate.setDefaultLang('ru');
    translate.use('ru');
  }

}
