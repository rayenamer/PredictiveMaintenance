import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  baseUrl = environment.apiUrl;
  private http = inject(HttpClient);
  getTimeSeriesPredictions(){
    return this.
  }
}
