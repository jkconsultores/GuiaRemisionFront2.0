import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DestinatarioModalComponent } from 'src/app/modals/destinatario-modal/destinatario-modal.component';
import { DestinatariosService } from 'src/services/destinatarios.service';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { destinatario } from 'src/models/destinatario';
import { Observable, map, startWith } from 'rxjs';
import { AAA_DESTINO } from 'src/models/destino';
import { DestinoDeGre } from 'src/models/GreObject';

@Component({
  selector: 'app-destinatario-guia',
  templateUrl: './destinatario-guia.component.html',
  styleUrls: ['./destinatario-guia.component.css']
})

export class DestinatarioGuiaComponent implements OnInit{
  @Output()
  submitClicked = new EventEmitter<DestinoDeGre>();
  @Input()
  RucEmisor!:string
  Destinos:any;
  myControl = new FormControl();
  Destinatario:destinatario[];
  options:destinatario[];
  RucAdquiriente:string |undefined;
  filteredOptions!: Observable<destinatario[]>;
  SelectDestinatario:destinatario | undefined;
  SelectDestino:AAA_DESTINO | undefined;

  DestinoGre:DestinoDeGre={}

  constructor(
    public dialog: MatDialog,
    private destinosService:DestinatariosService){
  }

  ngOnInit(): void {
    this.ObtenerDestinatario();
  }

  onSelectionChange(event: any){
    this.submitClicked.emit(event.option.value)
    this.SelectDestinatario=event.option.value;
    this.RucAdquiriente=event.option.value.numerodocumentoadquiriente;
    console.log('ruc',this.RucAdquiriente)
    this.DestinoGre.Adquiriente=event.option.value;
      this.submitClicked.emit(this.DestinoGre)
  }

  AbrirModalDestinatario(){
    console.log ('des', this.Destinatario)
    const dialogRef = this.dialog.open(DestinatarioModalComponent, {
      data: this.Destinatario,width:'1000px'
    });

    dialogRef.componentInstance.submitClicked.subscribe(result => {
      this.myControl.setValue(result);
      this.RucAdquiriente=result.numerodocumentoadquiriente;
      this.SelectDestinatario=result;
      this.DestinoGre.Adquiriente=result;
      this.submitClicked.emit(this.DestinoGre)
    });
  }

  ObtenerDestinatario(){
    this.destinosService.getDestinatario().subscribe((res:any)=>{
      this.Destinatario=res;
      this.options=res;
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || '')),
      );
    })
  }

  displayFn(data: destinatario): string {
    return data && data.razonsocialadquiriente ? data.razonsocialadquiriente : '';
  }
  private _filter(value: string): destinatario[] {
    let filterValue = (typeof value === 'string') ? value.toLowerCase() : '';
    return this.options.filter(option => option!.razonsocialadquiriente!.toLowerCase().includes(filterValue));
  }
  ObtenerDestino(event: AAA_DESTINO) {
    this.DestinoGre.Destino=event;
    this.SelectDestino  =event;
    this.enviarDatosADquiriente()
  }
  UbigeoChange(event: any) {
    this.DestinoGre.Destino!.ubigeodestino=event.value;
    this.enviarDatosADquiriente();
  }
  enviarDatosADquiriente(){
    this.submitClicked.emit(this.DestinoGre);
  }
}
