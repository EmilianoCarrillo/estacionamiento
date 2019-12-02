import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardUsuarioComponent } from './dashboard-usuario.component';
import { ReservacionesUsuarioComponent } from './pags/reservaciones-usuario/reservaciones-usuario.component';
import { AutosUsuarioComponent } from './pags/autos-usuario/autos-usuario.component';
import { EdoscuentaUsuarioComponent } from './pags/edoscuenta-usuario/edoscuenta-usuario.component';
import { ReservacionesAdminComponent } from './pags/reservaciones-admin/reservaciones-admin.component';
import { TiemporealAdminComponent } from './pags/tiemporeal-admin/tiemporeal-admin.component';
import { PerfilComponent } from './pags/perfil/perfil.component';

const routes: Routes = [{ 
  path: 'dashboard-usuario',
  component: DashboardUsuarioComponent,
  children:[
    {
      path: 'reservaciones-usuario',
      component: ReservacionesUsuarioComponent
    },
    {
      path: 'autos-usuario',
      component: AutosUsuarioComponent
    },
    {
      path: 'edoscuenta-usuario',
      component: EdoscuentaUsuarioComponent
    },
    {
      path: 'reservaciones-admin',
      component: ReservacionesAdminComponent
    },
    {
      path: 'tiemporeal-admin',
      component: TiemporealAdminComponent
    },
    {
      path: 'perfil',
      component: PerfilComponent
    },
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardUsuarioRoutingModule { }
