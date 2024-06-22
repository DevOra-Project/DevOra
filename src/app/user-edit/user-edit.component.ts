import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../utilities/models/user';
import { UserService } from '../utilities/services/user.service';

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
export class UserEditComponent implements OnInit{
/*   user = {
  username: 'Anne Hathaway',
  email: 'anne.hathaway@example.com',
  role: 'Admin',
  commits: 49
  };
   */

  user:User|any

  positions = ['Developer', 'QA', 'Editor'];
  
  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.getUser(3).subscribe((us:User)=>{
      this.user=us;
    })
  }
  onSubmit() {
    console.log('Usuario modificado:', this.user);
    this.userService.updateUser(this.user.id,this.user).subscribe((res:any)=>{
      console.log(res)
    });
  }
}