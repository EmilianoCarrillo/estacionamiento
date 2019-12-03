import { Component, OnInit, Input } from '@angular/core';
import { Auto } from '../../../../modelos/Auto';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-tarjeta-auto',
  templateUrl: './tarjeta-auto.component.html',
  styleUrls: ['./tarjeta-auto.component.scss']
})
export class TarjetaAutoComponent implements OnInit {

  @Input() auto: Auto;
  fotoUrl: Observable<string | null>;

  constructor(
    private storage: AngularFireStorage,
  ) { }

  ngOnInit() {
    const ref = this.storage.ref('autos/'+this.auto.modelo+'.png');
    this.fotoUrl = ref.getDownloadURL();
  }

  onTarjetaClicked(){
    console.log("Hola");
  }

  titleCase(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    return splitStr.join(' '); 
 } 

}
