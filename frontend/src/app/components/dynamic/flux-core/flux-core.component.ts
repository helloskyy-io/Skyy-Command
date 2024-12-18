// flux-core.component.ts

// Import necessary Angular core module
import { Component } from '@angular/core';

// Define the FluxCoreComponent
@Component({
  selector: 'app-flux-core', // Selector for including this component in HTML
  standalone: true, // Indicates that this is a standalone component
  imports: [], // Import additional modules if needed
  templateUrl: './flux-core.component.html', // Template for the component
  styleUrls: ['./flux-core.component.css'] // Styles for the component (corrected property name)
})
export class FluxCoreComponent {
  // Currently, no additional logic or lifecycle hooks are needed for this component
}
