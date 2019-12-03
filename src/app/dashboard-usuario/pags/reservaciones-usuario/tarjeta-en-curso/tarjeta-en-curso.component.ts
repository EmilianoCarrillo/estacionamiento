import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { Reservacion } from 'src/app/modelos/Reservacion';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { NbDialogService } from '@nebular/theme';
import { Validators } from '@angular/forms';



@Component({
  selector: 'app-tarjeta-en-curso',
  templateUrl: './tarjeta-en-curso.component.html',
  styleUrls: ['./tarjeta-en-curso.component.scss']
})
export class TarjetaEnCursoComponent implements OnInit {

  @Input() reservacion: Reservacion;
  horaInicio;
  fotoUrl: Observable<string | null>;
  horasMas = new FormControl('', Validators.required);

  constructor(
    private storage: AngularFireStorage,
    private dialogService: NbDialogService,
    ) {}

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

  alargarReserv(){
    const id = this.reservacion.id.toString();

    console.log(id);
    
  }

  open(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog);
  }
}