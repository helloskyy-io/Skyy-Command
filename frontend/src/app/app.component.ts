// app.component.ts

// Import necessary Angular core and common modules
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // For common directives
import { RouterModule } from '@angular/router'; // For routing

// Import custom components
import { AsideComponent } from './components/static/aside/aside.component';
import { HeaderComponent } from './components/static/header/header.component';
import { TabBarComponent } from './components/static/tab-bar/tab-bar.component';
import { MainComponent } from './components/static/main/main.component';

// Import services
import { VisibilityService } from './services/visibility.service'; 

// Define the root component of the application
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, // Include CommonModule for common directives
    RouterModule, // Include RouterModule for routing
    AsideComponent, // Include AsideComponent here
    HeaderComponent, // Include HeaderComponent here
    MainComponent, // Include MainComponent here
    TabBarComponent // Include TabBarComponent here
  ],
  templateUrl: './app.component.html', // Template for the component
  styleUrls: ['./app.component.css'] // Styles for the component
})
export class AppComponent {
  title = 'skyy-command'; // Title of the application

  // Inject services into the component
  constructor(public visibilityService: VisibilityService) {}

  // Include any methods or lifecycle hooks if needed
}
