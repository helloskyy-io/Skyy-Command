// main.ts

// Import necessary Angular core functions and modules
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { routes } from './app/app.routes';
import { RouterModule } from '@angular/router';
import { environment } from './environments/environment'; 
import { AppComponent } from './app/app.component'; 

// Enable production mode if the environment is set to production
if (environment.production) {
  enableProdMode();
}

// Bootstrap the main Angular application with necessary providers
bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(RouterModule.forRoot(routes)) // Import and configure the router with the defined routes
  ]
}).catch(err => console.error(err)); // Log any errors that occur during the bootstrapping process
