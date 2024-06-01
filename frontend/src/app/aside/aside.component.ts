// aside.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink } from "@angular/router";
import { RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.css'
})
export class AsideComponent {
  // Track active components
  activeComponents: Set<string> = new Set();
  @Output() componentToggled = new EventEmitter<string>();
  @Output() componentSelected = new EventEmitter<string>();

  constructor(private router: Router) { }

  debugNavigation(route: string) {
    console.log(`Attempting to navigate to ${route}`);
  }

  toggleComponent(route: string): void {
    if (this.activeComponents.has(route)) {
      this.activeComponents.delete(route);
      this.componentToggled.emit(route);
      this.router.navigate(['']);
    } else {
      this.activeComponents.add(route);
      this.componentToggled.emit(route);
      this.router.navigate([route]);
    }
    console.log(`Current active components: ${Array.from(this.activeComponents).join(', ')}`);
  }

  selectComponent(route: string): void {
    this.componentSelected.emit(route); // Emit event when a component is selected to be viewed
  }

  isActive(route: string): boolean {
    return this.activeComponents.has(route);
  }

}
