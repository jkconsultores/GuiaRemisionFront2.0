import { AfterViewInit, Component, EventEmitter, LOCALE_ID, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule} from '@angular/material/sort';
import { MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Observable, map, startWith } from 'rxjs';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { consultaSunat } from 'src/models/conosultaSunat';
import { ConsultaSunatService } from 'src/services/consulta-sunat.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { InterceptorServiceService } from 'src/services/interceptor/api-interceptor-service.service';
import { MatButtonModule } from '@angular/material/button';
import * as _moment from 'moment';
import {default as _rollupMoment, Moment} from 'moment';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import moment from 'moment';
import { AuthServiceServiceService } from 'src/services/auth-service-service.service';


export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-consulta-sunat',
  templateUrl: './consulta-sunat.component.html',
  styleUrls: ['./consulta-sunat.component.css'],
  providers:[
    { provide:LOCALE_ID,useValue:'es'},
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorServiceService, multi: true},
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS], },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [ HttpClientModule, ReactiveFormsModule, FormsModule, CommonModule, MatFormFieldModule, MatButtonModule, MatDatepickerModule,
    MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatProgressBarModule, MatDatepickerModule],
})

export class ConsultaSunatComponent implements OnInit, AfterViewInit {
  date = new FormControl(moment());
  mesSelectNumero: number; 
  mesFormat: string;
  añoSelect: number;
  periodoMes: string;
  setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value ?? moment();
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.date.setValue(ctrlValue);
    this.mesSelectNumero = normalizedMonthAndYear.month();
    this.mesFormat = normalizedMonthAndYear.format('MM');
    this.añoSelect = normalizedMonthAndYear.year();
    this.periodoMes = this.añoSelect+this.mesFormat;
    console.log('fecha', this.mesFormat,  'año', this.añoSelect );
    datepicker.close();
  }
  
  [x: string]: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  submitClicked = new EventEmitter<consultaSunat>();
  myControl = new FormControl();
  ConsultaSunat:consultaSunat[]=[];
  options: consultaSunat[]=[];
  filteredOptions!: Observable<consultaSunat[]>;
  hasta = new FormControl(new Date());
  desde = new FormControl(new Date());
  displayedColumns: string[] = ['ruc', 'periodo', 'tipoDocumento', 'numeroDocumentoSire', 'numeroDocumentoFe',
  'baseImponibleSire', 'baseImponibleFe', 'igvSire', 'igvDFE', 'totalVentasSire', 'totalVentasFe'];
  dataSource = new MatTableDataSource<any>([]);
  isLoading: boolean = false;

  constructor(private ConsultaSunatService:ConsultaSunatService,private auth:AuthServiceServiceService){}

  ngOnInit(): void {
      let bodyConsul= {
      "nombreusuario": localStorage.getItem('usuario'),
      "contrasena": "1234",
      "ruc": "20511465061"
    };

    this.ConsultaSunatService.obtenerLogin(bodyConsul).subscribe((resp:any)=>{  
      console.log('resp ', resp.token)     
      localStorage.clear();
      this.auth.SessionSaved(resp.token);
      this.auth.UserSaved(resp.usuario);
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(){
  }

  getDocumentosNo(){
    let body  = {
      "perido": this.añoSelect+this.mesFormat,       
      "ruc": "20511465061",
      "busqueda": null,
      "skip": 0,
      "cantidad": 20
    }      
    this.isLoading = true;
      this.ConsultaSunatService.getDocumentosSunat(body).subscribe((resp2:any)=>{
        console.log('resp2',resp2);
        debugger;
        this.ConsultaSunat=resp2;
        this.options=resp2;
        this.dataSource = new MatTableDataSource<any>(resp2.datos);
        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value || '')),
        );
        this.isLoading = false;
      })    
  }

  private _filter(value: string): consultaSunat[] {
    let filterValue = (typeof value === 'string') ? value.toLowerCase() : '';
    return this.options.filter(option => option!.NroDocIdentidad!.toLowerCase().includes(filterValue));
  }

  descargaExcel(){
  }

  getPeriodo(){
    this.isLoading = true;
    this.ConsultaSunatService.getPeriodoMes(this.periodoMes).subscribe((res:any[])=>{      
      console.log('periodoMensual', res);
      this.options=res;
        this.dataSource = new MatTableDataSource<any>(res);
        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value || '')),
        );
        this.isLoading = false;
      })    
  }
}