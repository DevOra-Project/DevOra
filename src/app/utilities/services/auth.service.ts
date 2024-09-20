import { Injectable, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { CookiesService } from './cookies.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.apiUrl;


  constructor(private router: Router,
    private cookieService: CookiesService,
    private http:HttpClient) { }


  logout(): void {
    this.cookieService.deleteToken('user_id');
    this.router.navigateByUrl('/login');
  }

  isAuthenticated(): boolean {
    console.log("gettok",this.cookieService.getToken("user_id"));

    return this.cookieService.checkToken('user_id'); 
  }

  getUserRole(){
    const token = this.cookieService.getToken('user_role');
    console.log("userrole",token,this.cookieService.getToken('user_role'))
    // if (!token) {
    //   return null;
    // }
    // Supongamos que el token contiene los roles en un formato JWT
    // const payload = JSON.parse(atob(token.split('.')[1]));
    //return payload.role;
    return this.cookieService.getToken('user_role');
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.baseUrl+'/login', { username, password });
  }
}
