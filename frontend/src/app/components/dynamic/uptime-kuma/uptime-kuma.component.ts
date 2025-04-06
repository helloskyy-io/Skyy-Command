// uptime-kuma.component.ts

// Import necessary Angular core module
import { Component } from '@angular/core';

// Define the GrafanaComponent
@Component({
  selector: 'app-uptime-kuma', // Selector for including this component in HTML
  standalone: true, // Indicates that this is a standalone component
  imports: [], // Import additional modules if needed
  templateUrl: './uptime-kuma.component.html', // Template for the component
  styleUrls: ['./uptime-kuma.component.css'] // Styles for the component (corrected property name)
})
export class UptimeKumaComponent {
  // Currently, no additional logic or lifecycle hooks are needed for this component
}