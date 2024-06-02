// aside.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';  // Replace individual imports with RouterModule
import { ActiveComponentsService } from '../../services/active-components.service';

@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [RouterModule],  // Simplify to RouterModule only
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent {
  @Output() componentToggled = new EventEmitter<string>();
  @Output() componentSelected = new EventEmitter<string>();

  constructor(private router: Router, private activeComponentsService: ActiveComponentsService) { }

  toggleComponent(route: string): void {
    if (this.activeComponentsService.getActiveComponents().has(route)) {
      this.activeComponentsService.toggleComponent(route);  // Delegate to service
      this.componentToggled.emit(route);
      this.router.navigate(['']);  // Navigate to default or dashboard
    } else {
      this.activeComponentsService.toggleComponent(route);  // Delegate to service
      this.componentToggled.emit(route);
      this.router.navigate([route]);  // Navigate to the component
    }
  }

  selectComponent(route: string): void {
    this.componentSelected.emit(route);  // Emit event when a component is selected to be viewed
  }

  isActive(route: string): boolean {
    return this.activeComponentsService.getActiveComponents().has(route);
  }
}

