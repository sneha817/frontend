import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { RegistrationComponent } from './registration/registration.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { CalendarComponent } from './calendar/calendar.component';
import { WeatherDisplayComponent } from './weather-display/weather-display.component';
import { SearchLocationComponent } from './search-location/search-location.component';

const routes: Routes = [

  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'chatbot', component: ChatbotComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'buttons', component: ButtonsComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'search', component: SearchLocationComponent },

  // {
  //   path: '',
  //   component: SearchLocationComponent
  // },
  {
    path: 'weather',
    component: WeatherDisplayComponent
  }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
