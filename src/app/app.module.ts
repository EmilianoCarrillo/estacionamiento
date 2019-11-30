import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';

import { NbThemeModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';

import { NbDialogModule, NbMenuModule } from '@nebular/theme';
import { ReservacionesUsuarioComponent } from './pags/reservaciones-usuario/reservaciones-usuario.component';
import { AutosUsuarioComponent } from './pags/autos-usuario/autos-usuario.component';
import { EdoscuentaUsuarioComponent } from './pags/edoscuenta-usuario/edoscuenta-usuario.component';
import { PerfilComponent } from './pags/perfil/perfil.component';
import { TiemporealAdminComponent } from './pags/tiemporeal-admin/tiemporeal-admin.component';
import { ReservacionesAdminComponent } from './pags/reservaciones-admin/reservaciones-admin.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    AngularFireModule.initializeApp(environment.firebase, "Auto-Matic"),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,

    NbThemeModule.forRoot(),
    NbEvaIconsModule,
    NbDialogModule.forChild(),
    NbMenuModule.forRoot(),
  ],
  declarations: [ AppComponent, ReservacionesUsuarioComponent, AutosUsuarioComponent, EdoscuentaUsuarioComponent, PerfilComponent, TiemporealAdminComponent, ReservacionesAdminComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}