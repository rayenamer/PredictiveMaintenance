import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
interface Prediction {
  value: number;
  date: string;
}

@Component({
  selector: 'app-time-series',
  standalone: true,
  imports: [CommonModule,ChartModule],
  templateUrl: './time-series.component.html',
  styleUrl: './time-series.component.css',
})
export class TimeSeriesComponent {
  predictions: Prediction[] = [
    { value: 9.6, date: '2022-03-04' },
    { value: 7.5, date: '2022-03-05' },
    { value: 7.1, date: '2022-03-06' },
    { value: 6.2, date: '2022-03-07' },
    { value: 6.0, date: '2022-03-08' },
    { value: 6.8, date: '2022-03-09' },
    { value: 6.9, date: '2022-03-10' },
    { value: 13.3, date: '2022-03-11' },
    { value: 11.4, date: '2022-03-12' },
    { value: 7.0, date: '2022-03-13' },
    { value: 6.2, date: '2022-03-14' },
    { value: 7.6, date: '2022-03-15' },
    { value: 8.7, date: '2022-03-16' },
    { value: 7.3, date: '2022-03-17' },
    { value: 7.8, date: '2022-03-18' },
    { value: 7.1, date: '2022-03-19' },
    { value: 8.6, date: '2022-03-20' },
    { value: 12.1, date: '2022-03-21' },
    { value: 7.2, date: '2022-03-22' },
    { value: 6.2, date: '2022-03-23' }
  ];

  data: any;
  options: any;

  ngOnInit() {
    this.data = {
      labels: this.predictions.map(p => p.date),
      datasets: [
        {
          label: 'Predicted Value',
          data: this.predictions.map(p => p.value),
          fill: false,
          borderColor: '#42A5F5',
          tension: 0.4
        }
      ]
    };

    this.options = {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: 'top'
        },
        title: {
          display: true,
          text: 'Predicted Failures Over Time'
        }
      },
      scales: {
        x: {
          display: true,
          title: {
            display: true,
            text: 'Date'
          }
        },
        y: {
          display: true,
          title: {
            display: true,
            text: 'Prediction Value'
          }
        }

      }
    }
  }
}
