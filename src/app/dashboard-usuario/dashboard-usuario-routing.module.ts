import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardUsuarioComponent } from './dashboard-usuario.component';

const routes: Routes = [{ path: '', component: DashboardUsuarioComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardUsuarioRoutingModule { }
