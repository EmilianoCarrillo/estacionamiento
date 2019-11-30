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
          link: [],
        },
        {
          title: 'Reservaciones',
          icon: 'bookmark-outline',
          link: [],
        }
      ];
    }else{
       this.items = [{
          title: 'Reservaciones',
          icon: 'bookmark-outline',
          link: [],
        },
        {
          title: 'Autos',
          icon: 'car-outline',
          link: [],
        },
        {
          title: 'Estado de cuenta',
          icon:'credit-card-outline',
          link: '',
        },
      ];
    }
  }

}
