import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { Reservacion } from 'src/app/modelos/Reservacion';
import { Observable } from 'rxjs';
import { NbToastrService } from '@nebular/theme';
import { NbDialogService } from '@nebular/theme';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Component({
  selector: 'app-tarjeta-pasada',
  templateUrl: './tarjeta-pasada.component.html',
  styleUrls: ['./tarjeta-pasada.component.scss']
})
export class TarjetaPasadaComponent implements OnInit {

  @Input() reservacion: any;
  @Input() deletable: boolean;
  costo: number;
  private reservacionesCollection: AngularFirestoreCollection<any>;

  constructor(
    private dialogService: NbDialogService,
    private toastrService: NbToastrService,
    private afs: AngularFirestore,
  ) { 
    this.reservacionesCollection = this.afs.collection('reservaciones');
  }

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

  open(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog);
  }

  onCancelar(){
    let id = this.reservacion.id;

    this.reservacionesCollection.doc(id).delete()
    .then(ref =>{
      this.toastrService.show(
        'Cita Eliminada',
        'Éxito',
        {
          status: 'success',
          duration: 5000
        });
    }).catch(err => {
      console.error('ERROR ' + err.code + ' ' + err.message);
      this.toastrService.show(
        'Contacta al operador',
        'Error al cancelar cita',
        {
          status: 'danger',
          duration: 5000
        });
    });
  }

}
