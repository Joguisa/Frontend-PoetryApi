import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './shared/home/home.component';
import { FavoritosComponent } from './layout/autor/pages/favoritos/favoritos.component';
import { AuthGuard } from './auth/guards/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'pages',
    // canActivate: [AuthGuard],
    component: HomeComponent,
    children: [
      {
        path: 'autor',
        loadChildren: () => import('./layout/autor/autor.module').then((m) => m.AutorModule)
      }
    ]
  },
  {
    path: 'obras',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    component: FavoritosComponent,
    children: [
      {
        path: 'autor',
        loadChildren: () => import('./layout/autor/autor.module').then((m) => m.AutorModule)
      }
    ]
  }
      

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
