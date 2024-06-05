import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.scss'
})
export class UserEditComponent {
  user = {
  username: 'Anne Hathaway',
  email: 'anne.hathaway@example.com',
  role: 'Admin',
  commits: 49
  };
  
  roles = ['Admin', 'User', 'Editor'];
  
  onSubmit() {
  console.log('Usuario modificado:', this.user);
  }
  }