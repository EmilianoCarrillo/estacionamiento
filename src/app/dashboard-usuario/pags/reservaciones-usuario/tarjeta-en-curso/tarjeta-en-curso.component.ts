import { Component, OnInit, Input } from '@angular/core';
import { Reservacion } from 'src/app/modelos/Reservacion';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tarjeta-en-curso',
  templateUrl: './tarjeta-en-curso.component.html',
  styleUrls: ['./tarjeta-en-curso.component.scss']
})
export class TarjetaEnCursoComponent implements OnInit {

  @Input() reservacion: Reservacion;
  horaInicio;
  fotoUrl: Observable<string | null>;

  constructor(private storage: AngularFireStorage) {
  }

  ngOnInit() {
    const ref = this.storage.ref('autos/'+this.reservacion.auto.modelo+'.png');
    this.fotoUrl = ref.getDownloadURL();
  }

  prettyDate2(time) {
    var date = new Date(time);
    return date.toLocaleTimeString(navigator.language, {
      hour: '2-digit',
      minute:'2-digit'
    });
  }
}