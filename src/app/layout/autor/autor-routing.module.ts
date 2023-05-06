import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutoresComponent } from './pages/autores/autores.component';
import { FavoritosComponent } from './pages/favoritos/favoritos.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'autores', component: AutoresComponent },
      { path: 'favoritos', component: FavoritosComponent },
      // { path: '**', redirectTo: 'autores' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutorRoutingModule { }
