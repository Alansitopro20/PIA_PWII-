  import { Component } from '@angular/core';
  import { Userservice } from '../services_/userservice';
  import { UserCredentials } from '../models_/usermodel';
  import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl  } from '@angular/forms';
  import { CommonModule } from '@angular/common';

  @Component({
    selector: 'app-login',
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
  })
  export class LoginComponent {
    // *** Propiedades para iniciar sesión ***
    //estructura del formulario
    loginForm: FormGroup<{
    email: FormControl<string | null >;
    password: FormControl<string | null>;
  }>;
    loading=false; //booleano para respuesta del backend
    showError=false; //booleano para mensajes de error
    toastMessage: string | null = null;

    /* CONSTRUCTOR: se ejecuta una sola vez, inicializa propiedades, inyecta dependencias 
          fb: ayuda a crear y configurar formularios de manera más limpia.
          userService: centraliza toda la lógica que tiene que ver con peticiones HTTP sobre usuarios */
    constructor(private fb: FormBuilder, private userService:Userservice){
      this.loginForm=this.fb.group({
        email: this.fb.control('', [Validators.required, Validators.email]),
        password: this.fb.control('', [Validators.required, Validators.minLength(6)]),
      });
    }

    // Atajo para acceder a los controles del formulario
    get f(){
      return this.loginForm.controls;
    }

    // Funcion para mostrar los toast
    showToast(msg: string) {
    this.toastMessage = msg;
    setTimeout(() => this.toastMessage = null, 3000);
    }

    // Función para iniciar sesión
    login (){
      if (this.loginForm.invalid) return;

      const credentials: UserCredentials = {
        email: this.loginForm.value.email ?? '',
        password: this.loginForm.value.password ?? ''
      };

      this.loading=true;
      this.showError=false;

      this.userService.login(credentials).subscribe({
      next: (response) => {
        this.showToast('Inicio de sesión exitoso 🎉');
        sessionStorage.setItem('user', JSON.stringify(response));
        window.location.href = '/profile';
      },
      error: () => {
        this.showToast('Error al iniciar sesión 😢');
        this.loading = false;
      }
    });

  }

}