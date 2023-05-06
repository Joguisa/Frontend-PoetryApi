import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Obras } from '../../interfaces/obras';
import { MatTableDataSource } from '@angular/material/table';
import { AutoresService } from '../../services/autores.service';
import { UtilidadService } from 'src/app/shared/services/utilidad.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent implements OnInit, AfterViewInit{
  currentPage = 0; 
  loading = false;
  columnasTabla: string[] = ['position','author','title','lines', 'acciones'];
  obrasSeleccionadas: Obras[] = [];
  dataListObras = new MatTableDataSource<Obras>([]);
  @ViewChild(MatPaginator) paginacionTabla! : MatPaginator;
  

  constructor(private router: Router, private _utilidadServicio: UtilidadService) { }

  ngOnInit() {
    this.loadSpinner()
    this.mostarFavoritos();
  }

  mostarFavoritos() { // se cambió el método para que se muestre páginación de la tabla sino no hay paginación
    const Obras = localStorage.getItem('obrasSeleccionadas');
    if (Obras) {
      this.obrasSeleccionadas = JSON.parse(Obras);
      this.dataListObras = new MatTableDataSource<Obras>(this.obrasSeleccionadas);
    }
    this.loading = false;
  }

  // mostarFavoritos(){ //se muestra la tabla pero la paginación no funciona
  //   this.loadSpinner();
  //   setTimeout(() => {
  //     this.dataListObras = JSON.parse(localStorage.getItem('obrasSeleccionadas')|| '[]');
  //     this.loading = false;
  //   }, 1000); 
  // }

  ngAfterViewInit() {
    this.dataListObras.paginator = this.paginacionTabla;
    this.paginacionTabla.page.subscribe((event) => { // "No." está siendo generada dinámicamente por el índice de la fila por eso se aplicó estas 2 lineas de codigo 
      this.currentPage = event.pageIndex * event.pageSize; //para que muestre un valor calculado en lugar del índice de la fila
    });
  }
  
  eliminarFavorito(element: Obras) { // lo mismo se agregó la paginación a eliminar porque por alguna razón no funciona la paginación por si sola
    const index = this.obrasSeleccionadas.findIndex(obra => obra.title === element.title);
    if (index >= 0) {
      this.obrasSeleccionadas.splice(index, 1);
      localStorage.setItem('obrasSeleccionadas', JSON.stringify(this.obrasSeleccionadas));
      this.dataListObras = new MatTableDataSource<Obras>(this.obrasSeleccionadas);
      this.dataListObras.paginator = this.paginacionTabla;
    }
  }
  

  irAAutor(){
    this.router.navigate(['/pages/autor/autores'])
  }

  loadSpinner() {
    this.loading = true;
    setTimeout(() => {
    }, 1000);
  }

}
