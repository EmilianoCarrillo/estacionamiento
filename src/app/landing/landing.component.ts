import { Component, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor(private themeService: NbThemeService) {
  }

  ngOnInit() {
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
