import { Component, OnInit, TemplateRef } from '@angular/core';
import { Usuario } from 'src/app/modelos/Usuario';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Reservacion } from 'src/app/modelos/Reservacion';
import { NbDialogService } from '@nebular/theme';


@Component({
  selector: 'app-reservaciones-usuario',
  templateUrl: './reservaciones-usuario.component.html',
  styleUrls: ['./reservaciones-usuario.component.scss']
})
export class ReservacionesUsuarioComponent implements OnInit {

  private reservacionesCollection: AngularFirestoreCollection<any>;
  reservaciones: Observable<any[]>;
  reservacionesEnCurso : Array<any>;
  reservacionesPasadas: Array<any>;
  reservacionesProximas: Array<any>;
  uid: string;

  constructor(
    public afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private dialogService: NbDialogService
  ) { 
    
    this.afAuth.authState.subscribe(user => {
      if(user) {
        this.uid = user.uid;

        this.reservacionesCollection = afs.collection<Reservacion>('reservaciones',
          ref => ref.where('usuario.uid', '==', this.uid)
        );
        
        this.reservacionesCollection.valueChanges().subscribe(resvs => {

          // Reservaciones Actuales
          this.reservacionesEnCurso = new Array<Reservacion>();
          resvs.forEach(resv => {
            let ahorita = new Date();
            if(resv.horaSalida.toDate() > ahorita && resv.horaEntrada.toDate() < ahorita){  
              this.reservacionesEnCurso.push(resv);
            }
          });

          // Reservaciones Pasadas
          this.reservacionesPasadas = new Array<Reservacion>();
          resvs.forEach(resv => {
            let ahorita = new Date();
            if(resv.horaSalida.toDate() < ahorita){
              this.reservacionesPasadas.push(resv);
            }
          });

          // Reservaciones Pasadas
          this.reservacionesProximas = new Array<Reservacion>();
          resvs.forEach(resv => {
            let ahorita = new Date();
            if(resv.horaEntrada.toDate() > ahorita){
              this.reservacionesProximas.push(resv);
            }
          });

        });
      }
    });
    
  }

  open(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog);
  }

  ngOnInit() {}

}
