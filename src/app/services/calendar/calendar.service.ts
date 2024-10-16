import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  fetchAvailableSlots(): Observable<string[]> {
    return this.http.get<string[]>(`http://localhost:3000/events`);
  }
}
