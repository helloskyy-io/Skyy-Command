// active-components.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ActiveComponentsService {
  private activeComponents: Set<string> = new Set();

  getActiveComponents(): Set<string> {
    return this.activeComponents;
  }

  toggleComponent(component: string) {
    if (this.activeComponents.has(component)) {
      this.activeComponents.delete(component);
    } else {
      this.activeComponents.add(component);
    }
  }
}
