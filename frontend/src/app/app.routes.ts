// app.routes.ts
import { DefaultPageComponent } from './components/default-page/default-page.component';
import { Routes } from '@angular/router';
import { GrafanaComponent } from './components/grafana/grafana.component';
import { ProxmoxComponent } from './components/proxmox/proxmox.component';
import { FluxCoreComponent } from './components/flux-core/flux-core.component';

export const routes: Routes = [
  { path: '', component: DefaultPageComponent, pathMatch: 'full' },
  { path: 'grafana', component: GrafanaComponent, title: 'Grafana' },
  { path: 'proxmox', component: ProxmoxComponent, title: 'Proxmox' },
  { path: 'flux-core', component: FluxCoreComponent, title: 'Flux-Core' },
];


