import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { NbDialogService } from '@nebular/theme';
import { Auto } from 'src/app/modelos/Auto';
import { FormControl, FormGroup, AbstractControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { map } from 'rxjs/operators';
import { modelos } from "../../../aditional-data/modelos"

@Component({
  selector: 'app-autos-usuario',
  templateUrl: './autos-usuario.component.html',
  styleUrls: ['./autos-usuario.component.scss']
})
export class AutosUsuarioComponent implements OnInit {

  uid;
  private autosCollection: AngularFirestoreCollection<any>;
  autos: Array<any>;
  modelos: Array<any>;

  autosForm = new FormGroup({
    modelo: new FormControl('', Validators.required),
    placa: new FormControl('', Validators.required),
  });


  constructor(
    public afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private dialogService: NbDialogService,
    private toastrService: NbToastrService,
  ) { 
    this.afAuth.authState.subscribe(user => {
      if(user) {

        this.uid = user.uid;
        // AUTOS
        this.autosCollection = afs.collection<Auto>('autos',
          ref => ref.where('uid', '==', this.uid)
        );
        this.autosCollection.snapshotChanges().pipe(
          map(actions => actions.map(a => {
            const data = a.payload.doc.data() as any;
            data.id = a.payload.doc.id;
            return data;
          }))
        ).subscribe(autos => {
          this.autos = autos;
        });
        // TODOS LOS MODELOS
        this.modelos = modelos;

      }
    });
  }

  open(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog);
  }

  onAgregarAuto(){
    
    let data = this.autosForm.value;

    let nuevoAuto = {
      placa: data.placa,
      uid: this.uid,
      modelo: data.modelo
    }

    this.autosCollection.add(nuevoAuto)
    .then(d =>{
      this.toastrService.show(
      'Auto registrado',
      'Éxito',
      {
        status: 'success',
        duration: 5000
      });
    }).catch(err =>{
      console.error('ERROR ' + err.code + ' ' + err.message);
      this.toastrService.show(
        'Contacta al operador',
        'Error al agregar auto',
        {
          status: 'danger',
          duration: 5000
        });
    });
  }

  getFormControl(valor) {
    return this.autosForm.get(valor);
  }

  ngOnInit() {}

}
