import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Autor } from '../../interfaces/autor';
import { AutoresService } from '../../services/autores.service';
import { UtilidadService } from 'src/app/shared/services/utilidad.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalAutoresComponent } from '../../modales/modal-autores/modal-autores.component';
import { Obras } from '../../interfaces/obras';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-autores',
  templateUrl: './autores.component.html',
  styleUrls: ['./autores.component.css']
})
export class AutoresComponent implements OnInit, AfterViewInit{
  currentPage = 0;
  loading = false;
  columnasTabla: string[] = ['position','authors','acciones'];
  obras: Obras[] = [];
  dataInicio: Autor[] = [];
  dataListAutor = new MatTableDataSource(this.dataInicio);
  @ViewChild(MatPaginator) paginacionTabla! : MatPaginator;

  constructor(
    public dialog: MatDialog, 
    private _autorServicio: AutoresService, 
    private _utilidadServicio: UtilidadService,
    private router: Router){}


    mostrarAutores() {
      this.loadSpinner();
      this._autorServicio.getAutor().subscribe({
        next: (data: Autor) => {
          if (data) {
            const autores : Autor[] = data.authors.map(author => ({ authors: [author] }));
            this.dataListAutor.data = autores;
          } else {
            this._utilidadServicio.mostrarAlerta(
              'No se encontraron datos',
              'Oops!'
            );
          }
          this.loading = false;
        },
        error: (e) => {},
      });
    }

    
    aplicarFiltroTabla(event: Event){
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataListAutor.filter = filterValue.trim().toLocaleLowerCase();
    }

    ngAfterViewInit(): void {
      this.dataListAutor.paginator = this.paginacionTabla;
      this.paginacionTabla.page.subscribe((event) => { // "No." está siendo generada dinámicamente por el índice de la fila por eso se aplicó estas 2 lineas de codigo 
        this.currentPage = event.pageIndex * event.pageSize; //para que muestre un valor calculado en lugar del índice de la fila
      });
    }

    ngOnInit(): void {
      this.mostrarAutores();
    }

    verAutor(autor: string) {
      this.dialog
        .open(ModalAutoresComponent, {
          disableClose: false,
          data: autor,          
        })
        
        .afterClosed()
        .subscribe((resp) => {
          if(resp === 'true') {
            this.mostrarAutores()
          }
        })
        // console.log(autor)  
    }

    irAFavoritos() {
      this.router.navigate(['/obras/autor/favoritos']);
    }
    

    loadSpinner () {
      this.loading = true;
      setTimeout(() => {
      }, 1500);
    }

}
