// app.component.ts
import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { AsideComponent } from './aside/aside.component';
import { MainComponent } from './main/main.component';
import { CommonModule } from '@angular/common'; // For common directives
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router'; // For routing

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, // Include CommonModule for common directives
    HeaderComponent, 
    AsideComponent, 
    MainComponent, 
    RouterOutlet, // Include RouterOutlet for routing
    RouterLink, // Include RouterLink for link handling
    RouterLinkActive // Include RouterLinkActive for active link styling
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'skyy-command';
}
