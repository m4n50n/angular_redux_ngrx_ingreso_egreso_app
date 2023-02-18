import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public auth: AngularFireAuth,
    private firestore: AngularFirestore
  ) { }

  initAuthListener() {
    this.auth.authState.subscribe(fuser => {
      console.log(fuser);
      console.log(fuser?.uid);
      console.log(fuser?.email);

      return fuser;
    })
  }

  crearUsuario(nombre: string, correo: string, password: string) {
    console.log(nombre, correo, password);
    return this.auth.signInWithEmailAndPassword(correo, password)
      .then(({ user }) => {
        const newUser = new Usuario(user?.uid, nombre, user?.email);
        return this.firestore.doc(`${user?.uid}/usuario`).set({ ...newUser }); // Usamos la destructuración de newUser para no enviar la instancia de la clase
      });
  }

  loginUsuario(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  isAuth() {
    return this.auth.authState.pipe(
      map(fbUser => fbUser != null)
    );
  }
}
