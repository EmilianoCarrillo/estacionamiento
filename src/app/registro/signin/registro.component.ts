import { Component, OnInit, TemplateRef } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { NbToastrService } from '@nebular/theme';
import { NbDialogService } from '@nebular/theme';
import { AngularFirestore} from '@angular/fire/firestore';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  signinForm;
  disabledTC = false;

  constructor(
    private formBuilder: FormBuilder,
    public afAuth: AngularFireAuth,
    private toastrService: NbToastrService,
    private dialogService: NbDialogService,
    private db: AngularFirestore
    ) { 
      this.signinForm = this.formBuilder.group({
        nombre: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        contraseña: ['', [Validators.required, Validators.minLength(8)]],
        contraseña2: ['', [Validators.required, Validators.minLength(8)]],
        terminosAceptados: [false, Validators.requiredTrue]
      }, {validator: this.passwordConfirming});
    }

  ngOnInit() {
  }

  passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (c.get('contraseña').value !== c.get('contraseña2').value) {
        return {invalid: true};
    }
  }

  getFormControl(valor) {
    return this.signinForm.get(valor);
  }

  onSubmit(userData) {
    console.log('Registrando a: ', userData);
    this.afAuth.auth.createUserWithEmailAndPassword(userData.email, userData.contraseña).then((user) => {
      var usuarioNuevo = {
        nombre: userData.nombre,
        email: userData.email,
        contraseña: userData.contraseña,
        esAdmin: false
      }
      var uid = this.afAuth.auth.currentUser.uid;
      this.db.collection('usuarios').doc(uid).set(usuarioNuevo).catch(() => {
        console.error("ERROR: No se pudo guardar el usuario en Firestore")
      });
      this.toastrService.show(
        'Te has registrado correctamente',
        'Éxito',
        {
          status: 'success',
          duration: 5000
        });
    }, (error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var errorMessageEsp;
        errorMessageEsp = (errorCode == "auth/email-already-in-use" ? 
          "El correo electrónico ya está siendo usado por otra cuenta." :
          "Por favor checa tu conexión o contacta al administrador.");
        console.error('ERROR ' + errorCode + ' ' + errorMessage);
        this.toastrService.show(
          errorMessageEsp,
          'Error de registro',
          {
            status: 'danger',
            duration: 5000
          });
    });

    this.signinForm.reset();
  }

  abrirTerminosYCondiciones(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog);
    this.disabledTC = true;
  }

}
