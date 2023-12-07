import { AfterViewInit, Component, EventEmitter, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatSort, MatSortModule} from '@angular/material/sort';
import { MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Observable, map, startWith } from 'rxjs';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { consultaSunat } from 'src/models/conosultaSunat';
import { ConsultaSunatService } from 'src/services/consulta-sunat.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { InterceptorServiceService } from 'src/services/interceptor/api-interceptor-service.service';

@Component({
  selector: 'app-consulta-sunat',
  templateUrl: './consulta-sunat.component.html',
  styleUrls: ['./consulta-sunat.component.css'],
  providers:[
    {provide:LOCALE_ID,useValue:'es'},{
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorServiceService,
      multi: true
  }],
  standalone: true,
  imports: [ HttpClientModule, ReactiveFormsModule, FormsModule, CommonModule, MatFormFieldModule,
    MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatProgressBarModule,MatDatepickerModule],
})

export class ConsultaSunatComponent implements OnInit, AfterViewInit {
  [x: string]: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  submitClicked = new EventEmitter<consultaSunat>();
  myControl = new FormControl();
  ConsultaSunat:consultaSunat[]=[];
  options: consultaSunat[]=[];
  filteredOptions!: Observable<consultaSunat[]>;
  hasta = new FormControl(new Date());
  desde = new FormControl(new Date());
  displayedColumns: string[] = ['Ruc', 'RazonSocial', 'tipoDocumento', 'fechaEmision', 'montoTotal', 'procesado',
  'nombreUsuario', 'fechaDeConsulta', 'estadoCp', 'estadoRuc', 'condDomiRuc', 'estadoDoc'];
  dataSource = new MatTableDataSource<any>([]);
  isLoading: boolean = false;

  constructor(
    private ConsultaSunatService:ConsultaSunatService){}

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(){
  }

  getDocumentos(){
    this.isLoading = true;
    let bodyConsul= {
      "nombreusuario": "Rodrigo",
      "ruc": "20511465061"
    };

    this.ConsultaSunatService.obtenerLogin(bodyConsul).subscribe((resp:any)=>{
      let body  = {
        "perido": "202309",
        "ruc": "20511465061",
        "busqueda": null,
        "skip": 0,
        "cantidad": 20  
      }
      debugger
      console.log('resp ', resp)
      console.log('resp ', resp.token)
      localStorage.setItem('tokenConsulta', resp.token);
      this.ConsultaSunatService.getDocumentosSunat(resp, body).subscribe((resp2:any)=>{
        console.log('resp2',resp2);
        this.ConsultaSunat=resp2;
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

  private _filter(value: string): consultaSunat[] {
    let filterValue = (typeof value === 'string') ? value.toLowerCase() : '';
    return this.options.filter(option => option!.NroDocIdentidad!.toLowerCase().includes(filterValue));
  }

  descargaExcel(){
  }

  AllValidations(){
  }



}