import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';

import { NbThemeModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,

    AngularFireModule.initializeApp(environment.firebase, "Auto-Matic"),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,

    NbThemeModule.forRoot(),
    NbEvaIconsModule,
  ],
  declarations: [ AppComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}