import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistroRoutingModule } from './registro-routing.module';
import { RegistroComponent } from './registro.component';

import { RouterModule } from '@angular/router';
import { NbIconModule } from '@nebular/theme';
import { FormsModule }   from '@angular/forms';
import { 
  NbButtonModule,
  NbCheckboxModule,
  NbCardModule,
  NbLayoutModule,
  NbInputModule,

} from '@nebular/theme';

@NgModule({
  declarations: [RegistroComponent],
  imports: [
    CommonModule,
    RegistroRoutingModule,

    FormsModule,
    NbIconModule,
    RouterModule, 
    NbButtonModule,
    NbCheckboxModule,
    NbCardModule,
    NbLayoutModule,
    NbInputModule,
    
  ]
})
export class RegistroModule { }
