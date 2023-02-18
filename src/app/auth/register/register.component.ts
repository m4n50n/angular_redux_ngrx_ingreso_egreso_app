import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registroForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registroForm = this.fb.group({
      nombre: ["Jose García", Validators.required], // Escribo por defecto las credenciales de prueba para no tenero que escribirlas
      correo: ["jose@test.com", [Validators.required, Validators.email]],
      password: ["123456", Validators.required]
    })
  }

  crearUsuario() {
    if (this.registroForm.valid) {
      const { nombre, correo, password } = this.registroForm.value;
      this.authService.crearUsuario(nombre, correo, password)
        .then(credenciales => {
          console.log(credenciales);
          this.router.navigate(["/"])
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
