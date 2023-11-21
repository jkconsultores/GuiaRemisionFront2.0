import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ReporteGreService } from 'src/services/reporte-gre.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gre-reportes',
  templateUrl: './gre-reportes.component.html',
  styleUrls: ['./gre-reportes.component.css'],
})
export class GreReportesComponent implements OnInit {
  spe_despatch: any[] = [];
  desde: string = '';
  hasta: string = '';

  displayedColumns: string[] = ['serieNumeroGuia', 'tipodocumentoGuia', 'bl_estadoRegistro', 'tipoDocumentoRemitente'];
  dataSource = new MatTableDataSource<any>([]); 

  constructor(
    private reporteGreService: ReporteGreService
  ) {}
  
  ngOnInit() {
    this.desde = "05-05-2023";
    this.hasta = "05-25-2023";
    this.getSpe_despatch();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getSpe_despatch() {
    Swal.showLoading();
    this.reporteGreService.getSpe_despatch(this.desde, this.hasta).subscribe(
      (res: any) => {
        console.log(res.result);
        Swal.close();
        this.spe_despatch = res.result;
        this.dataSource = new MatTableDataSource<any>(this.spe_despatch);
      },
      error => {
        console.error('Error al obtener los datos:', error);
        Swal.fire({ icon: 'error', title: 'Hubo un error al obtener los datos' });
      }
    );
  }

  fechaActual() {
    let date = new Date();
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
