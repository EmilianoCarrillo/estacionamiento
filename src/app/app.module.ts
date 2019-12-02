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

import { NbDialogModule, NbMenuModule, NbDatepickerModule } from '@nebular/theme';
import { DashboardUsuarioModule } from './dashboard-usuario/dashboard-usuario.module';

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
    DashboardUsuarioModule,
    NbDatepickerModule.forRoot(),
  ],
  declarations: [ AppComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}