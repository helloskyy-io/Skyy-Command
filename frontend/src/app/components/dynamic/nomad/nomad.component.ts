// nomad.component.ts

// Import necessary Angular core module
import { Component } from '@angular/core';

// Define the NomadComponent
@Component({
  selector: 'app-nomad', // Selector for including this component in HTML
  standalone: true, // Indicates that this is a standalone component
  imports: [], // Import additional modules if needed
  templateUrl: './nomad.component.html', // Template for the component
  styleUrls: ['./nomad.component.css'] // Styles for the component (corrected property name)
})
export class NomadComponent {
  // Currently, no additional logic or lifecycle hooks are needed for this component
}
