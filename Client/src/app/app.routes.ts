import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TimeSeriesComponent } from './time-series/time-series.component';
import { PredictionDateComponent } from './prediction-date/prediction-date.component';
import { PredcitionCauseComponent } from './predcition-cause/predcition-cause.component';
import { HowComponent } from './how/how.component';

export const routes: Routes = [
    // Define your routes here
    // Example: 
    { path: '', component: HomeComponent },
    { path: 'TimeSeries', component: TimeSeriesComponent},
    { path: 'PredictionDate', component: PredictionDateComponent},
    { path: 'PredictionCause', component: PredcitionCauseComponent},
    { path: 'How', component: HowComponent},
    { path: '**', component: HomeComponent, pathMatch: 'full' },

];
