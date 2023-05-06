import { Component, ViewChild } from '@angular/core';
import { Obras } from '../../interfaces/obras';
import { AutoresService } from '../../services/autores.service';
import { MatTableDataSource } from '@angular/material/table';
import { UtilidadService } from 'src/app/shared/services/utilidad.service';

@Component({
  selector: 'app-obras',
  templateUrl: './obras.component.html',
  styleUrls: ['./obras.component.css']
})
export class ObrasComponent {

  loading = false;
  columnasTabla: string[] = ['title','author'];
  obras: Obras[] = [];
  dataListRandom = new MatTableDataSource(this.obras);

  constructor(private _autorServicio: AutoresService, private _utilidadServicio: UtilidadService) { }

  ngOnInit() {
    this.loading = true;
    const randomCount = Math.floor(Math.random() * 5) + 6; // genera un número aleatorio entre 6 y 10
    this._autorServicio.getObraRandom(randomCount).subscribe(
      (res: Obras[]) => {
        this.obras = res;
        this.dataListRandom.data = this.obras;
        this.loading = false;
        // console.log(res)
      },
      (error) => {
        this.loading = false;
        this._utilidadServicio.mostrarAlerta('error','')
      }
    )
  };

  loadSpinner () {
    this.loading = true;
    setTimeout(() => {
    }, 1500);
  }
  

}
