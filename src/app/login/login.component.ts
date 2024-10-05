import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../utilities/services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CookiesService } from '../utilities/services/cookies.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../utilities/services/user.service';
import { User } from '../utilities/models/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterModule,
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
/*   onSubmit() {} */
  constructor(private authService: AuthService,
    private userService:UserService,
    private toastr: ToastrService,
    private cookiesService: CookiesService,
    private router: Router
  ) {}

  onSubmit() {
    this.authService.login(this.loginData.usernameOrEmail, this.loginData.password)
      .subscribe(
        response =>{ 
          console.log('Inicio de sesión exitoso:', response);
          this.toastr.success('Inicio de sesión exitoso')
          this.setTokens(response.user)
          this.router.navigateByUrl("/")
        },
        error =>{
          console.error('Error de inicio de sesión:', error)
          this.toastr.error('Error de inicio de sesión:', error)
        }
      
      );
  }

  setTokens(user:User){
    console.log(user)
    this.cookiesService.setToken("user_id",user.id.toString());
    ////CAMBIAR AL HR ROLE
    this.cookiesService.setToken("user_role",user.position!);
    console.log( this.cookiesService.getToken("user_role"))
  }

  toRegister(){
   /*  this.authService.onRegistering() */
  }
}