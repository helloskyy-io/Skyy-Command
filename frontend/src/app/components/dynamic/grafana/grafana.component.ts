// grafana.component.ts

// Import necessary Angular core module
import { Component } from '@angular/core';

// Define the GrafanaComponent
@Component({
  selector: 'app-grafana', // Selector for including this component in HTML
  standalone: true, // Indicates that this is a standalone component
  imports: [], // Import additional modules if needed
  templateUrl: './grafana.component.html', // Template for the component
  styleUrls: ['./grafana.component.css'] // Styles for the component (corrected property name)
})
export class GrafanaComponent {
  // Currently, no additional logic or lifecycle hooks are needed for this component
}