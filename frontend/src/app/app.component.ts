// app.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // For common directives
import { RouterModule } from '@angular/router'; // For routing
import { AsideComponent } from './components/aside/aside.component';
import { HeaderComponent } from './components/header/header.component';
import { TabBarComponent } from './tab-bar/tab-bar.component';
import { ActiveComponentsService } from './services/active-components.service'; // Ensure this service is properly imported

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, // Include CommonModule for common directives
    RouterModule,  // Include RouterModule for routing
    AsideComponent,  // Including AsideComponent here
    HeaderComponent,  // Include HeaderComponent here
    TabBarComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'skyy-command';

  constructor(public activeComponentsService: ActiveComponentsService) {}

  // Include any methods or lifecycle hooks if needed
}
