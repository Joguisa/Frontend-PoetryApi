import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilidadService } from 'src/app/shared/services/utilidad.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loading = false;

  constructor(private router: Router, private authService: AuthService, private _utilidadServicio: UtilidadService) {  }

  usuarioLogin = new FormGroup({
    usuario: new FormControl('admin', Validators.required),
    password: new FormControl('admin', Validators.required)
  })

  ngOnInit(): void {}
  onSubmit() {
    const usuario = this.usuarioLogin.value.usuario ?? '';
    const password = this.usuarioLogin.value.password ?? '';
    const isLoggedIn = this.authService.login(usuario, password);

    if (isLoggedIn) {
      this.loadSpinner();
    } else {
      this.error();
      this.usuarioLogin.reset();
    }
  }

  error() {
    this._utilidadServicio.mostrarAlerta('El usuario o contraseña son erroneos', 'Error')
  }

  loadSpinner () {
    this.loading = true;
    setTimeout(() => {
      this.router.navigate(['/pages/autor/autores']);
    }, 1500);
  }

}
