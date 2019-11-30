import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-dashboard-usuario',
  templateUrl: './dashboard-usuario.component.html',
  styleUrls: ['./dashboard-usuario.component.scss']
})
export class DashboardUsuarioComponent implements OnInit {

  uid;
  usuario;

  constructor(
    public afAuth: AngularFireAuth,
    private db: AngularFirestore,
  ) { }

  ngOnInit() {
    this.afAuth.authState.subscribe(user => {
      if(user) {
        this.uid = user.uid;
        this.db.collection('usuarios').doc(this.uid).valueChanges().subscribe(data => {
          this.usuario = data;
        });
      }
    });
  }

}
