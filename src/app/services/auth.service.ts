import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public auth: AngularFireAuth) { }

  crearUsuario(nombre: string, correo: string, password: string) {
    console.log(nombre, correo, password);
    this.auth.signInWithEmailAndPassword(correo, password)
      .then(credenciales => console.log(credenciales))
      .catch(error => console.error(error));
  }
}
