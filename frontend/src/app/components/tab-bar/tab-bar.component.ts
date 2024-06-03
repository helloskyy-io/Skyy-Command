// tab-bar.component.ts

// Import necessary Angular core and common modules
import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

// Import the VisibilityService to manage component visibility
import { VisibilityService } from '../../services/visibility.service';
import { Observable } from 'rxjs';

// Define the TabBarComponent
@Component({
  selector: 'app-tab-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tab-bar.component.html', // Template for the component
  styleUrls: ['./tab-bar.component.css'] // Styles for the component
})
export class TabBarComponent {
  // Output event emitter for tab selection
  @Output() tabSelected = new EventEmitter<string>();

  // Observable to track loaded components
  loadedComponents$: Observable<Set<string>>;

  // Inject the VisibilityService
  constructor(private visibilityService: VisibilityService) {
    // Initialize the loaded components observable
    this.loadedComponents$ = this.visibilityService.loadedComponents$;
  }

  // Method to set the active component
  setActive(component: string) {
    this.visibilityService.setActiveComponent(component); // Set the active component
    this.tabSelected.emit(component); // Emit the selected component name
  }

  // Method to check if a component is active
  isActive(component: string): boolean {
    let isActive = false;
    this.visibilityService.activeComponent$.subscribe(activeComponent => {
      isActive = activeComponent === component; // Check if the component is active
    });
    return isActive;
  }
}





