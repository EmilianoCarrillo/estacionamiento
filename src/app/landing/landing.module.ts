import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';

import { RouterModule } from '@angular/router';
import { NbIconModule } from '@nebular/theme';
import  { NbLayoutModule, 
          NbButtonModule,
          NbSelectModule,
          NbCardModule,
          NbStepperModule,

        } from '@nebular/theme';


@NgModule({
  declarations: [LandingComponent],
  imports: [
    CommonModule,
    LandingRoutingModule,

    RouterModule,
    NbIconModule,
    NbLayoutModule,
    NbButtonModule,
    NbSelectModule,
    NbCardModule,
    NbStepperModule,
  ]
})
export class LandingModule { }
