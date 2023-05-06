import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedIn = false;
  private tokenKey = 'Joguisa98';

  constructor() {
  }

  validarToken(): Observable<boolean> {
    const token = localStorage.getItem(this.tokenKey);
    if(!token){
      return of(false);
    } else {
      return of(true)
    }
  }

  login(usuario: string, password: string): boolean {
    if (usuario === 'admin' && password === 'admin') {
      localStorage.setItem(this.tokenKey, 'Joguisa98');
      this.isLoggedIn = true;
      return true;
    } else {
      this.isLoggedIn = false;
      return false;
    }
  }


  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.isLoggedIn = false;
  }

  get loggedIn(): boolean {
    return this.isLoggedIn;
  }
}
