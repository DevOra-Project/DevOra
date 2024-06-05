import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

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
  user = {
    username: '',
    email: '',
    role: ''
  };

  roles = ['Admin', 'User', 'Editor'];

  onSubmit() {
    console.log('Usuario guardado:', this.user);
  }

}
