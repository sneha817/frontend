import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.css']
})
export class ButtonsComponent {

  constructor(private router: Router) { }

  public chat() {
    this.router.navigate(['/chatbot']);
  }

  public calendar() {
    this.router.navigate(['/calendar']);
  }

  public login() {
    this.router.navigate(['/login']);
  }

  public weather(){
    this.router.navigate(['/search'])
  }
}
