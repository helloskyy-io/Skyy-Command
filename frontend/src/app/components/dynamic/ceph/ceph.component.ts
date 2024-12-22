// ceph.component.ts

// Import necessary Angular core module
import { Component } from '@angular/core';

// Define the CephComponent
@Component({
  selector: 'app-ceph', // Selector for including this component in HTML
  standalone: true, // Indicates that this is a standalone component
  imports: [], // Import additional modules if needed
  templateUrl: './ceph.component.html', // Template for the component
  styleUrls: ['./ceph.component.css'] // Styles for the component (corrected property name)
})
export class CephComponent {
  // Currently, no additional logic or lifecycle hooks are needed for this component
}