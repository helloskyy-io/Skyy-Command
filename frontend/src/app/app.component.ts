// app.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // For common directives
import { RouterModule } from '@angular/router'; // For routing
import { AsideComponent } from './components/aside/aside.component';
import { HeaderComponent } from './components/header/header.component';
import { TabBarComponent } from './components/tab-bar/tab-bar.component';
import { MainComponent } from './components/main/main.component'
import { ActiveComponentsService } from './services/active-components.service';
import { VisibilityService } from './services/visibility.service'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, // Include CommonModule for common directives
    RouterModule,  // Include RouterModule for routing
    AsideComponent,  // Including AsideComponent here
    HeaderComponent,  // Include HeaderComponent here
    MainComponent,
    TabBarComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'skyy-command';

  constructor(public activeComponentsService: ActiveComponentsService,
    public visibilityService: VisibilityService) {}
  

  // Include any methods or lifecycle hooks if needed
}
