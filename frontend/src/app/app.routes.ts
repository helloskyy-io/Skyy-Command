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

// Define the routes for the application
export const routes: Routes = [
  { path: '', component: DefaultPageComponent, pathMatch: 'full' }, // Default route
  { path: 'grafana', component: GrafanaComponent, title: 'Grafana' }, // Route for Grafana component
  { path: 'flux-view', component: FluxViewComponent, title: 'Flux-View' }, // Route for Flux-View component
  { path: 'proxmox', component: ProxmoxComponent, title: 'Proxmox' }, // Route for Proxmox component
  { path: 'ansible', component: AnsibleComponent, title: 'Ansible' }, // Route for Ansible component
  { path: 'terraform', component: TerraformComponent, title: 'Terraform' }, // Route for Terraform component
  { path: 'flux-core', component: FluxCoreComponent, title: 'Flux-Core' }, // Route for Flux-Core component
  { path: 'flux-edge', component: FluxEdgeComponent, title: 'Flux-Edge' }, // Route for Flux-Edge component
];



