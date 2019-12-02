import { Component, OnInit, Input } from '@angular/core';
import { Reservacion } from 'src/app/modelos/Reservacion';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tarjeta-pasada',
  templateUrl: './tarjeta-pasada.component.html',
  styleUrls: ['./tarjeta-pasada.component.scss']
})
export class TarjetaPasadaComponent implements OnInit {

  @Input() reservacion: any;
  costo: number;

  constructor() { }

  ngOnInit() {
    let duracion = this.reservacion.horaSalida.toDate().getHours() - this.reservacion.horaEntrada.toDate().getHours();
    this.costo = duracion * 75;
  }

  prettyTime(time) {
    var date = new Date(time);
    return date.toLocaleTimeString(navigator.language, {
      hour: '2-digit',
      minute:'2-digit'
    });
  }

  prettyDate(d) {
    var date = new Date(d);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let fecha = date.toLocaleDateString('es-MX', options);
    return fecha.charAt(0).toUpperCase() + fecha.slice(1);
  }

}
