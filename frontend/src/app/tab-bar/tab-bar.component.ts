// tab-bar.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tab-bar',
  templateUrl: './tab-bar.component.html',
  styleUrls: ['./tab-bar.component.css']
})
export class TabBarComponent {
  @Input() activeComponents: Set<string> = new Set();

  constructor() { }

  isActive(route: string): boolean {
    return this.activeComponents.has(route);
  }
}
