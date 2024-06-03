// visibility.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class VisibilityService {
  private defaultComponents: Set<string> = new Set(['default-page']); // Define default components here
  private activeComponentSubject = new BehaviorSubject<string>('default-page');
  private loadedComponentsSubject = new BehaviorSubject<Set<string>>(new Set(this.defaultComponents));

  activeComponent$ = this.activeComponentSubject.asObservable();
  loadedComponents$ = this.loadedComponentsSubject.asObservable();

  constructor(private router: Router) {}

  setActiveComponent(componentName: string) {
    this.activeComponentSubject.next(componentName);
    this.router.navigate([componentName === 'default-page' ? '' : componentName]);
  }

  toggleComponent(componentName: string) {
    const loadedComponents = new Set(this.loadedComponentsSubject.value);
    if (loadedComponents.has(componentName)) {
      loadedComponents.delete(componentName);
      // Check if the currently active component is being unloaded
      if (this.activeComponentSubject.value === componentName) {
        this.setActiveComponent('default-page');
      }
    } else {
      loadedComponents.add(componentName);
      // Automatically set the new component as the active component
      this.setActiveComponent(componentName);
    }
    this.loadedComponentsSubject.next(loadedComponents);
  }

  isComponentLoaded(componentName: string): boolean {
    return this.loadedComponentsSubject.value.has(componentName);
  }
}
