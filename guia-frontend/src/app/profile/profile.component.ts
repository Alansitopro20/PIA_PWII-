import { Component } from '@angular/core';
import { Userservice } from '../services_/userservice';
import { UserModel } from '../models_/usermodel';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [NgIf],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  information:any;
  token:string='';
  profileData:any; 
  loading: boolean = true;
  errorMsg: string = '';
  //products:Array<Product>=[]; 
  //private productService: ProductService
  constructor(private userService: Userservice, private router: Router) {
    const user = sessionStorage.getItem('user');
    if (user) {
      this.information = JSON.parse(user);
      this.token = this.information.token;
      this.loadProfile();
     // this.loadProducts();
    }
    else{
      this.router.navigate(['/login']);
    }
  }
   loadProfile() {
    this.loading = true;
    this.userService.getProfile(this.information.user.email, this.token).subscribe({
      next: (profile) => {
        this.profileData = profile;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar el perfil:', error);
        this.loading = false;
        if (error.status === 401) {
          this.errorMsg = 'Sesión expirada. Redirigiendo al login...';
          setTimeout(() => {
            sessionStorage.clear();
            this.router.navigate(['/login']);
          }, 2000);
        } else {
          this.errorMsg = 'Error al cargar el perfil.';
        }
      }
    });
  }
    logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
  /*loadProducts() {
    this.productService.getall(this.token).subscribe(
      products => {
        this.products = products;
        console.log('Products loaded:', this.products);
      },
      error => {
        console.error('Failed to load products:', error);
      }
    );
  }*/
}
