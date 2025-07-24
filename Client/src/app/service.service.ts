import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment.development';
import { Observable } from 'rxjs';
import { Prediction } from './models/Prediction'; 
import { PredictionMachine } from './models/MachinePrediction'; // Import the PredictionMachine interface
@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getTimeSeriesPredictions(): Observable<Prediction[]> {
    return this.http.get<Prediction[]>(`${this.baseUrl}PredictTimeSeries`);
  }

  getPredictions(): Observable<PredictionMachine[]> {
    return this.http.get<PredictionMachine[]>(`${this.baseUrl}machine_predictions`);
  }
}
