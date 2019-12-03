import { Component, OnInit } from '@angular/core';
import { Reservacion } from 'src/app/modelos/Reservacion';
import { Time } from '@angular/common';
import { NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
function formatAMPM(date:Date) {
  let hours = date.getHours();
  let minutes:any = date.getMinutes();
  let ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}
class Mes{
  nMes:Number;
  nombre:string;
  count:number;
  constructor(n:number,s:string){
    this.nMes=n;
    this.nombre=s;
    this.count=0;
  }
}
class TreeNode<T> {
  data: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
}
class FSEntry {
  Fecha: string;
  Auto?: string;
  Usuario?: string;
  HoraEntrada?: string;
  HoraSalida?: string;
  Subtotal?: number; 
}
@Component({
  selector: 'app-reservaciones-admin',
  templateUrl: './reservaciones-admin.component.html',
  styleUrls: ['./reservaciones-admin.component.scss']
})
export class ReservacionesAdminComponent implements OnInit {
  reservacionesCollection: AngularFirestoreCollection<any>;
  items: Observable<any[]>;
  reservaciones: Array<any>;
  afs: AngularFirestore;
  data3: TreeNode<FSEntry>[]=new Array();
  private data: TreeNode<FSEntry>[] = [
    {
      data: { Fecha: 'Enero'},
      children: [
        { data: { Fecha: '02/01/19', Auto:'Jetta Blanco 2018', HoraEntrada:'06:00pm',HoraSalida:'08:00pm',Subtotal:120.50 } },
        { data: { Fecha: '20/01/19', Auto:'Corolla Azul 2019', HoraEntrada:'04:00pm',HoraSalida:'05:00pm',Subtotal:200.2 } },
        { data: { Fecha: '23/01/19', Auto:'Rols Royce Negro 2015', HoraEntrada:'04:30pm',HoraSalida:'05:00pm',Subtotal:200.2 } },
      ],
    },
    {
      data: { Fecha: 'Febrero'},
      children: [
        { data: { Fecha: '02/02/19', Auto:'Jetta Blanco 2018', HoraEntrada:'06:00pm',HoraSalida:'08:00pm',Subtotal:120.50 } },
        { data: { Fecha: '20/02/19', Auto:'Corolla Azul 2019', HoraEntrada:'04:00pm',HoraSalida:'05:00pm',Subtotal:200.2 } },
      ],
    },
    {
      data: { Fecha: 'Agosto'},
      children: [
        { data: { Fecha: '23/01/19', Auto:'Rols Royce Negro 2015', HoraEntrada:'04:30pm',HoraSalida:'05:00pm',Subtotal:200.2 } },
      ],
    },
  ];
  meses: Array<Mes>= new Array();
  customColumn = 'Fecha';
  defaultColumns = [ 'Usuario', 'Auto', 'HoraEntrada', 'HoraSalida','Subtotal' ];
  allColumns = [ this.customColumn, ...this.defaultColumns ];

  dataSource: NbTreeGridDataSource<FSEntry>;

  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;


  constructor( private dataSourceBuilder: NbTreeGridDataSourceBuilder<FSEntry>,
    private db: AngularFirestore,
    public afAuth: AngularFireAuth) 
    { 
      this.meses[0]=new Mes(0,"Enero");
      this.meses[1]=new Mes(1,"Febrero");
      this.meses[2]=new Mes(2,"Marzo");
      this.meses[3]=new Mes(3,"Abril");
      this.meses[4]=new Mes(4,"Mayo");
      this.meses[5]=new Mes(5,"Junio");
      this.meses[6]=new Mes(6,"Julio");
      this.meses[7]=new Mes(7,"Agosto");
      this.meses[8]=new Mes(8,"Septiembre");
      this.meses[9]=new Mes(9,"Octubre");
      this.meses[10]=new Mes(10,"Noviembre");
      this.meses[11]=new Mes(11,"Diciembre");
      this.reservaciones=new Array();
      this.afs=db;
      let data2: TreeNode<FSEntry>[]=new Array();
      this.reservacionesCollection = this.afs.collection<Reservacion>('reservaciones');
      this.reservacionesCollection.valueChanges().subscribe(resvs => {
        resvs.forEach(resv => {
          this.reservaciones.push(resv);
        });
        this.reservaciones.forEach(resv =>{
          
          let fecha=resv.horaEntrada;
          fecha=fecha.toDate();
          let n_month=fecha.getMonth();
          let aux: FSEntry={
            Fecha: '',
            Usuario: '',
            Auto: '',
            HoraEntrada: '',
            HoraSalida: '',
            Subtotal: 0, 
          };
          aux.Fecha=fecha.getDate() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear();
          aux.Auto=resv.auto.modelo;
          aux.HoraEntrada=formatAMPM(resv.horaEntrada.toDate());
          aux.HoraSalida=formatAMPM(resv.horaSalida.toDate());
          aux.Subtotal = (Math.abs(resv.horaEntrada.toDate() - resv.horaSalida.toDate()) / 36e5)*75;
          aux.Usuario=resv.usuario.nombre;
          //console.log(aux);
          if(this.meses[n_month].count==0){
            let nodo: TreeNode<FSEntry>= new TreeNode();
            let nodoValor: FSEntry=new FSEntry;
            nodoValor.Fecha=this.meses[n_month].nombre;
            nodo.data=nodoValor;
            nodo.children=[];
            let nodoChild:TreeNode<FSEntry>= new TreeNode();
            let nodoChildValue: FSEntry=new FSEntry;
            nodoChildValue=aux;
            nodoChild.data=nodoChildValue;
            nodo.children.push(nodoChild);
            data2[n_month]=new TreeNode();
            data2[n_month]=nodo;
          }
          else{
            let nodoChild:TreeNode<FSEntry>= new TreeNode();
            let nodoChildValue: FSEntry=new FSEntry;
            nodoChildValue=aux;
            nodoChild.data=nodoChildValue;
            data2[n_month].children.push(nodoChild);
          }
          this.meses[n_month].count++;
        });
        
        data2.forEach(datei =>{
          if(datei)
            this.data3.push(datei);
        });
        console.log(this.data3);
        this.dataSource = this.dataSourceBuilder.create(this.data3);
      }); 
    }

  ngOnInit() {
  }
  updateSort(sortRequest: NbSortRequest): void {
    this.sortColumn = sortRequest.column;
    this.sortDirection = sortRequest.direction;
  }

  getSortDirection(column: string): NbSortDirection {
    if (this.sortColumn === column) {
      return this.sortDirection;
    }
    return NbSortDirection.NONE;
  }  

  getShowOn(index: number) {
    const minWithForMultipleColumns = 500;
    const nextColumnStep = 100;
    return minWithForMultipleColumns + (nextColumnStep * index);
  }
}
