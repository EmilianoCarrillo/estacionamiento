import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { NbDialogService } from '@nebular/theme';
import { Auto } from 'src/app/modelos/Auto';
import { FormControl, FormGroup, AbstractControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-autos-usuario',
  templateUrl: './autos-usuario.component.html',
  styleUrls: ['./autos-usuario.component.scss']
})
export class AutosUsuarioComponent implements OnInit {

  uid;
  private autosCollection: AngularFirestoreCollection<Auto>;
  autos: Array<any>;


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
        this.autosCollection.valueChanges().subscribe(autos => {
          this.autos = autos;
        });


      }
    });
  }

  ngOnInit() {
  }

}
