// app.routes.ts

// Import necessary Angular and component modules
import { DefaultPageComponent } from './components/default-page/default-page.component';
import { Routes } from '@angular/router';
import { GrafanaComponent } from './components/grafana/grafana.component';
import { FluxViewComponent } from './components/flux-view/flux-view.component';
import { ProxmoxComponent } from './components/proxmox/proxmox.component';
import { AnsibleComponent } from './components/ansible/ansible.component';
import { TerraformComponent } from './components/terraform/terraform.component';
import { FluxCoreComponent } from './components/flux-core/flux-core.component';
import { FluxEdgeComponent } from './components/flux-edge/flux-edge.component';
import { componentNames } from './component-names';

// Map component names to their corresponding components
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

// Define the routes for the application
export const routes: Routes = Object.keys(componentNames).map(key => ({
  path: key === 'default-page' ? '' : key,
  component: componentMap[key],
  title: componentNames[key]
}));
