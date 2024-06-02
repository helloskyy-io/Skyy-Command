// visibility.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VisibilityService {
  private activeComponentSubject = new BehaviorSubject<string>('default-page');
  activeComponent$ = this.activeComponentSubject.asObservable();

  constructor() {}

  setActiveComponent(componentName: string) {
    this.activeComponentSubject.next(componentName);
  }

  getActiveComponent(): string {
    return this.activeComponentSubject.value;
  }
}
