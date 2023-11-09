import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatDialog } from '@angular/material/dialog';
import { Observable, startWith, map } from 'rxjs';
import { DestinoModalComponent } from 'src/app/modals/destino-modal/destino-modal.component';
import { AAA_DESTINO } from 'src/models/destino';
import { DestinosService } from 'src/services/destinos.service';

@Component({
  selector: 'app-destino-component',
  templateUrl: './destino-component.component.html',
  styleUrls: ['./destino-component.component.css']
})
export class DestinoComponentComponent implements OnInit {
@Input()
RucAdquiriente!:string;

@ViewChild(MatAutocompleteTrigger) _auto!: MatAutocompleteTrigger;
myControl = new FormControl();
options: AAA_DESTINO[]=[];
  filteredOptions!: Observable<AAA_DESTINO[]>;
  Destinos:AAA_DESTINO[]=[];

  constructor(public dialog: MatDialog,private destinosService:DestinosService){}

  ngOnInit(): void {
    //RucAdquiriente
      this.destinosService.ObtenerTodosLosDestinosDeUnAdquiriente(this.RucAdquiriente).subscribe((resp:AAA_DESTINO[])=>{
        this.Destinos=resp;
        this.options=resp;
        console.log(this.Destinos)
      })
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || '')),
      );

  }
  onSelectionChange(event: any){
    console.log(event.option.value);

  }
  AbrirModalDeDestino(){
    const dialogRef = this.dialog.open(DestinoModalComponent, {
      data: this.Destinos,width:'1000px'
    });

    dialogRef.componentInstance.submitClicked.subscribe(result => {
      console.log(result);
      this.myControl.setValue(result);
    });
  }
  private _filter(value: string): AAA_DESTINO[] {
    let filterValue = value.toLowerCase();
    return this.options.filter(option => option!.direcciondestino!.toLowerCase().includes(filterValue));
  }
  displayFn(country: AAA_DESTINO): string {
    return country && country.direcciondestino ? country.direcciondestino : '';
  }
}
