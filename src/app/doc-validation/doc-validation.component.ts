import { AfterViewInit, Component, EventEmitter, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatSort, MatSortModule} from '@angular/material/sort';
import { MatTableDataSource, MatTableModule} from '@angular/material/table';
import { docValidations } from 'src/models/docValidations';
import { Observable, map, startWith } from 'rxjs';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DocValidationsService } from 'src/services/docValidations.service';
import * as XLSX from 'xlsx';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { InterceptorServiceService } from 'src/services/interceptor/api-interceptor-service.service';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-doc-validation',
  templateUrl: './doc-validation.component.html',
  styleUrls: ['./doc-validation.component.css'],
  providers: [
    {provide:LOCALE_ID,useValue:'es'},{
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorServiceService,
    multi: true
  }],
  standalone: true,
  imports: [ HttpClientModule, ReactiveFormsModule, FormsModule, CommonModule, MatFormFieldModule, MatButtonModule, 
    MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatProgressBarModule, MatDatepickerModule],
})

export class DocValidationComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  submitClicked = new EventEmitter<docValidations>();
  myControl = new FormControl();
  DocValidations:docValidations[]=[];
  options: docValidations[]=[];
  filteredOptions!: Observable<docValidations[]>;
  hasta = new FormControl(new Date());
  desde = new FormControl(new Date());
  displayedColumns: string[] = ['numeroDocumentoRemision', 'serieNumero', 'tipoDocumento', 'fechaEmision', 'montoTotal', 'procesado',
  'nombreUsuario', 'fechaDeConsulta', 'estadoCp', 'estadoRuc', 'condDomiRuc', 'estadoDoc'];
  dataSource = new MatTableDataSource<any>([]);
  isLoading: boolean = false;

  constructor(
    private docValidationsService:DocValidationsService){}

  ngOnInit(): void {
  }

  getDocValidations(){
    this.isLoading = true;
    let body2= {
      "nombreusuario": localStorage.getItem('usuario'),
      "contrasena":  localStorage.getItem('contrasena'),
      "empresa": localStorage.getItem('empresa'),
    };

    this.docValidationsService.obtenerLogin(body2).subscribe((resp:any)=>{
      let body  = {
        desde: this.formatDate(this.desde.value),
        hasta: this.formatDate(this.hasta.value),
      }
      console.log('resp ', resp)
      console.log('resp ', resp.token)
      localStorage.setItem('tokenValidacion', resp.token);
      this.docValidationsService.getDocValidations(resp, body).subscribe((resp2:any)=>{
        console.log('resp2',resp2);
        this.DocValidations=resp2;
        this.options=resp2;
        this.dataSource = new MatTableDataSource<any>(resp2);
        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value || '')),
        );
        this.isLoading = false;
      })
    })
  }

  AllValidations(){
    let body2= {
      "nombreusuario": localStorage.getItem('usuario'),
      "contrasena":  localStorage.getItem('contrasena'),
      "empresa": localStorage.getItem('empresa'),
    };

    this.docValidationsService.obtenerLogin(body2).subscribe((resp:any)=>{
    let body = { }
    this.docValidationsService.getAllValidations(resp,body)
    })
  }

  formatDate(dateString: any) {
    const options: Intl.DateTimeFormatOptions = { month: '2-digit', day: '2-digit', year: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
    const [month, day, year] = formattedDate.split('/');
    return `${year}-${month}-${day}`;
  }

  private _filter(value: string): docValidations[] {
    let filterValue = (typeof value === 'string') ? value.toLowerCase() : '';
    return this.options.filter(option => option!.numeroDocumentoRemision!.toLowerCase().includes(filterValue));
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  fileName = 'reporteDocValidado.xlsx';
  descargaExcel() {
    let data = document.getElementById('tablaDoc');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, this.fileName);
  }
  yourHandler(page: any, pagesize: any) {
    let cantidadDeRegistros = (page + 1) * pagesize;
    console.log("pagina: " + page + " Tamaño de pagina: " + pagesize)
    console.log("Cantidad de registros cosnumidos" + cantidadDeRegistros);

    if (cantidadDeRegistros == this.dataSource.length - 5 || cantidadDeRegistros > this.dataSource.length - 5) {
      this.ObtenerProductosSegundallamada(cantidadDeRegistros + 5, 50, this.dataSource.filter)

    }

  }
}
