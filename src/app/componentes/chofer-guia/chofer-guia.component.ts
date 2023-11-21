import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable, map, startWith } from 'rxjs';
import { ChoferModalComponent } from 'src/app/modals/chofer-modal/chofer-modal.component';
import { TransporteDeGre } from 'src/models/GreObject';
import { VehiculoDTO } from 'src/models/Vehiculos';
import { chofer } from 'src/models/choferSec';
import { ChoferService } from 'src/services/chofer.service';


@Component({
  selector: 'app-chofer-guia',
  templateUrl: './chofer-guia.component.html',
  styleUrls: ['./chofer-guia.component.css']
})

export class ChoferGuiaComponent {
  @Input() title:string="Transporte 1";
  @Output()
  submitClicked = new EventEmitter<TransporteDeGre>();
  myControl = new FormControl();
  options: chofer[]=[];
  Chofer: chofer[] = [];
  filteredOptions!: Observable<chofer[]>;
  placaSeelcted:VehiculoDTO|undefined;
  TransporteDeguia:TransporteDeGre={}

  constructor(
    public dialog: MatDialog,
    private choferService:ChoferService){
  }

  ngOnInit(): void {
    this.choferService.getChofer().subscribe((resp:chofer[])=>{
      this.Chofer=resp;
      this.options=resp;
      console.log(this.Chofer)
    })
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): chofer[] {
    let filterValue = (typeof value === 'string') ? value.toLowerCase() : '';
    return this.options.filter(option => option!.nombre!.toLowerCase().includes(filterValue));
  }

  AbrirModalChofer(){
    const dialogRef = this.dialog.open(ChoferModalComponent, {
      data: this.Chofer, width:'1200px'
    });
    dialogRef.componentInstance.submitClicked.subscribe(result => {
      console.log(result);
      this.myControl.setValue(result);
      this.TransporteDeguia.Chofer=result;
      this.emitirChoferDeGre();
    });
  }

  onSelectionChange(event: any){
    this.TransporteDeguia.Chofer=event.option.value;
    this.submitClicked.emit(this.TransporteDeguia)
  }

  displayFn(chofer: chofer): string {
    return chofer && chofer.nombre ? chofer.nombre : '';
  }
  TCirculacionChange($event: Event) {
    throw new Error('Method not implemented.');
    }
  emitirChoferDeGre(){
    this.submitClicked.emit(this.TransporteDeguia);
  }
  ObtenerPlacaChanged($event: VehiculoDTO) {
    this.TransporteDeguia.Vehiculo=$event;
    this.emitirChoferDeGre();
  }
}
