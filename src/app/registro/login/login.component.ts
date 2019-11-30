import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { NbToastrService } from '@nebular/theme';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm;
  usuarioActual;

  constructor(
    private formBuilder: FormBuilder,
    public afAuth: AngularFireAuth,
    private toastrService: NbToastrService,
    private db: AngularFirestore,
    private router: Router
    ) { 
      this.loginForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        contraseña: ['', [Validators.required]],
      });
    }

  ngOnInit() {
  }

  getFormControl(valor) {
    return this.loginForm.get(valor);
  }

  onSubmit(userData) {
    console.log('Logueando a: ', userData);
    
    this.afAuth.auth.signInWithEmailAndPassword(userData.email, userData.contraseña).then((user) =>{
      this.router.navigate(["../../dashboard-usuario"]);
      console.log("Login exitoso")
    }, (error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      var errorMessageEsp;
      errorMessageEsp = ((errorCode == "auth/user-not-found" || errorCode == "auth/wrong-password") ? 
        "El usuario o contraseñas son incorrectos." :
        "Por favor checa tu conexión o contacta al administrador.");
      console.error('ERROR ' + errorCode + ' ' + errorMessage);
      this.toastrService.show(
        errorMessageEsp,
        'Error al iniciar sesión',
        {
          status: 'danger',
          duration: 5000
        });
    });
    this.loginForm.reset();
  }

}
