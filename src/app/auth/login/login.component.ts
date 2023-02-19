import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { isLoading } from '../../shared/ui.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  cargando: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      "email": ["jose@test.com", [Validators.required, Validators.email]],
      "password": ["123456", [Validators.required]]
    });

    this.store.select("ui").subscribe(ui => {
      this.cargando = ui.isLoading;
    })
  }

  loginUsuario() {
    if (this.loginForm.valid) {
      this.store.dispatch(isLoading());

      const { email, password } = this.loginForm.value;
      this.authService.loginUsuario(email, password)
        .then(login => {
          console.log("login", login);
          this.router.navigate(["/"]);
        }).catch(error => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.message,
            footer: '<a href="">Why do I have this issue?</a>'
          })
        });
    }
  }
}
