import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CookiesService {

  constructor(private cookies: CookieService) { }

  // Verifica si estamos en Electron
  private isElectron(): boolean {
    return !!(window && window.process && window.process.type);
  }

  setToken(token_name: string, token: string) {
    if (this.isElectron()) {
      // En Electron usamos localStorage como alternativa
      localStorage.setItem(token_name, token);
    } else {
      // En el navegador usamos ngx-cookie-service
      this.cookies.set(token_name, token);
    }
  }

  getToken(token_name: string) {
    if (this.isElectron()) {
      // En Electron leemos desde localStorage
      return localStorage.getItem(token_name) || '';
    } else {
      // En el navegador usamos ngx-cookie-service
      return this.cookies.get(token_name);
    }
  }

  checkToken(token_name: string) {
    if (this.isElectron()) {
      // En Electron chequeamos si existe en localStorage
      return !!localStorage.getItem(token_name);
    } else {
      // En el navegador usamos ngx-cookie-service
      return this.cookies.check(token_name);
    }
  }

  deleteToken(token_name: string) {
    if (this.isElectron()) {
      // En Electron eliminamos desde localStorage
      localStorage.removeItem(token_name);
    } else {
      // En el navegador usamos ngx-cookie-service
      this.cookies.delete(token_name);
    }
  }
}
