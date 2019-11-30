import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { 
    path: 'registro', 
    loadChildren: () => import('./registro/registro.module').then(m => m.RegistroModule) 
  },
  { 
    path: 'landing',
    loadChildren: () => import('./landing/landing.module').then(m => m.LandingModule) 
  },
  { 
    path: 'dashboard-usuario',
    loadChildren: () => import('./dashboard-usuario/dashboard-usuario.module').then(m => m.DashboardUsuarioModule) 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }