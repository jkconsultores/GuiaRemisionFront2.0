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
import { D } from '@angular/cdk/keycodes';
import moment from 'moment';
import { AuthServiceServiceService } from 'src/services/auth-service-service.service';


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
  TotalRegistros: number = 0;
  displayedColumns: string[] = ['numeroDocumentoRemision', 'serieNumero', 'tipoDocumento', 'fechaEmision', 'montoTotal', 'procesado',
  'nombreUsuario', 'fechaDeConsulta', 'estadoCp', 'estadoRuc', 'condDomiRuc', 'estadoDoc', 'Opt'];
  dataSource = new MatTableDataSource<any>([]);
  isLoading: boolean = false;
  constructor(private docValidationsService:DocValidationsService,private auth:AuthServiceServiceService){}

  ngOnInit(): void {
    let body2= {
      "nombreusuario": localStorage.getItem('usuario'),
      "contrasena":  localStorage.getItem('contrasena'),
      "empresa": localStorage.getItem('empresa'),
    };
    this.docValidationsService.obtenerLogin(body2).subscribe((resp:any)=>{
      localStorage.clear();
      this.auth.SessionSaved(resp.token);
      this.auth.UserSaved(resp.usuario);
    });
  }

  getDocValidations(){
    this.getValidacionesPagina(10);
  }

  getValidacionesPagina(pagesize:any){
    this.isLoading = true;  
    
    // this.dataSource.data=[];
    
      let body  = {
        desde: this.formatDate(this.desde.value),
        hasta: this.formatDate(this.hasta.value),
        "inicio": 0,
        "cantidad": pagesize
      }

      this.docValidationsService.getDocValidations( body).subscribe((resp2:any)=>{
        console.log('resp2',resp2);
        if(this.TotalRegistros==0){
        this.TotalRegistros =resp2.length+1;
        }else{
          this.TotalRegistros+=resp2.length+1;
        }
        this.DocValidations=resp2;
        this.options=resp2;
        this.dataSource.data=resp2;
        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value || '')),
        );
        this.isLoading = false;
      })
    
  }

  AllValidations(){
    let body2= {
      "nombreusuario": localStorage.getItem('usuario'),
      "contrasena":  localStorage.getItem('contrasena'),
      "empresa": localStorage.getItem('empresa'),
    };
    // this.docValidationsService.obtenerLogin(body2).subscribe((resp:any)=>{
    let body = { }
    this.docValidationsService.getAllValidations(body)
    // })
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
    this.paginator._intl.itemsPerPageLabel = "Items por pagina";
    this.paginator._intl.previousPageLabel = "Pagina anterior";
    this.paginator._intl.nextPageLabel = "Pagina siguiente";
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
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
    console.log("Cantidad de registros cosumidos" + cantidadDeRegistros);
    this.getValidacionesPagina(cantidadDeRegistros);
    // if (cantidadDeRegistros == this.dataSource.length - 5 || cantidadDeRegistros > this.dataSource.length - 5) {
    //   this.ObtenerProductosSegundallamada(cantidadDeRegistros + 5, 50, this.dataSource.filter)
    // }
    if(this.TotalRegistros >  cantidadDeRegistros+(cantidadDeRegistros+1)){
      this.TotalRegistros-=cantidadDeRegistros+1;
    }
  }

  procesarDoc(row: any){
    const [numeroSerie, numero] = row.serieNumero.split('-');
    const fechaEmision = moment(row.fechaEmision).format("DD/MM/YYYY");
    if(row.montoTotal < 0){
      row.montoTotal = row.montoTotal * -1;
    }
    let body={
      "numRuc": row.numeroDocumentoRemision,
      "codComp":row.tipoDocumento,
      "numeroSerie":numeroSerie,
      "numero":numero,
      "fechaEmision": fechaEmision,
      "monto": row.montoTotal.toFixed(2).toString()
    }
    this.docValidationsService.procesar(body).subscribe((resp:any)=>{    
      console.log('documento', resp);
    })
  }

}
