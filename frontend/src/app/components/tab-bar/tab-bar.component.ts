// tab-bar.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisibilityService } from '../../services/visibility.service';

@Component({
  selector: 'app-tab-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tab-bar.component.html',
  styleUrls: ['./tab-bar.component.css']
})
export class TabBarComponent {
  @Output() tabSelected = new EventEmitter<string>();

  constructor(private visibilityService: VisibilityService) {}

  setActive(component: string) {
    this.visibilityService.setActiveComponent(component);
    this.tabSelected.emit(component); // Emit the selected component name
  }

  isActive(component: string): boolean {
    let isActive = false;
    this.visibilityService.activeComponent$.subscribe(activeComponent => {
      isActive = activeComponent === component;
    });
    return isActive;
  }
}



// // tab-bar.component.ts
// import { Component, EventEmitter, Input, Output } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { Router } from '@angular/router';  // Import Router

// @Component({
//   selector: 'app-tab-bar',
//   standalone: true,
//   imports: [CommonModule],  // Import CommonModule for common Angular directives
//   templateUrl: './tab-bar.component.html',
//   styleUrls: ['./tab-bar.component.css']
// })
// export class TabBarComponent {
//   @Input() activeComponents: Set<string> = new Set();
//   @Output() tabSelected = new EventEmitter<string>();  // Event emitter to notify when a tab is selected

//   constructor(private router: Router) { }  // Inject Router here

//   selectComponent(component: string) {
//     this.tabSelected.emit(component);  // Emit the name of the component when a tab is clicked
//   }

//   isActive(component: string): boolean {
//     // Implement logic to determine if the component is the currently displayed one
//     return this.router.url === '/' + component;
//   }
// }


