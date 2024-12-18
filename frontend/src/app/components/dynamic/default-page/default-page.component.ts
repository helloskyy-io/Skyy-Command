// default-page.component.ts

// Import necessary Angular core modules
import { Component, ViewEncapsulation } from '@angular/core';

// Define the DefaultPageComponent
@Component({
  selector: 'app-default-page', // Selector for including this component in HTML
  standalone: true, // Indicates that this is a standalone component
  imports: [], // Import additional modules if needed
  templateUrl: './default-page.component.html', // Template for the component
  styleUrls: ['./default-page.component.css'], // Styles for the component (corrected property name)
  encapsulation: ViewEncapsulation.Emulated // Emulate native Shadow DOM encapsulation
})
export class DefaultPageComponent {
  // Currently, no additional logic or lifecycle hooks are needed for this component
}
