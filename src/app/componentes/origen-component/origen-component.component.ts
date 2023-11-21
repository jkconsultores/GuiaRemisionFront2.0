import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatDialog } from '@angular/material/dialog';
import { Observable, startWith, map } from 'rxjs';
import { DestinoModalComponent } from 'src/app/modals/destino-modal/destino-modal.component';
import { OrigenModalComponent } from 'src/app/modals/origen-modal/origen-modal.component';
import { Aaa_OrigenDTO } from 'src/models/origen';
import { DestinosService } from 'src/services/destinos.service';
import { OrigenService } from 'src/services/origen.service';

@Component({
  selector: 'app-origen-component',
  templateUrl: './origen-component.component.html',
  styleUrls: ['./origen-component.component.css']
})
export class OrigenComponentComponent {
  @Input()
  RucEmisor: string|undefined;
  @Output()
  submitClicked = new EventEmitter<Aaa_OrigenDTO>();
  @ViewChild(MatAutocompleteTrigger) _auto!: MatAutocompleteTrigger;
  myControl = new FormControl()
  options: Aaa_OrigenDTO[] = [];
  filteredOptions!: Observable<Aaa_OrigenDTO[]>;
  Destinos: Aaa_OrigenDTO[] = [];

  constructor(public dialog: MatDialog, private destinosService: OrigenService) { }

  ngOnChanges() {
    if(this.RucEmisor==undefined){
      this.myControl.disable();
    }else{this.myControl.enable();}
    if (this.RucEmisor != undefined) {
      this.destinosService.ObtenerTodosLosOrigenDeUnAdquiriente(this.RucEmisor).subscribe((resp: Aaa_OrigenDTO[]) => {
        this.Destinos = resp;
        this.options = resp;
        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value || '')),
        );
      })
    }
  }
  onSelectionChange(event: any) {
    this.submitClicked.emit(event.option.value)
  }
  AbrirModalDeDestino() {
    const dialogRef = this.dialog.open(OrigenModalComponent, {
      data: this.Destinos, width: '1000px'
    });

    dialogRef.componentInstance.submitClicked.subscribe(result => {
      this.myControl.setValue(result);
      this.submitClicked.emit(result)
    });
  }
  private _filter(value: string): Aaa_OrigenDTO[] {
    let filterValue = (typeof value === 'string') ? value.toLowerCase() : '';
    return this.options.filter(option => option!.direccionorigen!.toLowerCase().includes(filterValue));
  }
  displayFn(country: Aaa_OrigenDTO): string {
    return country && country.direccionorigen ? country.direccionorigen : '';
  }
}
