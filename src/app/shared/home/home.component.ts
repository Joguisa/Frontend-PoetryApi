import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private router: Router, private _authServicio: AuthService) {}

  cerrarSesion(){
    this._authServicio.logout();
    this.router.navigate(['/auth/login']);
  }

}
