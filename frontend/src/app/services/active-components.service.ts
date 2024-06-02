// active-components.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActiveComponentsService {
  private activeComponents = new BehaviorSubject<Set<string>>(new Set(['grafana', 'proxmox', 'flux-core']));
  activeComponents$ = this.activeComponents.asObservable();

  constructor() {}

  setActiveComponent(componentName: string) {
    let currentActive = new Set(this.activeComponents.getValue());
    if (currentActive.has(componentName)) {
      currentActive.delete(componentName);
    } else {
      currentActive.add(componentName);
    }
    this.activeComponents.next(currentActive);
  }

  // Make sure this method is called if needed
  loadAllComponents() {
    this.activeComponents.next(new Set(['grafana', 'proxmox', 'flux-core']));
  }
}
