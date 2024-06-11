import { Component, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
})
export class LandingComponent {
  constructor(private elementRef: ElementRef, private router: Router) {}

  irServicos() {
    const elemento = this.elementRef.nativeElement.querySelector('#servicos');
    if (elemento) {
      elemento.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    }
  }

  irLogin() {
    this.router.navigate(['/login']);
  }
}
