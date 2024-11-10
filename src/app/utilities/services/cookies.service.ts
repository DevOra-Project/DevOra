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
      localStorage.setItem(token_name, token);
    }
  }
/*   setToken(token_name: string, token: string) {
        if (this.isElectron()) {
          (window as any).electronAPI.setCookie(token_name, token);
        } else {
          this.cookies.set(token_name, token);
          localStorage.setItem(token_name, token);
        }
  } */
  getToken(token_name: string) {
    if (this.isElectron()) {
      // En Electron leemos desde localStorage
      return this.cookies.get(token_name);
     // return localStorage.getItem(token_name) || '';
    } else {
      // En el navegador usamos ngx-cookie-service

      return localStorage.getItem(token_name) || '';
    }
  }

  checkToken(token_name: string) {
    if (this.isElectron()) {
      // En Electron chequeamos si existe en localStorage
       // En el navegador usamos ngx-cookie-service
      return this.cookies.check(token_name);
      //return !!localStorage.getItem(token_name);
    } else {
      return !!localStorage.getItem(token_name);
    }
  }

  deleteToken(token_name: string) {
    if (this.isElectron()) {
      // En Electron eliminamos desde localStorage
      this.cookies.delete(token_name);
      localStorage.removeItem(token_name);
    } else {
      // En el navegador usamos ngx-cookie-service
      this.cookies.delete(token_name);
      localStorage.removeItem(token_name);
    }
  }
/*   async getTokenEl(token_name: string): Promise<string> {
    if (this.isElectron()) {
      console.log('si entra electron getTOken iselectron')
      console.log(localStorage.getItem(token_name) || '')
      return (window as any).electronAPI.getCookie(token_name);
        
    } else {
      console.log('entra al que no es electron')
      console.log(localStorage.getItem(token_name) || '')
      return this.cookies.get(token_name);
    }
  }

  async checkTokenEl(token_name: string): Promise<boolean> {
    if (this.isElectron()) {
      const token = await this.getToken(token_name);
      return !!token;
    } else {
      return !!localStorage.getItem(token_name);
    }
  } */
}
