// header.component.ts

// Import necessary Angular core module
import { Component } from '@angular/core';

// Define the HeaderComponent
@Component({
  selector: 'app-header', // Selector for including this component in HTML
  standalone: true, // Indicates that this is a standalone component
  imports: [], // Import additional modules if needed
  templateUrl: './header.component.html', // Template for the component
  styleUrls: ['./header.component.css'] // Styles for the component (array for multiple styles)
})
export class HeaderComponent {
  // Currently, no additional logic or lifecycle hooks are needed for this component
}