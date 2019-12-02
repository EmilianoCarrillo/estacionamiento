import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Input() esAdmin;

  items = [];

  constructor() { }

  ngOnInit() {
    if(this.esAdmin){
      this.items = [
        {
          title: 'Datos tiempo real',
          icon: 'pie-chart-outline',
          link: 'tiemporeal-admin',
        },
        {
          title: 'Reservaciones',
          icon: 'bookmark-outline',
          link: 'reservaciones-admin',
        }
      ];
    }else{
       this.items = [{
          title: 'Reservaciones',
          icon: 'bookmark-outline',
          link: 'reservaciones-usuario'
        },
        {
          title: 'Autos',
          icon: 'car-outline',
          link: 'autos-usuario',
        },
        {
          title: 'Estado de cuenta',
          icon:'credit-card-outline',
          link: 'edoscuenta-usuario',
        },
      ];
    }
  }

}
