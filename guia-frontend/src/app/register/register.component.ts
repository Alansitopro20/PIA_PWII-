import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Userservice } from '../services_/userservice';
import { UserModel } from '../models_/usermodel';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  signinForm: FormGroup<{
    name: FormControl<string | null>;
    email: FormControl<string | null>;
    password: FormControl<string | null>;
    type: FormControl<string | null>;
    city: FormControl<string| null>;
  }>;

  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;

  loading = false;
  showError = false;
  isLocal = false;
  toastMessage: string | null = null;

  constructor(private fb: FormBuilder, private userService: Userservice) {
    this.signinForm = this.fb.group({
      name: this.fb.control('', Validators.required),
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required, Validators.minLength(6)]),
      type: this.fb.control('', Validators.required),
      city:this.fb.control(''),
    });

    // Detecta cuando el usuario cambia el tipo (local o turista)
    this.signinForm.get('type')?.valueChanges.subscribe(value => {
      const cityControl = this.signinForm.get('city');

      this.isLocal = value === 'local';

      if (value === 'local') {
        cityControl?.setValidators([Validators.required]);
      } else {
        cityControl?.clearValidators();
        cityControl?.setValue(null); // 👈 opcional, limpia el valor
      }
      cityControl?.updateValueAndValidity();
    });
  }

  // Atajo para acceder a los controles del formulario
  get f() {
    return this.signinForm.controls;
  }

  // Mostrar previsualización de imagen
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = () => (this.previewUrl = reader.result);
      reader.readAsDataURL(file);
    }
  }

  // Función para mostrar mensajes tipo toast
  showToast(msg: string) {
    this.toastMessage = msg;
    setTimeout(() => (this.toastMessage = null), 3000);
  }

  // Función principal de registrarse
  signin() {
    if (this.signinForm.invalid) {
      this.showError = true;
      return;
    }

    const formValue = this.signinForm.value;

    // Construimos un FormData en lugar de enviar JSON
    const formData = new FormData();
    formData.append('name', formValue.name!);
    formData.append('email', formValue.email!);
    formData.append('password', formValue.password!);
    formData.append('type', formValue.type!);
    if (this.selectedFile) {
      formData.append('photo', this.selectedFile);
    }
    if (formValue.city) formData.append('city', formValue.city!);


    this.loading = true;
    this.userService.createUser(formData).subscribe({
      next: (userId) => {
        console.log('User created with ID:', userId);
        this.showToast('Usuario registrado con éxito 🎉');
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.showError = true;
        this.loading = false;
      }
    });
  }

}
