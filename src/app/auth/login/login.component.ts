import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilidadService } from 'src/app/shared/services/utilidad.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loading = false;

  constructor(private router: Router, private _utilidadServicio: UtilidadService) {  }

  usuarioLogin = new FormGroup({
    usuario: new FormControl('admin', Validators.required),
    password: new FormControl('admin', Validators.required)
  })

  ngOnInit(): void {}

  onSubmit() {
    if (this.usuarioLogin.value.usuario=="admin" && this.usuarioLogin.value.password=="admin"){
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
