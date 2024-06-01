// main.ts
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { routes } from './app/app.routes';
import { RouterModule } from '@angular/router';
import { environment } from './environments/environment'; 
import { AppComponent } from './app/app.component'; 


if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(RouterModule.forRoot(routes))
  ]
}).catch(err => console.error(err));