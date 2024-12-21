// visibility.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Route } from "../../constants";

@Injectable({
  providedIn: 'root'
})
export class VisibilityService {
  private defaultComponents: Set<string> = new Set([Route.DEFAULT]); // Define default components here
  private activeComponentSubject = new BehaviorSubject<string>(Route.DEFAULT);
  private loadedComponentsSubject = new BehaviorSubject<Set<string>>(new Set(this.defaultComponents));

  activeComponent$ = this.activeComponentSubject.asObservable();
  loadedComponents$ = this.loadedComponentsSubject.asObservable();

  constructor() {}

  setActiveComponent(componentName: string) {
    this.activeComponentSubject.next(componentName);
  }

  toggleComponent(componentName: string) {
    const loadedComponents = new Set(this.loadedComponentsSubject.value);
    if (loadedComponents.has(componentName)) {
      loadedComponents.delete(componentName);
      // Check if the currently active component is being unloaded
      if (this.activeComponentSubject.value === componentName) {
        this.setActiveComponent(Route.DEFAULT);
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
