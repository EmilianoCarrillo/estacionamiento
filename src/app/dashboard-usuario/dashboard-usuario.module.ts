import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,  ReactiveFormsModule }   from '@angular/forms';


import { DashboardUsuarioRoutingModule } from './dashboard-usuario-routing.module';
import { DashboardUsuarioComponent } from './dashboard-usuario.component';
import  {   NbLayoutModule,
            NbSidebarModule,
            NbCardModule,
            NbIconModule,
            NbButtonModule,
            NbListModule,
            NbPopoverModule,
            NbTreeGridModule,
            NbDatepickerModule,
            NbInputModule,
            NbSelectModule,
        } from '@nebular/theme';

import { DashboardComponentsModule } from '../dashboard-components/dashboard-components.module';
import { RouterModule } from '@angular/router';

import { ReservacionesUsuarioComponent } from './pags/reservaciones-usuario/reservaciones-usuario.component';
import { AutosUsuarioComponent } from './pags/autos-usuario/autos-usuario.component';
import { EdoscuentaUsuarioComponent } from './pags/edoscuenta-usuario/edoscuenta-usuario.component';
import { PerfilComponent } from './pags/perfil/perfil.component';
import { TiemporealAdminComponent } from './pags/tiemporeal-admin/tiemporeal-admin.component';
import { ReservacionesAdminComponent } from './pags/reservaciones-admin/reservaciones-admin.component';
import { TarjetaEnCursoComponent } from './pags/reservaciones-usuario/tarjeta-en-curso/tarjeta-en-curso.component';
import { TarjetaPasadaComponent } from './pags/reservaciones-usuario/tarjeta-pasada/tarjeta-pasada.component';

import { NbToastrModule } from '@nebular/theme';
import { TarjetaAutoComponent } from './pags/autos-usuario/tarjeta-auto/tarjeta-auto.component';
import { MapComponent } from './pags/tiemporeal-admin/map/map.component';


@NgModule({
  declarations: [
    DashboardUsuarioComponent,
    ReservacionesUsuarioComponent, AutosUsuarioComponent, EdoscuentaUsuarioComponent, PerfilComponent, TiemporealAdminComponent, ReservacionesAdminComponent, TarjetaEnCursoComponent, TarjetaPasadaComponent, TarjetaAutoComponent, MapComponent
  ],
  imports: [
    CommonModule,
    DashboardUsuarioRoutingModule,
    DashboardComponentsModule,

    NbSidebarModule.forRoot(),
    NbLayoutModule,
    RouterModule,
    NbCardModule,
    NbIconModule,
    NbButtonModule,
    NbListModule,
    NbPopoverModule,
    NbTreeGridModule,
    NbDatepickerModule,
    NbInputModule,
    NbSelectModule,

    FormsModule, 
    ReactiveFormsModule,
    NbToastrModule.forRoot(),
  ]
})
export class DashboardUsuarioModule { }
