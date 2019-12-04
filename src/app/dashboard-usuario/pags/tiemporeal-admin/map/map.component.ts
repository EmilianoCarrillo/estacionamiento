import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  @Input() letter: any;
  private reservacionesCollection: AngularFirestoreCollection<any>;
  hoy = new Date();
  reservaciones: Array<any>
  AList = new Array<any>();
  BList= new Array<any>();

  constructor(
    private afs: AngularFirestore,
  ) { 

    this.reservacionesCollection = this.afs.collection('reservaciones',ref =>
      ref.where('cajon','>',''));

   this.reservacionesCollection.valueChanges().subscribe(data => {
      this.reservaciones = data

      this.AList = new Array();
      this.BList = new Array();
      this.reservaciones.forEach(resv => {

        if(resv.horaSalida.toDate() > this.hoy && resv.horaEntrada.toDate() < this.hoy){  
          if(resv.cajon > "A" && resv.cajon < "B"){
            this.AList.push(resv);
          }else{
            this.BList.push(resv);
          }
        }
      });

    });


  }

  ngOnInit() {}

  fill(num){
    let list = (this.letter == "A" ? this.AList : this.BList);
    let cajon = this.letter + num;
    let filteredList = list.filter(r => ( r.cajon === cajon));

    if(filteredList.length > 0){
      return "#2e3a59"
    }
    return "#edf1f7"
  }

  getName(num){
    let list = (this.letter == "A" ? this.AList : this.BList);
    let cajon = this.letter + num;
    let filteredList = list.filter(r => (r.cajon === cajon));

    if(filteredList.length > 0){
      return filteredList[0].usuario.nombre + " ~ "+ filteredList[0].auto.modelo;
    }
    return "-"
  }

}
