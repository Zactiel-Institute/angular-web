import { Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { ServiciosComponent } from './components/servicios/servicios.component';
import { MisServiciosComponent } from './components/mis-servicios/mis-servicios.component';

export const routes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent },
  { path: 'servicios', component: ServiciosComponent },
  { path: 'mis-servicios', component: MisServiciosComponent },
  { path: '**', redirectTo: '/auth' }
];
