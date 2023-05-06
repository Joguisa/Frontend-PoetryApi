import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Autor } from '../interfaces/autor';
import { Obras } from '../interfaces/obras';

@Injectable({
  providedIn: 'root'
})
export class AutoresService {

  private urlApi: string = environment.endPoint;
  obrasSeleccionadas: Obras[] =[];
  // obrasSeleccionadas!: Obras;

  constructor(private http: HttpClient) { }

  getAutor(): Observable<Autor>{
    return this.http.get<Autor>(`${this.urlApi}/author`)
  }

  getObrasAutor(nombre: string): Observable<Obras[]>{
    return this.http.get<Obras[]>(`${this.urlApi}/author/${nombre}`)
  }

  getObraRandom(numero: number): Observable<Obras[]>{
    return this.http.get<Obras[]>(`${this.urlApi}/random/${numero}/author,title`)
  }

  // seleccionarObra(obras: Obras) {
  //   this.obrasSeleccionadas.push(obras);
  //   localStorage.setItem('obrasSeleccionadas', JSON.stringify(this.obrasSeleccionadas));
  // }

  seleccionarObra(obras: Obras) {
    if (!this.obrasSeleccionadas.includes(obras)) {
      const obrasAnteriores = JSON.parse(localStorage.getItem('obrasSeleccionadas') || '[]');
      this.obrasSeleccionadas = obrasAnteriores.concat(obras);
      localStorage.setItem('obrasSeleccionadas', JSON.stringify(this.obrasSeleccionadas));
    }
  }

}
