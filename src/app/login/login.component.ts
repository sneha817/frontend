import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; // Import HttpClient
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  submitted = false;
  private apiUrl = 'http://localhost:5000/api/auth/login'; // Set your API URL here

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient // Inject HttpClient
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  getControl(name: string) {
    return this.loginForm.get(name);
  }

  public register() {
    this.router.navigate(['/registration']);
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    // Implement login logic here
    console.log('Form data:', this.loginForm.value);

    // Send POST request to backend
    this.http.post(this.apiUrl, this.loginForm.value).pipe(
      catchError(error => {
        console.error('Login error:', error);
        alert('Login failed. Please check your credentials.');
        return throwError(error);
      })
    ).subscribe(response => {
      console.log('Login successful:', response);
      // Navigate to Personal Details after successful login
      this.router.navigate(['/buttons']);
    });
  }
}
