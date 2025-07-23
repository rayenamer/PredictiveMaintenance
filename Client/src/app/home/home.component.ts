import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Dot {
  x: number;
  y: number;
  dx: number;
  dy: number;
  delay: number;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, OnDestroy {
  dots: Dot[] = [];
  animationFrameId: number | null = null;

  pupilX = 120; // Center of SVG
  pupilY = 120; // Center of SVG

  features = [
    {
      icon: '⚡',
      title: 'Real-Time Prediction',
      desc: 'Instantly forecast equipment failures before they happen.'
    },
    {
      icon: '📈',
      title: 'Smart Analytics',
      desc: 'Deep insights with advanced AI-driven analytics and dashboards.'
    },
    {
      icon: '🦾',
      title: 'Automated Insights',
      desc: 'Let AI monitor, learn, and alert you to critical issues automatically.'
    }
  ];

  ngOnInit() {
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

  ngOnDestroy() {
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

  onHeroMouseMove(event: MouseEvent) {
    const hero = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const x = event.clientX - hero.left;
    const y = event.clientY - hero.top;
    // SVG is 240x240, orb center is (120,120)
    const centerX = 120;
    const centerY = 120;
    const maxDist = 40;
    const dx = x - centerX;
    const dy = y - centerY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const scale = dist > maxDist ? maxDist / dist : 1;
    this.pupilX = centerX + dx * scale * 0.5;
    this.pupilY = centerY + dy * scale * 0.5;
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.animateOnScroll();
  }

  ngAfterViewInit() {
    this.animateOnScroll();
  }

  animateOnScroll() {
    const cards = document.querySelectorAll('.feature-card');
    cards.forEach((card, i) => {
      const rect = card.getBoundingClientRect();
      if (rect.top < window.innerHeight - 80) {
        card.classList.add('visible');
      }
    });
  }
}
