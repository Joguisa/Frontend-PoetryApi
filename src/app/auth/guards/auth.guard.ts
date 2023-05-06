import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanActivateFn, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}
  
  canActivate(): boolean {
    if (this.authService.loggedIn) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  // canActivateChild(): boolean {
  //   if (this.authService.loggedIn) {
  //     return true;
  //   } else {
  //     this.router.navigate(['/login']);
  //     return false;
  //   }
  // }

  // canLoad(): boolean {
  //   if (this.authService.loggedIn) {
  //     return true;
  //   } else {
  //     this.router.navigate(['/login']);
  //     return false;
  //   }
  // }
  
}
