import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../utilities/services/user.service';
import { CookiesService } from '../utilities/services/cookies.service';
import { AuthService } from '../utilities/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-history',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    
  ],
  templateUrl: './login-history.component.html',
  styleUrl: './login-history.component.scss'
})
export class LoginHistoryComponent  implements OnInit {
  loginHistory: any[] = [];

  constructor(private authService: AuthService,
      private cookiesService: CookiesService,
      private toastr: ToastrService) { }

  ngOnInit(): void {
    const userId = parseInt(this.cookiesService.getToken('user_id')); // Obtener el ID del usuario de las cookies

    
    // Llamar al servicio para obtener el historial de inicio de sesión
    this.authService.getLoginHistory(userId).subscribe(
      (data) => {
        this.loginHistory = data;
      },
      (error) => {
        console.error('Error al obtener el historial de inicio de sesión', error);
        if (error.status === 500) {
          this.toastr.error('Hubo un problema al obtener el historial, intenta de nuevo más tarde');
        } else {
          this.toastr.error('Error al obtener el historial');
        }
      }
    );
  }
  
}