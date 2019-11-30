import { Component, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { AngularFireAuth } from '@angular/fire/auth';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  userIsLogged;

  constructor(
    private themeService: NbThemeService,
    public afAuth: AngularFireAuth,
    ) {}

    ngOnInit() {
      this.adjustButtons();
    }

    isLoggedIn() {
      return this.afAuth.authState.pipe(first()).toPromise();
    }

    async adjustButtons() {
      const user = await this.isLoggedIn()
      if (user) {
        this.userIsLogged = user;
      }
   }

  temaSeleccionado;
  temas:Array<Object> = [
      {nombre: "default", alias:"claro"},
      {nombre: "dark", alias:"oscuro"}
  ];

  cambiarTema(){
    this.themeService.changeTheme(this.temaSeleccionado.nombre);
  }

}
