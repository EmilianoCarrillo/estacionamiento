import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { Auto } from '../../../../modelos/Auto';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { NbToastrService } from '@nebular/theme';
import { NbDialogService } from '@nebular/theme';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';


@Component({
  selector: 'app-tarjeta-auto',
  templateUrl: './tarjeta-auto.component.html',
  styleUrls: ['./tarjeta-auto.component.scss']
})
export class TarjetaAutoComponent implements OnInit {

  @Input() auto: any;
  fotoUrl: Observable<string | null>;
  private autosCollection: AngularFirestoreCollection<any>;


  constructor(
    private storage: AngularFireStorage,
    private dialogService: NbDialogService,
    private toastrService: NbToastrService,
    private afs: AngularFirestore,
  ) { 
    this.autosCollection = this.afs.collection('autos');
  }

  ngOnInit() {
    const ref = this.storage.ref('autos/'+this.auto.modelo+'.png');
    this.fotoUrl = ref.getDownloadURL();
  }

  open(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog);
  }

  onEliminarAuto(){
    this.autosCollection.doc(this.auto.id).delete()
    .then(ref =>{
      this.toastrService.show(
        'Auto Eliminado',
        'Éxito',
        {
          status: 'success',
          duration: 5000
        });
    }).catch(err => {
      console.error('ERROR ' + err.code + ' ' + err.message);
      this.toastrService.show(
        'Contacta al operador',
        'Error al eliminar auto',
        {
          status: 'danger',
          duration: 5000
        });
    });
  }

  titleCase(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    return splitStr.join(' '); 
 } 

}
