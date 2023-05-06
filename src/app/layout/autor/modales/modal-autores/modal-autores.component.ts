import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Autor } from '../../interfaces/autor';
import { Obras } from '../../interfaces/obras';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AutoresService } from '../../services/autores.service';
import { UtilidadService } from 'src/app/shared/services/utilidad.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-modal-autores',
  templateUrl: './modal-autores.component.html',
  styleUrls: ['./modal-autores.component.css']
})
export class ModalAutoresComponent implements OnInit, AfterViewInit {
  loading = false;
  columnasTabla: string[] = ['position','title','author','lines', 'linecount','acciones'];
  dataInicio: Obras[] = [];
  dataListObras = new MatTableDataSource(this.dataInicio);
  @ViewChild(MatPaginator) paginacionTabla! : MatPaginator;
  

  constructor(private dialogRef: MatDialogRef<ModalAutoresComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private _autorServicio: AutoresService, 
    private _utilidadServicio: UtilidadService,
    ){   }
    
    ngOnInit(): void {
      this.mostrarObras();
    }

    mostrarObras(){
      this.loading = true;
      this._autorServicio.getObrasAutor(this.data).subscribe(
        (res: Obras[]) => {
          this.dataInicio = res;
          this.dataListObras.data = this.dataInicio;
          this.dataListObras.paginator = this.paginacionTabla;
          this.loading = false;
          // console.log(res)
        },
        (error) => {
          this.loading = false;
          this._utilidadServicio.mostrarAlerta('error','')
        }
      )
    }

    seleccionarObra(obrasSeleccionadas: Obras){
      this._autorServicio.seleccionarObra(obrasSeleccionadas);
      console.log('Obras seleccionadas guardadas:', obrasSeleccionadas);
      // console.log('Obras seleccionadas guardadas:', JSON.stringify(obrasSeleccionadas)); // para hacerlo legible en la consola
    }
    

  ngAfterViewInit(): void {
    this.dataListObras.paginator = this.paginacionTabla;
  }

  loadSpinner () {
    this.loading = true;
    setTimeout(() => {
    }, 1500);
  }


}
