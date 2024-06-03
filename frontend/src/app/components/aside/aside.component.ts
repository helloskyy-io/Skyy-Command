// aside.component.ts

// Import necessary Angular core modules
import { Component, EventEmitter, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VisibilityService } from '../../services/visibility.service';

// Define the AsideComponent
@Component({
  selector: 'app-aside', // Selector for including this component in HTML
  standalone: true, // Indicates that this is a standalone component
  imports: [RouterModule], // Import RouterModule for routing
  templateUrl: './aside.component.html', // Template for the component
  styleUrls: ['./aside.component.css'] // Styles for the component
})
export class AsideComponent {
  // Event emitter to notify when a component is toggled
  @Output() componentToggled = new EventEmitter<string>();

  // Inject the VisibilityService
  constructor(private visibilityService: VisibilityService) {}

  // Method to toggle the visibility of a component
  toggleComponent(component: string) {
    this.visibilityService.toggleComponent(component);
    this.componentToggled.emit(component); // Emit the toggled component
  }

  // Method to check if a component is loaded
  isComponentLoaded(component: string): boolean {
    return this.visibilityService.isComponentLoaded(component);
  }
}
