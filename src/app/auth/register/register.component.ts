import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registroForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.registroForm = this.fb.group({
      nombre: ["", Validators.required],
      correo: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required]
    })
  }

  crearUsuario() {
    if (this.registroForm.valid) {
      const { nombre, correo, password } = this.registroForm.value;
      this.authService.crearUsuario(nombre, correo, password);
    }



  }
}
