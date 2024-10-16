import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:5000/api/auth/register';

  constructor(private http: HttpClient) { }

  registerUser(userData: any) {
    return this.http.post(this.apiUrl, userData).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 409) {  // Conflict error for already existing record
          return throwError(() => new Error('Email already registered.'));
        } else {
          return throwError(() => new Error('Something went wrong!'));
        }
      })
    );
  }
}
