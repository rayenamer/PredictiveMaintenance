import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { HttpClientModule } from '@angular/common/http';
import { ServiceService} from '../service.service'; // ✅ Now this will work
import { Prediction } from '../models/Prediction'; // ✅ Import the Prediction interface

interface Dot {
  x: number;
  y: number;
  dx: number;
  dy: number;
  delay: number;
}

@Component({
  selector: 'app-time-series',
  standalone: true,
  imports: [CommonModule, ChartModule],
  templateUrl: './time-series.component.html',
  styleUrl: './time-series.component.css',
})
export class TimeSeriesComponent implements OnInit, OnDestroy {
  private service = inject(ServiceService);
  data: any;
  options: any;
  predictions: Prediction[] = [];

  pageSize = 30;
  currentPage = 0;

  dots: Dot[] = [];
  animationFrameId: number | null = null;

  ngOnInit(): void {
    this.loadPredictions();
    // Initialize dots with random positions and velocities
    this.dots = Array.from({ length: 32 }, () => {
      const angle = Math.random() * 2 * Math.PI;
      const speed = 0.2 + Math.random() * 0.4;
      return {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        dx: Math.cos(angle) * speed,
        dy: Math.sin(angle) * speed,
        delay: Math.random() * 3
      };
    });
    this.animateDots();
  }

  ngOnDestroy(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  animateDots() {
    for (const dot of this.dots) {
      dot.x += dot.dx;
      dot.y += dot.dy;
      // Bounce off edges
      if (dot.x < 0 || dot.x > window.innerWidth) dot.dx *= -1;
      if (dot.y < 0 || dot.y > window.innerHeight) dot.dy *= -1;
    }
    this.animationFrameId = requestAnimationFrame(() => this.animateDots());
  }

  getPaginatedPredictions(): Prediction[] {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    return this.predictions.slice(start, end);
  }

  nextPage(): void {
    if ((this.currentPage + 1) * this.pageSize < this.predictions.length) {
      this.currentPage++;
      this.updateChartData();
    }
  }

  prevPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.updateChartData();
    }
  }

  loadPredictions(): void {
    this.service.getTimeSeriesPredictions().subscribe((predictions) => {
      console.log('Fetched predictions:', predictions);
      this.predictions = predictions;
      this.currentPage = 0;
      this.updateChartData();
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
      };
    });
  }

  updateChartData(): void {
    const paginated = this.getPaginatedPredictions();
    this.data = {
      labels: paginated.map(p => new Date(p.Date).toLocaleDateString()),
      datasets: [
        {
          label: 'Predicted Value',
          data: paginated.map(p => p[0]),
          fill: false,
          borderColor: '#42A5F5',
          tension: 0.4
        }
      ]
    };
  }

  get totalPages(): number {
    return Math.ceil(this.predictions.length / this.pageSize);
  }
}
