// tab-bar.component.ts

// Import necessary Angular core and common modules
import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

// Import the VisibilityService to manage component visibility
import { VisibilityService } from '../../../services/visibility.service';
import { componentNames } from 'src/constants';
import {Observable, Subscription} from 'rxjs';

// Define the TabBarComponent
@Component({
  selector: 'app-tab-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tab-bar.component.html', // Template for the component
  styleUrls: ['./tab-bar.component.css'] // Styles for the component
})
export class TabBarComponent implements OnDestroy {

  componentNames = componentNames;
  // Observable to track loaded components
  loadedComponents$: Observable<Set<string>>;
  activeComponentSub: Subscription;
  activeComponent?: String;

  // Inject the VisibilityService
  constructor(private visibilityService: VisibilityService) {
    // Initialize the loaded components observable
    this.loadedComponents$ = this.visibilityService.loadedComponents$;
    this.activeComponentSub = this.visibilityService.activeComponent$.subscribe(activeComponent => {
      this.activeComponent = activeComponent;
    });
  }

  ngOnDestroy() {
    this.activeComponentSub.unsubscribe();
  }

  // Method to set the active component
  setActive(component: string) {
    this.visibilityService.setActiveComponent(component); // Set the active component
  }

  // Method to check if a component is active
  isActive(component: string): boolean {
    return component === this.activeComponent;
  }
}





