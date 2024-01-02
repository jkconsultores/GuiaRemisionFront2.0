import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatSelectChange } from '@angular/material/select';
import { Observable, startWith, map } from 'rxjs';
import { AAA_EMPRESA } from 'src/models/Empresa';
import { GreCabecera } from 'src/models/GreObject';
import { MOTIVOS } from 'src/models/Motivos';
import { T_UnidadMedida } from 'src/models/UnidadMedida';
import { Aaa_OrigenDTO } from 'src/models/origen';
import { serie } from 'src/models/serie';
import { transportista } from 'src/models/transportista';
import { DestinatariosService } from 'src/services/destinatarios.service';
import { MotivosService } from 'src/services/motivos.service';
import { SerieService } from 'src/services/serie.service';

@Component({
  selector: 'app-cabecera-guia',
  templateUrl: './cabecera-guia.component.html',
  styleUrls: ['./cabecera-guia.component.css'],
})
export class CabeceraGuiaComponent implements OnInit {
  @Output()
  submitClicked = new EventEmitter<GreCabecera>();
  @Input()
  tituloGuia: string | undefined;
  @Input()
  tipo: string | undefined;
  tablaSeries: serie[] = [];
  Motivos: MOTIVOS[] = [];
  Destinos: any;
  SeleccionEmpresa: AAA_EMPRESA | undefined;
  SeleccionTransporte: transportista | undefined;
  SeleccionOrigen: Aaa_OrigenDTO | undefined;
  cabecera: GreCabecera = {};

  FechaTrnaslado = new FormControl(new Date());
  FechaEnvio = new FormControl(new Date());

  public unidadesDeMedida: T_UnidadMedida[] = [];
  stateCtrl = new FormControl('');
  public filteredOptions: Observable<T_UnidadMedida[]> | undefined;

  constructor(
    private SerieService: SerieService,
    private MotivosService: MotivosService,
    private motivosService: MotivosService,
  ) {
    console.log(this.tipo);
  }
  ngOnInit(): void {
    console.log(this.tipo);
    this.cabecera.FechaEmision = new Date();
    this.cabecera.FechaVencimiento=new Date();
    this.SerieService.getSerie().subscribe((res: serie[]) => {
      this.tablaSeries = res;
    });
    this.MotivosService.GetMotivos().subscribe((res: MOTIVOS[]) => {
      this.Motivos = res;
    });
    this.motivosService.GetUnidadesDeMedida().subscribe((resp: any) => {
      this.unidadesDeMedida = resp;
    });
    this.filteredOptions = this.stateCtrl.valueChanges.pipe(
      startWith(''),
      map((unidades) =>
        unidades ? this._filter(unidades) : this.unidadesDeMedida.slice()
      )
    );
  }

  private _filter(value: string): T_UnidadMedida[] {
    const filterValue = value.toLowerCase();

    return this.unidadesDeMedida.filter(
      (option) =>
        option.descripcion.toLowerCase().includes(filterValue) ||
        option.valor.toLowerCase().includes(filterValue)
    );
  }
  ObtenerFechaMinima(): any {
    const fechaActual = new Date();
    fechaActual.setDate(fechaActual.getDate() - 1);
    return fechaActual;
  }

  EmpresaSeleccionada(event: AAA_EMPRESA) {
    this.SeleccionEmpresa = event;
    this.cabecera.empresa = this.SeleccionEmpresa;
    this.ChangedValues();
  }  
  TransporteSeleccionada(event: transportista) {
    this.SeleccionTransporte = event;
    this.cabecera.transporte = this.SeleccionTransporte;
    this.ChangedValues();
  }

  OrigenSelecionado(event: Aaa_OrigenDTO) {
    this.SeleccionOrigen = event;
    this.cabecera.Origen = this.SeleccionOrigen;
    this.ChangedValues();
  }
  SerieSeleccionada(event: MatSelectChange) {
    this.cabecera.Serie = event.value.toString();
    this.ChangedValues();
  }
  CambioFechaEnvio(event: any) {
    this.cabecera.FechaEmision = event.value;
    this.ChangedValues();
  }
  CambioFechaTrnaslado(event: any) {
    this.cabecera.FechaVencimiento = event.value;
    this.ChangedValues();
  }
  ModalidadSelected(event: any) {
    this.cabecera.Modalidad = event.value;
    this.ChangedValues();
  }
  MotivoSelected(event: any) {
    this.cabecera.motivo = event.value;
    this.cabecera.Descripcionmotivo =  this.Motivos.find(x=>x.codigo==event.value)?.descripcion;
    this.ChangedValues();
  }
  NroButlosChange(event: any) {
    this.cabecera.NroBultos = event.target.value;
    this.ChangedValues();
  }
  PesoBrutoChange(event: any) {
    this.cabecera.PesoBruto = event.target.value;
    this.ChangedValues();
  }
  unidadesDeMedidaChange(event: any) {
    this.cabecera.UnidadDePeso = event.option.value;
    this.ChangedValues();
  }
  ChangedValues() {
    console.log(this.cabecera)
    this.submitClicked.emit(this.cabecera);
  }
}
