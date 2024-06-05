import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginData = {
    usernameOrEmail: '',
    password: ''
  };
  onSubmit() {}
/*   constructor(private authService: AuthService) {}

  onSubmit() {
    this.authService.login(this.loginData.usernameOrEmail, this.loginData.password)
      .subscribe(
        response => console.log('Inicio de sesión exitoso:', response),
        error => console.error('Error de inicio de sesión:', error)
      );
  } */
}