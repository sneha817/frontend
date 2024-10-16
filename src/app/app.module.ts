import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatService } from './services/chatservice/chatbot.service';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { DialogOverviewExampleDialog } from './app.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { RegistrationComponent } from './registration/registration.component';
import { ErrorDialogComponent } from './shared/error-dialog/error-dialog.component';
import { SuccessDialogComponent } from './shared/success-dialog/success-dialog.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { CalendarComponent } from './calendar/calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ButtonsComponent } from './buttons/buttons.component';
import { WeatherDisplayComponent } from './weather-display/weather-display.component';
import { SearchLocationComponent } from './search-location/search-location.component';

import { ApiHttpService } from './services/weather/weather.service';
import { MatCardModule } from '@angular/material/card';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AppComponent,
    ChatbotComponent,
    LoginComponent,
    RegistrationComponent,
    ErrorDialogComponent,
    SuccessDialogComponent,
    TodoListComponent,
    CalendarComponent,
    ButtonsComponent,
    WeatherDisplayComponent,
    SearchLocationComponent,
  ],
  imports: [
    BrowserModule,
    MatCardModule,
    MatDividerModule,

    MatProgressSpinnerModule,
    MatAutocompleteModule,
    AppRoutingModule,
    FormsModule,
    MatTableModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    FullCalendarModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule
  ],
  providers: [ChatService, ApiHttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
