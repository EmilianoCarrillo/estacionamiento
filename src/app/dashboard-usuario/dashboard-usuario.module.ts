import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardUsuarioRoutingModule } from './dashboard-usuario-routing.module';
import { DashboardUsuarioComponent } from './dashboard-usuario.component';
import  {   NbLayoutModule,
            NbSidebarModule
        } from '@nebular/theme';

import { DashboardComponentsModule } from '../dashboard-components/dashboard-components.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    DashboardUsuarioComponent,
  ],
  imports: [
    CommonModule,
    DashboardUsuarioRoutingModule,
    DashboardComponentsModule,

    NbSidebarModule.forRoot(),
    NbLayoutModule,
    RouterModule
  ]
})
export class DashboardUsuarioModule { }
