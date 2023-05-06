import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutorRoutingModule } from './autor-routing.module';
import { AutoresComponent } from './pages/autores/autores.component';
import { ModalAutoresComponent } from './modales/modal-autores/modal-autores.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { ObrasComponent } from './pages/obras/obras.component';
import { FavoritosComponent } from './pages/favoritos/favoritos.component';


@NgModule({
  declarations: [
    AutoresComponent,
    ModalAutoresComponent,
    ObrasComponent,
    FavoritosComponent,    
  ],
  imports: [
    CommonModule,
    AutorRoutingModule,
    MaterialModule,
  ],
  exports:[AutoresComponent, ObrasComponent, FavoritosComponent]
})
export class AutorModule { }
