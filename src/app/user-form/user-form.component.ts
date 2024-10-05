import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../utilities/models/user';
import { UserService } from '../utilities/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent {
  user: User = {
    id: 0,
    name: '',
    username: '',
    email: '',
    profileImage: '',
    description: '',
    posts: 0,
    commits: 0,
    messages: 0,
    invites: 0,
    events: 0,
    statistics: null,
    projectsProgress: [],
    password: '',
    role: ''
  };

  roles = ['Admin', 'User', 'Editor', 'Viewer'];

  constructor(
    private userService: UserService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  // Función de validación manual
  validateUser(): boolean {
    if (!this.user.name) {
      this.toastrService.error('El nombre es obligatorio');
      return false;
    }

    if (!this.user.username) {
      this.toastrService.error('El nombre de usuario es obligatorio');
      return false;
    }

    if (!this.user.email || !this.isValidEmail(this.user.email)) {
      this.toastrService.error('Correo electrónico es obligatorio y debe ser válido');
      return false;
    }

    if (!this.user.password || this.user.password.length < 6) {
      this.toastrService.error('La contraseña es obligatoria y debe tener al menos 6 caracteres');
      return false;
    }

    if (!this.user.role) {
      this.toastrService.error('Debes seleccionar un rol');
      return false;
    }

    return true; // Todo está correcto
  }

  // Función para validar formato de email
  isValidEmail(email: string): boolean {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return re.test(String(email).toLowerCase());
  }

  onSubmit() {
    // Llamamos a la función de validación antes de crear el usuario
    if (!this.validateUser()) {
      // Si hay un error en la validación, no hacemos la llamada a la API
      return;
    }

    // Llamamos al servicio para crear el usuario si la validación es exitosa
    this.userService.createUser(this.user).subscribe(
      (response) => {
        console.log('Usuario creado exitosamente:', response);
        this.toastrService.success('Usuario creado exitosamente');
        this.router.navigateByUrl("/login");
      },
      (error) => {
        console.error('Error al crear usuario:', error);
        this.toastrService.error('Error al crear usuario');
      }
    );
  }
}
