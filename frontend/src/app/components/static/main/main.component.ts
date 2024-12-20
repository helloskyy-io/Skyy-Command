// main.component.ts

// Import necessary Angular core and common modules
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// Import custom components and services
import { componentNames } from '../../../shared/component-names';
import { DefaultPageComponent } from '../../dynamic/default-page/default-page.component';
import { GrafanaComponent } from '../../dynamic/grafana/grafana.component';
import { FluxViewComponent } from '../../dynamic/flux-view/flux-view.component';
import { ProxmoxComponent } from '../../dynamic/proxmox/proxmox.component';
import { AnsibleComponent } from '../../dynamic/ansible/ansible.component';
import { TerraformComponent } from '../../dynamic/terraform/terraform.component';
import { FluxCoreComponent } from '../../dynamic/flux-core/flux-core.component';
import { FluxEdgeComponent } from '../../dynamic/flux-edge/flux-edge.component';
import { TabBarComponent } from '../../static/tab-bar/tab-bar.component';
import { VisibilityService } from '../../../services/visibility.service';

// Import RxJS operators and observables
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Define the component map with explicit types
const componentMap: { [key: string]: any } = {
  'default-page': DefaultPageComponent,
  'grafana': GrafanaComponent,
  'flux-view': FluxViewComponent,
  'proxmox': ProxmoxComponent,
  'ansible': AnsibleComponent,
  'terraform': TerraformComponent,
  'flux-core': FluxCoreComponent,
  'flux-edge': FluxEdgeComponent,
};

// Define the MainComponent
@Component({
  selector: 'app-main', // Selector for including this component in HTML
  standalone: true, // Indicates that this is a standalone component
  imports: [
    CommonModule, // Include CommonModule for common directives
    DefaultPageComponent,
    GrafanaComponent,
    FluxViewComponent,
    ProxmoxComponent,
    AnsibleComponent,
    TerraformComponent,
    FluxCoreComponent,
    FluxEdgeComponent,
    TabBarComponent // Include TabBarComponent
  ],
  templateUrl: './main.component.html', // Template for the component
  styleUrls: ['./main.component.css'] // Styles for the component
})
export class MainComponent {
  // Observable to track loaded components
  loadedComponents$: Observable<Set<string>>;

  // Properties to be used in the template
  componentNames = componentNames;
  componentMap = componentMap;
  objectKeys = Object.keys;

  // Inject the VisibilityService
  constructor(public visibilityService: VisibilityService) {
    this.loadedComponents$ = this.visibilityService.loadedComponents$;
  }

  // Method to check if a component is active
  isActive(componentName: string): Observable<boolean> {
    return this.visibilityService.activeComponent$.pipe(
      map(activeComponent => activeComponent === componentName)
    );
  }
}
