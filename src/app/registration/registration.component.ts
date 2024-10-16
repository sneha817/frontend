import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { AuthService } from '../services/auth.service';
import { AuthService } from '../services/registerservice/register.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../shared/error-dialog/error-dialog.component';
import { SuccessDialogComponent } from '../shared/success-dialog/success-dialog.component';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  registrationForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private dialog: MatDialog) {
    this.registrationForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get firstName() { return this.registrationForm.get('firstName'); }
  get lastName() { return this.registrationForm.get('lastName'); }
  get email() { return this.registrationForm.get('email'); }
  get password() { return this.registrationForm.get('password'); }

  onSubmit() {
    if (this.registrationForm.valid) {
      this.authService.registerUser(this.registrationForm.value).subscribe({
        next: (response: any) => {
          console.log('Registration successful!', response);
          this.dialog.open(SuccessDialogComponent, {
            data: { message: 'Registration successful! Welcome!' }
          });
          // Navigate to success page or show success message
        },
        error: (error: { message: any; }) => {
          // Show error dialog when email is already registered
          this.dialog.open(ErrorDialogComponent, {
            data: { message: error.message }
          });
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
