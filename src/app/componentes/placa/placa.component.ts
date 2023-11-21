import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable, map, startWith } from 'rxjs';
import { VehiculosModalComponent } from 'src/app/modals/vehiculos-modal/vehiculos-modal.component';
import { VehiculoDTO } from 'src/models/Vehiculos';
import { VehiculoService } from 'src/services/vehiculo.service';

@Component({
  selector: 'app-placa',
  templateUrl: './placa.component.html',
  styleUrls: ['./placa.component.css']
})
export class PlacaComponent {
@Input() numero:string="1";
@Output() submitClicked = new EventEmitter<VehiculoDTO>();
  myControl = new FormControl();
  options: VehiculoDTO[]=[];
  Empresas:VehiculoDTO[]=[];
  filteredOptions!: Observable<VehiculoDTO[]>;

  constructor(public dialog: MatDialog,private vehiculosService:VehiculoService){}

  ngOnInit(): void {
    this.vehiculosService.getVehiculos().subscribe((resp:VehiculoDTO[])=>{
      this.Empresas=resp;
      this.options=resp;
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || '')),
      );
    })
  }

  onSelectionChange(event: any){
    this.submitClicked.emit(event.option.value)
  }

  AbrirModalDeEmpresa(){
    const dialogRef = this.dialog.open(VehiculosModalComponent, {
      data: this.Empresas, width:'1000px'
    });

    dialogRef.componentInstance.submitClicked.subscribe(result => {
      this.myControl.setValue(result);
      this.submitClicked.emit(result)
    });
  }

  private _filter(value: string): VehiculoDTO[] {
    let filterValue = (typeof value === 'string') ? value.toLowerCase() : '';
    return this.options.filter(option => option!.placaVehiculo!.toLowerCase().includes(filterValue));
  }

  displayFn(country: VehiculoDTO): string {
    return country && country.placaVehiculo ? country.placaVehiculo : '';
  }

}
