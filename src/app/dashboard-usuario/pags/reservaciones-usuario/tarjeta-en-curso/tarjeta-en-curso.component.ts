import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { Reservacion } from 'src/app/modelos/Reservacion';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Auto } from 'src/app/modelos/Auto';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { NbToastrService } from '@nebular/theme';
import { NbDialogService } from '@nebular/theme';



@Component({
  selector: 'app-tarjeta-en-curso',
  templateUrl: './tarjeta-en-curso.component.html',
  styleUrls: ['./tarjeta-en-curso.component.scss']
})
export class TarjetaEnCursoComponent implements OnInit {

  @Input() reservacion: any;
  horaInicio;
  fotoUrl: Observable<string | null>;
  horasMas = new FormControl('', Validators.required);
  private reservacionesCollection: AngularFirestoreCollection<any>;
  reservacionDoc;
  costo: number;

  constructor(
    private storage: AngularFireStorage,
    private dialogService: NbDialogService,
    private afs: AngularFirestore,
    private toastrService: NbToastrService,
    ) {
      this.reservacionesCollection = afs.collection('reservaciones');
    }

  ngOnInit() {
    if (this.reservacion)
        this.costo = (this.reservacion.horaSalida.toDate().getHours() - this.reservacion.horaEntrada.toDate().getHours())*75;

    const ref = this.storage.ref('autos/'+this.reservacion.auto.modelo+'.png');
    this.fotoUrl = ref.getDownloadURL();

    if(this.reservacion.id)
      this.reservacionDoc = this.reservacionesCollection.doc(this.reservacion.id);
  }

  prettyDate2(time) {
    var date = new Date(time);
    return date.toLocaleTimeString(navigator.language, {
      hour: '2-digit',
      minute:'2-digit'
    });
  }

  alargarReserv(){
    const id = this.reservacion.id.toString();

    console.log(id);
    
  }

  open(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog);
  }

  onSubmit(){

    let newHoraSalida = new Date(this.reservacion.horaSalida.toDate());
    newHoraSalida.setHours( newHoraSalida.getHours() + this.horasMas.value);
    
    this.reservacionDoc.update({
      horaSalida: newHoraSalida
    }).then(ref =>{
      this.toastrService.show(
        'Cita alargada',
        'Éxito',
        {
          status: 'success',
          duration: 5000
        });
    }).catch(err => {
      console.error('ERROR ' + err.code + ' ' + err.message);
      this.toastrService.show(
        'Contacta al operador',
        'Error al alargar cita',
        {
          status: 'danger',
          duration: 5000
        });
    });
      
  }
  
}