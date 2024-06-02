// tab-bar.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';  // Import Router

@Component({
  selector: 'app-tab-bar',
  standalone: true,
  imports: [CommonModule],  // Import CommonModule for common Angular directives
  templateUrl: './tab-bar.component.html',
  styleUrls: ['./tab-bar.component.css']
})
export class TabBarComponent {
  @Input() activeComponents: Set<string> = new Set();

  constructor(private router: Router) { }  // Inject Router here

  selectComponent(component: string): void {
    this.router.navigate([component]);  // Navigate to the component route
  }

  isActive(component: string): boolean {
    // Implement logic to determine if the component is the currently displayed one
    return this.router.url === '/' + component;
  }
}
