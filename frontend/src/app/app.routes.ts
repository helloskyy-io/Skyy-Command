// app.routes.ts

// Import necessary Angular and component modules
import { Routes } from '@angular/router';
import { componentNames } from 'src/constants';
import { componentMap, Route } from 'src/constants';

// Define the routes for the application
export const routes: Routes = Object.keys(componentNames).map(key => ({
  path: key === Route.DEFAULT ? '' : key,
  component: componentMap[key],
  title: componentNames[key]
}));
