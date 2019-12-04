import { Component, OnInit, TemplateRef } from '@angular/core';
import { Usuario } from 'src/app/modelos/Usuario';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { Reservacion } from 'src/app/modelos/Reservacion';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { NbDialogService, NbDateService } from '@nebular/theme';
import { Auto } from 'src/app/modelos/Auto';
import { FormControl, FormGroup, AbstractControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { map } from 'rxjs/operators';



@Component({
  selector: 'app-reservaciones-usuario',
  templateUrl: './reservaciones-usuario.component.html',
  styleUrls: ['./reservaciones-usuario.component.scss']
})
export class ReservacionesUsuarioComponent implements OnInit {

  private reservacionesCollection: AngularFirestoreCollection<any>;
  private autosCollection: AngularFirestoreCollection<Auto>;
  reservacionesEnCurso : Array<any>;
  reservacionesPasadas: Array<any>;
  reservacionesProximas: Array<any>;
  autos: Array<any>;

  uid: string;
  userNombre: any;
  ayer = new Date();

  resvForm = new FormGroup({
    fecha: new FormControl('', Validators.required),
    horaInicio: new FormControl('', Validators.required),
    horaFin: new FormControl('', Validators.required),
    auto: new FormControl('', Validators.required),
  },{validators: this.hoursConfirming});

  hoursConfirming(c: AbstractControl): { invalid: boolean } {
    if (c.get('horaInicio').value >= c.get('horaFin').value) {
        return {invalid: true};
    }
  }

  getFormControl(valor) {
    return this.resvForm.get(valor);
  }

  constructor(
    public afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private dialogService: NbDialogService,
    protected dateService: NbDateService<Date>,
    private toastrService: NbToastrService,
  ) { 
    
    let hoy= new Date();
    this.ayer.setDate(hoy.getDate() - 1);

    this.afAuth.authState.subscribe(user => {
      if(user) {
        this.uid = user.uid;

        afs.collection('usuarios').doc(this.uid).get().subscribe(doc => {
          this.userNombre = doc.data().nombre
        });

        // AUTOS
        this.autosCollection = afs.collection<Auto>('autos',
          ref => ref.where('uid', '==', this.uid)
        );
        this.autosCollection.valueChanges().subscribe(autos => {
          this.autos = autos;
        });

        // RESERVACIONES
        this.reservacionesCollection = afs.collection<Reservacion>('reservaciones',
          ref => ref.where('usuario.uid', '==', this.uid)
          //.orderBy('horaEntrada')
        );
        
        this.reservacionesCollection.snapshotChanges().pipe(
          map(actions => actions.map(a => {

            const data = a.payload.doc.data() as any;
            data.id = a.payload.doc.id;
            return data;

          }))
        ).subscribe(resvs => {
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

  onSubmitAdd() {
    let data = this.resvForm.value;

    let nuevaResv = {
      usuario : {
        nombre: '',
        uid: ''
      },
      auto:{},
      horaEntrada: new Date(),
      horaSalida: new Date(),
      cajon: ''
    };

    nuevaResv.usuario.nombre = this.userNombre;
    nuevaResv.usuario.uid = this.uid;
    nuevaResv.cajon = '';
    let fecha = data.fecha;
    nuevaResv.horaEntrada = new Date(fecha.setHours(
      data.horaInicio.split(':')[0], data.horaInicio.split(':')[1]));
    nuevaResv.horaSalida = new Date(fecha.setHours(
      data.horaFin.split(':')[0], data.horaFin.split(':')[1]));
    
    this.autos.forEach(auto =>{
      if(auto.modelo == data.auto)
        nuevaResv.auto = auto;
    });   

    let existe = false;
    let randomId;
    do{
      randomId = this.makeid(5);
      this.afs.firestore.collection('reservaciones').doc(randomId).get().then(docSanp => {
        if(docSanp.exists) existe = true;
      });
    }while(existe);

    this.reservacionesCollection.doc(randomId).set(nuevaResv).then(d =>{
      this.toastrService.show(
        'Has reservado un cajón',
        'Éxito',
        {
          status: 'success',
          duration: 5000
        });
    }).catch(err =>{
      console.error('ERROR ' + err.code + ' ' + err.message);
      this.toastrService.show(
        'Contacta al operador',
        'Error de reserva',
        {
          status: 'danger',
          duration: 5000
        });
    });
    
    // .add(nuevaResv)

    this.resvForm.reset();
  }

  makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

}
