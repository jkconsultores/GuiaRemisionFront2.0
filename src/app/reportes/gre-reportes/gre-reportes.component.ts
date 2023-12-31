import { AfterViewInit, Component, OnChanges, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ReporteGreService } from 'src/services/reporte-gre.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import { MatPaginator } from '@angular/material/paginator';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-gre-reportes',
  templateUrl: './gre-reportes.component.html',
  styleUrls: ['./gre-reportes.component.css'],
  standalone: false,
})
export class GreReportesComponent implements OnInit, AfterViewInit {
  spe_despatch: any[] = [];
  filtroEstado:any='';
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator
  cantidad: number = 0;
  hasta = new FormControl(new Date());
  desde = new FormControl(new Date());
  displayedColumns: string[] = ['serieNumeroGuia', 'bl_estadoRegistro', 'fechaEmisionGuia', 'correoDestinatario', 'numeroDocumentoRemitente',
  'tipoDocumentoRemitente', 'razonSocialDestinatario', 'motivoTraslado', 'descripcionMotivoTraslado', 'pesoBrutoTotalBienes',
  'fechaInicioTraslado', 'bl_estadoProceso'];
  dataSource = new MatTableDataSource<any>([]);

  constructor(private reporteGreService: ReporteGreService){}
  ngAfterViewInit() {
    setTimeout(() => {
      this.paginator._intl.itemsPerPageLabel = "Items por pagina";
      this.paginator._intl.previousPageLabel = "Pagina anterior";
      this.paginator._intl.nextPageLabel = "Pagina siguiente";
      this.dataSource.paginator = this.paginator;
      this.cantidad=this.spe_despatch.length;
    },0);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ngOnInit() {
    this.getSpe_despatch();
  }
  fechaActual() {
    let date = new Date();
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    return `${month}-${day}-${year}`;
  }
  getSpe_despatch() {
    Swal.showLoading();
    const formatDesde = this.formatDate(this.desde.value);
    const formatHasta = this.formatDate(this.hasta.value);
    this.reporteGreService.getSpe_despatch(formatDesde, formatHasta).subscribe(
      (res: any) => {
        console.log(res.result);
        Swal.close();
        this.spe_despatch = res.result;
        this.dataSource = new MatTableDataSource<any>(this.spe_despatch);
        this.paginator._intl.itemsPerPageLabel = "Items por pagina";
        this.paginator._intl.previousPageLabel = "Pagina anterior";
        this.paginator._intl.nextPageLabel = "Pagina siguiente";
        this.dataSource.paginator = this.paginator;
        this.cantidad=this.spe_despatch.length;
      },
      error => {
        console.error('Error al obtener los datos:', error);
        Swal.fire({ icon: 'error', title: 'Hubo un error al obtener los datos' });
      }
    );
  }
  formatDate(dateString: any) {
    const options: Intl.DateTimeFormatOptions = { month: '2-digit', day: '2-digit', year: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
    const [month, day, year] = formattedDate.split('/');
    return `${month}-${day}-${year}`;
  }
  fileName = 'reporteGRE.xlsx';
  exportExcel() {
    let data = document.getElementById('tablaData');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, this.fileName);
  }
  Estado(){
    debugger
    this.dataSource.filter = this.filtroEstado.trim().toLowerCase();
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      return data.bl_estadoRegistro.toLowerCase().includes(filter);
    };
  }
  
}
