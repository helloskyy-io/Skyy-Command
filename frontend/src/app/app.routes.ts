// app.routes.ts
import { DefaultPageComponent } from './default-page/default-page.component';
import { Routes } from '@angular/router';
import { GrafanaComponent } from './grafana/grafana.component';
import { ProxmoxComponent } from './proxmox/proxmox.component';
import { FluxCoreComponent } from './flux-core/flux-core.component';

export const routes: Routes = [
  { path: '', component: DefaultPageComponent, pathMatch: 'full' },
  { path: 'grafana', component: GrafanaComponent, title: 'Grafana' },
  { path: 'proxmox', component: ProxmoxComponent, title: 'Proxmox' },
  { path: 'flux-core', component: FluxCoreComponent, title: 'Flux-Core' },
];


