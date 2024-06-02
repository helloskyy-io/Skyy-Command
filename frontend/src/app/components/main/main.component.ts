// main.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultPageComponent } from '../default-page/default-page.component';
import { GrafanaComponent } from '../grafana/grafana.component';
import { ProxmoxComponent } from '../proxmox/proxmox.component';
import { FluxCoreComponent } from '../flux-core/flux-core.component';
import { TabBarComponent } from '../tab-bar/tab-bar.component';
import { VisibilityService } from '../../services/visibility.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CommonModule,
    DefaultPageComponent,
    GrafanaComponent,
    ProxmoxComponent,
    FluxCoreComponent,
    TabBarComponent
  ],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  loadedComponents$: Observable<Set<string>>;

  constructor(public visibilityService: VisibilityService) {
    this.loadedComponents$ = this.visibilityService.loadedComponents$;
  }

  isActive(componentName: string): Observable<boolean> {
    return this.visibilityService.activeComponent$.pipe(
      map(activeComponent => activeComponent === componentName)
    );
  }
}




// import { Component } from '@angular/core';
// import { RouterModule } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { GrafanaComponent } from '../grafana/grafana.component';
// import { ProxmoxComponent } from '../proxmox/proxmox.component';
// import { FluxCoreComponent } from '../flux-core/flux-core.component';
// import { TabBarComponent } from '../tab-bar/tab-bar.component';
// import { ActiveComponentsService } from '../../services/active-components.service';

// @Component({
//   selector: 'app-main',
//   standalone: true,
//   imports: [
//     CommonModule,
//     RouterModule, 
//     GrafanaComponent, 
//     ProxmoxComponent, 
//     FluxCoreComponent, 
//     TabBarComponent
//   ],
//   templateUrl: './main.component.html',
//   styleUrls: ['./main.component.css']
// })
// export class MainComponent {
//   constructor(public activeComponentsService: ActiveComponentsService) {}

//   setActiveComponent(component: string) {
//     this.activeComponentsService.toggleComponent(component);
//   }
// }
