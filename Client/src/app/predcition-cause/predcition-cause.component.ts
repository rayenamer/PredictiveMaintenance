import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { ServiceService} from '../service.service'; //
import { PredictionMachine } from '../models/MachinePrediction';
import { CommonModule } from '@angular/common';

interface Dot {
  x: number;
  y: number;
  dx: number;
  dy: number;
  delay: number;
}

@Component({
  selector: 'app-predcition-cause',
  templateUrl: './predcition-cause.component.html',
  styleUrl: './predcition-cause.component.css'
})
export class PredcitionCauseComponent implements OnInit, OnDestroy {
    private service = inject(ServiceService);
    PredictionMachine: PredictionMachine[] = [];

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

    loadPredictions(): void {
      this.service.getPredictions().subscribe((PredictionMachine) => {
        console.log('Fetched predictions:', PredictionMachine);
        this.PredictionMachine = PredictionMachine;
      });
    }
}
