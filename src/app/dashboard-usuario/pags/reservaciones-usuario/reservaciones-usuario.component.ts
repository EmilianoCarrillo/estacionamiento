import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/modelos/Usuario';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Reservacion } from 'src/app/modelos/Reservacion';

@Component({
  selector: 'app-reservaciones-usuario',
  templateUrl: './reservaciones-usuario.component.html',
  styleUrls: ['./reservaciones-usuario.component.scss']
})
export class ReservacionesUsuarioComponent implements OnInit {

  private reservacionesCollection: AngularFirestoreCollection<Reservacion>;
  reservaciones: Observable<Reservacion[]>;
  reservacionesEnCurso = new Array<Reservacion>();
  uid: string;

  constructor(
    public afAuth: AngularFireAuth,
    private afs: AngularFirestore
  ) { 
    
    this.afAuth.authState.subscribe(user => {
      if(user) {
        this.uid = user.uid;

        this.reservacionesCollection = afs.collection<Reservacion>('reservaciones',
          ref => ref.where('usuario.uid', '==', this.uid)
        );
        this.reservaciones = this.reservacionesCollection.valueChanges();

        // Tomar las reservaciones actuales
        this.reservaciones.subscribe(resvs =>{
          resvs.forEach(resv => {
            let ahorita = new Date();
            if(resv.horaSalida.toDate() > ahorita && resv.horaEntrada.toDate() < ahorita){  
              this.reservacionesEnCurso.push(resv);
            }
          });
        });
      }
    });
    
  }

  ngOnInit() {}

}
