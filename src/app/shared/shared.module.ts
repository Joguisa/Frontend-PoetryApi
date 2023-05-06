import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from './material/material.module';
import { AutorModule } from '../layout/autor/autor.module';
import { LoadingComponent } from './loading/loading.component';



@NgModule({
  declarations: [HomeComponent, LoadingComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AutorModule
  ],
  exports: [HomeComponent, LoadingComponent]
})
export class SharedModule { }
